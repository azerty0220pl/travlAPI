import { ObjectId } from "mongoose";

interface BookingModel {
    _id: string | ObjectId,
    name: string,
    order: Date,
    in: Date,
    out: Date,
    request: string,
    status: number,
    room: string
}

export default BookingModel;