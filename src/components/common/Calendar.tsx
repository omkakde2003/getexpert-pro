import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { AvailabilitySlot } from '../../types';

interface CalendarProps {
  slots: AvailabilitySlot[];
  onSelectSlot?: (slot: AvailabilitySlot) => void;
  selectedSlotId?: string;
}

export const Calendar: React.FC<CalendarProps> = ({
  slots,
  onSelectSlot,
  selectedSlotId,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Group slots by day of week
  const groupedSlots = slots.reduce<Record<number, AvailabilitySlot[]>>((acc, slot) => {
    if (!acc[slot.dayOfWeek]) {
      acc[slot.dayOfWeek] = [];
    }
    acc[slot.dayOfWeek].push(slot);
    return acc;
  }, {});

  const getWeekDays = () => {
    const today = new Date();
    const currentDay = today.getDay();
    // Get start of this week (Sunday)
    const sunday = new Date(today);
    sunday.setDate(today.getDate() - currentDay);

    return Array.from({ length: 7 }).map((_, idx) => {
      const date = new Date(sunday);
      date.setDate(sunday.getDate() + idx);
      return date;
    });
  };

  const weekDays = getWeekDays();

  return (
    <div className="w-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
      {/* Calendar Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/50">
        <div>
          <h4 className="text-sm font-bold text-slate-800 dark:text-zinc-200">
            Availability Calendar
          </h4>
          <p className="text-xs text-slate-500 dark:text-zinc-500">
            Select a day to view open bookings
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <button className="p-1 rounded bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 hover:bg-slate-50 dark:hover:bg-zinc-700 transition cursor-pointer">
            <ChevronLeft className="w-4 h-4 text-slate-600 dark:text-zinc-300" />
          </button>
          <button className="p-1 rounded bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 hover:bg-slate-50 dark:hover:bg-zinc-700 transition cursor-pointer">
            <ChevronRight className="w-4 h-4 text-slate-600 dark:text-zinc-300" />
          </button>
        </div>
      </div>

      {/* Week Calendar Grid */}
      <div className="p-6">
        <div className="grid grid-cols-7 gap-2 mb-4 text-center">
          {daysOfWeek.map((day, idx) => (
            <div key={idx} className="text-xs font-semibold text-slate-400 dark:text-zinc-500">
              {day}
            </div>
          ))}
          {weekDays.map((date, idx) => {
            const dayOfWeek = date.getDay();
            const hasSlots = groupedSlots[dayOfWeek] && groupedSlots[dayOfWeek].length > 0;
            const isToday = date.toDateString() === new Date().toDateString();

            return (
              <div
                key={idx}
                className={`py-3 rounded-lg border flex flex-col items-center justify-center transition
                  ${
                    isToday
                      ? 'border-brand-500 bg-brand-50/30 dark:bg-brand-500/5'
                      : 'border-slate-100 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/30'
                  }
                `}
              >
                <span
                  className={`text-xs font-bold ${
                    isToday
                      ? 'text-brand-600 dark:text-brand-400'
                      : 'text-slate-700 dark:text-zinc-300'
                  }`}
                >
                  {date.getDate()}
                </span>
                {hasSlots && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1" />
                )}
              </div>
            );
          })}
        </div>

        {/* Selected Day Slots */}
        <div className="mt-6 border-t border-slate-100 dark:border-zinc-800 pt-5">
          <h5 className="text-xs font-bold text-slate-500 dark:text-zinc-400 mb-3 uppercase tracking-wider flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400" /> Available Time Slots
          </h5>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {slots.map((slot) => {
              const isSelected = selectedSlotId === slot.id;
              const isBooked = slot.isBooked;

              return (
                <button
                  key={slot.id}
                  disabled={isBooked}
                  onClick={() => onSelectSlot && onSelectSlot(slot)}
                  className={`px-3 py-2 text-xs font-medium border rounded-lg transition text-center select-none cursor-pointer
                    ${
                      isBooked
                        ? 'bg-slate-50 dark:bg-zinc-800 border-slate-200 dark:border-zinc-700 text-slate-400 line-through opacity-50 cursor-not-allowed'
                        : isSelected
                        ? 'border-brand-500 bg-brand-500 text-white shadow-sm'
                        : 'border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-zinc-300 hover:border-brand-500 dark:hover:border-brand-500 hover:bg-brand-50/10 dark:hover:bg-brand-500/5'
                    }
                  `}
                >
                  {slot.startTime} - {slot.endTime}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
