import { Schema, model } from "mongoose";
import BookingModel from "../models/booking";


const bookingSchema = new Schema({
    name: { type: String, required: true},
    order: { type: Date, required: true },
    in: { type: Date, required: true },
    out: { type: Date, required: true },
    request: { type: String, required: true },
    room: { type: String, required: true },
    refund: { type: Boolean, required: true }
});

const Booking = model("Booking", bookingSchema);


const userService = {
    fetchById: async (id: String): Promise<BookingModel | string> => {
        try {
            await Booking.findById(id).then(doc => {
                if (doc) {
                    return {
                        id: doc.id,
                        name: doc.name,
                        order: doc.order,
                        in: doc.in,
                        out: doc.out,
                        request: doc.request,
                        room: doc.room,
                        status: doc.refund ? 0 : 1
                    };
                }
            });
        } catch {
            return "Database error";
        }

        return "Not found";
    },
    fetchPage: async (page: number, limit: number, filter: object, order: { [key: string]: 1 | -1 }): Promise<BookingModel[] | string> => {
        try {
            let docs = await Booking.find(filter, {}, { skip: page * (limit - 1), limit: limit }).sort(order);
            return docs.map(el => {
                return {
                    id: el.id,
                    name: el.name,
                    order: el.order,
                    in: el.in,
                    out: el.out,
                    request: el.request,
                    room: el.room,
                    status: el.refund ? 0 : 1
                };
            });
        } catch {
            return "Database error";
        }
    },
    update: async (book: BookingModel): Promise<string> => {
        try {
            await Booking.findByIdAndUpdate(book.id, book).then(doc => {
                if (doc)
                    return "Booking updated";
            });
        } catch {
            return "Database error";
        }

        return "Not updated";
    },
    new: async (book: BookingModel): Promise<string> => {
        try {
            let doc = await Booking.findById(book.id);

            if (!doc) {
                let bk = new Booking(book);

                await bk.save()
                return "Booking saved";
            } else {
                return "Booking already exist";
            }
        } catch {
            return "Database error";
        }
    }
};

export default userService;