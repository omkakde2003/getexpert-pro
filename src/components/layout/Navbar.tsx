import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Bell, Sun, Moon, LogOut, User as UserIcon, Settings, Menu } from 'lucide-react';
import { RootState } from '../../store';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../hooks/useAuth';
import Avatar from '../ui/Avatar';
import Dropdown from '../common/Dropdown';
import Badge from '../ui/Badge';
import { PATHS } from '../../constants';

interface NavbarProps {
  onMenuClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const { notifications } = useSelector((state: RootState) => state.notification);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const userDropdownItems = [
    {
      label: 'My Profile',
      icon: <UserIcon className="w-4 h-4" />,
      onClick: () => {
        if (user?.role === 'admin') window.location.href = PATHS.ADMIN_SETTINGS;
        else if (user?.role === 'expert') window.location.href = PATHS.EXPERT_PROFILE;
        else window.location.href = PATHS.CUSTOMER_PROFILE;
      },
    },
    {
      label: 'Settings',
      icon: <Settings className="w-4 h-4" />,
      onClick: () => {
        if (user?.role === 'admin') window.location.href = PATHS.ADMIN_SETTINGS;
        else if (user?.role === 'expert') window.location.href = PATHS.EXPERT_PROFILE;
        else window.location.href = PATHS.CUSTOMER_SETTINGS;
      },
    },
    {
      label: 'Logout',
      icon: <LogOut className="w-4 h-4 text-red-500" />,
      variant: 'danger' as const,
      onClick: logout,
    },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left Side: Brand Logo */}
        <div className="flex items-center gap-4">
          {onMenuClick && (
            <button
              onClick={onMenuClick}
              className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-zinc-800 lg:hidden cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-lg font-black tracking-tight bg-gradient-to-r from-brand-600 to-indigo-650 bg-clip-text text-transparent">
              GETEXPERT PRO
            </span>
          </Link>
        </div>

        {/* Right Side: Actions */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-zinc-800 transition cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-500" />
            ) : (
              <Moon className="w-4 h-4 text-slate-650" />
            )}
          </button>

          {isAuthenticated && user ? (
            <>
              {/* Notifications */}
              <Link
                to={
                  user.role === 'admin'
                    ? PATHS.ADMIN_NOTIFICATIONS
                    : user.role === 'expert'
                    ? PATHS.EXPERT_NOTIFICATIONS
                    : PATHS.CUSTOMER_NOTIFICATIONS
                }
                className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-zinc-800 transition"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-zinc-900 animate-pulse" />
                )}
              </Link>

              {/* User Dropdown */}
              <Dropdown
                trigger={
                  <div className="flex items-center gap-2 cursor-pointer select-none">
                    <Avatar src={user.avatarUrl} name={user.name} size="sm" />
                    <span className="hidden md:inline text-xs font-semibold text-slate-700 dark:text-zinc-350">
                      {user.name}
                    </span>
                  </div>
                }
                items={userDropdownItems}
              />
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to={PATHS.LOGIN}
                className="text-xs font-bold text-slate-600 hover:text-slate-800 dark:text-zinc-350 dark:hover:text-zinc-150 px-3 py-1.5 transition"
              >
                Sign In
              </Link>
              <Link
                to={PATHS.REGISTER}
                className="text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white px-3.5 py-1.8 rounded-lg shadow-sm transition"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
