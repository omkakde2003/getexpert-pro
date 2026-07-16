import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { PATHS } from '../../constants';

interface PublicRouteProps {
  children: React.ReactNode;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  if (isAuthenticated && user) {
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

export default PublicRoute;
