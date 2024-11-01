import { User, UserActions } from "../db-models/model";
import { Request, Response } from "express";
import { addUserAction } from "../utils/utils";
require('dotenv').config();


export const createUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const { userName, userEmail, password, role, requestingUserEmail } = req.body;
        console.log("create user call")
        const adminCheck = await User.findOne({ userEmail: requestingUserEmail });
        if (adminCheck.role !== "admin") {
            return res.status(404).json({ message: 'operation must be performed by a user in admin role' });
        }
        const newUser = new User({ userName, userEmail, password, role });
        await newUser.save();

        await addUserAction(requestingUserEmail, 'Created a new user');

        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user' });
    }
};

export const updateUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const { userName, userEmail, password, role, requestingUserEmail } = req.body;
        console.log(userName, userEmail, password, role, requestingUserEmail)
        const adminCheck = await User.findOne({ userEmail: requestingUserEmail });

        if (adminCheck.role !== "admin") {
            return res.status(404).json({ message: 'operation must be performed by a user in admin role' });
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { userName, userEmail, password, role },
            { new: true }
        );
        if (!user) return res.status(404).json({ message: 'User not found' });

        await addUserAction(requestingUserEmail, `Updated a user details`);

        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user' });
    }
};

export const getUserById = async (req: Request, res: Response): Promise<any> => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user' });
    }
};

export const addAction = async (req: Request, res: Response): Promise<any> => {
    try {
        const { requestingUserEmail, action } = req.body;
        await addUserAction(requestingUserEmail, action);
        res.status(200).send({ message: "Action added successfully" })

    } catch (error) {
        res.status(500).json({ message: 'Error adding action' });

    }
}

export const deleteUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const { requestingUserEmail } = req.body;
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        await addUserAction(requestingUserEmail, 'Deleted a user');

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user' });
    }
};