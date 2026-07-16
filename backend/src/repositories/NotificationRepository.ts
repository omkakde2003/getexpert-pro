import { query } from '../config/db';

export interface NotificationRow {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  created_at: Date;
}

export const NotificationRepository = {
  create: async (notif: Omit<NotificationRow, 'read' | 'created_at'>): Promise<NotificationRow> => {
    const res = await query(
      `INSERT INTO notifications (id, user_id, title, message, type)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [notif.id, notif.user_id, notif.title, notif.message, notif.type]
    );
    return res.rows[0];
  },

  findByUserId: async (userId: string): Promise<NotificationRow[]> => {
    const res = await query(
      'SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    return res.rows;
  },

  markRead: async (id: string): Promise<NotificationRow | null> => {
    const res = await query(
      'UPDATE notifications SET read = true WHERE id = $1 RETURNING *',
      [id]
    );
    return res.rows[0] || null;
  },

  markAllRead: async (userId: string): Promise<void> => {
    await query(
      'UPDATE notifications SET read = true WHERE user_id = $1',
      [userId]
    );
  },
};

export default NotificationRepository;
