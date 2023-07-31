interface BookingModel {
    id: string,
    name: string,
    order: Date,
    in: Date,
    out: Date,
    request: string,
    status: number,
    room: string
}

export default BookingModel;