import React, { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PATHS } from '../constants';

// Layouts
import PublicLayout from '../layouts/PublicLayout';
import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';

// Guards
import ProtectedRoute from './guards/ProtectedRoute';
import PublicRoute from './guards/PublicRoute';

// Lazy Pages
const LandingPage = lazy(() => import('../pages/LandingPage'));
const LoginPage = lazy(() => import('../features/auth/pages/LoginPage'));
const RegisterPage = lazy(() => import('../features/auth/pages/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('../features/auth/pages/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('../features/auth/pages/ResetPasswordPage'));

// Generic Placeholder
const PlaceholderPage = lazy(() => import('../pages/PlaceholderPage'));

const CustomerDashboard = lazy(() => import('../features/customer/pages/CustomerDashboard'));
const ExpertDashboard = lazy(() => import('../features/expert/pages/ExpertDashboard'));
const AdminDashboard = lazy(() => import('../features/admin/pages/AdminDashboard'));

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* 1. Public Portal Routes */}
      <Route element={<PublicLayout />}>
        <Route path={PATHS.LANDING} element={<LandingPage />} />
        <Route path={PATHS.ABOUT} element={<PlaceholderPage title="About Us" />} />
        <Route path={PATHS.SERVICES} element={<PlaceholderPage title="Our Services" />} />
        <Route path={PATHS.PRICING} element={<PlaceholderPage title="Pricing Tables" />} />
        <Route path={PATHS.EXPERTS} element={<PlaceholderPage title="Our Experts" />} />
        <Route path={PATHS.CONTACT} element={<PlaceholderPage title="Contact Us" />} />
        <Route path={PATHS.BLOGS} element={<PlaceholderPage title="Blogs & Articles" />} />
        <Route path={PATHS.FAQS} element={<PlaceholderPage title="Frequently Asked Questions" />} />
        <Route path={PATHS.PRIVACY} element={<PlaceholderPage title="Privacy Policy" />} />
        <Route path={PATHS.TERMS} element={<PlaceholderPage title="Terms of Service" />} />
      </Route>

      {/* 2. Authentication Gateway Routes (Only for Guests) */}
      <Route element={<PublicRoute><AuthLayout /></PublicRoute>}>
        <Route path={PATHS.LOGIN} element={<LoginPage />} />
        <Route path={PATHS.REGISTER} element={<RegisterPage />} />
        <Route path={PATHS.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
        <Route path={PATHS.RESET_PASSWORD} element={<ResetPasswordPage />} />
      </Route>

      {/* 3. Customer Secure Portal */}
      <Route
        path="/customer"
        element={
          <ProtectedRoute allowedRoles={['customer']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to={PATHS.CUSTOMER_DASHBOARD} replace />} />
        <Route path="dashboard" element={<CustomerDashboard />} />
        <Route path="profile" element={<PlaceholderPage title="Customer Profile" />} />
        <Route path="bookings" element={<PlaceholderPage title="My Bookings" />} />
        <Route path="invoices" element={<PlaceholderPage title="My Invoices" />} />
        <Route path="notifications" element={<PlaceholderPage title="Customer Notifications" />} />
        <Route path="messages" element={<PlaceholderPage title="Customer Messages" />} />
        <Route path="settings" element={<PlaceholderPage title="Customer Settings" />} />
        <Route path="wishlist" element={<PlaceholderPage title="My Wishlist" />} />
        <Route path="reviews" element={<PlaceholderPage title="My Reviews" />} />
      </Route>

      {/* 4. Expert Secure Portal */}
      <Route
        path="/expert"
        element={
          <ProtectedRoute allowedRoles={['expert']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to={PATHS.EXPERT_DASHBOARD} replace />} />
        <Route path="dashboard" element={<ExpertDashboard />} />
        <Route path="profile" element={<PlaceholderPage title="Expert Profile" />} />
        <Route path="calendar" element={<PlaceholderPage title="Availability Calendar" />} />
        <Route path="services" element={<PlaceholderPage title="My Services Catalog" />} />
        <Route path="bookings" element={<PlaceholderPage title="Expert Bookings" />} />
        <Route path="customers" element={<PlaceholderPage title="My Customers" />} />
        <Route path="reviews" element={<PlaceholderPage title="Customer Reviews" />} />
        <Route path="analytics" element={<PlaceholderPage title="Expert Analytics" />} />
        <Route path="earnings" element={<PlaceholderPage title="Earnings Logs" />} />
        <Route path="notifications" element={<PlaceholderPage title="Expert Notifications" />} />
        <Route path="messages" element={<PlaceholderPage title="Expert Messages" />} />
      </Route>

      {/* 5. Admin Secure Portal */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to={PATHS.ADMIN_DASHBOARD} replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<PlaceholderPage title="User Accounts Management" />} />
        <Route path="expert-approval" element={<PlaceholderPage title="Expert Credentials Approvals" />} />
        <Route path="bookings" element={<PlaceholderPage title="System Bookings Registry" />} />
        <Route path="categories" element={<PlaceholderPage title="Marketplace Categories" />} />
        <Route path="services" element={<PlaceholderPage title="Marketplace Services" />} />
        <Route path="reports" element={<PlaceholderPage title="System Reports" />} />
        <Route path="analytics" element={<PlaceholderPage title="Global Analytics" />} />
        <Route path="revenue" element={<PlaceholderPage title="Global Revenue Analytics" />} />
        <Route path="support" element={<PlaceholderPage title="Customer Support Tickets" />} />
        <Route path="notifications" element={<PlaceholderPage title="Admin Notifications" />} />
        <Route path="cms" element={<PlaceholderPage title="CMS Content Management" />} />
        <Route path="settings" element={<PlaceholderPage title="Global Site Settings" />} />
        <Route path="audit-logs" element={<PlaceholderPage title="System Audit Logs" />} />
      </Route>

      {/* Fallback to Home */}
      <Route path="*" element={<Navigate to={PATHS.LANDING} replace />} />
    </Routes>
  );
};

export default AppRoutes;
