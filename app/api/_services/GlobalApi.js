import axios from "axios";

// Create an axios instance for consistency
const axiosClient = axios.create({
  baseURL: '', // Uses the same origin by default
});

/* ---------- Auth & Profile ---------- */
const GetUserContext = () => axiosClient.get("/api/auth/me");
const UpdateUserProfile = (data) => axiosClient.post("/api/auth/update-profile", data);
const UpdateUserPassword = (data) => axiosClient.post("/api/auth/change-password", data);
const UploadProfileImage = (formData) => axiosClient.post("/api/auth/upload-image", formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
});

/* ---------- Auth & Password Reset ---------- */
const ForgotPassword = (data) => axiosClient.post("/api/auth/forgot-password", data);
const ResetPassword = (data) => axiosClient.post("/api/auth/reset-password", data);

/* ---------- Users (Management) ---------- */
const Login = (data) => axiosClient.post("/api/auth/login", data);
const GetAllUsers = () => axiosClient.get("/api/users");
// Ensure this matches your registration endpoint
const RegisterNewUser = (data) => axiosClient.post("/api/auth/register", data); 
const UpdateUser = (id, data) => axiosClient.put(`/api/users/${id}`, data);
const DeleteUser = (id) => axiosClient.delete(`/api/users/${id}`);

/* ---------- Grades ---------- */
const GetAllGrades = () => axios.get("/api/grades");
const AddNewClass = (data) => axios.post("/api/grades", data);
const UpdateGrade = (id, data) =>
  axios.put(`/api/grades/${id}`, data);
const DeleteGrade = (id) =>
  axios.delete(`/api/grades/${id}`);
const GetStudentsByGrade = (gradeId) =>
  axios.get(`/api/students?gradeId=${gradeId}`);

/* ---------- Students ---------- */
const AddNewStudent = (data) => axios.post("/api/students", data);
const GetAllStudents = () => axios.get("/api/students");
const DeleteStudent = (id) =>
  axios.delete(`/api/students/${id}`);
const UpdateStudent = (id, data) =>
  axios.put(`/api/students/${id}`, data);

/* ---------- Attendance ---------- */
const SaveAttendanceBulk = (data) =>
  axios.post("/api/attendance", data);

/**
 * Monthly attendance summary (for reports)
 * returns: studentName, attendanceCount
 */
const GetAttendanceByMonthGrade = (month, gradeId) =>
  axios.get(
    `/api/reports?type=monthly&month=${month}&gradeId=${gradeId}`
  );

/**
 * Yearly top attended students (for reports)
 * returns: studentName, total
 */
const GetTopStudentsByYear = (gradeId) =>
  axios.get(
    `/api/reports?type=top&gradeId=${gradeId}`
  );

const GetExistingAttendance = (month, gradeId) =>
  axios.get(
    `/api/attendance/existing?month=${month}&gradeId=${gradeId}`
  );

const GetDashboardStats = (month, gradeId) =>
  axios.get(
    `/api/dashboard?month=${month || ""}&gradeId=${gradeId || ""}`
  );

// NEW: Announcements
const PostAnnouncement = (data) => axiosClient.post("/api/announcements", data);
const GetAnnouncements = () => axiosClient.get("/api/announcements");

// NEW: Attendance Rules
const UpdateAttendanceRules = (data) => axiosClient.post("/api/school-rules", data);
const GetAttendanceRules = () => axiosClient.get("/api/school-rules");

export default {
  /* Auth & Profile */
  GetUserContext,
  UpdateUserProfile,
  UpdateUserPassword,
  UploadProfileImage,

  ForgotPassword,
  ResetPassword,

  /* Users */
  Login,
  GetAllUsers,
  RegisterNewUser,
  UpdateUser,
  DeleteUser,

  /* Grades */
  GetAllGrades,
  AddNewClass,
  UpdateGrade,
  DeleteGrade,
  GetStudentsByGrade,

  /* Students */
  AddNewStudent,
  GetAllStudents,
  DeleteStudent,
  UpdateStudent,

  /* Attendance */
  SaveAttendanceBulk,
  GetAttendanceByMonthGrade,
  GetExistingAttendance,

  /* Reports */
  GetTopStudentsByYear,

  GetDashboardStats,

  PostAnnouncement,
  GetAnnouncements,
  UpdateAttendanceRules,
  GetAttendanceRules,
};
