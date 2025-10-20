/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { useLogStore } from '@/lib/state';
import './FunctionCallAnalytics.css';

const FunctionCallAnalytics: React.FC = () => {
  const turns = useLogStore(state => state.turns);

  // FIX: Explicitly type the initial value and accumulator for the reduce function to ensure type safety.
  // This ensures `functionCallCounts` is correctly typed as Record<string, number>,
  // which in turn ensures `count` is inferred as a number in the subsequent code.
  const functionCallCounts = turns.reduce((acc: Record<string, number>, turn) => {
    if (turn.toolUseRequest && turn.toolUseRequest.functionCalls) {
        turn.toolUseRequest.functionCalls.forEach(fc => {
            acc[fc.name] = (acc[fc.name] || 0) + 1;
        });
    }
    return acc;
  }, {} as Record<string, number>);

  const entries = Object.entries(functionCallCounts);

  if (entries.length === 0) {
    return (
      <div className="function-call-analytics">
        <p className="no-data-message">No function calls have been made yet.</p>
      </div>
    );
  }
  
  const totalCalls = entries.reduce((sum, [, count]) => sum + count, 0);

  return (
    <div className="function-call-analytics">
      <div className="analytics-chart">
        {entries.map(([name, count]) => (
          <div key={name} className="chart-bar-wrapper" title={`${name}: ${count} call(s)`}>
            <div className="chart-bar" style={{ width: `${(count / totalCalls) * 100}%` }}>
              <span className="bar-label">{name} ({count})</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FunctionCallAnalytics;