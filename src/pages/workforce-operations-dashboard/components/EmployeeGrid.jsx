import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const EmployeeGrid = ({ employees, onAssignShift, onViewEmployee, onUpdateAvailability }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-success text-success-foreground';
      case 'break': return 'bg-warning text-warning-foreground';
      case 'unavailable': return 'bg-error text-error-foreground';
      case 'scheduled': return 'bg-accent text-accent-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return 'CheckCircle';
      case 'break': return 'Clock';
      case 'unavailable': return 'XCircle';
      case 'scheduled': return 'Calendar';
      default: return 'User';
    }
  };

  const getSkillBadgeColor = (skill) => {
    const colors = [
      'bg-blue-100 text-blue-800',
      'bg-green-100 text-green-800',
      'bg-purple-100 text-purple-800',
      'bg-orange-100 text-orange-800',
      'bg-pink-100 text-pink-800'
    ];
    return colors?.[skill?.length % colors?.length];
  };

  const filteredAndSortedEmployees = employees?.filter(employee => {
      const matchesSearch = employee?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                          employee?.department?.toLowerCase()?.includes(searchTerm?.toLowerCase());
      const matchesStatus = statusFilter === 'all' || employee?.status === statusFilter;
      return matchesSearch && matchesStatus;
    })?.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a?.name?.localeCompare(b?.name);
        case 'department':
          return a?.department?.localeCompare(b?.department);
        case 'hoursWorked':
          return b?.hoursWorked - a?.hoursWorked;
        case 'status':
          return a?.status?.localeCompare(b?.status);
        default:
          return 0;
      }
    });

  const statusCounts = employees?.reduce((acc, emp) => {
    acc[emp.status] = (acc?.[emp?.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-foreground">Employee Status</h2>
          
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative">
              <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e?.target?.value)}
                className="pl-10 pr-4 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e?.target?.value)}
              className="px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">All Status ({employees?.length})</option>
              <option value="active">Active ({statusCounts?.active || 0})</option>
              <option value="scheduled">Scheduled ({statusCounts?.scheduled || 0})</option>
              <option value="break">On Break ({statusCounts?.break || 0})</option>
              <option value="unavailable">Unavailable ({statusCounts?.unavailable || 0})</option>
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e?.target?.value)}
              className="px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="name">Sort by Name</option>
              <option value="department">Sort by Department</option>
              <option value="hoursWorked">Sort by Hours</option>
              <option value="status">Sort by Status</option>
            </select>
          </div>
        </div>
      </div>
      <div className="p-6">
        {filteredAndSortedEmployees?.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No employees found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredAndSortedEmployees?.map(employee => (
              <div
                key={employee?.id}
                className="border border-border rounded-lg p-4 hover:shadow-elevation-2 transition-smooth cursor-pointer"
                onClick={() => onViewEmployee(employee)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Image
                        src={employee?.avatar}
                        alt={employee?.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card flex items-center justify-center ${getStatusColor(employee?.status)}`}>
                        <Icon name={getStatusIcon(employee?.status)} size={8} />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{employee?.name}</h3>
                      <p className="text-sm text-muted-foreground">{employee?.department}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={(e) => {
                        e?.stopPropagation();
                        onAssignShift(employee);
                      }}
                      iconName="Calendar"
                      className="text-xs"
                    >
                      Assign
                    </Button>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {employee?.skills?.slice(0, 3)?.map((skill, index) => (
                    <span
                      key={index}
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getSkillBadgeColor(skill)}`}
                    >
                      {skill}
                    </span>
                  ))}
                  {employee?.skills?.length > 3 && (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                      +{employee?.skills?.length - 3}
                    </span>
                  )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Hours Today:</span>
                    <span className="ml-1 font-medium text-foreground">{employee?.hoursWorked}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Next Shift:</span>
                    <span className="ml-1 font-medium text-foreground">{employee?.nextShift}</span>
                  </div>
                </div>

                {/* Current Assignment */}
                {employee?.currentAssignment && (
                  <div className="mt-3 p-2 bg-muted rounded-md">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Current Assignment:</span>
                      <span className="text-xs font-medium text-foreground">{employee?.currentAssignment}</span>
                    </div>
                  </div>
                )}

                {/* Quick Actions */}
                <div className="mt-3 flex justify-between">
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={(e) => {
                      e?.stopPropagation();
                      onUpdateAvailability(employee);
                    }}
                    iconName="Clock"
                    iconPosition="left"
                    iconSize={12}
                    className="text-xs"
                  >
                    Availability
                  </Button>
                  
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={(e) => {
                        e?.stopPropagation();
                        // Handle message action
                      }}
                      iconName="MessageCircle"
                      className="text-xs"
                    />
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={(e) => {
                        e?.stopPropagation();
                        // Handle call action
                      }}
                      iconName="Phone"
                      className="text-xs"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeGrid;