import { ResData } from "../../lib/resData.js";
import { UserIdBookIdRequiresException } from "./exception/user-book.exception.js";

export class UserBookController {
  #userBookService;
  constructor(userBookService) {
    this.#userBookService = userBookService;
  }

  createUserBook(req, res) {
    try {
      const { userId, bookId } = req.body;

      if (!userId || !bookId) {
        throw new UserIdBookIdRequiresException();
      }

      const response = this.#userBookService.createUserBook(req.body);

      res.status(201).json(response);
    } catch (error) {
      const resData = new ResData(error.message, null, error);

      res.status(error.statusCode ?? 500).json(resData);
    }
  }
}
