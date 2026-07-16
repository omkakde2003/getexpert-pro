import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import Footer from '../components/layout/Footer';
import Drawer from '../components/common/Drawer';
import ErrorBoundary from '../components/feedback/ErrorBoundary';
import { Suspense } from 'react';
import SuspenseLoading from '../components/feedback/SuspenseLoading';

export const DashboardLayout: React.FC = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#09090b]">
      {/* Sticky Top Header */}
      <Navbar onMenuClick={() => setIsMobileSidebarOpen(true)} />

      {/* Main Viewport Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar (visible on lg screens) */}
        <div className="hidden lg:block h-[calc(100vh-64px)] shrink-0 sticky top-16">
          <Sidebar />
        </div>

        {/* Mobile Sidebar (represented as an overlay drawer) */}
        <Drawer
          isOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
          title="Navigation Menu"
          position="left"
          size="sm"
        >
          <div className="h-full -mx-6 -my-4">
            <Sidebar onClose={() => setIsMobileSidebarOpen(false)} />
          </div>
        </Drawer>

        {/* Dashboard Main Content Port */}
        <main className="flex-1 flex flex-col min-w-0 overflow-y-auto h-[calc(100vh-64px)]">
          <div className="flex-1 p-6 md:p-8">
            <ErrorBoundary>
              <Suspense fallback={<SuspenseLoading />}>
                <Outlet />
              </Suspense>
            </ErrorBoundary>
          </div>
          {/* Dashboard Footer */}
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
