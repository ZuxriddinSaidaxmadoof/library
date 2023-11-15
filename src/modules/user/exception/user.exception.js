export class LoginAlreadyExistException extends Error {
  constructor(message) {
    super(message);

    this.statusCode = 400;
  }
}
export class UserNotFoundException extends Error {
  constructor(message) {
    super(message);

    this.statusCode = 404;
  }
}
