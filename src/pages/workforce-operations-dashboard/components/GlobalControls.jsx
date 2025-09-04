import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const GlobalControls = ({ 
  selectedLocation, 
  onLocationChange, 
  dateRange, 
  onDateRangeChange, 
  autoRefresh, 
  onAutoRefreshToggle, 
  lastRefresh,
  onManualRefresh,
  locations 
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const dateRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const locationOptions = locations?.map(location => ({
    value: location?.id,
    label: location?.name,
    description: `${location?.employeeCount} employees`
  }));

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    await onManualRefresh();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const formatLastRefresh = (date) => {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left Section - Location and Date Controls */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Location Selector */}
          <div className="min-w-64">
            <Select
              label="Location"
              options={locationOptions}
              value={selectedLocation}
              onChange={onLocationChange}
              searchable
              className="w-full"
            />
          </div>

          {/* Date Range Selector */}
          <div className="min-w-48">
            <Select
              label="Date Range"
              options={dateRangeOptions}
              value={dateRange}
              onChange={onDateRangeChange}
              className="w-full"
            />
          </div>
        </div>

        {/* Right Section - Refresh Controls and Status */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Data Status */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${autoRefresh ? 'bg-success animate-pulse' : 'bg-muted'}`} />
              <span className="text-sm text-muted-foreground">
                Updated {formatLastRefresh(lastRefresh)}
              </span>
            </div>
            
            {/* Manual Refresh Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleManualRefresh}
              loading={isRefreshing}
              iconName="RefreshCw"
              iconPosition="left"
              iconSize={16}
              className="text-sm"
            >
              Refresh
            </Button>
          </div>

          {/* Auto-refresh Toggle */}
          <div className="flex items-center space-x-3">
            <span className="text-sm text-muted-foreground">Auto-refresh</span>
            <button
              onClick={onAutoRefreshToggle}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                autoRefresh ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  autoRefresh ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className="text-xs text-muted-foreground">
              {autoRefresh ? '15min' : 'Off'}
            </span>
          </div>

          {/* Export Actions */}
          <div className="flex items-center space-x-1">
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              iconPosition="left"
              iconSize={16}
              className="text-sm"
            >
              Export
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              iconName="Printer"
              className="text-sm"
            />
            
            <Button
              variant="ghost"
              size="sm"
              iconName="Share2"
              className="text-sm"
            />
          </div>
        </div>
      </div>
      {/* Quick Stats Bar */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">
              {locations?.find(l => l?.id === selectedLocation)?.employeeCount || 0}
            </div>
            <div className="text-xs text-muted-foreground">Total Employees</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success">
              {locations?.find(l => l?.id === selectedLocation)?.activeShifts || 0}
            </div>
            <div className="text-xs text-muted-foreground">Active Shifts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">
              {locations?.find(l => l?.id === selectedLocation)?.pendingShifts || 0}
            </div>
            <div className="text-xs text-muted-foreground">Pending Assignments</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-error">
              {locations?.find(l => l?.id === selectedLocation)?.conflicts || 0}
            </div>
            <div className="text-xs text-muted-foreground">Conflicts</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalControls;