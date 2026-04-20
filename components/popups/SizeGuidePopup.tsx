'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { closePopup } from '@/lib/uiSlice';
import { X } from 'lucide-react';

export default function SizeGuidePopup() {
  const dispatch = useDispatch();
  const { popups } = useSelector((state: RootState) => state.ui);

  const sizeGuidePopup = popups.find(p => p.id === 'size-guide');

  if (!sizeGuidePopup?.isOpen) return null;

  return (
    <>
      <div className="popup-overlay" onClick={() => dispatch(closePopup('size-guide'))} />
      <div className="sizeguide-popup">
        <button className="popup-close" onClick={() => dispatch(closePopup('size-guide'))}>
          <X size={24} />
        </button>
        <div className="sizeguide-content">
          <h3>Size Guide</h3>
          <p className="sizeguide-subtitle">Measurements in inches</p>
          
          <table className="sizeguide-table">
            <thead>
              <tr>
                <th>Size</th>
                <th>Chest</th>
                <th>Waist</th>
                <th>Length</th>
                <th>Shoulder</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>S</td>
                <td>36-38</td>
                <td>30-32</td>
                <td>42</td>
                <td>17</td>
              </tr>
              <tr>
                <td>M</td>
                <td>38-40</td>
                <td>32-34</td>
                <td>44</td>
                <td>18</td>
              </tr>
              <tr>
                <td>L</td>
                <td>40-42</td>
                <td>34-36</td>
                <td>46</td>
                <td>19</td>
              </tr>
              <tr>
                <td>XL</td>
                <td>42-44</td>
                <td>36-38</td>
                <td>48</td>
                <td>20</td>
              </tr>
              <tr>
                <td>XXL</td>
                <td>44-46</td>
                <td>38-40</td>
                <td>50</td>
                <td>21</td>
              </tr>
            </tbody>
          </table>

          <div className="sizeguide-notes">
            <h4>How to Measure</h4>
            <ul>
              <li><strong>Chest:</strong> Measure around the fullest part of your chest</li>
              <li><strong>Waist:</strong> Measure around your natural waistline</li>
              <li><strong>Length:</strong> Measure from shoulder to desired length</li>
              <li><strong>Shoulder:</strong> Measure from one shoulder end to another</li>
            </ul>
            <p className="note">Note: Allow 1-2 inches extra for comfort fitting. For sherwanis, we recommend going one size up for a perfect drape.</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          z-index: 2999;
        }

        .sizeguide-popup {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 90%;
          max-width: 700px;
          max-height: 90vh;
          background: var(--color-white);
          border-radius: 16px;
          z-index: 3000;
          overflow: hidden;
          animation: scaleIn 0.3s ease;
        }

        @keyframes scaleIn {
          from { transform: translate(-50%, -50%) scale(0.9); opacity: 0; }
          to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }

        .popup-close {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-gray-100);
          border-radius: 50%;
          cursor: pointer;
          z-index: 1;
        }

        .sizeguide-content {
          padding: 40px;
          max-height: 90vh;
          overflow-y: auto;
        }

        .sizeguide-content h3 {
          font-family: var(--font-heading);
          font-size: 1.75rem;
          text-align: center;
          margin-bottom: 8px;
        }

        .sizeguide-subtitle {
          text-align: center;
          color: var(--color-gray-600);
          margin-bottom: 32px;
        }

        .sizeguide-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 32px;
        }

        .sizeguide-table th,
        .sizeguide-table td {
          padding: 14px 16px;
          text-align: center;
          border: 1px solid var(--color-gray-200);
        }

        .sizeguide-table th {
          background: var(--color-black);
          color: var(--color-white);
          font-weight: 600;
          text-transform: uppercase;
          font-size: 0.8rem;
          letter-spacing: 1px;
        }

        .sizeguide-table td {
          font-size: 0.95rem;
        }

        .sizeguide-table tbody tr:hover {
          background: var(--color-gray-50);
        }

        .sizeguide-notes h4 {
          font-size: 1.1rem;
          margin-bottom: 16px;
        }

        .sizeguide-notes ul {
          list-style: none;
          padding: 0;
          margin: 0 0 20px 0;
        }

        .sizeguide-notes li {
          padding: 8px 0;
          font-size: 0.9rem;
          color: var(--color-gray-700);
          border-bottom: 1px solid var(--color-gray-100);
        }

        .sizeguide-notes li strong {
          color: var(--color-black);
        }

        .note {
          font-size: 0.85rem;
          color: var(--color-maroon);
          padding: 12px;
          background: rgba(128, 0, 32, 0.05);
          border-radius: 8px;
          margin: 0;
        }
      `}</style>
    </>
  );
}
