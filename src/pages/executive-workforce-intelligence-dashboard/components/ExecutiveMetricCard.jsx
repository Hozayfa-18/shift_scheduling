import React from 'react';
import Icon from '../../../components/AppIcon';

const ExecutiveMetricCard = ({ 
  title, 
  value, 
  change, 
  changeType, 
  benchmark, 
  icon, 
  trend = [] 
}) => {
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

  const getBenchmarkStatus = () => {
    if (benchmark?.status === 'above') return 'text-success';
    if (benchmark?.status === 'below') return 'text-error';
    return 'text-warning';
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
            <div className="text-2xl font-bold text-foreground mt-1">{value}</div>
          </div>
        </div>
        
        {trend?.length > 0 && (
          <div className="w-16 h-8">
            <svg width="64" height="32" className="text-primary">
              <polyline
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                points={trend?.map((point, index) => 
                  `${(index / (trend?.length - 1)) * 60},${32 - (point / Math.max(...trend)) * 28}`
                )?.join(' ')}
              />
            </svg>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className={`flex items-center space-x-1 ${getChangeColor()}`}>
            <Icon name={getChangeIcon()} size={14} />
            <span className="text-sm font-medium">{change}</span>
          </div>
          <span className="text-xs text-muted-foreground">vs last period</span>
        </div>

        {benchmark && (
          <div className="text-right">
            <div className={`text-xs font-medium ${getBenchmarkStatus()}`}>
              {benchmark?.status === 'above' ? '↑' : benchmark?.status === 'below' ? '↓' : '→'} Industry
            </div>
            <div className="text-xs text-muted-foreground">{benchmark?.value}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExecutiveMetricCard;