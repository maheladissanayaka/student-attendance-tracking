import { AttendanceLinkedList } from "./AttendanceLinkedList";
import { AttendanceIndex } from "./AttendanceHashIndex";
import GlobalApi from "@/app/api/_services/GlobalApi";

const attendanceList = new AttendanceLinkedList();
const attendanceIndex = new AttendanceIndex();

/* ADD / UPDATE attendance */
export function addAttendance(record) {
  const key = `${record.studentId}-${record.day}-${record.month}`;

  if (attendanceIndex.exists(key)) {
    // 🔁 Update BOTH structures
    attendanceIndex.add(key, record);
    attendanceList.update(record);
  } else {
    attendanceIndex.add(key, record);
    attendanceList.add(record);
  }
}

/* AUTO SAVE every 2 hours */
let started = false;

// export function startAutoSave() {
//   if (started) return;
//   started = true;

//   setInterval(async () => {
//     await saveAttendanceToDB();
//   }, 2 * 60 * 60 * 1000); // 2 hours
// }

/* ONE-TIME SAVE */
export async function saveAttendanceOnce() {
  const data = attendanceList.toArray();
  if (!data.length) return false;

  await GlobalApi.SaveAttendanceBulk(data);

  attendanceList.clear();
  attendanceIndex.clear();

  return true;
}

/* SAVE TO DB */
export async function saveAttendanceToDB() {
  const data = attendanceList.toArray();
  if (!data.length) return;

  await GlobalApi.SaveAttendanceBulk(data);

  attendanceList.clear();
  attendanceIndex.clear();

  // ✅ Notify UI ONLY when saved
  window.dispatchEvent(
    new CustomEvent("attendance-saved", {
      detail: { saved: true },
    })
  );
}
