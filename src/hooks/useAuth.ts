import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import {
  setCredentials,
  clearCredentials,
  setLoading,
  setError,
  updateUser,
} from '../store/slices/authSlice';
import authApi, { LoginCredentials, RegisterCredentials } from '../services/auth.api';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../constants';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token, isAuthenticated, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const login = async (credentials: LoginCredentials) => {
    dispatch(setLoading(true));
    try {
      const response = await authApi.login(credentials);
      if (response.success && response.data) {
        dispatch(setCredentials(response.data));
        toast.success(response.message || 'Logged in successfully!');
        
        // Redirect to dashboard
        const role = response.data.user.role;
        if (role === 'admin') {
          navigate(PATHS.ADMIN_DASHBOARD);
        } else if (role === 'expert') {
          navigate(PATHS.EXPERT_DASHBOARD);
        } else {
          navigate(PATHS.CUSTOMER_DASHBOARD);
        }
      } else {
        dispatch(setError(response.message || 'Login failed'));
        toast.error(response.message || 'Login failed');
      }
    } catch (err: any) {
      const errMsg = err.response?.data?.message || 'An error occurred during login';
      dispatch(setError(errMsg));
      toast.error(errMsg);
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    dispatch(setLoading(true));
    try {
      const response = await authApi.register(credentials);
      if (response.success && response.data) {
        dispatch(setCredentials(response.data));
        toast.success('Registration successful!');
        
        const role = response.data.user.role;
        if (role === 'expert') {
          navigate(PATHS.EXPERT_DASHBOARD);
        } else {
          navigate(PATHS.CUSTOMER_DASHBOARD);
        }
      } else {
        dispatch(setError(response.message || 'Registration failed'));
        toast.error(response.message || 'Registration failed');
      }
    } catch (err: any) {
      const errMsg = err.response?.data?.message || 'An error occurred during registration';
      dispatch(setError(errMsg));
      toast.error(errMsg);
    }
  };

  const logout = () => {
    dispatch(clearCredentials());
    toast.success('Logged out successfully');
    navigate(PATHS.LOGIN);
  };

  const updateProfile = (data: any) => {
    dispatch(updateUser(data));
  };

  return {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
  };
};

export default useAuth;
