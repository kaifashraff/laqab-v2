// ============================================
// LAQAB - AI Fit Calculation Engine
// Compares user measurements against size charts
// and returns intelligent recommendations
// ============================================

import {
  ProductType,
  FitPreference,
  SizeLabel,
  SizeEntry,
  getSizeChart,
  FitOverride,
} from './sizeCharts';

export interface UserMeasurements {
  chest: number;        // inches
  waist: number;        // inches
  height: number;       // cm
  shoulder?: number;    // inches (optional)
  weight?: number;      // kg (optional)
  inseam?: number;      // inches (optional)
  fitPreference: FitPreference;
  productType: ProductType;
}

export interface FitScore {
  size: SizeLabel;
  confidence: number;     // 0-99 percentage
  chestMatch: number;     // 0-1
  waistMatch: number;
  shoulderMatch: number;
  lengthMatch: number;
}

export interface FitRecommendation {
  recommendedSize: SizeLabel;
  alternativeSize?: SizeLabel;
  confidence: number;
  scores: FitScore[];
  notes: string[];
  warnings: string[];
  measurementGaps: string[];
}

/**
 * Calculate how well a measurement fits into a size range
 * Returns 0 (no fit) to 1 (perfect fit)
 */
function calculateRangeFit(
  userMeasurement: number | undefined,
  sizeRange: [number, number],
  override?: number
): number {
  // If measurement is missing, return moderate score
  if (userMeasurement === undefined || userMeasurement === null) {
    return 0.5;
  }

  const adjustedMeasurement = userMeasurement + (override || 0);
  const [minVal, maxVal] = sizeRange;
  const midPoint = (minVal + maxVal) / 2;
  const tolerance = (maxVal - minVal) / 2 + 1.5; // Extended tolerance

  const difference = Math.abs(adjustedMeasurement - midPoint);

  if (difference <= tolerance) {
    // Within or near range: score from 1.0 down to 0.7
    return Math.max(0.7, 1 - (difference / (tolerance * 2)));
  } else if (difference <= tolerance * 2) {
    // Close to range: score from 0.7 down to 0.3
    return Math.max(0.3, 0.7 - ((difference - tolerance) / (tolerance * 2)));
  } else {
    // Far from range: score from 0.3 down to 0
    return Math.max(0, 0.3 - ((difference - tolerance * 2) / (tolerance * 4)));
  }
}

/**
 * Estimate shoulder width from chest measurement
 * Used when shoulder measurement is missing
 */
function estimateShoulderFromChest(chest: number): number {
  // Typical shoulder-to-chest ratio for Indian body types
  return chest * 0.45;
}

/**
 * Estimate chest from weight and height
 * Used when chest measurement is missing (fallback)
 */
function estimateChestFromBodyMetrics(weight?: number, height?: number): number | undefined {
  if (!weight || !height) return undefined;
  // Height in cm, weight in kg -> rough chest estimation
  // Using Broca index adaptation for Indian body types
  const heightInInches = height / 2.54;
  const chestEstimate = heightInInches * 0.47 + (weight - 65) * 0.3;
  return Math.round(chestEstimate * 10) / 10;
}

/**
 * Estimate waist from chest (typical proportions)
 */
function estimateWaistFromChest(chest: number): number {
  return chest * 0.82; // Waist is typically ~82% of chest
}

/**
 * Get size-specific fit override adjustment
 */
function getFitOverride(
  fitPreference: FitPreference,
  overrides: Record<FitPreference, FitOverride>,
  measurementType: keyof FitOverride
): number {
  return overrides[fitPreference]?.[measurementType] ?? 0;
}

/**
 * Main AI fit calculation function
 * Takes user measurements + preferences, returns smart recommendation
 */
