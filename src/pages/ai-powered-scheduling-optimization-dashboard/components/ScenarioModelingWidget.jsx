import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const ScenarioModelingWidget = () => {
  const [selectedScenario, setSelectedScenario] = useState('peak-demand');
  const [isModelingActive, setIsModelingActive] = useState(false);

  const scenarioOptions = [
    { value: 'peak-demand', label: 'Peak Demand (+25%)' },
    { value: 'staff-reduction', label: 'Staff Reduction (-15%)' },
    { value: 'extended-hours', label: 'Extended Hours (+2h)' },
    { value: 'weekend-closure', label: 'Weekend Closure' },
    { value: 'seasonal-adjustment', label: 'Seasonal Adjustment' }
  ];

  const scenarioData = {
    'peak-demand': {
      title: 'Peak Demand Scenario',
      description: 'Modeling 25% increase in customer demand during holiday season',
      metrics: {
        staffingNeed: '+18 employees',
        costImpact: '+$2,340/week',
        efficiency: '87%',
        satisfaction: '91%'
      },
      chartData: [
        { department: 'Customer Service', current: 45, projected: 56, optimal: 52 },
        { department: 'Sales', current: 32, projected: 40, optimal: 38 },
        { department: 'Operations', current: 28, projected: 35, optimal: 33 },
        { department: 'Warehouse', current: 22, projected: 28, optimal: 26 }
      ],
      roiData: [
        { week: 'Week 1', cost: 2340, revenue: 3200, roi: 36.8 },
        { week: 'Week 2', cost: 2340, revenue: 3450, roi: 47.4 },
        { week: 'Week 3', cost: 2340, revenue: 3600, roi: 53.8 },
        { week: 'Week 4', cost: 2340, revenue: 3750, roi: 60.3 }
      ]
    },
    'staff-reduction': {
      title: 'Staff Reduction Scenario',
      description: 'Analyzing impact of 15% workforce reduction on operations',
      metrics: {
        staffingNeed: '-19 employees',
        costImpact: '-$1,890/week',
        efficiency: '72%',
        satisfaction: '68%'
      },
      chartData: [
        { department: 'Customer Service', current: 45, projected: 38, optimal: 41 },
        { department: 'Sales', current: 32, projected: 27, optimal: 29 },
        { department: 'Operations', current: 28, projected: 24, optimal: 26 },
        { department: 'Warehouse', current: 22, projected: 19, optimal: 20 }
      ],
      roiData: [
        { week: 'Week 1', cost: -1890, revenue: -2100, roi: -11.1 },
        { week: 'Week 2', cost: -1890, revenue: -2250, roi: -19.0 },
        { week: 'Week 3', cost: -1890, revenue: -2400, roi: -27.0 },
        { week: 'Week 4', cost: -1890, revenue: -2550, roi: -34.9 }
      ]
    }
  };

  const currentScenario = scenarioData?.[selectedScenario] || scenarioData?.['peak-demand'];

  const handleRunScenario = () => {
    setIsModelingActive(true);
    setTimeout(() => {
      setIsModelingActive(false);
    }, 3000);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevation-2">
          <p className="text-sm font-medium text-popover-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {entry?.dataKey}: <span className="font-semibold">{entry?.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Settings" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Scenario Modeling</h3>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="RotateCcw"
            onClick={() => setSelectedScenario('peak-demand')}
          >
            Reset
          </Button>
          <Button
            variant="default"
            size="sm"
            iconName="Play"
            loading={isModelingActive}
            onClick={handleRunScenario}
          >
            {isModelingActive ? 'Modeling...' : 'Run Analysis'}
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scenario Selection */}
        <div className="space-y-4">
          <Select
            label="Select Scenario"
            options={scenarioOptions}
            value={selectedScenario}
            onChange={setSelectedScenario}
          />
          
          <div className="bg-muted rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2">{currentScenario?.title}</h4>
            <p className="text-sm text-muted-foreground">{currentScenario?.description}</p>
          </div>

          {/* Key Metrics */}
          <div className="space-y-3">
            <h5 className="font-medium text-foreground">Impact Metrics</h5>
            {Object.entries(currentScenario?.metrics)?.map(([key, value]) => (
              <div key={key} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground capitalize">
                  {key?.replace(/([A-Z])/g, ' $1')?.trim()}:
                </span>
                <span className={`font-medium ${
                  value?.includes('+') ? 'text-success' : 
                  value?.includes('-') ? 'text-error' : 'text-foreground'
                }`}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Staffing Chart */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-muted/30 rounded-lg p-4">
            <h5 className="font-medium text-foreground mb-4">Staffing Requirements by Department</h5>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={currentScenario?.chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgb(226, 232, 240)" />
                  <XAxis 
                    dataKey="department" 
                    stroke="rgb(100, 116, 139)"
                    fontSize={12}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis 
                    stroke="rgb(100, 116, 139)"
                    fontSize={12}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="current" fill="rgb(148, 163, 184)" name="Current" />
                  <Bar dataKey="projected" fill="rgb(14, 165, 233)" name="Projected" />
                  <Bar dataKey="optimal" fill="rgb(34, 197, 94)" name="AI Optimal" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="flex items-center justify-center space-x-6 mt-4 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-slate-400 rounded"></div>
                <span className="text-muted-foreground">Current</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-sky-500 rounded"></div>
                <span className="text-muted-foreground">Projected</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span className="text-muted-foreground">AI Optimal</span>
              </div>
            </div>
          </div>

          {/* ROI Analysis */}
          <div className="bg-muted/30 rounded-lg p-4">
            <h5 className="font-medium text-foreground mb-4">ROI Analysis Over Time</h5>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={currentScenario?.roiData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgb(226, 232, 240)" />
                  <XAxis 
                    dataKey="week" 
                    stroke="rgb(100, 116, 139)"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="rgb(100, 116, 139)"
                    fontSize={12}
                    label={{ value: 'ROI %', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="roi" 
                    stroke="rgb(37, 99, 235)" 
                    strokeWidth={3}
                    dot={{ fill: 'rgb(37, 99, 235)', strokeWidth: 2, r: 4 }}
                    name="ROI %"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
        <div className="text-sm text-muted-foreground">
          Last updated: {new Date()?.toLocaleTimeString()}
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm" iconName="Download">
            Export Report
          </Button>
          <Button variant="outline" size="sm" iconName="Share">
            Share Analysis
          </Button>
          <Button variant="default" size="sm" iconName="CheckCircle">
            Implement Plan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ScenarioModelingWidget;