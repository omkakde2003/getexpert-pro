import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Users, ShieldAlert, Award, TrendingUp, Check, ShieldClose } from 'lucide-react';
import { RootState } from '../../../store';
import { setExpertsList } from '../../../store/slices/expertSlice';
import expertApi from '../../../services/expert.api';
import Button from '../../../components/ui/Button';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import Table from '../../../components/common/Table';
import { RevenueChart, GrowthChart } from '../../../components/charts/DashboardCharts';
import { MOCK_REVENUE_CHART, MOCK_CUSTOMER_GROWTH, MOCK_EXPERT_GROWTH } from '../../../utils/mockData';
import { ExpertProfile } from '../../../types';
import { toast } from 'react-hot-toast';

export const AdminDashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { expertsList, loading: expertsLoading } = useSelector((state: RootState) => state.expert);
  
  useEffect(() => {
    const loadAdminData = async () => {
      try {
        const res = await expertApi.getExpertsList();
        if (res.success && res.data) {
          dispatch(setExpertsList(res.data));
        }
      } catch (err) {
        console.error('Error loading admin approvals:', err);
      }
    };
    loadAdminData();
  }, [dispatch]);

  const handleApproveExpert = async (expertId: string) => {
    try {
      // Mocking update call
      const updated = expertsList.map((exp) =>
        exp.id === expertId ? { ...exp, approved: true } : exp
      );
      dispatch(setExpertsList(updated));
      toast.success('Expert account verified successfully!');
    } catch (err) {
      toast.error('Verification failed');
    }
  };

  const pendingApprovals = expertsList.filter((e) => !e.approved);
  const activeExpertsCount = expertsList.filter((e) => e.approved).length;

  const approvalColumns = [
    {
      header: 'Profile Title',
      accessor: (row: ExpertProfile) => (
        <div className="flex flex-col">
          <span className="font-bold text-slate-800 dark:text-zinc-200">{row.title}</span>
          <span className="text-[10px] text-slate-400 dark:text-zinc-550">Expert ID: {row.id}</span>
        </div>
      ),
    },
    {
      header: 'Bio',
      accessor: (row: ExpertProfile) => (
        <p className="text-xs max-w-xs truncate text-slate-500 dark:text-zinc-400">
          {row.bio}
        </p>
      ),
    },
    {
      header: 'Status',
      accessor: () => <Badge variant="warning">Pending Approval</Badge>,
    },
    {
      header: 'Actions',
      accessor: (row: ExpertProfile) => (
        <Button
          variant="primary"
          size="sm"
          onClick={() => handleApproveExpert(row.id)}
          leftIcon={<Check className="w-3.5 h-3.5" />}
        >
          Approve Credentials
        </Button>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
          Admin Control Center
        </h1>
        <p className="text-xs text-slate-500 dark:text-zinc-550">
          Platform-wide configuration registry, partner credentials audit queue, and system analytics.
        </p>
      </div>

      {/* Metrics */}
      <div className="grid gap-6 sm:grid-cols-4">
        <Card className="flex flex-col p-5">
          <span className="text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-slate-400" /> Active Customers
          </span>
          <span className="text-2xl font-black text-slate-800 dark:text-zinc-100 mt-2">
            1,280
          </span>
        </Card>

        <Card className="flex flex-col p-5">
          <span className="text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-slate-400" /> Active Experts
          </span>
          <span className="text-2xl font-black text-slate-800 dark:text-zinc-100 mt-2">
            {activeExpertsCount}
          </span>
        </Card>

        <Card className="flex flex-col p-5">
          <span className="text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-slate-400" /> Pending Approvals
          </span>
          <span className="text-2xl font-black text-slate-800 dark:text-zinc-100 mt-2">
            {pendingApprovals.length}
          </span>
        </Card>

        <Card className="flex flex-col p-5">
          <span className="text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-slate-400" /> Gross Volume (GMV)
          </span>
          <span className="text-2xl font-black text-slate-800 dark:text-zinc-100 mt-2">
            $42,500
          </span>
        </Card>
      </div>

      {/* Analytics Graph Row */}
      <div className="grid gap-6 md:grid-cols-2">
        <RevenueChart data={MOCK_REVENUE_CHART} />
        <GrowthChart data={MOCK_EXPERT_GROWTH} label1="Active Service Partners" label2="New Partners Application" />
      </div>

      {/* Audit Approvals Queue */}
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-wider">
          Partner Credentials Verification Queue
        </h3>
        <Table columns={approvalColumns as any} data={pendingApprovals} isLoading={expertsLoading} />
      </div>
    </div>
  );
};

export default AdminDashboard;
