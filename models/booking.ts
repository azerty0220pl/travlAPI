interface BookingModel {
    id: number,
    name: string,
    order: string,
    in: string,
    out: string,
    request: string,
    status: "Booked" | "In Progress" | "Refund"
}

export default BookingModel;