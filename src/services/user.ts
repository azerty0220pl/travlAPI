import { Schema, model } from "mongoose";
import UserModel from "../models/user";


const userSchema = new Schema({
    name: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    description: { type: String, required: true },
    joined: { type: Date, required: true },
    status: { type: Boolean, required: true },
    password: { type: String, required: true }
});

const User = model("User", userSchema);


const userService = {
    fetchOne: async (name: String): Promise<UserModel | string> => {
        try {
            const doc = await User.findOne({ name: name })
            if (doc) {
                return doc as unknown as UserModel;
            }
        } catch {
            return "Database error";
        }

        return "Not found";
    },
    fetchById: async (id: String): Promise<UserModel | string> => {
        try {
            const doc = await User.findById(id)
            if (doc) {
                return doc as unknown as UserModel;
            }
        } catch {
            return "Database error";
        }

        return "Not found";
    },
    fetchPage: async (page: number, limit: number, filter: object, order: { [key: string]: 1 | -1 }): Promise<UserModel[] | string> => {
        try {
            let docs = await User.find(filter, {}, { skip: (page * (limit - 1)), limit: limit }).sort(order);
            console.log(docs)
            return docs.map(el => {
                return el as unknown as UserModel;
            });
        } catch {
            return "Database error";
        }
    },
    update: async (user: UserModel): Promise<UserModel | string> => {
        try {
            const doc = await User.findByIdAndUpdate(user._id, user);
            
            if (doc)
                return doc as unknown as UserModel;
        } catch {
            return "Database error";
        }

        return "Not updated";
    },
    new: async (user: UserModel): Promise<string> => {
        try {
            const doc = await User.findOne({ name: user.name });

            if (!doc) {
                const us = new User(user);

                await us.save();
                return "User saved";
            } else {
                return "User already exist";
            }
        } catch {
            return "Database error";
        }
    },
    count: async () => {
        return await User.count({});
    }
};

export default userService;