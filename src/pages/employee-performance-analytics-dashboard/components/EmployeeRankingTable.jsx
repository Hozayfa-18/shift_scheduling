import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const EmployeeRankingTable = ({ onEmployeeSelect }) => {
  const [sortBy, setSortBy] = useState('performance');
  const [sortOrder, setSortOrder] = useState('desc');

  const employeeData = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
    department: "Customer Service",
    performanceScore: 94,
    scheduleAdherence: 98,
    satisfactionScore: 92,
    preferenceAlignment: 89,
    trend: 'up',
    trendValue: 5.2
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    department: "Operations",
    performanceScore: 91,
    scheduleAdherence: 95,
    satisfactionScore: 88,
    preferenceAlignment: 92,
    trend: 'up',
    trendValue: 3.1
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    department: "Sales",
    performanceScore: 89,
    scheduleAdherence: 92,
    satisfactionScore: 90,
    preferenceAlignment: 85,
    trend: 'stable',
    trendValue: 0.8
  },
  {
    id: 4,
    name: "David Thompson",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    department: "Technical",
    performanceScore: 87,
    scheduleAdherence: 89,
    satisfactionScore: 85,
    preferenceAlignment: 88,
    trend: 'down',
    trendValue: -2.3
  },
  {
    id: 5,
    name: "Lisa Wang",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
    department: "Customer Service",
    performanceScore: 85,
    scheduleAdherence: 91,
    satisfactionScore: 87,
    preferenceAlignment: 83,
    trend: 'up',
    trendValue: 4.7
  },
  {
    id: 6,
    name: "James Wilson",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    department: "Operations",
    performanceScore: 83,
    scheduleAdherence: 86,
    satisfactionScore: 82,
    preferenceAlignment: 80,
    trend: 'stable',
    trendValue: 1.2
  }];


  const sortedEmployees = [...employeeData]?.sort((a, b) => {
    const aValue = a?.[sortBy];
    const bValue = b?.[sortBy];
    return sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
  });

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':return 'TrendingUp';
      case 'down':return 'TrendingDown';
      default:return 'Minus';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up':return 'text-success';
      case 'down':return 'text-error';
      default:return 'text-muted-foreground';
    }
  };

  const getPerformanceColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 80) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1 hidden">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Employee Performance Ranking</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Top performers with scheduling preference alignment
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{employeeData?.length} employees</span>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Employee</th>
              <th
                className="text-center p-4 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                onClick={() => handleSort('performanceScore')}>

                <div className="flex items-center justify-center space-x-1">
                  <span>Performance</span>
                  <Icon
                    name={sortBy === 'performanceScore' ? sortOrder === 'desc' ? 'ChevronDown' : 'ChevronUp' : 'ChevronsUpDown'}
                    size={14} />

                </div>
              </th>
              <th
                className="text-center p-4 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                onClick={() => handleSort('scheduleAdherence')}>

                <div className="flex items-center justify-center space-x-1">
                  <span>Adherence</span>
                  <Icon
                    name={sortBy === 'scheduleAdherence' ? sortOrder === 'desc' ? 'ChevronDown' : 'ChevronUp' : 'ChevronsUpDown'}
                    size={14} />

                </div>
              </th>
              <th
                className="text-center p-4 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                onClick={() => handleSort('preferenceAlignment')}>

                <div className="flex items-center justify-center space-x-1">
                  <span>Alignment</span>
                  <Icon
                    name={sortBy === 'preferenceAlignment' ? sortOrder === 'desc' ? 'ChevronDown' : 'ChevronUp' : 'ChevronsUpDown'}
                    size={14} />

                </div>
              </th>
              <th className="text-center p-4 text-sm font-medium text-muted-foreground">Trend</th>
            </tr>
          </thead>
          <tbody>
            {sortedEmployees?.map((employee, index) =>
            <tr
              key={employee?.id}
              className="border-b border-border hover:bg-muted/30 cursor-pointer transition-colors"
              onClick={() => onEmployeeSelect && onEmployeeSelect(employee)}>

                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Image
                      src={employee?.avatar}
                      alt={employee?.name}
                      className="w-10 h-10 rounded-full object-cover" />

                      <div className="absolute -top-1 -left-1 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </div>
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{employee?.name}</div>
                      <div className="text-sm text-muted-foreground">{employee?.department}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <div className="flex flex-col items-center">
                    <span className={`text-lg font-bold ${getPerformanceColor(employee?.performanceScore)}`}>
                      {employee?.performanceScore}
                    </span>
                    <div className="w-16 h-2 bg-muted rounded-full mt-1">
                      <div
                      className="h-full bg-primary rounded-full transition-all duration-300"
                      style={{ width: `${employee?.performanceScore}%` }}>
                    </div>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <span className="text-sm font-medium text-foreground">{employee?.scheduleAdherence}%</span>
                </td>
                <td className="p-4 text-center">
                  <span className="text-sm font-medium text-foreground">{employee?.preferenceAlignment}%</span>
                </td>
                <td className="p-4 text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <Icon
                    name={getTrendIcon(employee?.trend)}
                    size={14}
                    className={getTrendColor(employee?.trend)} />

                    <span className={`text-sm font-medium ${getTrendColor(employee?.trend)}`}>
                      {employee?.trend === 'stable' ? '±' : employee?.trendValue > 0 ? '+' : ''}{employee?.trendValue}%
                    </span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="p-4 bg-muted/20 border-t border-border">
        <div className="flex flex-col space-y-3 md:flex-row md:items-center md:justify-between md:space-y-0 text-sm text-muted-foreground">
          <span className="font-medium">Showing top {employeeData?.length} performers</span>
          <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-y-0 md:space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded-full flex-shrink-0"></div>
              <span className="whitespace-nowrap">90+ Performance</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-warning rounded-full flex-shrink-0"></div>
              <span className="whitespace-nowrap">80-89 Performance</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-error rounded-full flex-shrink-0"></div>
              <span className="whitespace-nowrap">&lt;80 Performance</span>
            </div>
          </div>
        </div>
      </div>
    </div>);

};

export default EmployeeRankingTable;