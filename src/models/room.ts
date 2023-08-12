import { ObjectId } from "mongoose";

interface RoomModel {
    _id: string | ObjectId,
    name: string,
    type: number,
    ammenities: string[],
    cancel: string,
    price: number,
    offer: number,
    bookings: object[],
    status: boolean
}

export default RoomModel;