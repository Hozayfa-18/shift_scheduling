import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ScheduleOptimizationGantt = ({ onScheduleChange }) => {
  const [selectedShift, setSelectedShift] = useState(null);
  
  const scheduleData = [
    {
      id: 1,
      employee: 'Sarah Johnson',
      department: 'Customer Service',
      currentShift: { start: 8, duration: 6, type: 'morning' },
      recommendedShift: { start: 9, duration: 6, type: 'morning' },
      optimizationScore: 92,
      reason: 'Better coverage overlap',
      impact: '+$120 savings'
    },
    {
      id: 2,
      employee: 'Mike Chen',
      department: 'Sales',
      currentShift: { start: 12, duration: 4, type: 'afternoon' },
      recommendedShift: { start: 10, duration: 5, type: 'morning' },
      optimizationScore: 88,
      reason: 'Peak demand alignment',
      impact: '+$95 savings'
    },
    {
      id: 3,
      employee: 'Emily Rodriguez',
      department: 'Operations',
      currentShift: { start: 14, duration: 4, type: 'afternoon' },
      recommendedShift: { start: 13, duration: 4, type: 'afternoon' },
      optimizationScore: 85,
      reason: 'Skill utilization',
      impact: '+$75 savings'
    },
    {
      id: 4,
      employee: 'David Park',
      department: 'Warehouse',
      currentShift: { start: 6, duration: 8, type: 'early' },
      recommendedShift: { start: 6, duration: 8, type: 'extended' },
      optimizationScore: 78,
      reason: 'Overtime reduction',
      impact: '+$200 savings'
    },
    {
      id: 5,
      employee: 'Lisa Thompson',
      department: 'Customer Service',
      currentShift: { start: 11, duration: 5, type: 'part-time' },
      recommendedShift: { start: 12, duration: 4, type: 'part-time' },
      optimizationScore: 82,
      reason: 'Coverage gap fill',
      impact: '+$45 savings'
    }
  ];

  // Time slots from 00 to 16 (17 hours total)
  const timeSlots = Array.from({ length: 17 }, (_, i) => i);
  
  const getShiftColor = (type, isRecommended = false) => {
    const colors = {
      morning: isRecommended ? 'bg-green-600' : 'bg-green-200',
      afternoon: isRecommended ? 'bg-green-700' : 'bg-green-300',
      evening: isRecommended ? 'bg-green-800' : 'bg-green-400',
      early: isRecommended ? 'bg-green-600' : 'bg-green-200',
      extended: isRecommended ? 'bg-green-700' : 'bg-green-300',
      'part-time': isRecommended ? 'bg-green-600' : 'bg-green-200'
    };
    return colors?.[type] || 'bg-green-200';
  };

  const handleShiftClick = (shift) => {
    setSelectedShift(shift);
  };

  const handleApplyRecommendation = (shiftId) => {
    onScheduleChange?.(shiftId);
    setSelectedShift(null);
  };

  const handleApplyAll = () => {
    scheduleData?.forEach(shift => {
      onScheduleChange?.(shift?.id);
    });
  };

  const handleExportSchedule = () => {
    console.log('Exporting schedule...');
    // Export functionality would be implemented here
  };

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm">
      {/* Header Section */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            AI-Recommended Schedule Changes
          </h2>
          <p className="text-gray-500 text-base">
            Interactive Gantt chart with optimization suggestions
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            size="default" 
            onClick={handleExportSchedule}
            className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg"
          >
            <Icon name="Download" size={16} className="mr-2" />
            Export Schedule
          </Button>
          <Button 
            variant="default" 
            size="default" 
            onClick={handleApplyAll}
            className="px-6 py-2 bg-green-600 text-white hover:bg-green-700 rounded-lg"
          >
            Apply All
          </Button>
        </div>
      </div>

      {/* Chart Container */}
      <div className="bg-gray-50 rounded-lg p-6 overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-full">
            {/* Time Header - Hours 00-16 */}
            <div className="flex items-center mb-6">
              <div className="w-56 flex-shrink-0"></div>
              <div className="flex-1 grid gap-1" style={{ gridTemplateColumns: `repeat(17, 1fr)` }}>
                {timeSlots?.map((hour) => (
                  <div key={hour} className="text-sm font-medium text-gray-600 text-center py-3 border-r border-gray-200 last:border-r-0">
                    {hour?.toString()?.padStart(2, '0')}
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule Rows */}
            <div className="space-y-4">
              {scheduleData?.map((shift, index) => (
                <div key={shift?.id} className="flex items-center bg-white rounded-lg p-4 shadow-sm">
                  <div className="w-56 flex-shrink-0 pr-6">
                    <div className="text-sm font-semibold text-gray-900">{shift?.employee}</div>
                    <div className="text-xs text-gray-500 mt-1">{shift?.department}</div>
                    <div className="text-xs text-green-600 font-medium mt-1">
                      Optimization: {shift?.optimizationScore}%
                    </div>
                  </div>
                  
                  <div className="flex-1 relative h-20 bg-gray-100 rounded-md border overflow-hidden">
                    {/* Time grid lines */}
                    <div className="absolute inset-0 grid gap-0 pointer-events-none" style={{ gridTemplateColumns: `repeat(17, 1fr)` }}>
                      {timeSlots?.slice(1)?.map((hour) => (
                        <div key={hour} className="border-r border-gray-200 last:border-r-0"></div>
                      ))}
                    </div>
                    
                    {/* Current Shift Bar - Properly contained */}
                    <div
                      className={`absolute top-2 h-6 rounded-md ${getShiftColor(shift?.currentShift?.type)} border border-gray-300 flex items-center justify-center cursor-pointer transition-all hover:shadow-md z-10`}
                      style={{
                        left: `max(0%, min(${(shift?.currentShift?.start / 17) * 100}%, ${100 - (shift?.currentShift?.duration / 17) * 100}%))`,
                        width: `min(${(shift?.currentShift?.duration / 17) * 100}%, ${100 - (shift?.currentShift?.start / 17) * 100}%)`,
                        maxWidth: '100%'
                      }}
                      onClick={() => handleShiftClick(shift)}
                    >
                      <span className="text-xs font-medium text-gray-700 px-2 truncate">Current</span>
                    </div>
                    
                    {/* Recommended Shift Bar - Properly contained */}
                    <div
                      className={`absolute bottom-2 h-6 rounded-md ${getShiftColor(shift?.recommendedShift?.type, true)} border border-opacity-50 flex items-center justify-center cursor-pointer transition-all hover:shadow-md z-10`}
                      style={{
                        left: `max(0%, min(${(shift?.recommendedShift?.start / 17) * 100}%, ${100 - (shift?.recommendedShift?.duration / 17) * 100}%))`,
                        width: `min(${(shift?.recommendedShift?.duration / 17) * 100}%, ${100 - (shift?.recommendedShift?.start / 17) * 100}%)`,
                        maxWidth: '100%'
                      }}
                      onClick={() => handleShiftClick(shift)}
                    >
                      <span className="text-xs font-medium text-white px-2 truncate">Recommended</span>
                    </div>
                  </div>
                  
                  <div className="w-32 flex-shrink-0 pl-6 text-right">
                    <div className="text-sm font-semibold text-green-600 mb-2">{shift?.impact}</div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleApplyRecommendation(shift?.id)}
                      className="px-3 py-1 text-xs border border-green-300 text-green-700 hover:bg-green-50 rounded"
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap items-center justify-between text-sm bg-gray-50 rounded-lg p-4">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-3 bg-green-200 border border-gray-300 rounded"></div>
            <span className="text-gray-600">Current Schedule</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-3 bg-green-600 rounded"></div>
            <span className="text-gray-600">AI Recommendation</span>
          </div>
        </div>
        <div className="text-gray-600">
          Total Potential Savings: <span className="text-green-600 font-semibold">+$535/day</span>
        </div>
      </div>

      {/* Selected Shift Details Modal */}
      {selectedShift && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900">Optimization Details</h4>
              <button
                onClick={() => setSelectedShift(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h5 className="font-semibold text-gray-900">{selectedShift?.employee}</h5>
                <p className="text-sm text-gray-500">{selectedShift?.department}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-gray-900 mb-1">Current</p>
                  <p className="text-sm text-gray-600">
                    {selectedShift?.currentShift?.start?.toString()?.padStart(2, '0')}:00 - {(selectedShift?.currentShift?.start + selectedShift?.currentShift?.duration)?.toString()?.padStart(2, '0')}:00
                  </p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-gray-900 mb-1">Recommended</p>
                  <p className="text-sm text-green-600">
                    {selectedShift?.recommendedShift?.start?.toString()?.padStart(2, '0')}:00 - {(selectedShift?.recommendedShift?.start + selectedShift?.recommendedShift?.duration)?.toString()?.padStart(2, '0')}:00
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-gray-900 mb-1">Optimization Reason</p>
                <p className="text-sm text-gray-600">{selectedShift?.reason}</p>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Potential Savings</p>
                  <p className="text-sm text-green-600 font-semibold">{selectedShift?.impact}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Optimization Score</p>
                  <p className="text-sm text-green-600 font-semibold">{selectedShift?.optimizationScore}%</p>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setSelectedShift(null)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={() => handleApplyRecommendation(selectedShift?.id)}
                className="flex-1 px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-lg"
              >
                Apply Change
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleOptimizationGantt;