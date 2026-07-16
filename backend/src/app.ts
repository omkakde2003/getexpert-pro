import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Import Middlewares
import { authMiddleware, roleMiddleware } from './middleware/auth';

// Import Controllers
import AuthController from './controllers/AuthController';
import UserController from './controllers/UserController';
import ExpertController from './controllers/ExpertController';
import BookingController from './controllers/BookingController';
import ServiceController from './controllers/ServiceController';
import NotificationController from './controllers/NotificationController';

// Import Router Modules
import authRouter from './modules/auth/routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and body parsing
app.use(cors({
  origin: '*', // Allow all origins for sandbox/dev testing
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// Logger middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// --- API ROUTES MAP (v1) ---

// 1. Authentication Portal
app.use('/api/v1/auth', authRouter);

// 2. User Profiles
app.get('/api/v1/users/profile', authMiddleware, UserController.getProfile);
app.put('/api/v1/users/update', authMiddleware, UserController.updateProfile);

// 3. Expert Domain Profiles
app.get('/api/v1/experts', ExpertController.getExpertsList);
app.get('/api/v1/experts/profile', authMiddleware, roleMiddleware(['expert']), ExpertController.getProfile);
app.put('/api/v1/experts/update', authMiddleware, roleMiddleware(['expert']), ExpertController.updateProfile);
app.put('/api/v1/experts/availability', authMiddleware, roleMiddleware(['expert']), ExpertController.updateAvailability);

// 4. Bookings Manager
app.get('/api/v1/bookings', authMiddleware, BookingController.getBookings);
app.post('/api/v1/bookings', authMiddleware, BookingController.createBooking);
app.put('/api/v1/bookings/:id/status', authMiddleware, BookingController.updateBookingStatus);

// 5. Services Catalog
app.get('/api/v1/services', ServiceController.getServices);
app.get('/api/v1/services/categories', ServiceController.getCategories);
app.get('/api/v1/services/:id', ServiceController.getService);

// 6. Notifications Alerts
app.get('/api/v1/notifications', authMiddleware, NotificationController.getNotifications);
app.put('/api/v1/notifications/read-all', authMiddleware, NotificationController.markAllRead);
app.put('/api/v1/notifications/:id/read', authMiddleware, NotificationController.markRead);

// Error Handling Catch-All
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled runtime error:', err);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
});

app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(` GetExpert Pro Express Server Online     `);
  console.log(` Listening on: http://localhost:${PORT}  `);
  console.log(` Environment: ${process.env.NODE_ENV}   `);
  console.log(`=========================================`);
});
