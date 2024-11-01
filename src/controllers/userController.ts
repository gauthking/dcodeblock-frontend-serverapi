import { User, UserActions } from "../db-models/model";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"
import { addUserAction } from "../utils/utils";
require('dotenv').config();


const SALT = process.env.saltVal;

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find({});
        res.status(200).json(users)
    } catch (error) {
        console.log("An error occured at the getAllUsers function - ", error);
        res.status(500).send("internal server error")
    }
}

export const registerUser = async (req: Request, res: Response): Promise<any> => {
    const { userName, userEmail, hashedPassword } = req.body;
    console.log("registeruser triggeredd")
    try {
        const existingUser = await User.findOne({ userEmail });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = new User({
            userName: userName.toLowerCase(),
            userEmail: userEmail.toLowerCase(),
            password: hashedPassword,
            role: "user",
            activities: []
        });

        await newUser.save();

        const token = jwt.sign(
            { userId: newUser._id, role: newUser.role },
            SALT,
            { expiresIn: "15m" }
        );

        await addUserAction(userEmail, 'Registered');

        res.status(201).json({ token: token, user: newUser, message: "User registered successfully" });
    } catch (error) {
        console.log("Error in registerUser function:", error);
        res.status(500).send("Internal server error");
    }
};

export const loginUser = async (req: Request, res: Response): Promise<any> => {
    const { userEmail, password } = req.body;

    try {
        const user = await User.findOne({ userEmail: userEmail });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            SALT,
            { expiresIn: "15m" }
        );

        await addUserAction(userEmail, 'Logged in');

        res.status(200).json({ token: token, user: user, message: "Login successful" });
    } catch (error) {
        console.log("Error in loginUser function:", error);
        res.status(500).send("Internal server error while logging in :(");
    }
};



