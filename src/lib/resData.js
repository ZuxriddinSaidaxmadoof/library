export class ResData {
  constructor(message, data = null, error = null) {
    this.message = message;
    this.data = data;
    this.error = error;
  }
}
