import { User } from './../../../../models/user.model';
import { UserService } from 'src/app/services/user/user.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css'],
})
export class ChatMessageComponent implements OnInit {
  @Input() name: string = 'name';
  @Input() message: string = 'message';

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  getFullName(userId: string): string {
    if (userId === 'Admin') return userId;
    return this.userService.getFullName(userId);
  }

  getCurrentUser(): User {
    return this.userService.getCurrentUser();
  }
}
