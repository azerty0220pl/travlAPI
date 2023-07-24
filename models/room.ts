interface RoomModel {
    id: number,
    name: string,
    type: "Single Bed" | "Double Bed" | "Superior Double" | "Suite",
    ammenities: string[],
    cancel: string,
    price: number,
    offer: number,
    status: "Booked" | "Available"
}

export default RoomModel;