import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ErrorBoundary from '../components/feedback/ErrorBoundary';
import SuspenseLoading from '../components/feedback/SuspenseLoading';

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#09090b]">
      {/* Sticky header navbar */}
      <Navbar />

      {/* Main scrolling content viewport */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        <div className="flex-1">
          <ErrorBoundary>
            <Suspense fallback={<SuspenseLoading />}>
              <Outlet />
            </Suspense>
          </ErrorBoundary>
        </div>
        {/* Public portal footer */}
        <Footer />
      </main>
    </div>
  );
};

export default PublicLayout;
