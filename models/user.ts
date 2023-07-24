interface UserModel {
    id: number,
    name: string,
    email: string,
    phone: string,
    joined: string,
    description: string,
    status: "Active" | "Inactive"
}

export default UserModel;