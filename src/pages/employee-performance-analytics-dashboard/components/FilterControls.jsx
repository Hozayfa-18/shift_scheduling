import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const FilterControls = ({ onFiltersChange, savedFilters = [] }) => {
  const [activeFilters, setActiveFilters] = useState({
    employeeGroup: 'all',
    performancePeriod: '3months',
    metricComparison: 'individual',
    department: 'all',
    performanceThreshold: 80
  });
  
  const [showBookmarkModal, setShowBookmarkModal] = useState(false);
  const [bookmarkName, setBookmarkName] = useState('');

  const employeeGroupOptions = [
    { value: 'all', label: 'All Employees' },
    { value: 'top-performers', label: 'Top Performers (90%+)' },
    { value: 'average-performers', label: 'Average Performers (80-89%)' },
    { value: 'improvement-needed', label: 'Needs Improvement (<80%)' },
    { value: 'new-hires', label: 'New Hires (< 6 months)' },
    { value: 'senior-staff', label: 'Senior Staff (2+ years)' }
  ];

  const performancePeriodOptions = [
    { value: '1month', label: 'Last Month' },
    { value: '3months', label: 'Last 3 Months' },
    { value: '6months', label: 'Last 6 Months' },
    { value: '1year', label: 'Last Year' },
    { value: 'ytd', label: 'Year to Date' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const metricComparisonOptions = [
    { value: 'individual', label: 'Individual Performance' },
    { value: 'team', label: 'Team Benchmarks' },
    { value: 'department', label: 'Department Average' },
    { value: 'company', label: 'Company-wide' }
  ];

  const departmentOptions = [
    { value: 'all', label: 'All Departments' },
    { value: 'customer-service', label: 'Customer Service' },
    { value: 'operations', label: 'Operations' },
    { value: 'sales', label: 'Sales' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'management', label: 'Management' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...activeFilters, [key]: value };
    setActiveFilters(newFilters);
    if (onFiltersChange) {
      onFiltersChange(newFilters);
    }
  };

  const handleSaveBookmark = () => {
    if (bookmarkName?.trim()) {
      const bookmark = {
        id: Date.now(),
        name: bookmarkName,
        filters: activeFilters,
        createdAt: new Date()?.toISOString()
      };
      // In a real app, this would save to backend/localStorage
      console.log('Saving bookmark:', bookmark);
      setBookmarkName('');
      setShowBookmarkModal(false);
    }
  };

  const loadBookmark = (bookmark) => {
    setActiveFilters(bookmark?.filters);
    if (onFiltersChange) {
      onFiltersChange(bookmark?.filters);
    }
  };

  const resetFilters = () => {
    const defaultFilters = {
      employeeGroup: 'all',
      performancePeriod: '3months',
      metricComparison: 'individual',
      department: 'all',
      performanceThreshold: 80
    };
    setActiveFilters(defaultFilters);
    if (onFiltersChange) {
      onFiltersChange(defaultFilters);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Analytics Filters</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Customize your performance analysis view
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Bookmark"
            onClick={() => setShowBookmarkModal(true)}
          >
            Save View
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="RotateCcw"
            onClick={resetFilters}
          >
            Reset
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Employee Group Filter */}
        <div>
          <Select
            label="Employee Group"
            options={employeeGroupOptions}
            value={activeFilters?.employeeGroup}
            onChange={(value) => handleFilterChange('employeeGroup', value)}
            className="w-full"
          />
        </div>

        {/* Performance Period Filter */}
        <div>
          <Select
            label="Performance Period"
            options={performancePeriodOptions}
            value={activeFilters?.performancePeriod}
            onChange={(value) => handleFilterChange('performancePeriod', value)}
            className="w-full"
          />
        </div>

        {/* Metric Comparison Filter */}
        <div>
          <Select
            label="Comparison Baseline"
            options={metricComparisonOptions}
            value={activeFilters?.metricComparison}
            onChange={(value) => handleFilterChange('metricComparison', value)}
            className="w-full"
          />
        </div>

        {/* Department Filter */}
        <div>
          <Select
            label="Department"
            options={departmentOptions}
            value={activeFilters?.department}
            onChange={(value) => handleFilterChange('department', value)}
            className="w-full"
          />
        </div>
      </div>
      {/* Performance Threshold Slider */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-foreground mb-2">
          Performance Threshold: {activeFilters?.performanceThreshold}%
        </label>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-muted-foreground">60%</span>
          <input
            type="range"
            min="60"
            max="100"
            step="5"
            value={activeFilters?.performanceThreshold}
            onChange={(e) => handleFilterChange('performanceThreshold', parseInt(e?.target?.value))}
            className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
          />
          <span className="text-sm text-muted-foreground">100%</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Show employees with performance above this threshold
        </p>
      </div>
      {/* Saved Bookmarks */}
      {savedFilters?.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Saved Filter Views</h4>
          <div className="flex flex-wrap gap-2">
            {savedFilters?.map((bookmark) => (
              <button
                key={bookmark?.id}
                onClick={() => loadBookmark(bookmark)}
                className="flex items-center space-x-2 px-3 py-2 bg-muted hover:bg-muted/80 rounded-md text-sm text-foreground transition-colors"
              >
                <Icon name="Bookmark" size={14} />
                <span>{bookmark?.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Active Filters Summary */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Active filters:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(activeFilters)?.map(([key, value]) => {
              if (value === 'all' || (key === 'performanceThreshold' && value === 80)) return null;
              return (
                <span
                  key={key}
                  className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                >
                  {key}: {value}
                </span>
              );
            })}
          </div>
        </div>
      </div>
      {/* Bookmark Modal */}
      {showBookmarkModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md shadow-elevation-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Save Filter View</h3>
              <button
                onClick={() => setShowBookmarkModal(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Bookmark Name
                </label>
                <input
                  type="text"
                  value={bookmarkName}
                  onChange={(e) => setBookmarkName(e?.target?.value)}
                  placeholder="e.g., Top Performers Q3"
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              
              <div className="flex items-center justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setShowBookmarkModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveBookmark}
                  disabled={!bookmarkName?.trim()}
                >
                  Save Bookmark
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterControls;