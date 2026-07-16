import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { store } from './store';
import { ThemeProvider } from './contexts/ThemeContext';
import { SocketProvider } from './contexts/SocketContext';
import AppRoutes from './routes';

// Initialize React Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

export const App: React.FC = () => {
  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <SocketProvider>
            <BrowserRouter>
              {/* React Hot Toast Global Notification Container */}
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: '#18181b',
                    color: '#f4f4f5',
                    border: '1px solid #27272a',
                    fontSize: '13px',
                    fontWeight: 600,
                    borderRadius: '8px',
                  },
                  success: {
                    iconTheme: {
                      primary: '#10b981',
                      secondary: '#ffffff',
                    },
                  },
                }}
              />
              
              {/* Application Secure Routing Map */}
              <AppRoutes />
            </BrowserRouter>
          </SocketProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ReduxProvider>
  );
};

export default App;
