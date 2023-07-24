interface MessageModel {
    id: number,
    name: string,
    email: string,
    phone: string,
    subject: string,
    message: string,
    date: string,
    archived: boolean,
    read: boolean
}

export default MessageModel;