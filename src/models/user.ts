interface UserModel {
    id: string,
    name: string,
    email: string,
    phone: string,
    joined: Date,
    description: string,
    password?: string,
    status: boolean
}

export default UserModel;