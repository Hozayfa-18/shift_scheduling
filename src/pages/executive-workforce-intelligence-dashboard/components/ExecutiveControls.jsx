import React from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ExecutiveControls = ({ 
  selectedPeriod, 
  onPeriodChange, 
  selectedLocation, 
  onLocationChange,
  onExport,
  onRefresh,
  lastUpdated 
}) => {
  const periodOptions = [
    { value: 'monthly', label: 'Monthly View' },
    { value: 'quarterly', label: 'Quarterly View' },
    { value: 'yearly', label: 'Yearly View' }
  ];

  const locationOptions = [
    { value: 'all', label: 'All Locations' },
    { value: 'north_america', label: 'North America' },
    { value: 'europe', label: 'Europe' },
    { value: 'asia_pacific', label: 'Asia Pacific' },
    { value: 'latin_america', label: 'Latin America' }
  ];

  const formatLastUpdated = (date) => {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return date?.toLocaleDateString();
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="BarChart3" size={20} className="text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Executive Intelligence</h1>
              <p className="text-sm text-muted-foreground">Strategic workforce analytics dashboard</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <Select
              options={periodOptions}
              value={selectedPeriod}
              onChange={onPeriodChange}
              placeholder="Select period"
              className="w-full sm:w-40"
            />
            
            <Select
              options={locationOptions}
              value={selectedLocation}
              onChange={onLocationChange}
              placeholder="Select location"
              className="w-full sm:w-48"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
          <div className="text-xs text-muted-foreground text-center sm:text-right">
            <div>Last updated</div>
            <div className="font-medium">{formatLastUpdated(lastUpdated)}</div>
          </div>

          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              iconName="RefreshCw" 
              iconSize={16}
              onClick={onRefresh}
            >
              Refresh
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              iconName="Download" 
              iconSize={16}
              onClick={onExport}
            >
              Export
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveControls;