import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Import Router Modules
import authRouter from './modules/auth/routes';
import userRouter from './modules/user/routes';
import serviceRouter from './modules/service/routes';
import expertRouter from './modules/expert/routes';
import bookingRouter from './modules/booking/routes';
import notificationRouter from './modules/notification/routes';

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
app.use('/api/v1/users', userRouter);

// 3. Expert Domain Profiles
app.use('/api/v1/experts', expertRouter);

// 4. Bookings Manager
app.use('/api/v1/bookings', bookingRouter);

// 5. Services Catalog
app.use('/api/v1/services', serviceRouter);

// 6. Notifications Alerts
app.use('/api/v1/notifications', notificationRouter);

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
