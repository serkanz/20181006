import { ObjectID } from "mongodb";

export interface ITodo {
    _id: any;
    text: string;
    completed?: Boolean;
    completedAt?: Number;
}