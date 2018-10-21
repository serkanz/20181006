import { Document, Schema, Model, model } from "mongoose";
import { ITodo } from "../Interfaces/ITodo";
import { ObjectID } from "mongodb";

export interface ITodoModel extends ITodo, Document { }

export const TodoSchema = new Schema({
    text: {
        type: String,
        required: true,
        minlength: 2
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: undefined
    }
});

export const Todo: Model<ITodoModel> = model<ITodoModel>("Todo", TodoSchema);