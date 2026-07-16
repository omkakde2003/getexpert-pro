import { query } from '../config/db';

export interface ServiceRow {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  duration: number;
  image_url?: string;
  rating: number;
  review_count: number;
}

export const ServiceRepository = {
  findAll: async (category?: string): Promise<ServiceRow[]> => {
    if (category) {
      const res = await query(
        'SELECT * FROM services WHERE LOWER(category) = LOWER($1)',
        [category]
      );
      return res.rows;
    }
    const res = await query('SELECT * FROM services');
    return res.rows;
  },

  findById: async (id: string): Promise<ServiceRow | null> => {
    const res = await query('SELECT * FROM services WHERE id = $1', [id]);
    return res.rows[0] || null;
  },

  create: async (service: Omit<ServiceRow, 'rating' | 'review_count'>): Promise<ServiceRow> => {
    const res = await query(
      `INSERT INTO services (id, title, description, price, category, duration, image_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        service.id,
        service.title,
        service.description,
        service.price,
        service.category,
        service.duration,
        service.image_url,
      ]
    );
    return res.rows[0];
  },

  getCategories: async (): Promise<string[]> => {
    const res = await query('SELECT DISTINCT category FROM services');
    return res.rows.map((row) => row.category);
  },
};

export default ServiceRepository;
