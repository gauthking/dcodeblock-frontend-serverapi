import { User, UserActions } from "../db-models/model";

export const addUserAction = async (userEmail: string, action: string) => {
    const user = await User.findOne({ userEmail });
    if (user) {
        const userAction = new UserActions({
            associatedUser: userEmail,
            action,
            time: new Date().toISOString(),
        });

        await userAction.save();

        user.activities.push(userAction.toObject());
        await user.save();
    }
};
