import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const PredictiveStaffingChart = ({ data, confidenceThreshold }) => {
  const chartData = [
    { date: 'Mon 19', current: 45, predicted: 48, confidence: 85, lower: 42, upper: 54 },
    { date: 'Tue 20', current: 52, predicted: 55, confidence: 88, lower: 49, upper: 61 },
    { date: 'Wed 21', current: 48, predicted: 51, confidence: 82, lower: 45, upper: 57 },
    { date: 'Thu 22', current: 58, predicted: 62, confidence: 91, lower: 56, upper: 68 },
    { date: 'Fri 23', current: 65, predicted: 68, confidence: 89, lower: 62, upper: 74 },
    { date: 'Sat 24', current: 42, predicted: 45, confidence: 78, lower: 38, upper: 52 },
    { date: 'Sun 25', current: 38, predicted: 41, confidence: 76, lower: 35, upper: 47 },
    { date: 'Mon 26', current: null, predicted: 49, confidence: 84, lower: 43, upper: 55 },
    { date: 'Tue 27', current: null, predicted: 56, confidence: 87, lower: 50, upper: 62 },
    { date: 'Wed 28', current: null, predicted: 52, confidence: 81, lower: 46, upper: 58 },
    { date: 'Thu 29', current: null, predicted: 63, confidence: 90, lower: 57, upper: 69 },
    { date: 'Fri 30', current: null, predicted: 69, confidence: 88, lower: 63, upper: 75 },
    { date: 'Sat 31', current: null, predicted: 46, confidence: 77, lower: 39, upper: 53 },
    { date: 'Sun 1', current: null, predicted: 42, confidence: 75, lower: 36, upper: 48 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevation-2">
          <p className="text-sm font-medium text-popover-foreground mb-2">{label}</p>
          {data?.current && (
            <p className="text-sm text-primary">
              Current Staff: <span className="font-semibold">{data?.current}</span>
            </p>
          )}
          <p className="text-sm text-accent">
            Predicted: <span className="font-semibold">{data?.predicted}</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Confidence: <span className="font-semibold">{data?.confidence}%</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Range: {data?.lower} - {data?.upper}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Predictive Staffing Requirements</h3>
          <p className="text-sm text-muted-foreground">AI-powered forecasting with confidence intervals</p>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-muted-foreground">Current</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-accent rounded-full"></div>
            <span className="text-muted-foreground">Predicted</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-muted rounded-full"></div>
            <span className="text-muted-foreground">Confidence Range</span>
          </div>
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="confidenceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="rgb(148, 163, 184)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="rgb(148, 163, 184)" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="currentGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="rgb(37, 99, 235)" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="rgb(37, 99, 235)" stopOpacity={0.2}/>
              </linearGradient>
              <linearGradient id="predictedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="rgb(14, 165, 233)" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="rgb(14, 165, 233)" stopOpacity={0.2}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgb(226, 232, 240)" />
            <XAxis 
              dataKey="date" 
              stroke="rgb(100, 116, 139)"
              fontSize={12}
            />
            <YAxis 
              stroke="rgb(100, 116, 139)"
              fontSize={12}
              label={{ value: 'Staff Count', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip content={<CustomTooltip />} />
            
            <Area
              type="monotone"
              dataKey="upper"
              stroke="none"
              fill="url(#confidenceGradient)"
              fillOpacity={0.3}
            />
            <Area
              type="monotone"
              dataKey="lower"
              stroke="none"
              fill="white"
              fillOpacity={1}
            />
            
            <Area
              type="monotone"
              dataKey="current"
              stroke="rgb(37, 99, 235)"
              strokeWidth={2}
              fill="url(#currentGradient)"
              connectNulls={false}
            />
            
            <Area
              type="monotone"
              dataKey="predicted"
              stroke="rgb(14, 165, 233)"
              strokeWidth={2}
              strokeDasharray="5 5"
              fill="url(#predictedGradient)"
              fillOpacity={0.3}
            />
            
            <ReferenceLine x="Sun 25" stroke="rgb(220, 38, 38)" strokeDasharray="2 2" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
        <span>Historical data shows actual staffing levels</span>
        <span>Predictions based on AI model with {confidenceThreshold}%+ confidence</span>
      </div>
    </div>
  );
};

export default PredictiveStaffingChart;