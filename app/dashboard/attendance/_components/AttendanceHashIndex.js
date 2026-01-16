export class AttendanceIndex {
  constructor() {
    this.map = new Map();
  }

  add(key, record) {
    this.map.set(key, record);
  }

  exists(key) {
    return this.map.has(key);
  }

  clear() {
    this.map.clear();
  }
}
