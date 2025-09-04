import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIInsightsPanel = () => {
  const [activeTab, setActiveTab] = useState('opportunities');

  const optimizationOpportunities = [
    {
      id: 1,
      title: 'Peak Hour Coverage Gap',
      description: 'Customer Service department shows 15% understaffing during 2-4 PM peak hours',
      priority: 'high',
      impact: '$450/day savings',
      confidence: 94,
      action: 'Shift 2 employees from morning to afternoon slots',
      timeframe: 'Immediate'
    },
    {
      id: 2,
      title: 'Overtime Reduction Opportunity',
      description: 'Warehouse team averaging 12% overtime due to uneven shift distribution',
      priority: 'high',
      impact: '$320/day savings',
      confidence: 89,
      action: 'Redistribute 4 hours across 3 part-time positions',
      timeframe: 'This week'
    },
    {
      id: 3,
      title: 'Skill Utilization Mismatch',
      description: 'Senior sales representatives working during low-conversion hours',
      priority: 'medium',
      impact: '$180/day savings',
      confidence: 82,
      action: 'Realign senior staff to high-conversion periods',
      timeframe: 'Next week'
    },
    {
      id: 4,
      title: 'Cross-Training Opportunity',
      description: 'Operations staff can cover Customer Service during breaks',
      priority: 'medium',
      impact: '$95/day savings',
      confidence: 76,
      action: 'Schedule cross-trained staff for coverage gaps',
      timeframe: '2 weeks'
    }
  ];

  const costAnalysis = [
    {
      category: 'Labor Cost Reduction',
      current: '$12,450',
      optimized: '$11,280',
      savings: '$1,170',
      percentage: '9.4%'
    },
    {
      category: 'Overtime Expenses',
      current: '$2,890',
      optimized: '$1,950',
      savings: '$940',
      percentage: '32.5%'
    },
    {
      category: 'Productivity Gains',
      current: '$8,200',
      optimized: '$9,150',
      savings: '$950',
      percentage: '11.6%'
    },
    {
      category: 'Coverage Efficiency',
      current: '78%',
      optimized: '92%',
      savings: '+14%',
      percentage: '17.9%'
    }
  ];

  const employeeConflicts = [
    {
      id: 1,
      employee: 'Jennifer Walsh',
      conflict: 'Prefers morning shifts but scheduled for evenings',
      impact: 'Satisfaction: -15%',
      suggestion: 'Swap with David Park who prefers evenings',
      priority: 'medium'
    },
    {
      id: 2,
      employee: 'Robert Kim',
      conflict: 'Requested Fridays off but scheduled 3/4 weeks',
      impact: 'Satisfaction: -22%',
      suggestion: 'Rotate Friday coverage with team members',
      priority: 'high'
    },
    {
      id: 3,
      employee: 'Maria Santos',
      conflict: 'Part-time preference but getting full-time hours',
      impact: 'Satisfaction: -8%',
      suggestion: 'Split hours with new part-time hire',
      priority: 'low'
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error bg-error/10 border-error/20';
      case 'medium': return 'text-warning bg-warning/10 border-warning/20';
      case 'low': return 'text-success bg-success/10 border-success/20';
      default: return 'text-muted-foreground bg-muted/10 border-border';
    }
  };

  const tabs = [
    { id: 'opportunities', label: 'Opportunities', icon: 'Target' },
    { id: 'cost-analysis', label: 'Cost Analysis', icon: 'DollarSign' },
    { id: 'conflicts', label: 'Conflicts', icon: 'AlertTriangle' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1 h-full flex flex-col">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Brain" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">AI Insights</h3>
        </div>
        
        <div className="flex space-x-1 bg-muted rounded-lg p-1">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                activeTab === tab?.id
                  ? 'bg-card text-foreground shadow-elevation-1'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span className="hidden sm:inline">{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'opportunities' && (
          <div className="p-6 space-y-4">
            {optimizationOpportunities?.map((opportunity) => (
              <div key={opportunity?.id} className="border border-border rounded-lg p-4 hover:shadow-elevation-1 transition-smooth">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground mb-1">{opportunity?.title}</h4>
                    <p className="text-sm text-muted-foreground">{opportunity?.description}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(opportunity?.priority)}`}>
                    {opportunity?.priority}
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Impact:</span>
                    <span className="font-medium text-success">{opportunity?.impact}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Confidence:</span>
                    <span className="font-medium text-foreground">{opportunity?.confidence}%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Timeframe:</span>
                    <span className="font-medium text-foreground">{opportunity?.timeframe}</span>
                  </div>
                </div>
                
                <div className="bg-muted rounded-md p-3 mb-3">
                  <p className="text-sm text-foreground font-medium mb-1">Recommended Action:</p>
                  <p className="text-sm text-muted-foreground">{opportunity?.action}</p>
                </div>
                
                <Button variant="outline" size="sm" className="w-full">
                  Implement Suggestion
                </Button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'cost-analysis' && (
          <div className="p-6 space-y-4">
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="TrendingUp" size={18} className="text-primary" />
                <h4 className="font-semibold text-primary">Weekly Optimization Impact</h4>
              </div>
              <p className="text-2xl font-bold text-primary">$3,060 savings</p>
              <p className="text-sm text-primary/80">Potential weekly cost reduction</p>
            </div>
            
            {costAnalysis?.map((item, index) => (
              <div key={index} className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-foreground">{item?.category}</h4>
                  <span className="text-sm font-medium text-success">{item?.percentage}</span>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Current</p>
                    <p className="font-medium text-foreground">{item?.current}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Optimized</p>
                    <p className="font-medium text-foreground">{item?.optimized}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Savings</p>
                    <p className="font-medium text-success">{item?.savings}</p>
                  </div>
                </div>
              </div>
            ))}
            
            <Button variant="default" className="w-full mt-4" iconName="Download">
              Export Cost Analysis
            </Button>
          </div>
        )}

        {activeTab === 'conflicts' && (
          <div className="p-6 space-y-4">
            <div className="bg-warning/5 border border-warning/20 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="AlertTriangle" size={18} className="text-warning" />
                <h4 className="font-semibold text-warning">Employee Preference Conflicts</h4>
              </div>
              <p className="text-sm text-warning/80">{employeeConflicts?.length} conflicts detected requiring attention</p>
            </div>
            
            {employeeConflicts?.map((conflict) => (
              <div key={conflict?.id} className="border border-border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground mb-1">{conflict?.employee}</h4>
                    <p className="text-sm text-muted-foreground">{conflict?.conflict}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(conflict?.priority)}`}>
                    {conflict?.priority}
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Impact:</span>
                    <span className="font-medium text-error">{conflict?.impact}</span>
                  </div>
                </div>
                
                <div className="bg-muted rounded-md p-3 mb-3">
                  <p className="text-sm text-foreground font-medium mb-1">AI Suggestion:</p>
                  <p className="text-sm text-muted-foreground">{conflict?.suggestion}</p>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Review
                  </Button>
                  <Button variant="default" size="sm" className="flex-1">
                    Resolve
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIInsightsPanel;