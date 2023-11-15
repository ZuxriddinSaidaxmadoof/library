import { DataSource } from "../../lib/dataSource.js";
import path from "path";
import { fileURLToPath } from "url";
import { ResData } from "../../lib/resData.js";

import { generationId } from "../../lib/generationId.js";
import { UserBook } from "../../lib/userBookClass.js";
import { UserHasBookException } from "./exception/user-book.exception.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export class UserBookService {
  #userService;
  constructor(userService) {
    this.#userService = userService;
  }

  createUserBook(body) {
    this.#userService.userFindById(body.userId);

    const userBookDir = path.join(
      __dirname,
      "../../../database",
      "user_books.json"
    );

    const foundUserBookByUserIdAndBookId = this.#getUserBookByUserIdAndBookId(
      body.userId,
      body.bookId
    );

    if (foundUserBookByUserIdAndBookId) {
      throw new UserHasBookException();
    }

    const userBookData = new DataSource(userBookDir);
    const userBooks = userBookData.read();

    const generatedId = generationId(userBooks);

    const newUserBook = new UserBook(
      generatedId,
      body.userId,
      body.bookId,
      "10-10-2023",
      "20-10-2023"
    );

    userBooks.push(newUserBook);

    userBookData.write(userBooks);

    const resData = new ResData("created user book", newUserBook);

    return resData;
  }

  #getUserBookByUserIdAndBookId(userId, bookId) {
    const userBookDir = path.join(
      __dirname,
      "../../../database",
      "user_books.json"
    );

    const userBookData = new DataSource(userBookDir);
    const userBooks = userBookData.read();

    const foundUserBookByUserIdAndBookId = userBooks.find(
      (userBook) => userBook.user_id === userId && userBook.book_id === bookId
    );

    return foundUserBookByUserIdAndBookId;
  }
}
