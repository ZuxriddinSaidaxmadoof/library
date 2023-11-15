import { ResData } from "../../lib/resData.js";

export class UserController {
  #userService;
  constructor(userService) {
    this.#userService = userService;
  }

  getUserById(req, res) {
    try {
      const userId = req.params?.id;

      const response = this.#userService.userFindById(Number(userId));

      res.status(200).json(response);
    } catch (error) {
      const resData = new ResData(error.message, null, error);

      res.status(error.statusCode ?? 500).json(resData);
    }
  }

  getAllUsers(_, res) {
    try {
      const response = this.#userService.userGetAll();

      res.status(200).json(response);
    } catch (error) {
      const resData = new ResData(error.message, null, error);

      res.status(error.statusCode ?? 500).json(resData);
    }
  }

  createUser(req, res) {
    try {
      const { fullName, login, age } = req.body;
      if (!fullName || !login || !age) {
        const resData = new ResData("fullName, login, age must be require!");

        return res.status(400).json(resData);
      }

      const response = this.#userService.createUser(req.body);

      res.status(201).json(response);
    } catch (error) {
      const resData = new ResData(error.message, null, error);

      res.status(error.statusCode ?? 500).json(resData);
    }
  }
}
