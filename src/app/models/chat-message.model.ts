export class ChatMessage {
  name!: string;
  message!: string;
  senderId?: string;
  receiverUserId?: string;
  socketId!: string;
  mode!: string;
}
