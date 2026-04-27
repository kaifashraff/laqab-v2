// ============================================
// LAQAB - AI Size Charts Database
// Comprehensive size mappings for Sherwani,
// Kurta, and Bandhgala product types
// ============================================

export type ProductType = 'Sherwani' | 'Kurta' | 'Bandhgala';
export type FitPreference = 'Slim' | 'Regular' | 'Relaxed';
export type SizeLabel = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL';

export interface SizeEntry {
  size: SizeLabel;
  chest: [number, number];   // min-max in inches
  waist: [number, number];
  shoulder: [number, number];
  length: [number, number];
  sleeve?: [number, number];  // optional, only for certain types
  hip?: [number, number];     // optional, for Kurta
}

export interface FitOverride {
  chest: number;     // inches to add/subtract per preference
  waist: number;
  shoulder: number;
  length: number;
}

export interface SizeChartData {
  productType: ProductType;
  sizes: SizeEntry[];
  fitOverrides: Record<FitPreference, FitOverride>;
  notes: string;
}

// Fit overrides adjust measurements based on preference
const fitOverrides: Record<FitPreference, FitOverride> = {
  Slim:    { chest: -1, waist: -1, shoulder: -0.5, length: 0 },
  Regular: { chest: 0,  waist: 0,  shoulder: 0,     length: 0 },
  Relaxed: { chest: 2,  waist: 2,  shoulder: 1,     length: 1 },
};

// ============================================
// Sherwani Size Chart
// Sherwanis are typically longer, more tailored
// ============================================
const sherwaniSizes: SizeEntry[] = [
  { size: 'XS', chest: [34, 36],  waist: [28, 30], shoulder: [16, 16.5], length: [40, 41] },
  { size: 'S',  chest: [36, 38],  waist: [30, 32], shoulder: [16.5, 17], length: [41, 43] },
  { size: 'M',  chest: [38, 40],  waist: [32, 34], shoulder: [17, 17.5], length: [43, 45] },
  { size: 'L',  chest: [40, 42],  waist: [34, 36], shoulder: [17.5, 18], length: [45, 47] },
  { size: 'XL', chest: [42, 44],  waist: [36, 38], shoulder: [18, 18.5], length: [47, 48] },
  { size: 'XXL',chest: [44, 47],  waist: [38, 41], shoulder: [18.5, 19], length: [48, 49] },
  { size: '3XL',chest: [47, 50],  waist: [41, 44], shoulder: [19, 19.5], length: [49, 50] },
];

// ============================================
// Kurta Size Chart
// Kurtas are roomier, shorter length
// ============================================
const kurtaSizes: SizeEntry[] = [
  { size: 'XS', chest: [34, 36],  waist: [28, 30], shoulder: [16, 16.5], length: [36, 38], hip: [36, 38] },
  { size: 'S',  chest: [36, 38],  waist: [30, 32], shoulder: [16.5, 17], length: [38, 40], hip: [38, 40] },
  { size: 'M',  chest: [38, 40],  waist: [32, 34], shoulder: [17, 17.5], length: [40, 42], hip: [40, 42] },
  { size: 'L',  chest: [40, 42],  waist: [34, 36], shoulder: [17.5, 18], length: [42, 44], hip: [42, 44] },
  { size: 'XL', chest: [42, 44],  waist: [36, 38], shoulder: [18, 18.5], length: [44, 46], hip: [44, 46] },
  { size: 'XXL',chest: [44, 47],  waist: [38, 41], shoulder: [18.5, 19], length: [46, 47], hip: [46, 48] },
  { size: '3XL',chest: [47, 50],  waist: [41, 44], shoulder: [19, 19.5], length: [47, 48], hip: [48, 50] },
];

// ============================================
// Bandhgala Size Chart
// Bandhgalas are more fitted, similar to sherwani
// but shorter length
// ============================================
const bandhgalaSizes: SizeEntry[] = [
  { size: 'XS', chest: [34, 36],  waist: [28, 30], shoulder: [16, 16.5], length: [30, 32] },
  { size: 'S',  chest: [36, 38],  waist: [30, 32], shoulder: [16.5, 17], length: [32, 34] },
  { size: 'M',  chest: [38, 40],  waist: [32, 34], shoulder: [17, 17.5], length: [34, 36] },
  { size: 'L',  chest: [40, 42],  waist: [34, 36], shoulder: [17.5, 18], length: [36, 38] },
  { size: 'XL', chest: [42, 44],  waist: [36, 38], shoulder: [18, 18.5], length: [38, 39] },
  { size: 'XXL',chest: [44, 47],  waist: [38, 41], shoulder: [18.5, 19], length: [39, 40] },
  { size: '3XL',chest: [47, 50],  waist: [41, 44], shoulder: [19, 19.5], length: [40, 41] },
];

// Size chart database keyed by product type
const sizeChartDatabase: Record<ProductType, SizeChartData> = {
  Sherwani: {
    productType: 'Sherwani',
    sizes: sherwaniSizes,
    fitOverrides,
    notes: 'Sherwanis are designed with a tailored fit. For weddings, we recommend going one size up for comfort during long ceremonies. The length includes a 1-inch hem allowance.',
  },
  Kurta: {
    productType: 'Kurta',
    sizes: kurtaSizes,
    fitOverrides,
    notes: 'Kurtas have a relaxed silhouette. If you prefer a more fitted look, choose a Slim fit preference. Side slits are standard on all kurtas above size M.',
  },
  Bandhgala: {
    productType: 'Bandhgala',
    sizes: bandhgalaSizes,
    fitOverrides,
    notes: 'Bandhgalas are structured and fitted. The stand collar requires accurate neck measurement. For best results, take your measurements in a formal shirt.',
  },
};

/**
 * Get the size chart for a specific product type
 */
export function getSizeChart(productType: ProductType): SizeChartData {
  const chart = sizeChartDatabase[productType];
  if (!chart) {
    // Default to Sherwani if unknown type
    return sizeChartDatabase.Sherwani;
  }
  return chart;
}

/**
 * Get all available size charts
 */
export function getAllSizeCharts(): Record<ProductType, SizeChartData> {
  return { ...sizeChartDatabase };
}

/**
 * Get all valid size labels
 */
export function getAllSizes(): SizeLabel[] {
  return ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];
}

/**
 * Convert height in cm to feet/inches for display
 */
export function cmToFeetInches(cm: number): { feet: number; inches: number } {
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return { feet, inches };
}

/**
 * Convert feet/inches to cm
 */
export function feetInchesToCm(feet: number, inches: number): number {
  return (feet * 12 + inches) * 2.54;
}

/**
 * Get a human-readable height string
 */
export function formatHeight(cm: number): string {
  const { feet, inches } = cmToFeetInches(cm);
  return `${feet}'${inches}" (${cm} cm)`;
}
