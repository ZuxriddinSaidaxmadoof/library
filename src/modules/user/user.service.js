import { DataSource } from "../../lib/dataSource.js";
import path from "path";
import { fileURLToPath } from "url";
import { ResData } from "../../lib/resData.js";
import {
  LoginAlreadyExistException,
  UserNotFoundException,
} from "./exception/user.exception.js";
import { generationId } from "../../lib/generationId.js";
import { User } from "../../lib/userClass.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export class UserService {
  userGetAll() {
    const userDir = path.join(__dirname, "../../../database", "users.json");
    const userData = new DataSource(userDir);
    const users = userData.read();

    const resData = new ResData("all users", users);

    return resData;
  }

  createUser(body) {
    const userDir = path.join(__dirname, "../../../database", "users.json");
    const userData = new DataSource(userDir);
    const users = userData.read();

    const foundUserByLogin = users.find((user) => user.login === body.login);

    if (foundUserByLogin) {
      throw new LoginAlreadyExistException("This login already exist");
    }

    const generatedId = generationId(users);

    const newUser = new User(generatedId, body.fullName, body.login, body.age);

    users.push(newUser);

    userData.write(users);

    const resData = new ResData("user created", newUser);

    return resData;
  }

  userFindById(id) {
    const userDir = path.join(__dirname, "../../../database", "users.json");
    const userData = new DataSource(userDir);
    const users = userData.read();

    const foundUserById = users.find((user) => user.id === id);

    if (!foundUserById) {
      throw new UserNotFoundException(`This ${id} user not found`);
    }

    const resData = new ResData("found user", foundUserById);

    return resData;
  }
}
