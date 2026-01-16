import {
  mysqlTable,
  int,
  varchar,
  boolean,
  timestamp,
  uniqueIndex,
  text,
} from "drizzle-orm/mysql-core";

/* ---------- GRADES ---------- */
export const GRADES = mysqlTable("grades", {
  id: int("id").primaryKey().autoincrement(),
  grade: varchar("grade", { length: 10 }).notNull(),
});

/* ---------- STUDENTS ---------- */
export const STUDENTS = mysqlTable("students", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 100 }),
  studentId: varchar("student_id", { length: 50 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  address: varchar("address", { length: 255 }),
  gradeId: int("grade_id").notNull(),
});

/* ---------- ATTENDANCE (FIXED) ---------- */
export const ATTENDANCE = mysqlTable(
  "attendance",
  {
    id: int("id").primaryKey().autoincrement(),

    studentId: int("student_id").notNull(),
    gradeId: int("grade_id").notNull(),

    day: int("day").notNull(),
    month: varchar("month", { length: 7 }).notNull(),

    present: boolean("present").default(false),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => ({
    uniqueAttendance: uniqueIndex("unique_attendance").on(
      table.studentId,
      table.day,
      table.month
    ),
  })
);

/* ---------- USERS ---------- */
// utils/schema.js
export const USERS = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  role: varchar("role", { length: 20 }).default("TEACHER"), // ADMIN or TEACHER
  status: varchar("status", { length: 20 }).default("INACTIVE"), // ACTIVE or INACTIVE
  image: varchar("image", { length: 255 }),
  // ✅ NEW COLUMNS FOR PASSWORD RESET
  resetToken: varchar("reset_token", { length: 255 }),
  resetTokenExpiry: timestamp("reset_token_expiry"),
  createdAt: timestamp("created_at").defaultNow(),
});

/* ---------- ANNOUNCEMENTS (NEW) ---------- */
export const ANNOUNCEMENTS = mysqlTable("announcements", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 255 }).notNull(),
  body: text("body").notNull(),
  date: varchar("date", { length: 50 }).notNull(), // Stores the formatted date string
  createdAt: timestamp("created_at").defaultNow(),
});

/* ---------- SCHOOL RULES / SETTINGS ---------- */
export const SCHOOL_RULES = mysqlTable("school_rules", {
  id: int("id").primaryKey().autoincrement(),
  lateThreshold: varchar("late_threshold", { length: 10 }).default("08:30"),
  // ✅ FIX: Added .defaultNow() alongside .onUpdateNow()
  updatedAt: timestamp("updated_at")
    .defaultNow()        // Sets initial value on creation
    .onUpdateNow(),      // Updates value on every modification
});