import mongoose, { Types } from 'mongoose';


const UserActionsSchema = new mongoose.Schema({
    associatedUser: {
        type: String,
        required: true
    },
    action: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
})

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    activities: [
        UserActionsSchema
    ]
})

export const User = mongoose.model("User", UserSchema)
export const UserActions = mongoose.model("UserActions", UserActionsSchema)
