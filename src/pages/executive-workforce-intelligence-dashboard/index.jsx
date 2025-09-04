import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import ExecutiveControls from './components/ExecutiveControls';
import ExecutiveMetricCard from './components/ExecutiveMetricCard';
import ExecutiveChart from './components/ExecutiveChart';
import StrategicInsightsPanel from './components/StrategicInsightsPanel';
import LocationPerformanceTable from './components/LocationPerformanceTable';

const ExecutiveWorkforceIntelligenceDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('quarterly');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Mock executive metrics data
  const executiveMetrics = [
    {
      title: 'Total Labor Cost Efficiency',
      value: '94.2%',
      change: '+2.8%',
      changeType: 'positive',
      benchmark: { status: 'above', value: '91.5%' },
      icon: 'DollarSign',
      trend: [88, 90, 92, 94, 94.2]
    },
    {
      title: 'Workforce Productivity Index',
      value: '87.6%',
      change: '+1.4%',
      changeType: 'positive',
      benchmark: { status: 'above', value: '84.2%' },
      icon: 'TrendingUp',
      trend: [85, 86, 87, 87.2, 87.6]
    },
    {
      title: 'Schedule Optimization ROI',
      value: '$2.4M',
      change: '+12.3%',
      changeType: 'positive',
      benchmark: { status: 'above', value: '$2.1M' },
      icon: 'Target',
      trend: [2.0, 2.1, 2.2, 2.3, 2.4]
    },
    {
      title: 'Employee Satisfaction Trend',
      value: '4.3/5.0',
      change: '-0.2%',
      changeType: 'negative',
      benchmark: { status: 'above', value: '4.1/5.0' },
      icon: 'Heart',
      trend: [4.1, 4.2, 4.4, 4.3, 4.3]
    }
  ];

  // Mock chart data
  const chartData = [
    { month: 'Jan', laborCost: 850, productivityIndex: 82 },
    { month: 'Feb', laborCost: 920, productivityIndex: 85 },
    { month: 'Mar', laborCost: 880, productivityIndex: 87 },
    { month: 'Apr', laborCost: 950, productivityIndex: 86 },
    { month: 'May', laborCost: 890, productivityIndex: 88 },
    { month: 'Jun', laborCost: 870, productivityIndex: 87 },
    { month: 'Jul', laborCost: 910, productivityIndex: 89 },
    { month: 'Aug', laborCost: 940, productivityIndex: 88 }
  ];

  // Mock strategic insights data
  const strategicInsights = [
    {
      id: 1,
      type: 'cost_optimization',
      title: 'Overtime Cost Reduction Opportunity',
      description: `Analysis shows 15% reduction in overtime costs possible through AI-powered shift optimization in North America region.\nProjected annual savings of $480K with improved employee satisfaction.`,
      priority: 'high',
      impact: '$480K annually',
      timeline: '3 months'
    },
    {
      id: 2,
      type: 'staffing_prediction',
      title: 'Q4 Staffing Demand Forecast',
      description: `Predictive models indicate 22% increase in staffing needs during Q4 holiday season.\nRecommend early recruitment and cross-training initiatives.`,
      priority: 'medium',
      impact: '22% capacity',
      timeline: '6 weeks'
    },
    {
      id: 3,
      type: 'efficiency_opportunity',
      title: 'Cross-Location Resource Optimization',
      description: `Opportunity to optimize resource allocation between Europe and Asia Pacific regions.\nPotential 8% efficiency improvement through strategic rebalancing.`,
      priority: 'medium',
      impact: '8% efficiency',
      timeline: '4 months'
    },
    {
      id: 4,
      type: 'risk_indicator',
      title: 'Employee Retention Risk Alert',
      description: `Satisfaction scores in Latin America region showing declining trend.\nImmediate intervention recommended to prevent talent loss.`,
      priority: 'high',
      impact: 'Retention risk',
      timeline: 'Immediate'
    }
  ];

  // Mock location performance data
  const locationPerformance = [
    {
      id: 1,
      name: 'New York HQ',
      region: 'North America',
      efficiency: 94,
      efficiencyChange: 2.1,
      costPerHour: 28.50,
      costChange: -1.2,
      satisfaction: 4.4,
      satisfactionChange: 0.1,
      utilization: 92,
      status: 'excellent'
    },
    {
      id: 2,
      name: 'London Office',
      region: 'Europe',
      efficiency: 91,
      efficiencyChange: 1.8,
      costPerHour: 32.20,
      costChange: -0.8,
      satisfaction: 4.2,
      satisfactionChange: -0.1,
      utilization: 89,
      status: 'good'
    },
    {
      id: 3,
      name: 'Singapore Hub',
      region: 'Asia Pacific',
      efficiency: 88,
      efficiencyChange: -0.5,
      costPerHour: 24.80,
      costChange: 1.5,
      satisfaction: 4.1,
      satisfactionChange: -0.3,
      utilization: 85,
      status: 'warning'
    },
    {
      id: 4,
      name: 'São Paulo Center',
      region: 'Latin America',
      efficiency: 82,
      efficiencyChange: -2.1,
      costPerHour: 18.90,
      costChange: 2.8,
      satisfaction: 3.8,
      satisfactionChange: -0.4,
      utilization: 78,
      status: 'critical'
    }
  ];

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
  };

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
  };

  const handleRefresh = () => {
    setLastUpdated(new Date());
    // Simulate data refresh
    console.log('Refreshing executive dashboard data...');
  };

  const handleExport = () => {
    console.log('Exporting executive summary...');
    // Simulate export functionality
  };

  const handleNavigation = (path) => {
    window.location.href = path;
  };

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 300000); // Update every 5 minutes

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userRole="executive" 
        onNavigate={handleNavigation}
        refreshStatus={{ lastRefresh: lastUpdated, isConnected: true }}
      />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto p-6">
          <ExecutiveControls
            selectedPeriod={selectedPeriod}
            onPeriodChange={handlePeriodChange}
            selectedLocation={selectedLocation}
            onLocationChange={handleLocationChange}
            onExport={handleExport}
            onRefresh={handleRefresh}
            lastUpdated={lastUpdated}
          />

          {/* Executive Summary Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            {executiveMetrics?.map((metric, index) => (
              <ExecutiveMetricCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                change={metric?.change}
                changeType={metric?.changeType}
                benchmark={metric?.benchmark}
                icon={metric?.icon}
                trend={metric?.trend}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-8">
            {/* Main Chart - 8 columns */}
            <div className="xl:col-span-8">
              <ExecutiveChart data={chartData} />
            </div>

            {/* Strategic Insights Panel - 4 columns */}
            <div className="xl:col-span-4">
              <StrategicInsightsPanel insights={strategicInsights} />
            </div>
          </div>

          {/* Location Performance Table */}
          <LocationPerformanceTable locations={locationPerformance} />
        </div>
      </main>
    </div>
  );
};

export default ExecutiveWorkforceIntelligenceDashboard;