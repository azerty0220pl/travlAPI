import { ObjectId } from "mongoose";

interface UserModel {
    _id?: ObjectId,
    name: string,
    email: string,
    phone: string,
    joined: Date,
    description: string,
    password: string,
    status: boolean
}

export default UserModel;