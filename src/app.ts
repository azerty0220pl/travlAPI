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

app.route("/bookings", isAuthorized)
    .get(bookingController.getPage)
    .post(bookingController.new);
app.route("/bookings/:id")
    .get(bookingController.getById)
    .put(bookingController.update);

app.route("/messages", isAuthorized)
    .get(messageController.getPage)
    .post(messageController.new);
app.route("/messages/:id")
    .get(messageController.getById)
    .put(messageController.update);

app.route("/rooms", isAuthorized)
    .get(roomController.getPage)
    .post(roomController.new);
app.route("/rooms/:id")
    .get(roomController.getById)
    .put(roomController.update);

app.route("/users", isAuthorized)
    .get(userController.getPage)
    .post(userController.new);
app.route("/users/:id")
    .get(userController.getById)
    .put(userController.update);

app.post("/login", loginController);

export default app;