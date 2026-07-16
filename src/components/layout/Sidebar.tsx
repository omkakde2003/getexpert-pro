import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  Wrench,
  BookOpen,
  Users,
  DollarSign,
  MessageSquare,
  Star,
  Settings,
  ShieldCheck,
  FileText,
  Heart,
  BarChart3,
  LogOut,
  HelpCircle,
  History,
  FolderTree,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { PATHS } from '../../constants';

interface SidebarProps {
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const { user, logout } = useAuth();

  const getLinksByRole = () => {
    if (!user) return [];

    switch (user.role) {
      case 'admin':
        return [
          { label: 'Dashboard', path: PATHS.ADMIN_DASHBOARD, icon: <LayoutDashboard className="w-4 h-4" /> },
          { label: 'User Management', path: PATHS.ADMIN_USERS, icon: <Users className="w-4 h-4" /> },
          { label: 'Expert Approvals', path: PATHS.ADMIN_EXPERT_APPROVAL, icon: <ShieldCheck className="w-4 h-4" /> },
          { label: 'Bookings', path: PATHS.ADMIN_BOOKINGS, icon: <BookOpen className="w-4 h-4" /> },
          { label: 'Services Catalog', path: PATHS.ADMIN_SERVICES, icon: <Wrench className="w-4 h-4" /> },
          { label: 'Revenue Analytics', path: PATHS.ADMIN_REVENUE, icon: <DollarSign className="w-4 h-4" /> },
          { label: 'Support Tickets', path: PATHS.ADMIN_SUPPORT, icon: <HelpCircle className="w-4 h-4" /> },
          { label: 'CMS', path: PATHS.ADMIN_CMS, icon: <FolderTree className="w-4 h-4" /> },
          { label: 'Audit Logs', path: PATHS.ADMIN_AUDIT_LOGS, icon: <History className="w-4 h-4" /> },
          { label: 'Settings', path: PATHS.ADMIN_SETTINGS, icon: <Settings className="w-4 h-4" /> },
        ];
      case 'expert':
        return [
          { label: 'Dashboard', path: PATHS.EXPERT_DASHBOARD, icon: <LayoutDashboard className="w-4 h-4" /> },
          { label: 'Availability', path: PATHS.EXPERT_CALENDAR, icon: <Calendar className="w-4 h-4" /> },
          { label: 'My Services', path: PATHS.EXPERT_SERVICES, icon: <Wrench className="w-4 h-4" /> },
          { label: 'Bookings', path: PATHS.EXPERT_BOOKINGS, icon: <BookOpen className="w-4 h-4" /> },
          { label: 'My Customers', path: PATHS.EXPERT_CUSTOMERS, icon: <Users className="w-4 h-4" /> },
          { label: 'Earnings', path: PATHS.EXPERT_EARNINGS, icon: <DollarSign className="w-4 h-4" /> },
          { label: 'Reviews', path: PATHS.EXPERT_REVIEWS, icon: <Star className="w-4 h-4" /> },
          { label: 'Messages', path: PATHS.EXPERT_MESSAGES, icon: <MessageSquare className="w-4 h-4" /> },
          { label: 'Analytics', path: PATHS.EXPERT_ANALYTICS, icon: <BarChart3 className="w-4 h-4" /> },
        ];
      case 'customer':
      default:
        return [
          { label: 'Dashboard', path: PATHS.CUSTOMER_DASHBOARD, icon: <LayoutDashboard className="w-4 h-4" /> },
          { label: 'My Bookings', path: PATHS.CUSTOMER_BOOKINGS, icon: <BookOpen className="w-4 h-4" /> },
          { label: 'Invoices', path: PATHS.CUSTOMER_INVOICES, icon: <FileText className="w-4 h-4" /> },
          { label: 'Messages', path: PATHS.CUSTOMER_MESSAGES, icon: <MessageSquare className="w-4 h-4" /> },
          { label: 'Wishlist', path: PATHS.CUSTOMER_WISHLIST, icon: <Heart className="w-4 h-4" /> },
          { label: 'Reviews Given', path: PATHS.CUSTOMER_REVIEWS, icon: <Star className="w-4 h-4" /> },
          { label: 'Settings', path: PATHS.CUSTOMER_SETTINGS, icon: <Settings className="w-4 h-4" /> },
        ];
    }
  };

  const links = getLinksByRole();

  return (
    <aside className="w-64 h-full bg-slate-900 border-r border-slate-800 text-slate-400 flex flex-col justify-between">
      {/* Header Profile Summary */}
      <div className="flex-1 overflow-y-auto py-6 px-4">
        {user && (
          <div className="flex items-center gap-3 mb-8 px-2">
            <div className="w-10 h-10 rounded-full border border-slate-700 overflow-hidden bg-slate-800 flex items-center justify-center font-bold text-white">
              {user.name.substring(0, 2).toUpperCase()}
            </div>
            <div className="flex flex-col truncate">
              <span className="text-sm font-bold text-slate-100">{user.name}</span>
              <span className="text-[10px] uppercase font-bold text-brand-400 tracking-wider">
                {user.role} Portal
              </span>
            </div>
          </div>
        )}

        {/* Links List */}
        <nav className="flex flex-col gap-1">
          {links.map((link, idx) => (
            <NavLink
              key={idx}
              to={link.path}
              onClick={onClose}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150 cursor-pointer
                ${
                  isActive
                    ? 'bg-slate-800 text-white font-bold border-l-2 border-brand-500 rounded-l-none'
                    : 'hover:bg-slate-800/50 hover:text-slate-100'
                }
              `}
            >
              {link.icon}
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Logout Footer Section */}
      <div className="p-4 border-t border-slate-850">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium hover:bg-slate-800/80 hover:text-white rounded-lg transition-colors cursor-pointer text-red-400/80"
        >
          <LogOut className="w-4 h-4" />
          Logout Session
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
