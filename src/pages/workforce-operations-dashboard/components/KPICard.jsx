import React from 'react';
import Icon from '../../../components/AppIcon';

const KPICard = ({ title, value, unit, trend, trendValue, status, sparklineData, icon, color }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'good': return 'text-success';
      case 'warning': return 'text-warning';
      case 'critical': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getTrendIcon = (trend) => {
    if (trend === 'up') return 'TrendingUp';
    if (trend === 'down') return 'TrendingDown';
    return 'Minus';
  };

  const getTrendColor = (trend) => {
    if (trend === 'up') return 'text-success';
    if (trend === 'down') return 'text-error';
    return 'text-muted-foreground';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-smooth">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
            <Icon name={icon} size={20} color="white" />
          </div>
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        </div>
        <div className={`flex items-center space-x-1 ${getTrendColor(trend)}`}>
          <Icon name={getTrendIcon(trend)} size={16} />
          <span className="text-sm font-medium">{trendValue}</span>
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <div className="flex items-baseline space-x-2">
            <span className={`text-3xl font-bold ${getStatusColor(status)}`}>
              {value}
            </span>
            {unit && (
              <span className="text-sm text-muted-foreground">{unit}</span>
            )}
          </div>
        </div>

        {/* Mini Sparkline */}
        <div className="w-16 h-8 flex items-end space-x-1">
          {sparklineData?.map((point, index) => (
            <div
              key={index}
              className={`w-1 rounded-t ${color?.replace('bg-', 'bg-')?.replace('text-', 'bg-')} opacity-60`}
              style={{ height: `${(point / Math.max(...sparklineData)) * 100}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default KPICard;