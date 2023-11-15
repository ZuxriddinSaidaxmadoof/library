import { UserController } from "./user.controller.js";
import { UserService } from "./user.service.js";
import { Router } from "express";

const router = Router();

const userService = new UserService();
const userController = new UserController(userService);

router.get("/", (req, res) => {
  userController.getAllUsers(req, res);
});

router.get("/:id", (req, res) => {
  userController.getUserById(req, res);
});

router.post("/", (req, res) => {
  userController.createUser(req, res);
});

export default router;
