import { Schema, model } from "mongoose";
import UserModel from "../models/user";


const userSchema = new Schema({
    name: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    description: { type: String, required: true },
    joined: { type: Date, required: true },
    left: { type: Date, required: false },
    password: { type: String, required: true }
});

const User = model("User", userSchema);


const userService = {
    fetchOne: async (name: String): Promise<UserModel | string> => {
        try {
            const doc = await User.findOne({ name: name })
            if (doc) {
                return {
                    id: doc.id,
                    name: doc.name,
                    phone: doc.phone,
                    email: doc.email,
                    description: doc.description,
                    joined: doc.joined,
                    password: doc.password,
                    status: doc.left ? false : true
                };
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
                return {
                    id: doc.id,
                    name: doc.name,
                    phone: doc.phone,
                    email: doc.email,
                    description: doc.description,
                    joined: doc.joined,
                    password: doc.password,
                    status: doc.left ? false : true
                };
            }
        } catch {
            return "Database error";
        }

        return "Not found";
    },
    fetchPage: async (page: number, limit: number, filter: object, order: { [key: string]: 1 | -1 }): Promise<UserModel[] | string> => {
        try {
            let docs = await User.find(filter, {}, { skip: page * (limit - 1), limit: limit }).sort(order);
            return docs.map(el => {
                return {
                    id: el.id,
                    name: el.name,
                    phone: el.phone,
                    email: el.email,
                    description: el.description,
                    joined: el.joined,
                    status: el.left ? false : true
                };
            });
        } catch {
            return "Database error";
        }
    },
    update: async (user: UserModel): Promise<string> => {
        try {
            await User.findByIdAndUpdate(user.id, user).then(doc => {
                if (doc)
                    return "User updated";
            });
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

                await us.save()
                return "User saved";
            } else {
                return "User already exist";
            }
        } catch {
            return "Database error";
        }
    }
};

export default userService;