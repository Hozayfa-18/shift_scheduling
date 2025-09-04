import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const CorrelationHeatmap = ({ onEmployeeSelect }) => {
  const [selectedCell, setSelectedCell] = useState(null);
  const [hoveredCell, setHoveredCell] = useState(null);

  const correlationData = [
    { metric: 'Morning Shifts', performance: 0.85, satisfaction: 0.72, retention: 0.68, overtime: -0.23 },
    { metric: 'Evening Shifts', performance: 0.78, satisfaction: 0.65, retention: 0.71, overtime: 0.15 },
    { metric: 'Night Shifts', performance: 0.62, satisfaction: 0.45, retention: 0.52, overtime: 0.45 },
    { metric: 'Weekend Work', performance: 0.71, satisfaction: 0.58, retention: 0.63, overtime: 0.32 },
    { metric: 'Overtime Hours', performance: -0.15, satisfaction: -0.42, retention: -0.38, overtime: 1.0 },
    { metric: 'Flexible Schedule', performance: 0.89, satisfaction: 0.91, retention: 0.87, overtime: -0.45 }
  ];

  const columns = ['Performance', 'Satisfaction', 'Retention', 'Overtime'];

  const getCorrelationValue = (row, col) => {
    const colMap = { 'Performance': 'performance', 'Satisfaction': 'satisfaction', 'Retention': 'retention', 'Overtime': 'overtime' };
    return row?.[colMap?.[col]];
  };

  const getHeatmapColor = (value) => {
    const absValue = Math.abs(value);
    if (value > 0) {
      if (absValue >= 0.8) return 'bg-success text-white shadow-lg';
      if (absValue >= 0.6) return 'bg-success/80 text-white shadow-md';
      if (absValue >= 0.4) return 'bg-success/60 text-foreground shadow-sm';
      if (absValue >= 0.2) return 'bg-success/40 text-foreground';
      return 'bg-success/20 text-foreground';
    } else {
      if (absValue >= 0.8) return 'bg-error text-white shadow-lg';
      if (absValue >= 0.6) return 'bg-error/80 text-white shadow-md';
      if (absValue >= 0.4) return 'bg-error/60 text-foreground shadow-sm';
      if (absValue >= 0.2) return 'bg-error/40 text-foreground';
      return 'bg-error/20 text-foreground';
    }
  };

  const handleCellClick = (metric, column, value) => {
    setSelectedCell({ metric, column, value });
    if (onEmployeeSelect) {
      onEmployeeSelect({ metric, column, value });
    }
  };

  return (
    <div className="bg-gradient-to-br from-card via-card to-muted/30 border border-border rounded-xl p-6 shadow-elevation-2 backdrop-blur-sm">
      {/* Enhanced Header Section */}
      <div className="flex items-center justify-between mb-6 p-4 bg-gradient-to-r from-muted/40 to-muted/20 rounded-lg border border-muted/50 backdrop-blur-sm">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Performance Correlation Matrix</h3>
          <p className="text-sm text-muted-foreground">
            Correlation between scheduling patterns and performance metrics
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-background/60 rounded-full px-3 py-2 border border-border/50">
          <Icon name="Info" size={16} className="text-primary" />
          <span className="text-xs text-muted-foreground">Click cells for detailed analysis</span>
        </div>
      </div>

      {/* Enhanced Matrix Container */}
      <div className="relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/50 to-muted/30 rounded-lg opacity-60"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.03),transparent_70%)] rounded-lg"></div>
        
        <div className="relative overflow-x-auto bg-background/40 backdrop-blur-sm rounded-lg border border-border/30 p-4">
          <div className="min-w-full">
            {/* Enhanced Header */}
            <div className="grid grid-cols-5 gap-3 mb-3">
              <div className="p-3 bg-gradient-to-r from-muted/30 to-muted/20 rounded-md border border-border/30"></div>
              {columns?.map((col) => (
                <div key={col} className="p-3 text-center bg-gradient-to-b from-primary/10 to-primary/5 rounded-md border border-primary/20">
                  <span className="text-sm font-semibold text-foreground">{col}</span>
                </div>
              ))}
            </div>

            {/* Enhanced Data Rows */}
            {correlationData?.map((row, rowIndex) => (
              <div key={rowIndex} className="grid grid-cols-5 gap-3 mb-3">
                <div className="p-3 flex items-center bg-gradient-to-r from-muted/30 to-muted/20 rounded-md border border-border/30">
                  <span className="text-sm font-semibold text-foreground">{row?.metric}</span>
                </div>
                {columns?.map((col, colIndex) => {
                  const value = getCorrelationValue(row, col);
                  const cellKey = `${rowIndex}-${colIndex}`;
                  const isSelected = selectedCell?.metric === row?.metric && selectedCell?.column === col;
                  const isHovered = hoveredCell === cellKey;
                  
                  return (
                    <div
                      key={colIndex}
                      className={`
                        p-4 rounded-lg cursor-pointer transition-all duration-300 text-center relative border border-white/20
                        ${getHeatmapColor(value)}
                        ${isSelected ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}
                        ${isHovered ? 'scale-110 z-10 shadow-elevation-4 border-white/40' : ''}
                        hover:brightness-110
                      `}
                      onClick={() => handleCellClick(row?.metric, col, value)}
                      onMouseEnter={() => setHoveredCell(cellKey)}
                      onMouseLeave={() => setHoveredCell(null)}
                    >
                      <span className="text-sm font-bold drop-shadow-sm">
                        {value > 0 ? '+' : ''}{(value * 100)?.toFixed(0)}%
                      </span>
                      {isHovered && (
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-4 py-3 bg-popover backdrop-blur-sm border-2 border-border/80 rounded-lg shadow-elevation-4 z-20 whitespace-nowrap">
                          <div className="text-xs text-popover-foreground">
                            <div className="font-semibold mb-1">{row?.metric} vs {col}</div>
                            <div className="text-muted-foreground">
                              Correlation: <span className="font-medium">{value > 0 ? 'Positive' : 'Negative'}</span> ({Math.abs(value * 100)?.toFixed(1)}%)
                            </div>
                          </div>
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-popover"></div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Legend */}
      <div className="mt-6 p-4 bg-gradient-to-r from-background/60 to-muted/30 rounded-lg border border-border/50 backdrop-blur-sm">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center flex-wrap gap-6">
            <span className="text-sm font-medium text-foreground">Correlation Strength:</span>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-error rounded-md shadow-sm border border-error/30"></div>
                <span className="text-sm text-muted-foreground font-medium">Negative</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-muted rounded-md shadow-sm border border-muted/50"></div>
                <span className="text-sm text-muted-foreground font-medium">Neutral</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-success rounded-md shadow-sm border border-success/30"></div>
                <span className="text-sm text-muted-foreground font-medium">Positive</span>
              </div>
            </div>
          </div>
          
          {selectedCell && (
            <div className="text-sm text-muted-foreground bg-background/80 px-3 py-2 rounded-md border border-border/50 backdrop-blur-sm">
              <span className="font-medium">Selected:</span> {selectedCell?.metric} → {selectedCell?.column} 
              <span className="font-semibold text-foreground ml-1">({(selectedCell?.value * 100)?.toFixed(1)}%)</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CorrelationHeatmap;