export function calculateFit(
  measurements: UserMeasurements
): FitRecommendation {
  const {
    chest,
    waist,
    height,
    shoulder,
    weight,
    fitPreference,
    productType,
  } = measurements;

  const sizeChart = getSizeChart(productType);
  const overrides = sizeChart.fitOverrides;
  const notes: string[] = [];
  const warnings: string[] = [];
  const measurementGaps: string[] = [];

  // Track missing measurements
  if (shoulder === undefined || shoulder === null) {
    measurementGaps.push('Shoulder measurement was estimated from chest (could affect sleeve fit)');
  }
  if (weight === undefined || weight === null) {
    measurementGaps.push('Weight not provided (used for body type estimation fallback)');
  }

  // Estimate missing critical measurements
  let effectiveChest = chest;
  let effectiveWaist = waist;
  let effectiveShoulder = shoulder;

  // If chest is missing, try to estimate from weight/height
  if ((chest === undefined || chest === null || chest <= 0) && weight && height) {
    const estimatedChest = estimateChestFromBodyMetrics(weight, height);
    if (estimatedChest) {
      effectiveChest = estimatedChest;
      measurementGaps.push(
        `Chest estimated from your weight & height: ~${estimatedChest}"`
      );
    }
  }

  // If waist is missing, estimate from chest
  if ((waist === undefined || waist === null || waist <= 0) && effectiveChest > 0) {
    effectiveWaist = estimateWaistFromChest(effectiveChest);
    measurementGaps.push(
      `Waist estimated from chest measurement: ~${effectiveWaist.toFixed(1)}"`
    );
  }

  // If shoulder is missing, estimate from chest
  if ((shoulder === undefined || shoulder === null || shoulder <= 0) && effectiveChest > 0) {
    effectiveShoulder = estimateShoulderFromChest(effectiveChest);
    measurementGaps.push(
      `Shoulder width estimated from chest: ~${effectiveShoulder.toFixed(1)}"`
    );
  }

  // Calculate estimated garment length based on height
  const heightInInches = height / 2.54;
  const estimatedLength = heightInInches * 0.42; // ~42% of height for sherwani
  const kurtaLengthMultiplier = productType === 'Kurta' ? 0.40 : 0.42;
  const bandhgalaMultiplier = productType === 'Bandhgala' ? 0.38 : 0;
  const lengthMultiplier = productType === 'Bandhgala' ? bandhgalaMultiplier : kurtaLengthMultiplier;
  const finalLengthMultiplier = productType === 'Sherwani' ? 0.42 : lengthMultiplier;
  const estimatedGarmentLength = heightInInches * finalLengthMultiplier;

  // Evaluate each size
  const scores: FitScore[] = sizeChart.sizes.map((entry: SizeEntry) => {
    const chestAdj = getFitOverride(fitPreference, overrides, 'chest');
    const waistAdj = getFitOverride(fitPreference, overrides, 'waist');
    const shoulderAdj = getFitOverride(fitPreference, overrides, 'shoulder');
    const lengthAdj = getFitOverride(fitPreference, overrides, 'length');

    const chestScore = calculateRangeFit(effectiveChest, entry.chest, chestAdj);
    const waistScore = calculateRangeFit(effectiveWaist, entry.waist, waistAdj);
    const shoulderScore = calculateRangeFit(effectiveShoulder, entry.shoulder, shoulderAdj);
    const lengthScore = calculateRangeFit(estimatedGarmentLength, entry.length, lengthAdj);

    const confidence = Math.round(
      (chestScore * 0.35 + waistScore * 0.20 + shoulderScore * 0.25 + lengthScore * 0.20) * 100
    );

    return {
      size: entry.size,
      confidence: Math.min(99, confidence),
      chestMatch: chestScore,
      waistMatch: waistScore,
      shoulderMatch: shoulderScore,
      lengthMatch: lengthScore,
    };
  });

  // Sort by confidence descending
  scores.sort((a, b) => b.confidence - a.confidence);

  const bestScore = scores[0];
  const secondBest = scores[1];

  // Determine alternative size
  let alternativeSize: SizeLabel | undefined;
  if (secondBest && secondBest.confidence >= bestScore.confidence - 20) {
    alternativeSize = secondBest.size;
  }

  // Generate notes
  if (bestScore.confidence >= 90) {
    notes.push(`Excellent match! Size ${bestScore.size} fits your measurements perfectly.`);
  } else if (bestScore.confidence >= 75) {
    notes.push(`Good match. Size ${bestScore.size} is recommended. Consider trying both ${bestScore.size} and ${alternativeSize || 'nearby sizes'} if possible.`);
  } else {
    notes.push(`Reasonable match. Size ${bestScore.size} may work, but we recommend checking the size chart closely.`);
  }

  // Fit preference note
  if (fitPreference === 'Slim') {
    notes.push('Slim fit selected: measurements adjusted for a closer fit. If between sizes, go with the smaller option.');
  } else if (fitPreference === 'Relaxed') {
    notes.push('Relaxed fit selected: extra room for comfort. If between sizes, we suggest the larger option.');
  } else {
    notes.push('Regular fit selected: balanced between comfort and silhouette.');
  }

  // Product-specific notes
  if (productType === 'Sherwani') {
    notes.push('For sherwanis, the recommended length is just below the knee. The calculated length is an estimate.');
  } else if (productType === 'Bandhgala') {
    notes.push('Bandhgalas sit at the waist. Ensure the collar measurement is accurate for the stand collar fit.');
  }

  // Warnings
  if (measurementGaps.length > 0) {
    warnings.push('Some measurements were estimated. For best results, provide all measurements.');
  }

  // Between sizes warning
  if (secondBest && secondBest.confidence >= 75 && secondBest.confidence >= bestScore.confidence - 10) {
    const betweenMsg = fitPreference === 'Slim'
      ? `You're between sizes. For slim fit, we suggest ${bestScore.size}.`
      : fitPreference === 'Relaxed'
        ? `You're between sizes. For relaxed fit, we suggest ${secondBest.size} for extra comfort.`
        : `You're between sizes. For regular fit, ${bestScore.size} is recommended.`;
    warnings.push(betweenMsg);
  }

  // Low confidence warning
  if (bestScore.confidence < 60) {
    warnings.push('Confidence is low. Please double-check your measurements and consider visiting a tailor.');
  }

  return {
    recommendedSize: bestScore.size,
    alternativeSize,
    confidence: bestScore.confidence,
    scores,
    notes,
    warnings,
    measurementGaps,
  };
}

/**
 * Validate measurement inputs and return error messages
 */
export function validateMeasurements(
  measurements: Partial<UserMeasurements>
): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!measurements.productType) {
    errors.productType = 'Please select a product type';
  }

  if (!measurements.fitPreference) {
    errors.fitPreference = 'Please select a fit preference';
  }

  if (!measurements.height || measurements.height < 100 || measurements.height > 250) {
    errors.height = 'Please enter a valid height (100-250 cm)';
  }

  // At least chest OR weight+height should be provided
  if ((!measurements.chest || measurements.chest <= 0) &&
      (!measurements.weight || measurements.weight <= 0)) {
    errors.measurements = 'Please provide at least chest measurement OR weight & height';
  }

  if (measurements.chest !== undefined && measurements.chest > 0 &&
      (measurements.chest < 28 || measurements.chest > 70)) {
    errors.chest = 'Chest should be between 28 and 70 inches';
  }

  if (measurements.waist !== undefined && measurements.waist > 0 &&
      (measurements.waist < 22 || measurements.waist > 60)) {
    errors.waist = 'Waist should be between 22 and 60 inches';
  }

  if (measurements.shoulder !== undefined && measurements.shoulder > 0 &&
      (measurements.shoulder < 12 || measurements.shoulder > 28)) {
    errors.shoulder = 'Shoulder should be between 12 and 28 inches';
  }

  if (measurements.weight !== undefined && measurements.weight > 0 &&
      (measurements.weight < 30 || measurements.weight > 200)) {
    errors.weight = 'Weight should be between 30 and 200 kg';
  }

  return errors;
}
