import { Schema, model } from "mongoose";
import RoomModel from "../models/room";

const roomSchema = new Schema({
    name: { type: String, required: true, unique: true },
    type: { type: Number, required: true },
    ammenities: { type: [String], required: true },
    price: { type: Number, required: true },
    offer: { type: Number, required: true },
    cancel: { type: String, required: true },
    description: { type: String, required: true },
    bookings: { type: [Object], required: true }
});

export const Room = model("Room", roomSchema);


const roomService = {
    fetchOne: async (name: String): Promise<RoomModel | string> => {
        try {
            const doc = await Room.findOne({ name: name })
            if (doc) {
                return doc as unknown as RoomModel;
            }
        } catch {
            return "Database error";
        }

        return "Not found";
    },
    fetchById: async (id: string): Promise<RoomModel | string> => {
        try {
            const doc = await Room.findById(id)
            if (doc) {
                return doc as unknown as RoomModel;
            }
        } catch {
            return "Database error";
        }

        return "Not found";
    },
    fetchPage: async (page: number, limit: number, filter: object, order: { [key: string]: 1 | -1 }): Promise<RoomModel[] | string> => {
        try {
            const docs = await Room.find(filter, {}, { skip: page * (limit - 1), limit: limit }).sort(order);
            return docs.map(el => {
                return el as unknown as RoomModel;
            });
        } catch {
            return "Database error";
        }
    },
    update: async (room: RoomModel): Promise<RoomModel | string> => {
        try {
            await Room.findByIdAndUpdate(room._id, room).then(doc => {
                if (doc)
                    return doc as unknown as RoomModel;
            });
        } catch {
            return "Database error";
        }

        return "Not updated";
    },
    new: async (room: RoomModel): Promise<string> => {
        try {
            const doc = await Room.findOne({ name: room.name });

            if (!doc) {
                const rm = new Room(room);

                await rm.save();
                return "Room saved";
            } else {
                return "Room already exist";
            }
        } catch {
            return "Database error";
        }
    },
    count: async (filter: object) => {
        return await Room.count(filter);
    }
};

export default roomService;