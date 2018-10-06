import express, { json } from "express";
import compression from "compression";
import session from "express-session";
import bodyParser from "body-parser";
import path from "path";
import expressValidator from "express-validator";

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

        this.server.use((req, res, next) => {
            const log = `${new Date().toString()}: ${req.url} ${req.method} ${res.statusCode}\n`;
            fs.appendFile(new Date().toDateString(), log, () => { });
            console.log(log);
            next();
        });

        this.server.use((req, res, next) => {
            res.render("maintenance.hbs");
        });

        this.server.use(express.static(path.join(__dirname + "/public")));

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

}

export default new App().server;



