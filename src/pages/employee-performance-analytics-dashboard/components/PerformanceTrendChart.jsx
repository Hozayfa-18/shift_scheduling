import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import Icon from '../../../components/AppIcon';


const PerformanceTrendChart = ({ selectedEmployee }) => {
  const [timeRange, setTimeRange] = useState('3months');
  const [overlayMetrics, setOverlayMetrics] = useState(['workload', 'overtime']);

  const performanceData = [
    { date: '2024-05-01', performance: 85, satisfaction: 78, workload: 42, overtime: 8, adherence: 92 },
    { date: '2024-05-15', performance: 87, satisfaction: 80, workload: 45, overtime: 12, adherence: 89 },
    { date: '2024-06-01', performance: 89, satisfaction: 82, workload: 48, overtime: 15, adherence: 91 },
    { date: '2024-06-15', performance: 91, satisfaction: 85, workload: 44, overtime: 10, adherence: 94 },
    { date: '2024-07-01', performance: 88, satisfaction: 83, workload: 50, overtime: 18, adherence: 87 },
    { date: '2024-07-15', performance: 92, satisfaction: 87, workload: 46, overtime: 14, adherence: 95 },
    { date: '2024-08-01', performance: 94, satisfaction: 89, workload: 43, overtime: 9, adherence: 97 },
    { date: '2024-08-15', performance: 93, satisfaction: 88, workload: 47, overtime: 11, adherence: 96 }
  ];

  const timeRanges = [
    { value: '1month', label: '1M' },
    { value: '3months', label: '3M' },
    { value: '6months', label: '6M' },
    { value: '1year', label: '1Y' }
  ];

  const overlayOptions = [
    { value: 'workload', label: 'Workload Distribution', color: '#d97706' },
    { value: 'overtime', label: 'Overtime Hours', color: '#dc2626' },
    { value: 'adherence', label: 'Schedule Adherence', color: '#16a34a' }
  ];

  const toggleOverlay = (metric) => {
    setOverlayMetrics(prev => 
      prev?.includes(metric) 
        ? prev?.filter(m => m !== metric)
        : [...prev, metric]
    );
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-4 shadow-elevation-3">
          <p className="text-sm font-medium text-popover-foreground mb-2">
            {formatDate(label)}
          </p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center justify-between space-x-4 mb-1">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: entry?.color }}
                ></div>
                <span className="text-sm text-muted-foreground">{entry?.name}:</span>
              </div>
              <span className="text-sm font-medium text-popover-foreground">
                {entry?.value}{entry?.name?.includes('Hours') ? 'h' : entry?.name?.includes('Workload') ? 'h' : '%'}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Performance Trends Over Time</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {selectedEmployee ? `Analysis for ${selectedEmployee?.name}` : 'Team average performance metrics'}
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Time Range Selector */}
          <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
            {timeRanges?.map((range) => (
              <button
                key={range?.value}
                onClick={() => setTimeRange(range?.value)}
                className={`
                  px-3 py-1 text-sm font-medium rounded-md transition-smooth
                  ${timeRange === range?.value 
                    ? 'bg-primary text-primary-foreground shadow-elevation-1' 
                    : 'text-muted-foreground hover:text-foreground'
                  }
                `}
              >
                {range?.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Overlay Controls */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <span className="text-sm text-muted-foreground mr-2">Overlay metrics:</span>
        {overlayOptions?.map((option) => (
          <button
            key={option?.value}
            onClick={() => toggleOverlay(option?.value)}
            className={`
              flex items-center space-x-2 px-3 py-1 rounded-md text-sm font-medium transition-smooth
              ${overlayMetrics?.includes(option?.value)
                ? 'bg-primary/10 text-primary border border-primary/20' :'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
              }
            `}
          >
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: option?.color }}
            ></div>
            <span>{option?.label}</span>
          </button>
        ))}
      </div>
      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatDate}
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            
            {/* Performance Line - Always visible */}
            <Line
              type="monotone"
              dataKey="performance"
              stroke="var(--color-primary)"
              strokeWidth={3}
              dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
              name="Performance Score"
            />
            
            {/* Satisfaction Line - Always visible */}
            <Line
              type="monotone"
              dataKey="satisfaction"
              stroke="var(--color-accent)"
              strokeWidth={2}
              dot={{ fill: 'var(--color-accent)', strokeWidth: 2, r: 3 }}
              name="Satisfaction Score"
            />
            
            {/* Overlay Lines */}
            {overlayMetrics?.includes('workload') && (
              <Line
                type="monotone"
                dataKey="workload"
                stroke="#d97706"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: '#d97706', strokeWidth: 2, r: 3 }}
                name="Workload Hours"
              />
            )}
            
            {overlayMetrics?.includes('overtime') && (
              <Line
                type="monotone"
                dataKey="overtime"
                stroke="#dc2626"
                strokeWidth={2}
                strokeDasharray="3 3"
                dot={{ fill: '#dc2626', strokeWidth: 2, r: 3 }}
                name="Overtime Hours"
              />
            )}
            
            {overlayMetrics?.includes('adherence') && (
              <Line
                type="monotone"
                dataKey="adherence"
                stroke="#16a34a"
                strokeWidth={2}
                strokeDasharray="7 3"
                dot={{ fill: '#16a34a', strokeWidth: 2, r: 3 }}
                name="Schedule Adherence"
              />
            )}
            
            {/* Reference Lines */}
            <ReferenceLine y={90} stroke="var(--color-success)" strokeDasharray="2 2" />
            <ReferenceLine y={80} stroke="var(--color-warning)" strokeDasharray="2 2" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {/* Chart Footer */}
      <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-1 bg-success"></div>
            <span>Target: 90%</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-1 bg-warning"></div>
            <span>Threshold: 80%</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Icon name="Download" size={14} />
          <button className="hover:text-foreground transition-colors">Export Chart</button>
        </div>
      </div>
    </div>
  );
};

export default PerformanceTrendChart;