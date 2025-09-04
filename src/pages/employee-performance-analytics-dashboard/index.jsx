import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import PerformanceKPICard from './components/PerformanceKPICard';
import FilterControls from './components/FilterControls';
import CorrelationHeatmap from './components/CorrelationHeatmap';
import EmployeeRankingTable from './components/EmployeeRankingTable';
import PerformanceTrendChart from './components/PerformanceTrendChart';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const EmployeePerformanceAnalyticsDashboard = () => {
  const navigate = useNavigate();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [filters, setFilters] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [refreshStatus, setRefreshStatus] = useState({
    lastRefresh: new Date(),
    isConnected: true
  });

  // Mock saved filter combinations
  const savedFilters = [
    {
      id: 1,
      name: "Top Performers Q3",
      filters: {
        employeeGroup: 'top-performers',
        performancePeriod: '3months',
        metricComparison: 'team',
        department: 'all',
        performanceThreshold: 90
      },
      createdAt: '2024-08-15T10:30:00Z'
    },
    {
      id: 2,
      name: "Customer Service Analysis",
      filters: {
        employeeGroup: 'all',
        performancePeriod: '6months',
        metricComparison: 'department',
        department: 'customer-service',
        performanceThreshold: 80
      },
      createdAt: '2024-08-10T14:20:00Z'
    }
  ];

  // KPI data
  const kpiData = [
    {
      title: "Workforce Utilization Rate",
      value: "87.3",
      unit: "%",
      change: 4.2,
      changeType: "positive",
      icon: "Users",
      description: "Overall workforce efficiency"
    },
    {
      title: "Average Performance Score",
      value: "89.1",
      unit: "%",
      change: 2.8,
      changeType: "positive",
      icon: "TrendingUp",
      description: "Team performance average"
    },
    {
      title: "Schedule Adherence Rate",
      value: "92.7",
      unit: "%",
      change: -1.3,
      changeType: "negative",
      icon: "Clock",
      description: "On-time shift compliance"
    },
    {
      title: "Employee Retention Index",
      value: "94.5",
      unit: "%",
      change: 1.7,
      changeType: "positive",
      icon: "Heart",
      description: "12-month retention rate"
    }
  ];

  useEffect(() => {
    // Simulate loading data
    const loadData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsLoading(false);
    };

    loadData();

    // Simulate periodic data refresh
    const refreshInterval = setInterval(() => {
      setRefreshStatus({
        lastRefresh: new Date(),
        isConnected: Math.random() > 0.1 // 90% uptime simulation
      });
    }, 30000);

    return () => clearInterval(refreshInterval);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    console.log('Filters updated:', newFilters);
  };

  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee);
    console.log('Selected employee:', employee);
  };

  const handleCorrelationSelect = (correlation) => {
    console.log('Selected correlation:', correlation);
    // Could trigger detailed analysis view
  };

  const handleExportReport = () => {
    console.log('Exporting performance report...');
    // Simulate report generation
  };

  const handleSchedulingRecommendations = () => {
    console.log('Generating scheduling recommendations...');
    // Navigate to optimization dashboard with current context
    navigate('/ai-powered-scheduling-optimization-dashboard', {
      state: { context: 'performance-analysis', selectedEmployee }
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header 
          userRole="manager" 
          onNavigate={handleNavigation}
          refreshStatus={refreshStatus}
        />
        <div className="pt-16">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading performance analytics...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userRole="manager" 
        onNavigate={handleNavigation}
        refreshStatus={refreshStatus}
      />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Employee Performance Analytics</h1>
              <p className="text-muted-foreground mt-2">
                Comprehensive workforce analytics correlating scheduling patterns with performance metrics
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                iconName="Download"
                onClick={handleExportReport}
              >
                Export Report
              </Button>
              <Button
                variant="default"
                iconName="Brain"
                onClick={handleSchedulingRecommendations}
              >
                Get Recommendations
              </Button>
            </div>
          </div>

          {/* Filter Controls */}
          <FilterControls
            onFiltersChange={handleFiltersChange}
            savedFilters={savedFilters}
          />

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {kpiData?.map((kpi, index) => (
              <PerformanceKPICard
                key={index}
                title={kpi?.title}
                value={kpi?.value}
                unit={kpi?.unit}
                change={kpi?.change}
                changeType={kpi?.changeType}
                icon={kpi?.icon}
                description={kpi?.description}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
            {/* Correlation Heatmap - 9 columns */}
            <div className="lg:col-span-9">
              <CorrelationHeatmap onEmployeeSelect={handleCorrelationSelect} />
            </div>

            {/* Employee Ranking - 3 columns */}
            <div className="lg:col-span-3">
              <EmployeeRankingTable onEmployeeSelect={handleEmployeeSelect} />
            </div>
          </div>

          {/* Performance Trend Chart - Full Width */}
          <div className="mb-8">
            <PerformanceTrendChart selectedEmployee={selectedEmployee} />
          </div>

          {/* Selected Employee Details */}
          {selectedEmployee && (
            <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="User" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      Detailed Analysis: {selectedEmployee?.name || 'Selected Employee'}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedEmployee?.department || 'Department'} • Performance insights and recommendations
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  onClick={() => setSelectedEmployee(null)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold text-success mb-1">
                    {selectedEmployee?.performanceScore || '92'}%
                  </div>
                  <div className="text-sm text-muted-foreground">Performance Score</div>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {selectedEmployee?.scheduleAdherence || '96'}%
                  </div>
                  <div className="text-sm text-muted-foreground">Schedule Adherence</div>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold text-accent mb-1">
                    {selectedEmployee?.preferenceAlignment || '89'}%
                  </div>
                  <div className="text-sm text-muted-foreground">Preference Alignment</div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-muted/20 rounded-lg">
                <h4 className="text-sm font-medium text-foreground mb-2">Key Insights:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Strong correlation between morning shifts and high performance scores</li>
                  <li>• Excellent schedule adherence with minimal overtime requirements</li>
                  <li>• High satisfaction with current scheduling preferences</li>
                  <li>• Recommended for mentoring role and flexible scheduling pilot program</li>
                </ul>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center space-x-4">
                <span>Last updated: {refreshStatus?.lastRefresh?.toLocaleTimeString()}</span>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${refreshStatus?.isConnected ? 'bg-success' : 'bg-error'}`}></div>
                  <span>{refreshStatus?.isConnected ? 'Connected' : 'Connection Issues'}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span>© {new Date()?.getFullYear()} ShiftIQ Analytics</span>
                <button className="hover:text-foreground transition-colors">Help</button>
                <button className="hover:text-foreground transition-colors">Support</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeePerformanceAnalyticsDashboard;