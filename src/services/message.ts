import { Schema, model } from "mongoose";
import MessageModel from "../models/message";


const messageSchema = new Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    archived: { type: Boolean, required: true },
    read: { type: Boolean, required: true },
    date: { type: Date, required: true }
});

export const Message = model("Message", messageSchema);


const messageService = {
    fetchById: async (id: String): Promise<MessageModel | string> => {
        try {
            const doc = await Message.findById(id)
            if (doc) {
                return doc as unknown as MessageModel;
            }
        } catch {
            return "Database error";
        }

        return "Not found";
    },
    fetchPage: async (page: number, limit: number, filter: object, order: { [key: string]: 1 | -1 }): Promise<MessageModel[] | string> => {
        try {
            const docs = await Message.find(filter, {}, { skip: page * (limit), limit: limit }).sort(order);
            return docs.map(el => {
                return el as unknown as MessageModel;
            });
        } catch {
            return "Database error"
        }
    },
    update: async (message: MessageModel): Promise<MessageModel | string> => {
        try {
            let doc = await Message.findByIdAndUpdate(message._id, message)
            if (doc)
                return doc as unknown as MessageModel;
            else
                return "doc is null";
        } catch (e: any) {
            return "Database error"
        }
    },
    new: async (message: MessageModel): Promise<string> => {
        try {
            const msg = new Message(message);

            await msg.save();
            return "Message saved";
        } catch {
            return "Database error"
        }
    },
    count: async (filter: object) => {
        return await Message.count(filter);
    }
};

export default messageService;