class AttendanceNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

export class AttendanceLinkedList {
  constructor() {
    this.head = null;
  }

  add(data) {
    const node = new AttendanceNode(data);
    if (!this.head) {
      this.head = node;
      return;
    }

    let current = this.head;
    while (current.next) current = current.next;
    current.next = node;
  }

  update(data) {
    let current = this.head;
    while (current) {
      if (
        current.data.studentId === data.studentId &&
        current.data.day === data.day &&
        current.data.month === data.month
      ) {
        current.data.present = data.present;
        return;
      }
      current = current.next;
    }
  }

  toArray() {
    const arr = [];
    let current = this.head;
    while (current) {
      arr.push(current.data);
      current = current.next;
    }
    return arr;
  }

  clear() {
    this.head = null;
  }
}
