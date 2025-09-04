import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StrategicInsightsPanel = ({ insights = [] }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return 'AlertTriangle';
      case 'medium': return 'AlertCircle';
      case 'low': return 'Info';
      default: return 'Circle';
    }
  };

  const getInsightIcon = (type) => {
    switch (type) {
      case 'cost_optimization': return 'DollarSign';
      case 'staffing_prediction': return 'Users';
      case 'risk_indicator': return 'Shield';
      case 'efficiency_opportunity': return 'Zap';
      default: return 'Lightbulb';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1 h-full">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Strategic Insights</h3>
          <Button variant="ghost" size="sm" iconName="RefreshCw" iconSize={16}>
            Refresh
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-1">AI-powered recommendations for executive action</p>
      </div>
      <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
        {insights?.map((insight) => (
          <div key={insight?.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-smooth">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Icon name={getInsightIcon(insight?.type)} size={16} className="text-accent" />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="text-sm font-medium text-foreground truncate">{insight?.title}</h4>
                  <div className={`flex items-center space-x-1 ${getPriorityColor(insight?.priority)}`}>
                    <Icon name={getPriorityIcon(insight?.priority)} size={12} />
                    <span className="text-xs font-medium capitalize">{insight?.priority}</span>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                  {insight?.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>Impact: {insight?.impact}</span>
                    <span>•</span>
                    <span>Timeline: {insight?.timeline}</span>
                  </div>
                  
                  <Button variant="outline" size="xs">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-6 border-t border-border">
        <Button variant="outline" fullWidth iconName="BarChart3" iconPosition="left">
          View All Insights
        </Button>
      </div>
    </div>
  );
};

export default StrategicInsightsPanel;