import { faker } from '@faker-js/faker';
import 'dotenv/config';
import BookingModel from "../models/booking";
import MessageModel from "../models/message";
import RoomModel from "../models/room";
import UserModel from "../models/user";
import bcrypt from "bcrypt";
import { Request, Response } from 'express';
import { Booking } from '../services/booking';
import { Message } from '../services/message';
import { Room } from '../services/room';
import { User } from '../services/user';
import mongoose from 'mongoose';

async function seed(_req: Request, res: Response) {

    try {
        await Booking.deleteMany();
        await Message.deleteMany();
        await Room.deleteMany();
        await User.deleteMany();

        // make a bunch of time series data
        let booking: Array<BookingModel> = [];
        let message: Array<MessageModel> = [];
        let room: Array<RoomModel> = [];
        let user: Array<UserModel> = [{
            name: "admin",
            email: faker.internet.email(),
            phone: faker.phone.number(),
            joined: faker.date.anytime(),
            description: faker.lorem.paragraph(),
            password: await bcrypt.hash("password", 10),
            status: true
        }];

        for (let i = 0; i < 23; i++) {
            let b = {
                name: faker.person.fullName(),
                order: faker.date.anytime(),
                in: faker.date.anytime(),
                out: faker.date.anytime(),
                request: faker.lorem.paragraph(),
                room: i.toString(),
                refund: i % 2 === 1
            }

            booking.push(b);

            let m = {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                phone: faker.phone.number(),
                subject: faker.lorem.paragraph(),
                message: faker.lorem.paragraph(),
                date: faker.date.anytime(),
                archived: i % 2 === 1,
                read: i % 2 === 1
            }

            message.push(m);

            let r = {
                name: i.toString(),
                type: i % 4,
                ammenities: [""],
                description: faker.lorem.paragraph(),
                cancel: faker.lorem.paragraph(),
                price: i,
                offer: i,
                bookings: []
            }

            room.push(r);

            let u = {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                phone: faker.phone.number(),
                joined: faker.date.anytime(),
                description: faker.lorem.paragraph(),
                password: await bcrypt.hash("password", 10),
                status: i % 2 === 1
            }

            user.push(u);
        }

        Message.insertMany(message);
        Room.insertMany(room);
        Booking.insertMany(booking);
        User.insertMany(user);

        console.log("Database seeded! :)");
    } catch (err: any) {
        console.log(err.stack);
    }

    return res.send();
}

export default seed;