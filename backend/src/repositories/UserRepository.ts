import { query } from '../config/db';

export interface UserRow {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  role: 'customer' | 'expert' | 'admin';
  avatar_url?: string;
  status: 'active' | 'suspended' | 'pending';
  created_at: Date;
}

export const UserRepository = {
  findById: async (id: string): Promise<UserRow | null> => {
    const res = await query('SELECT * FROM users WHERE id = $1', [id]);
    return res.rows[0] || null;
  },

  findByEmail: async (email: string): Promise<UserRow | null> => {
    const res = await query('SELECT * FROM users WHERE email = $1', [email]);
    return res.rows[0] || null;
  },

  create: async (user: Omit<UserRow, 'created_at'>): Promise<UserRow> => {
    const res = await query(
      `INSERT INTO users (id, name, email, password_hash, role, avatar_url, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [user.id, user.name, user.email, user.password_hash, user.role, user.avatar_url, user.status]
    );
    return res.rows[0];
  },

  update: async (id: string, updates: Partial<Omit<UserRow, 'id' | 'created_at'>>): Promise<UserRow | null> => {
    const keys = Object.keys(updates);
    if (keys.length === 0) return UserRepository.findById(id);

    const setClauses = keys.map((key, idx) => `"${key}" = $${idx + 2}`).join(', ');
    const values = Object.values(updates);

    const res = await query(
      `UPDATE users SET ${setClauses} WHERE id = $1 RETURNING *`,
      [id, ...values]
    );
    return res.rows[0] || null;
  },
};

export default UserRepository;
