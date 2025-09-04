import React from 'react';
import Icon from '../../../components/AppIcon';

const PerformanceKPICard = ({ title, value, unit, change, changeType, icon, description }) => {
  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-success';
    if (changeType === 'negative') return 'text-error';
    return 'text-muted-foreground';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name={icon} size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
            <p className="text-xs text-muted-foreground/80 mt-1">{description}</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl font-bold text-foreground">{value}</span>
          <span className="text-sm text-muted-foreground">{unit}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Icon name={getChangeIcon()} size={14} className={getChangeColor()} />
          <span className={`text-sm font-medium ${getChangeColor()}`}>
            {Math.abs(change)}% vs last period
          </span>
        </div>
      </div>
    </div>
  );
};

export default PerformanceKPICard;