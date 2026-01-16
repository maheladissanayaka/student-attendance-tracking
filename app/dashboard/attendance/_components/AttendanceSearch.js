export function searchStudents(students, gradeId) {
  const result = [];

  for (let i = 0; i < students.length; i++) {
    if (students[i].gradeId === gradeId) {
      result.push(students[i]);
    }
  }

  return result;
}
