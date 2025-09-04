import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ userRole = 'manager', onNavigate, refreshStatus = { lastRefresh: new Date(), isConnected: true } }) => {
  const location = useLocation();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Operations',
      path: '/workforce-operations-dashboard',
      icon: 'Monitor',
      roles: ['supervisor', 'manager', 'director'],
      tooltip: 'Real-time workforce monitoring'
    },
    {
      label: 'Optimization',
      path: '/ai-powered-scheduling-optimization-dashboard',
      icon: 'Brain',
      roles: ['manager', 'director'],
      tooltip: 'AI-powered scheduling analytics'
    },
    {
      label: 'Performance',
      path: '/employee-performance-analytics-dashboard',
      icon: 'TrendingUp',
      roles: ['manager', 'director', 'hr'],
      tooltip: 'Employee analytics and insights'
    },
    {
      label: 'Executive',
      path: '/executive-workforce-intelligence-dashboard',
      icon: 'BarChart3',
      roles: ['director', 'executive'],
      tooltip: 'Strategic workforce intelligence'
    }
  ];

  const quickActions = [
    { icon: 'Download', label: 'Export', action: 'export' },
    { icon: 'Printer', label: 'Print', action: 'print' },
    { icon: 'Bell', label: 'Alerts', action: 'alerts', hasNotification: true }
  ];

  const filteredNavigation = navigationItems?.filter(item => 
    item?.roles?.includes(userRole)
  );

  const handleNavigation = (path) => {
    if (onNavigate) {
      onNavigate(path);
    }
    setIsMobileMenuOpen(false);
  };

  const handleQuickAction = (action) => {
    console.log(`Quick action: ${action}`);
  };

  const formatLastRefresh = (date) => {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isUserMenuOpen && !event?.target?.closest('.user-menu')) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isUserMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-100 bg-card border-b border-border shadow-elevation-1">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Zap" size={20} color="white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-foreground">ShiftIQ</span>
              <span className="text-xs text-muted-foreground -mt-1">Analytics</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {filteredNavigation?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-smooth
                  ${location?.pathname === item?.path
                    ? 'bg-primary text-primary-foreground shadow-elevation-1'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }
                `}
                title={item?.tooltip}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Data Refresh Status */}
          <div className="hidden md:flex items-center space-x-2 text-xs text-muted-foreground">
            <div className={`w-2 h-2 rounded-full ${refreshStatus?.isConnected ? 'bg-success' : 'bg-error'}`} />
            <span>Updated {formatLastRefresh(refreshStatus?.lastRefresh)}</span>
          </div>

          {/* Quick Actions */}
          <div className="hidden lg:flex items-center space-x-1">
            {quickActions?.map((action) => (
              <button
                key={action?.action}
                onClick={() => handleQuickAction(action?.action)}
                className="relative p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-smooth"
                title={action?.label}
              >
                <Icon name={action?.icon} size={18} />
                {action?.hasNotification && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* User Menu */}
          <div className="relative user-menu">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted transition-smooth"
            >
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <div className="hidden md:block text-left">
                <div className="text-sm font-medium text-foreground capitalize">{userRole}</div>
                <div className="text-xs text-muted-foreground">Workforce Manager</div>
              </div>
              <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-popover border border-border rounded-md shadow-elevation-3 animate-fade-in">
                <div className="p-3 border-b border-border">
                  <div className="text-sm font-medium text-popover-foreground">John Smith</div>
                  <div className="text-xs text-muted-foreground">john.smith@company.com</div>
                </div>
                <div className="py-1">
                  <button className="w-full px-3 py-2 text-left text-sm text-popover-foreground hover:bg-muted flex items-center space-x-2">
                    <Icon name="Settings" size={16} />
                    <span>Settings</span>
                  </button>
                  <button className="w-full px-3 py-2 text-left text-sm text-popover-foreground hover:bg-muted flex items-center space-x-2">
                    <Icon name="HelpCircle" size={16} />
                    <span>Help & Support</span>
                  </button>
                  <div className="border-t border-border my-1" />
                  <button className="w-full px-3 py-2 text-left text-sm text-error hover:bg-muted flex items-center space-x-2">
                    <Icon name="LogOut" size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-smooth"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-card border-t border-border shadow-elevation-2">
          <div className="px-4 py-3 space-y-1">
            {filteredNavigation?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`
                  w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-smooth
                  ${location?.pathname === item?.path
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }
                `}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
              </button>
            ))}
            
            <div className="border-t border-border my-2" />
            
            {quickActions?.map((action) => (
              <button
                key={action?.action}
                onClick={() => handleQuickAction(action?.action)}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
              >
                <Icon name={action?.icon} size={18} />
                <span>{action?.label}</span>
                {action?.hasNotification && (
                  <div className="w-2 h-2 bg-error rounded-full ml-auto" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;