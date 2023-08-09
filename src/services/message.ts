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

const Message = model("Message", messageSchema);


const messageService = {
    fetchById: async (id: String): Promise<MessageModel | string> => {
        try {
            const doc = await Message.findById(id)
            if (doc) {
                return {
                    id: doc.id,
                    name: doc.name,
                    phone: doc.phone,
                    email: doc.email,
                    subject: doc.subject,
                    message: doc.message,
                    archived: doc.archived,
                    read: doc.read,
                    date: doc.date
                };
            }
        } catch {
            return "Database error";
        }

        return "Not found";
    },
    fetchPage: async (page: number, limit: number, filter: object, order: { [key: string]: 1 | -1 }): Promise<MessageModel[] | string> => {
        try {
            const docs = await Message.find(filter, {}, { skip: page * (limit - 1), limit: limit }).sort(order);
            return docs.map(el => {
                return {
                    id: el.id,
                    name: el.name,
                    phone: el.phone,
                    email: el.email,
                    subject: el.subject,
                    message: el.message,
                    archived: el.archived,
                    read: el.read,
                    date: el.date
                };
            });
        } catch {
            return "Database error"
        }
    },
    update: async (message: MessageModel): Promise<string> => {
        try {
            await Message.findByIdAndUpdate(message.id, message).then(doc => {
                if (doc)
                    return "Message updated";
            });
        } catch {
            return "Database error"
        }

        return "Not updated";
    },
    new: async (message: MessageModel): Promise<string> => {
        try {
            const msg = new Message(message);

            await msg.save()
            return "Message saved";
        } catch {
            return "Database error"
        }
    }
};

export default messageService;