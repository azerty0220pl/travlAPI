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

app.get("/bookings", isAuthorized, bookingController);
app.get("/messages", isAuthorized, messageController);
app.get("/rooms", isAuthorized, roomController);
app.get("/users", isAuthorized, userController.getPage);

app.post("/login", loginController);

export default app;