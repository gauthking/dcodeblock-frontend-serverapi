import express from 'express';
import { getAllUsers, loginUser, registerUser } from '../controllers/userController';

const router = express.Router();

router.route("/getAllUsers").get(getAllUsers);
router.route("/signup").post(registerUser);
router.route("/login").post(loginUser);

export default router;