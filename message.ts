import User from "./user";

type Message = {
    user: User,
    message: string,
    messageId: number,
    keks: number,
    edited: boolean,
    createdAt: Date,
    editTime: Date | null

}

export default Message