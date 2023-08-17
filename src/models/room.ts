import { ObjectId } from "mongoose";

interface RoomModel {
    _id?: ObjectId,
    name: string,
    type: number,
    ammenities: string[],
    description: string,
    cancel: string,
    price: number,
    offer: number,
    bookings: object[]
}

export default RoomModel;