import { Router } from "express";

import { DataSource } from "../../lib/dataSource.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { User } from "../../lib/userClass.js";
import { generationId as generatedId } from "../../lib/generationId.js";
import { ResData } from "../../lib/resData.js";
import { UserBook } from "../../lib/userBookClass.js";

const rouuter = Router();

rouuter.post("/user-book", (req, res) => {
  const { userId, bookId } = req.body;

  if (!userId || !bookId) {
    const resData = new ResData("userId and bookId must be require!");

    return res.status(400).json(resData);
  }

  const userDir = path.join(__dirname, "database", "users.json");
  const bookDir = path.join(__dirname, "database", "books.json");
  const userBookDir = path.join(__dirname, "database", "user_books.json");

  const userData = new DataSource(userDir);
  const bookData = new DataSource(bookDir);
  const userBookData = new DataSource(userBookDir);

  const users = userData.read();
  const books = bookData.read();

  const founUserById = users.find((user) => user.id === userId);

  if (!founUserById) {
    const resData = new ResData("user not found!");

    return res.status(404).json(resData);
  }

  const founBookById = books.find((book) => book.id === bookId);

  if (!founBookById) {
    const resData = new ResData("book not found!");

    return res.status(404).json(resData);
  }

  const userBooks = userBookData.read();

  const foundUserBook = userBooks.find(
    (userBook) => userBook.user_id === userId && userBook.book_id === bookId
  );

  if (foundUserBook) {
    const resData = new ResData("This user has the book!");

    return res.status(400).json(resData);
  }

  const generationId = generatedId(userBooks);

  const date = new Date();
  const days = date.getDate();
  const months = date.getMonth() + 1;
  const years = date.getFullYear();

  const date1 = new Date(date.getDate() + founBookById.duration);
  const days1 = date1.getDate();
  const months1 = date1.getMonth() + 1;
  const years1 = date1.getFullYear();

  const startDate = `${days}-${months}-${years}`;
  const endDate = `${days1}-${months1}-${years1}`;

  const newUserBook = new UserBook(
    generationId,
    userId,
    bookId,
    startDate,
    endDate
  );

  userBooks.push(newUserBook);

  userBookData.write(userBooks);

  const resData = new ResData("user book created", newUserBook);

  res.status(201).json(resData);
});

export default rouuter;
