import { ObjectId } from "mongoose";

interface UserModel {
    _id: string | ObjectId,
    name: string,
    email: string,
    phone: string,
    joined: Date,
    description: string,
    password: string,
    status: boolean
}

export default UserModel;