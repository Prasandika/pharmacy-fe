import { UserService } from 'src/app/services/user/user.service';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { UserRole } from 'src/app/enums/user-role.enum';
import { ChatMessage } from 'src/app/models/chat-message.model';
import { Chat } from 'src/app/models/chat.model';

@Component({
  selector: 'app-chat-holder',
  templateUrl: './chat-holder.component.html',
  styleUrls: ['./chat-holder.component.css'],
})
export class ChatHolderComponent implements OnInit {
  messages: Array<ChatMessage> = [];
  messageInput!: string;
  @Input() mode!: string;
  @Input() chat!: Chat;

  constructor(private socket: Socket, private userService: UserService) {
    if (userService.getCurrentUser().role == UserRole.Regular) {
      this.chat = new Chat();
    }
  }

  @ViewChild('messageContainer') messageContainer: ElementRef =
    {} as ElementRef;

  ngOnInit(): void {
    this.mode = localStorage.getItem('role')!;

    console.log('mode', this.mode, 'chat', this.chat);

    if (this.mode == UserRole.Regular) {
      this.chat = new Chat();
    }

    //listening to messages
    this.socket.on('message', (res: ChatMessage) => {
      this.scrollToBottom();
      console.log('messagee', res, this.chat);
      let msg = new ChatMessage();
      if (
        (this.mode === UserRole.Admin && res?.senderId == this.chat?.userId) ||
        (this.mode == UserRole.Regular && res?.senderId == UserRole.Admin)
      ) {
        msg.message = res.message;
        msg.senderId = res.senderId!;
        if (this.chat) {
          this.chat?.messages?.push(msg);
        }
      }
    });
  }

  sendMessage() {
    if (this.messageInput.length > 0) {
      let message = new ChatMessage();
      message.message = this.messageInput;
      message.mode = this.mode;
      message.receiverUserId = this.chat.userId;
      message.senderId = 'You';

      message.senderId = this.userService.getCurrentUser().id;

      console.log('sending message', message);
      this.chat.messages.push(message);

      if (this.mode == UserRole.Admin) {
        this.socket.emit('message', message);
      } else if (this.mode == UserRole.Regular) {
        message.receiverUserId = UserRole.Admin;
        this.socket.emit('message', message);
      }
      this.messageInput = '';
    }

    this.scrollToBottom();
  }

  scrollToBottom() {
    setTimeout(() => {
      this.messageContainer.nativeElement.scrollTop =
        this.messageContainer.nativeElement.scrollHeight;
    }, 0);
  }
}
