import { Schema, model } from "mongoose";
import RoomModel from "../models/room";


const roomSchema = new Schema({
    name: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    ammenities: { type: String, required: true },
    price: { type: String, required: true },
    offer: { type: Date, required: true },
    bookings: { type: [Object], required: true },
    cancel: { type: String, required: true }
});

const Room = model("Room", roomSchema);


const roomService = {
    fetchById: async (id: string): Promise<RoomModel | string> => {
        try {
            await Room.findById(id).then(doc => {
                if (doc) {
                    return {
                        id: doc.id,
                        name: doc.name,
                        type: doc.type,
                        ammenities: doc.ammenities,
                        price: doc.price,
                        offer: doc.offer,
                        bookings: doc.bookings,
                        cancel: doc.cancel
                    };
                }
            });
        } catch {
            return "Database error";
        }

        return "Not found";
    },
    fetchPage: async (page: number, limit: number, filter: object, order: { [key: string]: 1 | -1 }): Promise<RoomModel[] | string> => {
        try {
            let docs = await Room.find(filter, {}, { skip: page * (limit - 1), limit: limit }).sort(order);
            return docs.map(el => {
                return {
                    id: el.id,
                    name: el.name,
                    type: el.type,
                    ammenities: el.ammenities,
                    price: el.price,
                    offer: el.offer,
                    bookings: el.bookings,
                    cancel: el.cancel
                };
            });
        } catch {
            return "Database error";
        }
    },
    update: async (room: RoomModel): Promise<string> => {
        try {
            await Room.findByIdAndUpdate(room.id, room).then(doc => {
                if (doc)
                    return "Room updated";
            });
        } catch {
            return "Database error";
        }

        return "Not updated";
    },
    new: async (room: RoomModel): Promise<string> => {
        try {
            let doc = await Room.findById(room.id);

            if (!doc) {
                let rm = new Room(room);

                await rm.save()
                return "Room saved";
            } else {
                return "Room already exist";
            }
        } catch {
            return "Database error";
        }
    }
};

export default roomService;