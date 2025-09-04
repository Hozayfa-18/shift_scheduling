import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import KPICard from './components/KPICard';
import ShiftTimeline from './components/ShiftTimeline';
import AlertFeed from './components/AlertFeed';
import EmployeeGrid from './components/EmployeeGrid';
import GlobalControls from './components/GlobalControls';

const WorkforceOperationsDashboard = () => {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState('main-office');
  const [dateRange, setDateRange] = useState('today');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  // Mock data
  const locations = [
  { id: 'main-office', name: 'Main Office', employeeCount: 156, activeShifts: 89, pendingShifts: 12, conflicts: 3 },
  { id: 'warehouse-a', name: 'Warehouse A', employeeCount: 203, activeShifts: 145, pendingShifts: 8, conflicts: 1 },
  { id: 'retail-downtown', name: 'Retail Downtown', employeeCount: 87, activeShifts: 62, pendingShifts: 5, conflicts: 2 },
  { id: 'manufacturing', name: 'Manufacturing Plant', employeeCount: 312, activeShifts: 278, pendingShifts: 15, conflicts: 4 }];


  const kpiData = [
  {
    title: 'Current Shift Coverage',
    value: '94',
    unit: '%',
    trend: 'up',
    trendValue: '+2.3%',
    status: 'good',
    icon: 'Users',
    color: 'bg-success',
    sparklineData: [85, 87, 89, 91, 93, 94, 96, 94]
  },
  {
    title: 'Active Employees',
    value: '89',
    unit: 'of 156',
    trend: 'up',
    trendValue: '+5',
    status: 'good',
    icon: 'UserCheck',
    color: 'bg-primary',
    sparklineData: [82, 84, 86, 87, 88, 89, 91, 89]
  },
  {
    title: 'Unassigned Shifts',
    value: '12',
    unit: 'shifts',
    trend: 'down',
    trendValue: '-3',
    status: 'warning',
    icon: 'Calendar',
    color: 'bg-warning',
    sparklineData: [18, 16, 15, 14, 13, 12, 11, 12]
  },
  {
    title: 'Overtime Hours',
    value: '23.5',
    unit: 'hrs',
    trend: 'up',
    trendValue: '+4.2h',
    status: 'critical',
    icon: 'Clock',
    color: 'bg-error',
    sparklineData: [15, 17, 19, 21, 22, 23, 24, 23.5]
  }];


  const shiftData = [
  { hour: 0, current: 12, required: 15, hasConflict: false },
  { hour: 1, current: 10, required: 12, hasConflict: false },
  { hour: 2, current: 8, required: 10, hasConflict: false },
  { hour: 3, current: 8, required: 10, hasConflict: false },
  { hour: 4, current: 10, required: 12, hasConflict: false },
  { hour: 5, current: 15, required: 18, hasConflict: true },
  { hour: 6, current: 25, required: 30, hasConflict: false },
  { hour: 7, current: 35, required: 40, hasConflict: false },
  { hour: 8, current: 45, required: 50, hasConflict: true },
  { hour: 9, current: 48, required: 50, hasConflict: false },
  { hour: 10, current: 50, required: 50, hasConflict: false },
  { hour: 11, current: 52, required: 50, hasConflict: false },
  { hour: 12, current: 48, required: 50, hasConflict: false },
  { hour: 13, current: 46, required: 50, hasConflict: false },
  { hour: 14, current: 44, required: 50, hasConflict: true },
  { hour: 15, current: 42, required: 48, hasConflict: false },
  { hour: 16, current: 40, required: 45, hasConflict: false },
  { hour: 17, current: 35, required: 40, hasConflict: false },
  { hour: 18, current: 30, required: 35, hasConflict: false },
  { hour: 19, current: 25, required: 30, hasConflict: false },
  { hour: 20, current: 20, required: 25, hasConflict: false },
  { hour: 21, current: 18, required: 20, hasConflict: false },
  { hour: 22, current: 15, required: 18, hasConflict: false },
  { hour: 23, current: 12, required: 15, hasConflict: false }];


  const alerts = [
  {
    id: 1,
    title: 'Critical Staffing Gap',
    message: 'Morning shift (8-9 AM) is understaffed by 5 employees. Immediate action required.',
    severity: 'critical',
    timestamp: new Date(Date.now() - 300000),
    location: 'Main Office',
    actionable: true,
    resolvable: true,
    quickActions: [
    { label: 'Auto-assign', icon: 'Zap', handler: () => console.log('Auto-assign') },
    { label: 'Call backup', icon: 'Phone', handler: () => console.log('Call backup') }]

  },
  {
    id: 2,
    title: 'Employee Late Arrival',
    message: 'Sarah Johnson is 15 minutes late for her shift. Coverage may be affected.',
    severity: 'warning',
    timestamp: new Date(Date.now() - 900000),
    location: 'Warehouse A',
    actionable: true,
    resolvable: true,
    quickActions: [
    { label: 'Contact', icon: 'MessageCircle', handler: () => console.log('Contact') },
    { label: 'Find replacement', icon: 'UserPlus', handler: () => console.log('Replace') }]

  },
  {
    id: 3,
    title: 'Overtime Threshold Exceeded',
    message: 'Department has exceeded weekly overtime budget by $2,340. Review scheduling optimization.',
    severity: 'warning',
    timestamp: new Date(Date.now() - 1800000),
    location: 'Manufacturing',
    actionable: true,
    resolvable: false,
    quickActions: [
    { label: 'View details', icon: 'BarChart3', handler: () => console.log('View details') }]

  },
  {
    id: 4,
    title: 'Schedule Conflict Detected',
    message: 'Mike Chen is assigned to overlapping shifts. Automatic resolution failed.',
    severity: 'critical',
    timestamp: new Date(Date.now() - 600000),
    location: 'Retail Downtown',
    actionable: true,
    resolvable: true,
    quickActions: [
    { label: 'Resolve', icon: 'CheckCircle', handler: () => console.log('Resolve') },
    { label: 'Reassign', icon: 'RotateCcw', handler: () => console.log('Reassign') }]

  },
  {
    id: 5,
    title: 'New Shift Request',
    message: 'Emma Davis requested additional hours for weekend shift. Approval pending.',
    severity: 'info',
    timestamp: new Date(Date.now() - 2700000),
    location: 'Main Office',
    actionable: true,
    resolvable: true,
    quickActions: [
    { label: 'Approve', icon: 'Check', handler: () => console.log('Approve') },
    { label: 'Decline', icon: 'X', handler: () => console.log('Decline') }]

  }];


  const employees = [
  {
    id: 1,
    name: 'Sarah Johnson',
    department: 'Customer Service',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
    skills: ['Customer Support', 'Phone Systems', 'CRM'],
    hoursWorked: 6.5,
    nextShift: '2:00 PM',
    currentAssignment: 'Help Desk - Station 3'
  },
  {
    id: 2,
    name: 'Mike Chen',
    department: 'Warehouse',
    status: 'scheduled',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    skills: ['Forklift', 'Inventory', 'Safety'],
    hoursWorked: 4.0,
    nextShift: '10:00 AM',
    currentAssignment: null
  },
  {
    id: 3,
    name: 'Emma Davis',
    department: 'Sales',
    status: 'break',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    skills: ['Sales', 'Product Knowledge', 'POS'],
    hoursWorked: 5.5,
    nextShift: '1:00 PM',
    currentAssignment: 'Floor Sales - Section B'
  },
  {
    id: 4,
    name: 'James Wilson',
    department: 'Maintenance',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    skills: ['Electrical', 'Plumbing', 'HVAC'],
    hoursWorked: 7.0,
    nextShift: 'Tomorrow 8:00 AM',
    currentAssignment: 'Building Maintenance'
  },
  {
    id: 5,
    name: 'Lisa Rodriguez',
    department: 'Security',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150',
    skills: ['Security Systems', 'First Aid', 'Patrol'],
    hoursWorked: 8.0,
    nextShift: '11:00 PM',
    currentAssignment: 'Main Entrance'
  },
  {
    id: 6,
    name: 'David Kim',
    department: 'IT Support',
    status: 'unavailable',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    skills: ['Network Admin', 'Hardware', 'Software'],
    hoursWorked: 0,
    nextShift: 'Tomorrow 9:00 AM',
    currentAssignment: null
  },
  {
    id: 7,
    name: 'Maria Garcia',
    department: 'Cleaning',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150',
    skills: ['Sanitation', 'Equipment', 'Chemicals'],
    hoursWorked: 3.5,
    nextShift: '6:00 PM',
    currentAssignment: 'Office Areas - Floor 2'
  },
  {
    id: 8,
    name: 'Robert Taylor',
    department: 'Loading Dock',
    status: 'scheduled',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150',
    skills: ['Loading', 'Shipping', 'Documentation'],
    hoursWorked: 2.0,
    nextShift: '3:00 PM',
    currentAssignment: null
  }];


  // Auto-refresh effect
  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        setLastRefresh(new Date());
      }, 15 * 60 * 1000); // 15 minutes

      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleManualRefresh = async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLastRefresh(new Date());
  };

  const handleAssignShift = (employee, hour) => {
    console.log(`Assigning ${employee?.name} to ${hour}:00`);
    // Handle shift assignment logic
  };

  const handleResolveAlert = (alertId) => {
    console.log(`Resolving alert ${alertId}`);
    // Handle alert resolution logic
  };

  const handleViewEmployee = (employee) => {
    console.log(`Viewing employee details for ${employee?.name}`);
    // Handle employee detail view
  };

  const handleUpdateAvailability = (employee) => {
    console.log(`Updating availability for ${employee?.name}`);
    // Handle availability update
  };

  const handleViewAlertDetails = (alert) => {
    console.log(`Viewing alert details:`, alert);
    // Handle alert detail view
  };

  const handleResolveConflict = (conflictId) => {
    console.log(`Resolving conflict ${conflictId}`);
    // Handle conflict resolution
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        userRole="manager"
        onNavigate={handleNavigation}
        refreshStatus={{ lastRefresh, isConnected: true }} />

      <main className="pt-16">
        <div className="max-w-7xl mx-auto p-6">
          {/* Page Title */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Real-Time Workforce
            </h1>
            <p className="text-gray-600 text-base">AI-powered scheduling with live monitoring, shift management, employee tracking, and comprehensive operational oversight.

            </p>
          </div>

          {/* Global Controls */}
          <GlobalControls
            selectedLocation={selectedLocation}
            onLocationChange={setSelectedLocation}
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            autoRefresh={autoRefresh}
            onAutoRefreshToggle={() => setAutoRefresh(!autoRefresh)}
            lastRefresh={lastRefresh}
            onManualRefresh={handleManualRefresh}
            locations={locations} />


          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
            {kpiData?.map((kpi, index) =>
            <KPICard key={index} {...kpi} />
            )}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-6">
            {/* Shift Timeline */}
            <div className="xl:col-span-8">
              <ShiftTimeline
                shiftData={shiftData}
                onAssignShift={handleAssignShift}
                onResolveConflict={handleResolveConflict} />

            </div>

            {/* Alert Feed */}
            <div className="xl:col-span-4">
              <AlertFeed
                alerts={alerts}
                onResolveAlert={handleResolveAlert}
                onViewDetails={handleViewAlertDetails} />

            </div>
          </div>

          {/* Employee Grid */}
          <EmployeeGrid
            employees={employees}
            onAssignShift={handleAssignShift}
            onViewEmployee={handleViewEmployee}
            onUpdateAvailability={handleUpdateAvailability} />

        </div>
      </main>
    </div>);

};

export default WorkforceOperationsDashboard;