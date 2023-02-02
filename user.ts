import Message from "./message";

type User = {
    userId: number,
    name: string,
    isAdmin: boolean,
    roles: [],
    createdAt: Date,
    messages: Message[]


}

export default User;
