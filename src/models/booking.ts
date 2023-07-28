interface BookingModel {
    id: string,
    name: string,
    order: Date,
    in: Date,
    out: Date,
    request: string,
    status: number
}

export default BookingModel;