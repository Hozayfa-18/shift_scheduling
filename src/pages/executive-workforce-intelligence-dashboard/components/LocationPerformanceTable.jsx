import React from 'react';
import Icon from '../../../components/AppIcon';

const LocationPerformanceTable = ({ locations = [] }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent': return 'text-success';
      case 'good': return 'text-success';
      case 'warning': return 'text-warning';
      case 'critical': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'excellent': return 'CheckCircle2';
      case 'good': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'critical': return 'XCircle';
      default: return 'Circle';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'excellent': return 'bg-success/10';
      case 'good': return 'bg-success/10';
      case 'warning': return 'bg-warning/10';
      case 'critical': return 'bg-error/10';
      default: return 'bg-muted/10';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Multi-Location Performance</h3>
        <p className="text-sm text-muted-foreground mt-1">Comparative analysis across all regions</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Location</th>
              <th className="text-right p-4 text-sm font-medium text-muted-foreground">Efficiency</th>
              <th className="text-right p-4 text-sm font-medium text-muted-foreground">Cost/Hour</th>
              <th className="text-right p-4 text-sm font-medium text-muted-foreground">Satisfaction</th>
              <th className="text-right p-4 text-sm font-medium text-muted-foreground">Utilization</th>
              <th className="text-center p-4 text-sm font-medium text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {locations?.map((location) => (
              <tr key={location?.id} className="border-b border-border hover:bg-muted/50 transition-smooth">
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                      <Icon name="MapPin" size={16} className="text-accent" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{location?.name}</div>
                      <div className="text-sm text-muted-foreground">{location?.region}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-right">
                  <div className="font-medium text-foreground">{location?.efficiency}%</div>
                  <div className={`text-xs ${location?.efficiencyChange > 0 ? 'text-success' : 'text-error'}`}>
                    {location?.efficiencyChange > 0 ? '+' : ''}{location?.efficiencyChange}%
                  </div>
                </td>
                <td className="p-4 text-right">
                  <div className="font-medium text-foreground">${location?.costPerHour}</div>
                  <div className={`text-xs ${location?.costChange < 0 ? 'text-success' : 'text-error'}`}>
                    {location?.costChange > 0 ? '+' : ''}{location?.costChange}%
                  </div>
                </td>
                <td className="p-4 text-right">
                  <div className="font-medium text-foreground">{location?.satisfaction}%</div>
                  <div className={`text-xs ${location?.satisfactionChange > 0 ? 'text-success' : 'text-error'}`}>
                    {location?.satisfactionChange > 0 ? '+' : ''}{location?.satisfactionChange}%
                  </div>
                </td>
                <td className="p-4 text-right">
                  <div className="font-medium text-foreground">{location?.utilization}%</div>
                  <div className="w-full bg-muted rounded-full h-1.5 mt-1">
                    <div 
                      className="bg-primary h-1.5 rounded-full transition-smooth" 
                      style={{ width: `${location?.utilization}%` }}
                    />
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex justify-center">
                    <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusBg(location?.status)}`}>
                      <Icon 
                        name={getStatusIcon(location?.status)} 
                        size={12} 
                        className={getStatusColor(location?.status)} 
                      />
                      <span className={getStatusColor(location?.status)}>
                        {location?.status?.charAt(0)?.toUpperCase() + location?.status?.slice(1)}
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LocationPerformanceTable;