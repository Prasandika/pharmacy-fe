import { UserService } from 'src/app/services/user/user.service';
import { ChatService } from 'src/app/services/chat/chat.service';
import { UserRole } from 'src/app/enums/user-role.enum';
import { Component, OnInit } from '@angular/core';
import { Chat } from 'src/app/models/chat.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  selectedChat!: Chat;
  constructor(
    private chatService: ChatService,
    private userService: UserService
  ) {
    if (localStorage.getItem('role') == UserRole.Regular) {
      this.chatService
        .getByUserId(userService.getCurrentUser().id)
        .subscribe((chat) => (this.selectedChat = chat));
    }
  }

  ngOnInit(): void {}

  selectChat(chat: Chat) {
    this.selectedChat = chat;
  }

  getRole() {
    return localStorage.getItem('role');
  }
}
