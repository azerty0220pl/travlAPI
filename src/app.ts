import { json } from "express";
import homeController from "./controllers/home";
import bookingController from "./controllers/booking";
import loginController from "./controllers/login";
import messageController from "./controllers/message";
import roomController from "./controllers/room";
import userController from "./controllers/user";
import isAuthorized from "./middleware/login";

const express = require('express');

const app = express();

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

app.post("/login", loginController);

export default app;