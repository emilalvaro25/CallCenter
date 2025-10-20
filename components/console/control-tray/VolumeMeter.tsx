/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import './VolumeMeter.css';

interface VolumeMeterProps {
  volume: number;
}

const NUM_BARS = 12;

const VolumeMeter: React.FC<VolumeMeterProps> = ({ volume }) => {
  const activeBars = Math.round(volume * NUM_BARS);

  return (
    <div className="volume-meter" aria-label={`Microphone volume level: ${Math.round(volume * 100)}%`}>
      {Array.from({ length: NUM_BARS }).map((_, i) => (
        <div
          key={i}
          className={`volume-bar ${i < activeBars ? 'active' : ''}`}
          style={{ height: `${(i + 1) * 2 + 8}px` }}
        />
      ))}
    </div>
  );
};

export default VolumeMeter;
