import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Star, DollarSign, BookOpen, Clock, Activity, ShieldCheck, CheckCircle, XCircle } from 'lucide-react';
import { RootState } from '../../../store';
import { setBookings, updateBookingStatus } from '../../../store/slices/bookingSlice';
import { setExpertProfile } from '../../../store/slices/expertSlice';
import bookingApi from '../../../services/booking.api';
import expertApi from '../../../services/expert.api';
import { RevenueChart, GrowthChart } from '../../../components/charts/DashboardCharts';
import { MOCK_REVENUE_CHART, MOCK_CUSTOMER_GROWTH } from '../../../utils/mockData';
import Button from '../../../components/ui/Button';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import Table from '../../../components/common/Table';
import { Booking } from '../../../types';
import { toast } from 'react-hot-toast';

export const ExpertDashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state: RootState) => state.expert);
  const { bookings, loading: bookingsLoading } = useSelector((state: RootState) => state.booking);

  useEffect(() => {
    const loadExpertData = async () => {
      try {
        const profileRes = await expertApi.getProfile();
        if (profileRes.success && profileRes.data) dispatch(setExpertProfile(profileRes.data));

        const bookingsRes = await bookingApi.getBookings();
        if (bookingsRes.success) dispatch(setBookings(bookingsRes.data));
      } catch (err) {
        console.error('Error loading expert dashboard:', err);
      }
    };
    loadExpertData();
  }, [dispatch]);

  const handleUpdateStatus = async (bookingId: string, status: Booking['status']) => {
    try {
      const response = await bookingApi.updateBookingStatus(bookingId, status);
      if (response.success) {
        dispatch(updateBookingStatus({ id: bookingId, status }));
        toast.success(`Booking ${status} successfully!`);
      } else {
        toast.error(response.message || 'Status update failed');
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Error updating status');
    }
  };

  // Stats Aggregations
  const totalEarnings = profile?.earnings || 0;
  const rating = profile?.rating || 0.0;
  const completedJobs = bookings.filter((b) => b.status === 'completed').length;
  const pendingRequests = bookings.filter((b) => b.status === 'pending');

  const pendingColumns = [
    {
      header: 'Customer',
      accessor: 'customerName',
    },
    {
      header: 'Service Requested',
      accessor: 'serviceTitle',
    },
    {
      header: 'Scheduled Date',
      accessor: (row: Booking) => new Date(row.scheduledAt).toLocaleDateString(undefined, {
        dateStyle: 'medium',
      }),
    },
    {
      header: 'Price',
      accessor: (row: Booking) => `$${row.price}`,
    },
    {
      header: 'Action Gates',
      accessor: (row: Booking) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/20"
            onClick={() => handleUpdateStatus(row.id, 'confirmed')}
            leftIcon={<CheckCircle className="w-3.5 h-3.5" />}
          >
            Accept
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20"
            onClick={() => handleUpdateStatus(row.id, 'cancelled')}
            leftIcon={<XCircle className="w-3.5 h-3.5" />}
          >
            Decline
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Upper header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
            Expert Portal
          </h1>
          <p className="text-xs text-slate-500 dark:text-zinc-550">
            Monitor availability requests, reviews, and monthly revenue performance.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {profile?.approved ? (
            <Badge variant="success" className="text-xs uppercase px-3 py-1 font-bold">
              Verified Partner
            </Badge>
          ) : (
            <Badge variant="warning" className="text-xs uppercase px-3 py-1 font-bold">
              Approval Pending
            </Badge>
          )}
        </div>
      </div>

      {/* Metrics */}
      <div className="grid gap-6 sm:grid-cols-4">
        <Card className="flex flex-col p-5">
          <span className="text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-slate-400" /> Total Earnings
          </span>
          <span className="text-2xl font-black text-slate-800 dark:text-zinc-100 mt-2">
            ${totalEarnings}
          </span>
        </Card>

        <Card className="flex flex-col p-5">
          <span className="text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-slate-400" /> Average Rating
          </span>
          <span className="text-2xl font-black text-slate-800 dark:text-zinc-100 mt-2">
            {rating} / 5.0
          </span>
        </Card>

        <Card className="flex flex-col p-5">
          <span className="text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-slate-400" /> Completed Jobs
          </span>
          <span className="text-2xl font-black text-slate-800 dark:text-zinc-100 mt-2">
            {completedJobs}
          </span>
        </Card>

        <Card className="flex flex-col p-5">
          <span className="text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-slate-400" /> Pending Requests
          </span>
          <span className="text-2xl font-black text-slate-800 dark:text-zinc-100 mt-2">
            {pendingRequests.length}
          </span>
        </Card>
      </div>

      {/* Analytics Graph Row */}
      <div className="grid gap-6 md:grid-cols-2">
        <RevenueChart data={MOCK_REVENUE_CHART} />
        <GrowthChart data={MOCK_CUSTOMER_GROWTH} />
      </div>

      {/* Pending Deployments */}
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-wider">
          Pending Work Requests
        </h3>
        <Table columns={pendingColumns as any} data={pendingRequests} isLoading={bookingsLoading} />
      </div>
    </div>
  );
};

export default ExpertDashboard;
