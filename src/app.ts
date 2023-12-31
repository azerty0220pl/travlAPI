import { json } from "express";
import express from "express";
import cors from "cors";
import homeController from "./controllers/home";
import bookingController from "./controllers/booking";
import loginController from "./controllers/login";
import messageController from "./controllers/message";
import roomController from "./controllers/room";
import userController from "./controllers/user";
import isAuthorized from "./middleware/login";
import connect from './services/connect';
import seed from "./utils/seed";

connect().then(() => {
    console.log("Connected to database");
});

const app = express();

app.use(cors());

app.use(json());

app.get("/", homeController);

app.route("/bookings")
    .get(isAuthorized, bookingController.getPage)
    .post(isAuthorized, bookingController.new);
app.route("/bookings/:id")
    .get(isAuthorized, bookingController.getById)
    .put(isAuthorized, bookingController.update);

app.route("/messages")
    .get(isAuthorized, messageController.getPage)
    .post(isAuthorized, messageController.new);
app.route("/messages/:id")
    .get(isAuthorized, messageController.getById)
    .put(isAuthorized, messageController.update);

app.route("/rooms")
    .get(isAuthorized, roomController.getPage)
    .post(isAuthorized, roomController.new);
app.route("/rooms/:id")
    .get(isAuthorized, roomController.getById)
    .put(isAuthorized, roomController.update);

app.route("/users")
    .get(isAuthorized, userController.getPage)
    .post(isAuthorized, userController.new);
app.route("/users/:id")
    .get(isAuthorized, userController.getById)
    .put(isAuthorized, userController.update);

app.post("/login", loginController.login);
app.post("/logged", isAuthorized, loginController.logged);

app.get("/seed", seed);

export default app;