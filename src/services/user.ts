import { Schema, model } from "mongoose";
import UserModel from "../models/user";


const userSchema = new Schema({
    name: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    description: { type: String, required: true },
    joined: { type: Date, required: true },
    left: { type: Date, required: false },
    password: { type: String, required: true },
});

const User = model("User", userSchema);


const userService = {
    fetchOne: async (name: String): Promise<UserModel | string> => {
        let res: UserModel | string = "Not found";

        await User.findOne({ name: name }).then(doc => {
            if (doc) {
                res = {
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
        });

        return res;
    },
    fetchById: async (id: String): Promise<UserModel | string> => {
        let res: UserModel | string = "Not found";

        await User.findById(id).then(doc => {
            if (doc) {
                res = {
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
        });

        return res;
    },
    fetchPage: async (page: number, limit: number, filter: object, order: { [key: string]: 1 | -1 }): Promise<UserModel[] | string> => {
        let res: UserModel[] | string = "Not found";

        try {
            let docs = await User.find(filter, {}, { skip: page * (limit - 1), limit: limit }).sort(order);
                res = docs.map(el => {
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
        } catch {}

        return res;
    },
    update: async (name: string, user: UserModel): Promise<string> => {
        let res = "Not updated";

        await User.findOneAndUpdate({ name: name }, user).then(doc => {
            if (doc)
                res = "User updated";
        });

        return res;
    },
    new: async (user: UserModel): Promise<string> => {
        let res = "Could not save user";

        try {
            let doc = await User.findOne({ username: user.name });

            if (!doc) {
                let us = new User(user);

                await us.save()
                res = "User saved";
            } else {
                res = "User already exist";
            }
        } catch { }


        return res;
    }
};

export default userService;