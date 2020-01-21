import * as express from "express";
import * as bodyParser from "body-parser";
import {SurtitrageRoutes} from "./surtitrage-routes";

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();

        // Routes
        let router = express.Router();
        new SurtitrageRoutes().routes(router);

        this.app.use("", router);

    }

    private config(): void{
        // support application/json type post data
        this.app.use(bodyParser.json());

        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
}
export default new App().app;