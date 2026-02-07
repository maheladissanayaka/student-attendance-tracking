# 📚 Student Attendance Tracking System

A robust full-stack web application built using **Next.js (App Router)**, **MySQL**, and **Drizzle ORM** to manage student attendance efficiently. This system provides a seamless experience for tracking student presence and visualizing data through a modern dashboard.

---

## 🚀 Features

* **🔐 Authentication & Security**
    * User Login system with email and password.
    * **JWT (JSON Web Token)** based authentication.
    * Secure token storage via **HTTP-only cookies**.
    * Protected routes (Dashboard access restricted to authenticated users).

* **🧑‍🎓 Student & Class Management**
    * **Student Records:** Add, update, and view students with full contact details.
    * **Class Management:** Create grades/classes and link students to specific groups.
    * **Relational Mapping:** Automated grade assignment for streamlined tracking.

* **📝 Attendance System**
    * Mark students as **Present** or **Absent** with real-time syncing.
    * Real-time database updates when toggling attendance status.
    * Strict logic to prevent duplicate records for the same student on the same day.
    * Automatic attendance count reduction when unchecking "Present."

* **📊 Dashboard & Analytics**
    * High-level stats: Total Students, Total Classes, and Absentee Rates.
    * **Data Visualization:** Grade-wise bar charts and monthly donut charts.
    * **Auto-Updating Leaderboard:** List of students with the highest attendance records.

---

## 🛠️ Tech Stack

* **Framework:** Next.js 14 (App Router)
* **Styling:** Tailwind CSS
* **Database:** MySQL
* **ORM:** Drizzle ORM
* **Authentication:** JWT & bcrypt for password hashing
* **Icons & Charts:** Lucide Icons, Chart.js / Recharts

---

## 📂 Folder Structure

```text
├── app/              # Next.js App Router (Pages, Layouts, API Routes)
├── components/       # Reusable UI components (Sidebar, Navbar, Charts)
├── db/               # Database configuration and Drizzle schema
├── lib/              # Utility functions and authentication helpers
├── middleware.js     # JWT route protection middleware
├── public/           # Static assets (Images, Logos)
└── drizzle.config.ts # Drizzle ORM configuration