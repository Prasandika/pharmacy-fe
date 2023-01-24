import { ChatMessage } from './chat-message.model';
export class Chat {
  userId!: string;
  messages!: ChatMessage[];

  /**
   *
   */
  constructor() {
    this.messages = [];
  }
}
