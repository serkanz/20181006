import express from "express";
import compression from "compression";
import session from "express-session";
import bodyParser from "body-parser";
import path from "path";
import expressValidator from "express-validator";
import mongoose from "mongoose";


import { Todo } from "./Models/Todo";

import { person, errorMessage } from "./person";

import * as se from "hbs";
import fs from "fs";


class App {
    public server: express.Express;

    constructor() {
        this.server = express();

        se.handlebars.registerPartial("footer", "sdsdsdsdsd");

        se.handlebars.registerHelper("date", () => { return JSON.stringify(person); });
        this.server.set("view engine", "hbs");

        this.server.use(bodyParser.json());
        this.server.use(bodyParser.urlencoded({ extended: true }));
        this.server.use(expressValidator());
        this.server.set("port", process.env.PORT || 3000);

        (<any>mongoose).Promise = global.Promise;
        mongoose.connect("mongodb://localhost:27017/TodoApp").then(
            () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
        ).catch(err => {
            console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
            // process.exit();
        });


        this.server.use((req, res, next) => {
            const log = `${new Date().toString()}: ${req.url} ${req.method} ${res.statusCode}\n`;
            fs.appendFile(new Date().toDateString(), log, () => { });
            console.log(log);

            this.saveTodo();
            console.log("saved");
            next();
        });


        // this.server.use((req, res, next) => {
        //     res.render("maintenance.hbs");
        // });

        this.server.use(express.static(path.join(__dirname + "/public")));

        this.server.post("/todos", (req, res) => {
            const todo = new Todo(req.body);
            todo.save().then((doc) => {
                res.send(doc);
            }, (e) => {
                res.status(400);
                res.send(e);
            });
        });

        this.server.get("/about", (req, res) => {
            // res.send("Hello Express!");
            res.render("about.hbs", { deneme: person.serkan(12) });
        });

        this.server.get("/deneme", (req, res) => {
            // res.send("Hello Express!");
            res.send(person);
        });

        this.mountRoutes();

        this.server.get("/bad", (req, res) => {
            // res.send("Hello Express!");
            res.send(errorMessage);
        });
    }

    private mountRoutes(): void {
        const router = express.Router();
        router.get("/", (req, res) => {
            res.render("home.hbs", { de: "asas" });
            /*res.json({
                message: "Hello World!"
            });*/
        });
        this.server.use("/", router);
    }

    private async saveTodo() {
        const newTodo = new Todo();
        newTodo.text = "Serkan";
        newTodo.completed = false;
        newTodo.completedAt = new Date().getTime();

        const result = await newTodo.save();

        console.log(JSON.stringify(result));
    }








}

export default new App().server;



