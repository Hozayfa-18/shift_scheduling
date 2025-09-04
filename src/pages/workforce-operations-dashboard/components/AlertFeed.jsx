import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertFeed = ({ alerts, onResolveAlert, onViewDetails }) => {
  const [filter, setFilter] = useState('all');

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':return 'border-l-error bg-error/5';
      case 'warning':return 'border-l-warning bg-warning/5';
      case 'info':return 'border-l-accent bg-accent/5';
      default:return 'border-l-muted bg-muted/5';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical':return 'AlertCircle';
      case 'warning':return 'AlertTriangle';
      case 'info':return 'Info';
      default:return 'Bell';
    }
  };

  const getSeverityIconColor = (severity) => {
    switch (severity) {
      case 'critical':return 'text-error';
      case 'warning':return 'text-warning';
      case 'info':return 'text-accent';
      default:return 'text-muted-foreground';
    }
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = Math.floor((now - timestamp) / 1000);

    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  const filteredAlerts = alerts?.filter((alert) => {
    if (filter === 'all') return true;
    return alert?.severity === filter;
  });

  const severityCounts = alerts?.reduce((acc, alert) => {
    acc[alert.severity] = (acc?.[alert?.severity] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1 h-full max-h-[600px] flex-col block">
      <div className="p-4 border-b border-border flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Live Alerts</h2>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-xs text-muted-foreground">Live</span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-1">
          {[
          { key: 'all', label: 'All', count: alerts?.length },
          { key: 'critical', label: 'Critical', count: severityCounts?.critical || 0 },
          { key: 'warning', label: 'Warning', count: severityCounts?.warning || 0 },
          { key: 'info', label: 'Info', count: severityCounts?.info || 0 }]?.
          map((tab) =>
          <button
            key={tab?.key}
            onClick={() => setFilter(tab?.key)}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-smooth ${
            filter === tab?.key ?
            'bg-primary text-primary-foreground' :
            'text-muted-foreground hover:text-foreground hover:bg-muted'}`
            }>

              {tab?.label} ({tab?.count})
            </button>
          )}
        </div>
      </div>
      
      {/* Fixed Scrollable Alerts Container with proper height and smooth scrolling */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth p-4 space-y-3 min-h-0 max-h-[400px] scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent hover:scrollbar-thumb-muted-foreground/40">
        {filteredAlerts?.length === 0 ?
        <div className="text-center py-8">
            <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-2" />
            <p className="text-muted-foreground">No alerts in this category</p>
          </div> :

        <div className="space-y-3">
            {filteredAlerts?.map((alert) =>
          <div
            key={alert?.id}
            className={`border-l-4 rounded-r-lg p-4 ${getSeverityColor(alert?.severity)} transition-smooth hover:shadow-elevation-1 flex-shrink-0`}>

                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <Icon
                  name={getSeverityIcon(alert?.severity)}
                  size={18}
                  className={getSeverityIconColor(alert?.severity)} />

                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-foreground mb-1">
                        {alert?.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                        {alert?.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {getTimeAgo(alert?.timestamp)}
                        </span>
                        {alert?.location &&
                    <span className="text-xs text-muted-foreground">
                            {alert?.location}
                          </span>
                    }
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1 ml-2">
                    {alert?.actionable &&
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => onViewDetails(alert)}
                  className="text-xs">

                        View
                      </Button>
                }
                    {alert?.resolvable &&
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => onResolveAlert(alert?.id)}
                  className="text-xs">

                        Resolve
                      </Button>
                }
                  </div>
                </div>

                {/* Quick Actions */}
                {alert?.quickActions && alert?.quickActions?.length > 0 &&
            <div className="mt-3 flex flex-wrap gap-2">
                    {alert?.quickActions?.map((action, index) =>
              <Button
                key={index}
                variant="outline"
                size="xs"
                onClick={() => action?.handler(alert)}
                iconName={action?.icon}
                iconPosition="left"
                iconSize={12}
                className="text-xs">

                        {action?.label}
                      </Button>
              )}
                  </div>
            }
              </div>
          )}
          </div>
        }
      </div>
      
      {/* Summary Footer */}
      <div className="p-4 border-t border-border bg-muted/30 flex-shrink-0">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            {alerts?.filter((a) => a?.severity === 'critical')?.length} critical alerts requiring attention
          </span>
          <Button variant="ghost" size="xs" className="text-xs">
            View All
          </Button>
        </div>
      </div>
    </div>);

};

export default AlertFeed;