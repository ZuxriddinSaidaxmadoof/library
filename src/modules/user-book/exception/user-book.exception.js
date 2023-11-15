export class UserIdBookIdRequiresException extends Error {
  constructor() {
    super("userId and bookId must be reuired!");

    this.statusCode = 400;
  }
}

export class UserHasBookException extends Error {
  constructor() {
    super("This user has the book!");

    this.statusCode = 400;
  }
}
