export class Statistics {
  constructor(id, userId, bookId, status, note) {
    this.id = id;
    this.user_id = userId;
    this.book_id = bookId;
    this.note = note;
    this.status = status;

    const date = new Date();
    const days = date.getDate();
    const months = date.getMonth() + 1;
    const years = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    this.created_at = `${days}-${months}-${years} ${hours}:${minutes}:${seconds}`;
  }
}
