interface MessageModel {
    id: string,
    name: string,
    email: string,
    phone: string,
    subject: string,
    message: string,
    date: Date,
    archived: boolean,
    read: boolean
}

export default MessageModel;