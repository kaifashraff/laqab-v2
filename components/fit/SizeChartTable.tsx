'use client';

import { motion } from 'framer-motion';
import { SizeEntry, ProductType, FitPreference, FitOverride } from '@/lib/sizeCharts';
import { getSizeChart } from '@/lib/sizeCharts';

interface SizeChartTableProps {
  productType?: ProductType;
  highlightSize?: string;
  fitPreference?: FitPreference;
  compact?: boolean;
}

export default function SizeChartTable({
  productType = 'Sherwani',
  highlightSize,
  fitPreference,
  compact = false,
}: SizeChartTableProps) {
  const chartData = getSizeChart(productType);
  const sizes = chartData.sizes;

  const getAdjustedRange = (
    entry: SizeEntry,
    field: 'chest' | 'waist' | 'shoulder' | 'length',
    override?: number
  ): [number, number] => {
    const range = entry[field];
    if (!range || !override) return range as [number, number];
    return [range[0] + override, range[1] + override];
  };

  return (
    <div className="size-chart-table-wrapper">
      <div className="table-responsive">
        <table className={`size-chart-table ${compact ? 'compact' : ''}`}>
          <thead>
            <tr>
              <th>Size</th>
              <th>Chest (in)</th>
              <th>Waist (in)</th>
              <th>Shoulder (in)</th>
              <th>Length (in)</th>
            </tr>
          </thead>
          <tbody>
            {sizes.map((entry, index) => {
              const isHighlighted = highlightSize === entry.size;
              const chestAdj = fitPreference
                ? getAdjustedRange(entry, 'chest', chartData.fitOverrides[fitPreference]?.chest)
                : undefined;
              const waistAdj = fitPreference
                ? getAdjustedRange(entry, 'waist', chartData.fitOverrides[fitPreference]?.waist)
                : undefined;
              const shoulderAdj = fitPreference
                ? getAdjustedRange(entry, 'shoulder', chartData.fitOverrides[fitPreference]?.shoulder)
                : undefined;
              const lengthAdj = fitPreference
                ? getAdjustedRange(entry, 'length', chartData.fitOverrides[fitPreference]?.length)
                : undefined;

              return (
                <motion.tr
                  key={entry.size}
                  initial={isHighlighted ? { opacity: 0, scale: 0.95 } : undefined}
                  animate={isHighlighted ? { opacity: 1, scale: 1 } : undefined}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className={`
                    ${isHighlighted ? 'highlighted-row' : ''}
                    ${isHighlighted ? 'animate-border-glow' : ''}
                  `}
                >
                  <td className="size-label">
                    <span className={`size-badge ${isHighlighted ? 'size-badge-active' : ''}`}>
                      {entry.size}
                    </span>
                  </td>
                  <td>{chestAdj ? `${chestAdj[0]}-${chestAdj[1]}` : `${entry.chest[0]}-${entry.chest[1]}`}</td>
                  <td>{waistAdj ? `${waistAdj[0]}-${waistAdj[1]}` : `${entry.waist[0]}-${entry.waist[1]}`}</td>
                  <td>{shoulderAdj ? `${shoulderAdj[0]}-${shoulderAdj[1]}` : `${entry.shoulder[0]}-${entry.shoulder[1]}`}</td>
                  <td>{lengthAdj ? `${lengthAdj[0]}-${lengthAdj[1]}` : `${entry.length[0]}-${entry.length[1]}`}</td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {fitPreference && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fit-adjustment-note"
        >
          <span className="text-gold">*</span> Values adjusted for{' '}
          <strong className="text-gold">{fitPreference}</strong> fit preference.
          {chartData.fitOverrides[fitPreference]?.chest !== 0 && (
            <span> Chest: {chartData.fitOverrides[fitPreference].chest > 0 ? '+' : ''}{chartData.fitOverrides[fitPreference].chest}", </span>
          )}
          {chartData.fitOverrides[fitPreference]?.waist !== 0 && (
            <span> Waist: {chartData.fitOverrides[fitPreference].waist > 0 ? '+' : ''}{chartData.fitOverrides[fitPreference].waist}", </span>
          )}
          {chartData.fitOverrides[fitPreference]?.shoulder !== 0 && (
            <span> Shoulder: {chartData.fitOverrides[fitPreference].shoulder > 0 ? '+' : ''}{chartData.fitOverrides[fitPreference].shoulder}"</span>
          )}
        </motion.p>
      )}

      <style jsx>{`
        .size-chart-table-wrapper {
          width: 100%;
        }

        .table-responsive {
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        .size-chart-table {
          width: 100%;
          border-collapse: collapse;
          font-family: var(--font-body);
        }

        .size-chart-table th {
          padding: 14px 16px;
          text-align: center;
          background: var(--black);
          color: var(--white);
          font-family: var(--font-heading);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          border-bottom: 2px solid var(--gold);
        }

        .size-chart-table th:first-child {
          border-radius: 8px 0 0 0;
        }

        .size-chart-table th:last-child {
          border-radius: 0 8px 0 0;
        }

        .size-chart-table td {
          padding: 12px 16px;
          text-align: center;
          font-size: 0.9rem;
          color: var(--charcoal);
          border-bottom: 1px solid var(--cream-dark);
          transition: background 0.2s ease;
        }

        .size-chart-table tbody tr:hover td {
          background: rgba(212, 175, 55, 0.05);
        }

        .size-chart-table.compact td,
        .size-chart-table.compact th {
          padding: 8px 12px;
          font-size: 0.8rem;
        }

        .size-chart-table.compact .size-badge {
          width: 28px;
          height: 28px;
          font-size: 0.7rem;
        }

        .highlighted-row td {
          background: rgba(212, 175, 55, 0.1) !important;
          font-weight: 600;
        }

        .highlighted-row .size-badge {
          background: var(--gold) !important;
          color: var(--black) !important;
          box-shadow: 0 0 12px rgba(212, 175, 55, 0.4);
        }

        .size-label {
          font-weight: 600;
        }

        .size-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--cream-dark);
          color: var(--charcoal);
          font-family: var(--font-heading);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          transition: all 0.3s ease;
        }

        .size-badge-active {
          background: var(--gold) !important;
          color: var(--black) !important;
        }

        .fit-adjustment-note {
          margin-top: 12px;
          font-size: 0.8rem;
          color: var(--gray);
          font-family: var(--font-body);
          text-align: center;
        }

        @keyframes borderGlow {
          0%, 100% { box-shadow: inset 0 0 0 1px rgba(212, 175, 55, 0.3); }
          50% { box-shadow: inset 0 0 0 2px rgba(212, 175, 55, 0.6); }
        }

        .animate-border-glow td:first-child {
          animation: borderGlow 2s ease-in-out infinite;
        }

        @media (max-width: 600px) {
          .size-chart-table td,
          .size-chart-table th {
            padding: 10px 8px;
            font-size: 0.8rem;
          }

          .size-badge {
            width: 28px;
            height: 28px;
            font-size: 0.65rem;
          }
        }
      `}</style>
    </div>
  );
}
