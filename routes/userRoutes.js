import { Router } from "express";
const router = Router();
import { getAllUsers, createUser } from "../controllers/userController";

router.route("/").get(getAllUsers).post(createUser);

export default router;
