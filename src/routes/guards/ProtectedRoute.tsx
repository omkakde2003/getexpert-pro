import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { PATHS } from '../../constants';
import { UserRole } from '../../types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  if (!isAuthenticated || !user) {
    // Redirect to login but save the current location they tried to go to
    return <Navigate to={PATHS.LOGIN} state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // If authenticated but role is not allowed, redirect to correct home dashboard
    if (user.role === 'admin') {
      return <Navigate to={PATHS.ADMIN_DASHBOARD} replace />;
    } else if (user.role === 'expert') {
      return <Navigate to={PATHS.EXPERT_DASHBOARD} replace />;
    } else {
      return <Navigate to={PATHS.CUSTOMER_DASHBOARD} replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
