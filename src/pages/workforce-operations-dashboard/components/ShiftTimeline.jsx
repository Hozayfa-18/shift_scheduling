import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ShiftTimeline = ({ shiftData, onAssignShift, onResolveConflict }) => {
  const [selectedPeriod, setSelectedPeriod] = useState(null);

  // Time periods matching the design: 12, 4, 8, 12, 4, 8
  const timePeriods = [
  { hour: 12, label: '12', period: 'AM', timeIndex: 0 },
  { hour: 4, label: '4', period: 'AM', timeIndex: 1 },
  { hour: 8, label: '8', period: 'AM', timeIndex: 2 },
  { hour: 12, label: '12', period: 'PM', timeIndex: 3 },
  { hour: 16, label: '4', period: 'PM', timeIndex: 4 },
  { hour: 20, label: '8', period: 'PM', timeIndex: 5 }];


  const getCoverageStatus = (timeIndex) => {
    // Mock coverage data based on time periods
    const coverageData = [
    { status: 'optimal', level: 95 },
    { status: 'low', level: 75 },
    { status: 'optimal', level: 98 },
    { status: 'critical', level: 45 },
    { status: 'low', level: 80 },
    { status: 'optimal', level: 92 }];

    return coverageData?.[timeIndex] || { status: 'optimal', level: 100 };
  };

  const getBarColor = (status) => {
    switch (status) {
      case 'optimal':return 'bg-green-500';
      case 'low':return 'bg-orange-500';
      case 'critical':return 'bg-red-500';
      default:return 'bg-green-500';
    }
  };

  const hasCriticalAlert = (timeIndex) => {
    // Show critical alerts at specific time periods
    return timeIndex === 3 || timeIndex === 1; // 12 PM and 4 AM
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-black">Real-time Shift Coverage</h2>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span>Optimal</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <div className="w-3 h-3 bg-orange-500 rounded-full" />
            <span>Low</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <span>Critical</span>
          </div>
        </div>
      </div>
      <div className="space-y-6">
        {/* Time Labels */}
        <div className="grid grid-cols-6 gap-4">
          {timePeriods?.map((period, index) =>
          <div key={index} className="text-center">
              <div className="text-lg font-medium text-gray-900 mb-1">
                {period?.label}
              </div>
            </div>
          )}
        </div>

        {/* Coverage Visualization */}
        <div className="relative">
          {/* Grid lines */}
          <div className="absolute inset-0 grid grid-cols-6 gap-4">
            {timePeriods?.map((_, index) =>
            <div key={index} className="border-l border-gray-100 first:border-l-0" />
            )}
          </div>

          {/* Coverage Bars */}
          <div className="grid grid-cols-6 gap-4 py-8">
            {timePeriods?.map((period, index) => {
              const coverage = getCoverageStatus(index);
              return (
                <div key={index} className="relative flex items-center justify-center">
                  {/* Horizontal Coverage Bar */}
                  <div
                    className={`h-6 rounded-full ${getBarColor(coverage?.status)} opacity-80 cursor-pointer hover:opacity-100 transition-opacity`}
                    style={{ width: `${Math.max(coverage?.level, 20)}%` }}
                    onClick={() => setSelectedPeriod(index)} />

                  
                  {/* Critical Alert Triangle */}
                  {hasCriticalAlert(index) &&
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                      <div className="w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-red-500" />
                    </div>
                  }
                </div>);

            })}
          </div>
        </div>

        {/* AM/PM Indicators */}
        <div className="grid grid-cols-6 gap-4">
          {timePeriods?.map((period, index) =>
          <div key={index} className="text-center">
              <div className="text-sm font-medium text-gray-600">
                {period?.period}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Selected Period Details */}
      {selectedPeriod !== null &&
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900">
              {timePeriods?.[selectedPeriod]?.label} {timePeriods?.[selectedPeriod]?.period} - Coverage Details
            </h3>
            <button
            onClick={() => setSelectedPeriod(null)}
            className="text-gray-400 hover:text-gray-600 transition-colors">

              <Icon name="X" size={16} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Coverage Level:</span>
              <span className="ml-2 font-medium text-gray-900">
                {getCoverageStatus(selectedPeriod)?.level}%
              </span>
            </div>
            <div>
              <span className="text-gray-600">Status:</span>
              <span className={`ml-2 font-medium capitalize ${
            getCoverageStatus(selectedPeriod)?.status === 'optimal' ? 'text-green-600' :
            getCoverageStatus(selectedPeriod)?.status === 'low' ? 'text-orange-600' : 'text-red-600'}`
            }>
                {getCoverageStatus(selectedPeriod)?.status}
              </span>
            </div>
          </div>
          {hasCriticalAlert(selectedPeriod) &&
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
              <div className="flex items-center space-x-2">
                <div className="w-0 h-0 border-l-3 border-r-3 border-b-3 border-l-transparent border-r-transparent border-b-red-500" />
                <span className="text-sm font-medium text-red-800">Critical Alert</span>
              </div>
              <p className="text-sm text-red-700 mt-1">
                Immediate attention required for staffing coverage during this period.
              </p>
            </div>
        }
        </div>
      }
    </div>);

};

export default ShiftTimeline;