import { User, UserActions } from "../db-models/model";
import { Request, Response } from "express";


export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find({});
        res.status(200).json(users)
    } catch (error) {
        console.log("An error occured at the getAllUsers function - ", error);
        res.status(500).send("internal server error")
    }
}