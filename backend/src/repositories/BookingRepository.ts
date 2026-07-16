import { query } from '../config/db';

export interface BookingRow {
  id: string;
  customer_id: string;
  customer_name: string;
  expert_id: string;
  expert_name: string;
  service_id: string;
  service_title: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  price: number;
  scheduled_at: Date;
  created_at: Date;
}

export const BookingRepository = {
  create: async (booking: Omit<BookingRow, 'created_at'>): Promise<BookingRow> => {
    const res = await query(
      `INSERT INTO bookings (id, customer_id, customer_name, expert_id, expert_name, service_id, service_title, status, price, scheduled_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [
        booking.id,
        booking.customer_id,
        booking.customer_name,
        booking.expert_id,
        booking.expert_name,
        booking.service_id,
        booking.service_title,
        booking.status,
        booking.price,
        booking.scheduled_at,
      ]
    );
    return res.rows[0];
  },

  findById: async (id: string): Promise<BookingRow | null> => {
    const res = await query('SELECT * FROM bookings WHERE id = $1', [id]);
    return res.rows[0] || null;
  },

  findByCustomerId: async (customerId: string): Promise<BookingRow[]> => {
    const res = await query('SELECT * FROM bookings WHERE customer_id = $1 ORDER BY created_at DESC', [customerId]);
    return res.rows;
  },

  findByExpertId: async (expertId: string): Promise<BookingRow[]> => {
    const res = await query('SELECT * FROM bookings WHERE expert_id = $1 ORDER BY created_at DESC', [expertId]);
    return res.rows;
  },

  findAll: async (): Promise<BookingRow[]> => {
    const res = await query('SELECT * FROM bookings ORDER BY created_at DESC');
    return res.rows;
  },

  updateStatus: async (id: string, status: BookingRow['status']): Promise<BookingRow | null> => {
    const res = await query(
      'UPDATE bookings SET status = $2 WHERE id = $1 RETURNING *',
      [id, status]
    );
    return res.rows[0] || null;
  },
};

export default BookingRepository;
