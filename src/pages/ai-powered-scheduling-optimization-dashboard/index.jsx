import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import OptimizationMetricsCard from './components/OptimizationMetricsCard';
import FilterBar from './components/FilterBar';
import PredictiveStaffingChart from './components/PredictiveStaffingChart';
import ScheduleOptimizationGantt from './components/ScheduleOptimizationGantt';
import AIInsightsPanel from './components/AIInsightsPanel';
import ScenarioModelingWidget from './components/ScenarioModelingWidget';

const AIPoweredSchedulingOptimizationDashboard = () => {
  const [filters, setFilters] = useState({
    department: 'all',
    forecastPeriod: '2',
    confidenceThreshold: 75
  });
  const [refreshStatus, setRefreshStatus] = useState({
    lastRefresh: new Date(),
    isConnected: true
  });

  const metricsData = [
    {
      title: 'Optimization Score',
      value: '87.3%',
      change: '+5.2%',
      trend: 'up',
      icon: 'Target',
      color: 'primary'
    },
    {
      title: 'Predicted Labor Cost Savings',
      value: '$3,240',
      change: '+12.8%',
      trend: 'up',
      icon: 'DollarSign',
      color: 'success'
    },
    {
      title: 'Schedule Efficiency Rating',
      value: '92.1%',
      change: '+3.4%',
      trend: 'up',
      icon: 'TrendingUp',
      color: 'accent'
    },
    {
      title: 'Employee Satisfaction Index',
      value: '8.4/10',
      change: '+0.6',
      trend: 'up',
      icon: 'Heart',
      color: 'warning'
    }
  ];

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    // Simulate data refresh
    setRefreshStatus({
      lastRefresh: new Date(),
      isConnected: true
    });
  };

  const handleScheduleChange = (shiftId) => {
    console.log('Schedule change applied for shift:', shiftId);
    // Simulate schedule update
    setRefreshStatus({
      lastRefresh: new Date(),
      isConnected: true
    });
  };

  const handleNavigation = (path) => {
    window.location.href = path;
  };

  useEffect(() => {
    // Simulate periodic data refresh
    const interval = setInterval(() => {
      setRefreshStatus(prev => ({
        ...prev,
        lastRefresh: new Date()
      }));
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userRole="manager" 
        onNavigate={handleNavigation}
        refreshStatus={refreshStatus}
      />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  AI-Powered Scheduling Optimization
                </h1>
                <p className="text-muted-foreground">
                  Advanced analytics dashboard for data-driven scheduling decisions through AI recommendations and predictive insights
                </p>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span>Real-time AI Analysis Active</span>
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          <FilterBar onFiltersChange={handleFiltersChange} />

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metricsData?.map((metric, index) => (
              <OptimizationMetricsCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                change={metric?.change}
                trend={metric?.trend}
                icon={metric?.icon}
                color={metric?.color}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-16 gap-6 mb-8">
            {/* Main Charts Area - 10 columns */}
            <div className="xl:col-span-10 space-y-6">
              {/* Predictive Staffing Chart */}
              <PredictiveStaffingChart 
                data={filters}
                confidenceThreshold={filters?.confidenceThreshold}
              />
              
              {/* Schedule Optimization Gantt */}
              <ScheduleOptimizationGantt 
                onScheduleChange={handleScheduleChange}
              />
            </div>

            {/* AI Insights Panel - 6 columns */}
            <div className="xl:col-span-6">
              <AIInsightsPanel />
            </div>
          </div>

          {/* Scenario Modeling Widget */}
          <div className="mb-8">
            <ScenarioModelingWidget />
          </div>

          {/* Footer Info */}
          <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span>AI Model Accuracy: 94.2%</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Data Freshness: {Math.floor((new Date() - refreshStatus?.lastRefresh) / 1000)}s ago</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>Next AI Analysis: 15 minutes</span>
                <span>•</span>
                <span>Predictions valid until: {new Date(Date.now() + 24 * 60 * 60 * 1000)?.toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AIPoweredSchedulingOptimizationDashboard;