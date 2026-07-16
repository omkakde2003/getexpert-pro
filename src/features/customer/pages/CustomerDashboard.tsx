import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Wrench, Calendar as CalendarIcon, Clock, DollarSign, CheckCircle2, AlertCircle } from 'lucide-react';
import { RootState } from '../../../store';
import { setBookings, addBooking } from '../../../store/slices/bookingSlice';
import { setServices } from '../../../store/slices/serviceSlice';
import { setExpertsList } from '../../../store/slices/expertSlice';
import bookingApi from '../../../services/booking.api';
import serviceApi from '../../../services/service.api';
import expertApi from '../../../services/expert.api';
import Button from '../../../components/ui/Button';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import Table from '../../../components/common/Table';
import Modal from '../../../components/common/Modal';
import Calendar from '../../../components/common/Calendar';
import { AvailabilitySlot, Booking, ServiceItem, ExpertProfile } from '../../../types';
import { toast } from 'react-hot-toast';

export const CustomerDashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { bookings, loading: bookingsLoading } = useSelector((state: RootState) => state.booking);
  const { services } = useSelector((state: RootState) => state.service);
  const { expertsList } = useSelector((state: RootState) => state.expert);

  // Booking Modal State
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedExpert, setSelectedExpert] = useState<ExpertProfile | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<AvailabilitySlot | null>(null);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    // Load customer data
    const loadData = async () => {
      try {
        const bookingsRes = await bookingApi.getBookings();
        if (bookingsRes.success) dispatch(setBookings(bookingsRes.data));

        const servicesRes = await serviceApi.getServices();
        if (servicesRes.success) dispatch(setServices(servicesRes.data));

        const expertsRes = await expertApi.getExpertsList();
        if (expertsRes.success) dispatch(setExpertsList(expertsRes.data));
      } catch (err) {
        console.error('Error loading dashboard data:', err);
      }
    };
    loadData();
  }, [dispatch]);

  // Aggregate Stats
  const activeBookings = bookings.filter((b) => b.status === 'confirmed' || b.status === 'pending').length;
  const totalSpent = bookings.reduce((sum, b) => (b.status === 'completed' ? sum + Number(b.price) : sum), 0);

  const handleOpenBooking = () => {
    if (services.length > 0) setSelectedService(services[0]);
    if (expertsList.length > 0) setSelectedExpert(expertsList[0]);
    setSelectedSlot(null);
    setIsBookModalOpen(true);
  };

  const handleSelectServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sId = e.target.value;
    const serv = services.find((s) => s.id === sId) || null;
    setSelectedService(serv);
  };

  const handleSelectExpertChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const eId = e.target.value;
    const exp = expertsList.find((ex) => ex.userId === eId) || null;
    setSelectedExpert(exp);
    setSelectedSlot(null);
  };

  const handleBookService = async () => {
    if (!selectedService || !selectedExpert || !selectedSlot) {
      toast.error('Please select a service, expert, and time slot.');
      return;
    }

    setBookingLoading(true);
    try {
      // Mocking target scheduled date based on slot day (1 = Monday, etc.)
      const scheduledDate = new Date();
      const currentDay = scheduledDate.getDay();
      const daysToAdd = (selectedSlot.dayOfWeek + 7 - currentDay) % 7;
      scheduledDate.setDate(scheduledDate.getDate() + daysToAdd);
      
      const [hours, minutes] = selectedSlot.startTime.split(':');
      scheduledDate.setHours(Number(hours), Number(minutes), 0, 0);

      const response = await bookingApi.createBooking({
        expertId: selectedExpert.userId,
        serviceId: selectedService.id,
        price: selectedService.price,
        scheduledAt: scheduledDate.toISOString(),
      });

      if (response.success && response.data) {
        // Redux store update
        dispatch(addBooking(response.data));
        toast.success('Service booked successfully!');
        setIsBookModalOpen(false);
      } else {
        toast.error(response.message || 'Booking failed');
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Error scheduling booking');
    } finally {
      setBookingLoading(false);
    }
  };

  const bookingColumns = [
    {
      header: 'Service Team',
      accessor: (row: Booking) => (
        <div className="flex flex-col">
          <span className="font-semibold text-slate-800 dark:text-zinc-200">{row.serviceTitle}</span>
          <span className="text-[10px] text-slate-400 dark:text-zinc-550">ID: {row.id}</span>
        </div>
      ),
    },
    {
      header: 'Assigned Expert',
      accessor: 'expertName',
    },
    {
      header: 'Price',
      accessor: (row: Booking) => `$${row.price}`,
    },
    {
      header: 'Scheduled Date',
      accessor: (row: Booking) => new Date(row.scheduledAt).toLocaleDateString(undefined, {
        dateStyle: 'medium',
      }),
    },
    {
      header: 'Status',
      accessor: (row: Booking) => {
        const variants = {
          pending: 'warning' as const,
          confirmed: 'success' as const,
          completed: 'info' as const,
          cancelled: 'error' as const,
        };
        return <Badge variant={variants[row.status]}>{row.status}</Badge>;
      },
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Upper header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
            Customer Dashboard
          </h1>
          <p className="text-xs text-slate-500 dark:text-zinc-550">
            Welcome back, {user?.name}. Monitor your active expert teams and requests.
          </p>
        </div>
        <Button onClick={handleOpenBooking} leftIcon={<Wrench className="w-4 h-4" />}>
          Book Service Team
        </Button>
      </div>

      {/* Metric panels */}
      <div className="grid gap-6 sm:grid-cols-3">
        <Card className="flex flex-col p-5">
          <span className="text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">
            Total Bookings Request
          </span>
          <span className="text-2xl font-black text-slate-800 dark:text-zinc-100 mt-2">
            {bookings.length}
          </span>
        </Card>

        <Card className="flex flex-col p-5">
          <span className="text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">
            Active Deployments
          </span>
          <span className="text-2xl font-black text-slate-800 dark:text-zinc-100 mt-2">
            {activeBookings}
          </span>
        </Card>

        <Card className="flex flex-col p-5">
          <span className="text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">
            Total Completed Spent
          </span>
          <span className="text-2xl font-black text-slate-800 dark:text-zinc-100 mt-2">
            ${totalSpent}
          </span>
        </Card>
      </div>

      {/* Bookings table list */}
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-wider">
          Recent Team Deployments
        </h3>
        <Table columns={bookingColumns as any} data={bookings} isLoading={bookingsLoading} />
      </div>

      {/* Booking Checkout Modal */}
      <Modal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
        title="Schedule Technical Expert Team"
        footerActions={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsBookModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleBookService}
              disabled={!selectedSlot}
              isLoading={bookingLoading}
            >
              Confirm Booking
            </Button>
          </div>
        }
      >
        <div className="flex flex-col gap-5">
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Service select */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                Select Team Service
              </label>
              <select
                value={selectedService?.id || ''}
                onChange={handleSelectServiceChange}
                className="w-full text-sm py-2 px-3 rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              >
                {services.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title} (${s.price}/hr)
                  </option>
                ))}
              </select>
            </div>

            {/* Expert select */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                Select Team Lead
              </label>
              <select
                value={selectedExpert?.userId || ''}
                onChange={handleSelectExpertChange}
                className="w-full text-sm py-2 px-3 rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              >
                {expertsList.map((e) => (
                  <option key={e.id} value={e.userId}>
                    {e.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Time calendar availability selector */}
          {selectedExpert && (
            <Calendar
              slots={selectedExpert.availability}
              onSelectSlot={(slot) => setSelectedSlot(slot)}
              selectedSlotId={selectedSlot?.id}
            />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default CustomerDashboard;
