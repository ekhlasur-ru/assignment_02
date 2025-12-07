# Vehicle Rental System

A simple backend API for managing vehicle rentals with authentication, vehicles, users, and bookings.

## 🔗 Overview

This system allows customers and admins to manage vehicle rentals. It includes user signup/login, vehicle management, booking creation, and role-based access control. also following moduler patern.

## 🔗 Tech Stack (Tecnology)

- Node.js + TypeScript
- Express.js
- PostgreSQL (pg)
- Database Store NEON_DB
- JWT Authentication
- bcryptjs (password hashing)

## 🔗 Roles

- Admin: Full system access

- Customer: Can view vehicles & manage own bookings

## 🔗 API Endpoints (Serial Order)

### 1\. **User Authentication**

#### 1.1 Signup

**POST** `/api/v1/auth/signup` — Register a new user (public)

#### 1.2 Signin

**POST** `/api/v1/auth/signin` — Login and receive JWT token (public)

### 2\. **Vehicles API (Admin Only except GET)**

#### 2.1 Create Vehicle

**POST** `/api/v1/vehicles` — Add a new vehicle (admin)

#### 2.2 Get All Vehicles

**GET** `/api/v1/vehicles` — View all vehicles (public)

#### 2.3 Get Vehicle by ID

**GET** `/api/v1/vehicles/:vehicleId` — View specific vehicle (public)

#### 2.4 Update Vehicle

**PUT** `/api/v1/vehicles/:vehicleId` — Edit vehicle details (admin)

#### 2.5 Delete Vehicle

**DELETE** `/api/v1/vehicles/:vehicleId` — Remove vehicle if no active bookings (admin)

### 3\. **Users API**

#### 3.1 Get All Users

**GET** `/api/v1/users` — List all registered users (admin)

#### 3.2 Update User

**PUT** `/api/v1/users/:userId` — Admin updates any user OR user updates own profile

#### 3.3 Delete User

**DELETE** `/api/v1/users/:userId` — Delete user if no active bookings (admin)

### 4\. **Bookings API**

#### 4.1 Create Booking

**POST** `/api/v1/bookings` — Create a new booking (customer & admin)

#### 4.2 Get Bookings

**GET** `/api/v1/bookings` — Admin gets all; customer gets own bookings

#### 4.3 Update Booking

**PUT** `/api/v1/bookings/:bookingId` — Customer cancels before start OR admin marks as returned

## 🔗 Repository Link

You can access the GitHub repository here:  
👉 [https://github.com/ekhlasur-ru/assignment_02](https://github.com/ekhlasur-ru/assignment_02)

---

**Submitted by: Md. Ekhlasur Rahaman** <br>
**Next Level Web development (Batch-6)**<br>
**Assignment for: Vehicle Rental System**
