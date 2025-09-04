import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AIPoweredSchedulingOptimizationDashboard from './pages/ai-powered-scheduling-optimization-dashboard';
import WorkforceOperationsDashboard from './pages/workforce-operations-dashboard';
import ExecutiveWorkforceIntelligenceDashboard from './pages/executive-workforce-intelligence-dashboard';
import EmployeePerformanceAnalyticsDashboard from './pages/employee-performance-analytics-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AIPoweredSchedulingOptimizationDashboard />} />
        <Route path="/ai-powered-scheduling-optimization-dashboard" element={<AIPoweredSchedulingOptimizationDashboard />} />
        <Route path="/workforce-operations-dashboard" element={<WorkforceOperationsDashboard />} />
        <Route path="/executive-workforce-intelligence-dashboard" element={<ExecutiveWorkforceIntelligenceDashboard />} />
        <Route path="/employee-performance-analytics-dashboard" element={<EmployeePerformanceAnalyticsDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
