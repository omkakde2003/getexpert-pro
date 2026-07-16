# Sprint 1 - Foundation

## Software Requirements (SRS)

- **Project Name**: GetExpert Pro
- **Tagline**: AI-Powered Service Marketplace Platform

### User Roles & Features

#### 1. Customer Features
- **Authentication**: Register, Login, Google Login (Future), Forgot Password, Email Verification, Change Password
- **Dashboard**: Overview, Active Bookings, Recent Bookings, Notifications, Profile Completion
- **Services**: Browse Services, Categories, Search, Filters, Service Details
- **Booking**: Book Service, Cancel Booking, Reschedule, Booking History
- **Invoicing**: View & Download Invoices
- **Chat**: Secure chat with Expert
- **Reviews**: Give Rating & Review
- **Settings**: Edit Profile, Notification Settings

#### 2. Expert Features
- **Dashboard**: Overview, Revenue, Today's Bookings, Monthly Analytics
- **Services**: Create, Edit, Delete Services, select Categories, set Pricing
- **Booking**: Accept, Reject, Complete Bookings, view Customer Details
- **Calendar**: Availability Setup
- **Reviews**: View Reviews & Ratings
- **Earnings**: Earnings Log & Payout History
- **Chat**: Chat with Customers

#### 3. Admin Features
- **Dashboard**: Overview, User Management, Expert Verification
- **Category Management**: Create/Edit/Delete Service Categories
- **Booking Management**: System Bookings Registry
- **Reports & Analytics**: Revenue Reports, Global Analytics
- **Support Tickets**: Support Desk Management
- **CMS**: Content Management for informational pages
- **Audit Logs**: System Activity Logs
- **Settings**: Global Site Settings

---

## Database Design (PostgreSQL)

Targeting ~22-25 tables initially, including:
- `users`, `roles`, `experts`, `customers`
- `categories`, `services`, `service_images`
- `bookings`, `booking_status`
- `payments`, `payment_history`
- `notifications`, `reviews`, `messages`, `conversations`
- `documents`, `availability`, `earnings`, `invoices`
- `support_tickets`, `audit_logs`, `activity_logs`, `settings`

---

## API Design (REST APIs)

Following RESTful design principles for ~80-100 endpoints, starting with core pathways:
- `POST /auth/register`
- `POST /auth/login`
- `GET /users/profile`
- `PUT /users/profile`
- `GET /services`
- `POST /bookings`
- `GET /notifications`

---

## Development Sequence

1. **Authentication**
2. **Customer**
3. **Expert`
4. **Booking**
5. **Notifications**
6. **Payments**
7. **Admin**
8. **Analytics**
9. **Chat**
10. **AI Features**
