# ⚙️ Booking System Backend (Node.js + Express + MongoDB)

## 🚀 Overview

This is the backend service for a **Booking & Availability System**.

It handles:

* User availability creation
* Booking link generation
* Public booking management
* Slot validation and filtering

---

## 🛠 Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication (optional)
* REST API Architecture

---

## ⚙️ Core Features

### 1. Availability Management

* Create availability slots (date + startTime + endTime)
* Store multiple slots per user
* Soft delete support (`isDeleted` flag)

---

### 2. Booking Link System

* Generate unique booking link per user
* Link maps to multiple availability slots
* Used for public booking access

---

### 3. Booking System

* Book a slot using availabilityId
* Prevent duplicate bookings
* Ensure slot uniqueness per link

---

### 4. Slot Filtering Logic

* Booked slots are excluded
* Slots grouped by date using aggregation
* Only future available slots returned

---

## 📂 Project Structure

```
/controllers
/database
/middleware
/services
/types
/utils
/validations
routes.ts
index.ts
```

---

## 🧑‍💻 Setup Instructions

### 1. Clone repo

```bash
git clone https://github.com/kashyap-parmar/Availability-booking-Systems---BE.git
cd backend
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Add environment variables

Create `.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret
```

---

### 4. Run server

```bash
npm run dev
```

Server runs on:

```
http://localhost:5000
```

---

## 📡 API Overview

### 🔹 Create Availability

```
POST /api/availability
```

---

### 🔹 Generate Booking Link

```
POST /api/link
```

---

### 🔹 Get Availability by Link

```
GET /api/availability/link/:linkId
```

* Returns:

  * grouped slots by date
  * excludes booked slots

---

### 🔹 Book Slot

```
POST /api/booking
```

---

## 🧠 Important Logic

### ✔ Prevent Double Booking

* Uses `availabilityId`
* Filters already booked slots

---

### ✔ Group By Date (Aggregation)

* Uses `$dateToString`
* Groups slots into calendar-friendly format

---

### ✔ Slot Isolation

* Booking applies only to that specific link
* Other links still show same slot

---

## ⚠️ Edge Cases Handled

* Invalid booking link → 404
* Already booked slot → not shown
* Empty availability → handled in frontend

---

## 🧪 Future Improvements

* Rate limiting
* Session-based auth
* Timezone-safe booking
* Conflict detection for overlapping slots

---

## 👨‍💻 Author

Kashyap
MERN Stack Developer | Backend Engineer

---
