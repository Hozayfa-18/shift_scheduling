import React, { useState } from 'react';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const FilterBar = ({ onFiltersChange }) => {
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [forecastPeriod, setForecastPeriod] = useState('2');
  const [confidenceThreshold, setConfidenceThreshold] = useState(75);

  const departmentOptions = [
    { value: 'all', label: 'All Departments' },
    { value: 'customer-service', label: 'Customer Service' },
    { value: 'sales', label: 'Sales' },
    { value: 'operations', label: 'Operations' },
    { value: 'warehouse', label: 'Warehouse' },
    { value: 'maintenance', label: 'Maintenance' }
  ];

  const forecastOptions = [
    { value: '1', label: '1 Week' },
    { value: '2', label: '2 Weeks' },
    { value: '3', label: '3 Weeks' },
    { value: '4', label: '4 Weeks' }
  ];

  const handleDepartmentChange = (value) => {
    setSelectedDepartment(value);
    onFiltersChange?.({ department: value, forecastPeriod, confidenceThreshold });
  };

  const handleForecastChange = (value) => {
    setForecastPeriod(value);
    onFiltersChange?.({ department: selectedDepartment, forecastPeriod: value, confidenceThreshold });
  };

  const handleConfidenceChange = (e) => {
    const value = parseInt(e?.target?.value);
    setConfidenceThreshold(value);
    onFiltersChange?.({ department: selectedDepartment, forecastPeriod, confidenceThreshold: value });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6 shadow-elevation-1">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-6">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} className="text-muted-foreground" />
          <h3 className="text-lg font-semibold text-foreground">Optimization Filters</h3>
        </div>
        
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="min-w-48">
            <Select
              label="Department"
              options={departmentOptions}
              value={selectedDepartment}
              onChange={handleDepartmentChange}
            />
          </div>
          
          <div className="min-w-36">
            <Select
              label="Forecast Period"
              options={forecastOptions}
              value={forecastPeriod}
              onChange={handleForecastChange}
            />
          </div>
          
          <div className="min-w-48">
            <label className="block text-sm font-medium text-foreground mb-2">
              AI Confidence Threshold: {confidenceThreshold}%
            </label>
            <div className="flex items-center space-x-3">
              <span className="text-xs text-muted-foreground">50%</span>
              <input
                type="range"
                min="50"
                max="95"
                value={confidenceThreshold}
                onChange={handleConfidenceChange}
                className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
              />
              <span className="text-xs text-muted-foreground">95%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;