import { ObjectId } from "mongoose";

interface BookingModel {
    _id?: ObjectId,
    name: string,
    order: Date,
    in: Date,
    out: Date,
    request: string,
    room: string,
    refund: boolean
}

export default BookingModel;