import { Schema, model } from "mongoose";
import MessageModel from "../models/message";


const messageSchema = new Schema({
    name: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    archived: { type: Boolean, required: true },
    read: { type: Boolean, required: true },
    date: { type: Date, required: true }
});

const Message = model("Message", messageSchema);


const userService = {
    fetchById: async (id: String): Promise<MessageModel | string> => {
        try {
            await Message.findById(id).then(doc => {
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
            });
        } catch {
            return "Database error"
        }

        return "Not found";
    },
    fetchPage: async (page: number, limit: number, filter: object, order: { [key: string]: 1 | -1 }): Promise<MessageModel[] | string> => {
        try {
            let docs = await Message.find(filter, {}, { skip: page * (limit - 1), limit: limit }).sort(order);
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
    update: async (name: string, message: MessageModel): Promise<string> => {
        try {
            await Message.findOneAndUpdate({ name: name }, message).then(doc => {
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
            let doc = await Message.findOne({ username: message.name });

            if (!doc) {
                let msg = new Message(message);

                await msg.save()
                return "Message saved";
            } else {
                return "Message already exist";
            }
        } catch {
            return "Database error"
        }
    }
};

export default userService;