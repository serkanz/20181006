import { Document, Schema, Model, model } from "mongoose";
import { IUser } from "../Interfaces/IUser";

export interface IUserModel extends IUser, Document { }

export const UserSchema = new Schema({
    email: {
        required: true,
        trim: true,
        minlength: 1,
        type: String
    }
});

export const User: Model<IUserModel> = model<IUserModel>("User", UserSchema);