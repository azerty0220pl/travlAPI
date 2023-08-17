import { Schema, model } from "mongoose";
import BookingModel from "../models/booking";
import roomService from "./room";


const bookingSchema = new Schema({
    name: { type: String, required: true },
    order: { type: Date, required: true },
    in: { type: Date, required: true },
    out: { type: Date, required: true },
    request: { type: String, required: true },
    room: { type: String, required: true },
    refund: { type: Boolean, required: true }
});

export const Booking = model("Booking", bookingSchema);


const bookingService = {
    fetchById: async (id: String): Promise<BookingModel | string> => {
        try {
            const doc = await Booking.findById(id)
            if (doc) {
                return doc as unknown as BookingModel;
            }
        } catch {
            return "Database error";
        }

        return "Not found";
    },
    fetchPage: async (page: number, limit: number, filter: object, order: { [key: string]: 1 | -1 }): Promise<BookingModel[] | string> => {
        try {
            const docs = await Booking.find(filter, {}, { skip: page * (limit), limit: limit }).sort(order);
            return docs.map(el => {
                return el as unknown as BookingModel;
            });
        } catch {
            return "Database error";
        }
    },
    update: async (book: BookingModel): Promise<string> => {
        try {
            await Booking.findByIdAndUpdate(book._id, book).then(doc => {
                if (doc)
                    return doc as unknown as BookingModel;
            });
        } catch {
            return "Database error";
        }

        return "Not updated";
    },
    new: async (book: BookingModel): Promise<string> => {
        try {
            const bk = new Booking(book);

            await bk.save();
            const rm = await roomService.fetchOne(book.room);

            if (typeof (rm) === "string")
                return "Room does not exist";

            rm.bookings.push({
                in: book.in,
                out: book.out
            });

            roomService.update(rm);
            return "Booking saved";
        } catch {
            return "Database error";
        }
    },
    count: async (filter: object) => {
        return await Booking.count(filter);
    }
};

export default bookingService;