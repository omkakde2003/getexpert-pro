import { query } from '../config/db';

export interface ExpertProfileRow {
  id: string;
  user_id: string;
  title: string;
  bio: string;
  rating: number;
  review_count: number;
  earnings: number;
  approved: boolean;
  availability: any[];
  services: string[];
}

export const ExpertRepository = {
  findByUserId: async (userId: string): Promise<ExpertProfileRow | null> => {
    const res = await query('SELECT * FROM expert_profiles WHERE user_id = $1', [userId]);
    return res.rows[0] || null;
  },

  findById: async (id: string): Promise<ExpertProfileRow | null> => {
    const res = await query('SELECT * FROM expert_profiles WHERE id = $1', [id]);
    return res.rows[0] || null;
  },

  create: async (profile: Omit<ExpertProfileRow, 'rating' | 'review_count' | 'earnings'>): Promise<ExpertProfileRow> => {
    const res = await query(
      `INSERT INTO expert_profiles (id, user_id, title, bio, approved, availability, services)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        profile.id,
        profile.user_id,
        profile.title,
        profile.bio,
        profile.approved,
        JSON.stringify(profile.availability),
        profile.services,
      ]
    );
    return res.rows[0];
  },

  update: async (id: string, updates: Partial<Omit<ExpertProfileRow, 'id' | 'user_id'>>): Promise<ExpertProfileRow | null> => {
    const keys = Object.keys(updates);
    if (keys.length === 0) return ExpertRepository.findById(id);

    const setClauses = keys
      .map((key, idx) => {
        if (key === 'availability') return `"availability" = $${idx + 2}::jsonb`;
        return `"${key}" = $${idx + 2}`;
      })
      .join(', ');

    const values = Object.values(updates).map((val) => {
      if (Array.isArray(val) && typeof val[0] === 'object') return JSON.stringify(val);
      return val;
    });

    const res = await query(
      `UPDATE expert_profiles SET ${setClauses} WHERE id = $1 RETURNING *`,
      [id, ...values]
    );
    return res.rows[0] || null;
  },

  findAll: async (approvedOnly = true): Promise<ExpertProfileRow[]> => {
    const sql = approvedOnly
      ? 'SELECT * FROM expert_profiles WHERE approved = true'
      : 'SELECT * FROM expert_profiles';
    const res = await query(sql);
    return res.rows;
  },
};

export default ExpertRepository;
