import { User } from './../../../models/user.model';
import { UserService } from 'src/app/services/user/user.service';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ChatService } from 'src/app/services/chat/chat.service';
import { Chat } from 'src/app/models/chat.model';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css'],
})
export class ChatListComponent implements OnInit {
  chats$: Observable<Chat[]>;
  users: User[] = [];

  @Output() chatSelected: EventEmitter<Chat> = new EventEmitter();
  constructor(
    private chatService: ChatService,
    private socket: Socket,
    private userService: UserService
  ) {
    this.chats$ = this.chatService.get();

    this.chats$.subscribe((res) => console.log('chats', res));
    this.socket.fromEvent('message').subscribe((res) => {
      console.log('got message', res);
      this.chats$ = this.chatService.get();
      this.chats$.subscribe((res) => console.log('messages', res));
    });
  }

  ngOnInit(): void {}

  selectChat(chat: Chat) {
    this.chatSelected.emit(chat);
  }

  getFullName(userId: string): string {
    return this.userService.getFullName(userId);
  }
}
