import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { ToastrModule } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

import { ChatListComponent } from './chat-list.component';

function getUserId() {
  if (localStorage.getItem('userJSON') !== null) {
    return JSON.parse(localStorage.getItem('userJSON')!).id;
  } else {
    return 'null';
  }
}

describe('ChatListComponent', () => {
  let component: ChatListComponent;
  let fixture: ComponentFixture<ChatListComponent>;

  const config: SocketIoConfig = {
    url: environment.API_URL,
    options: {
      query: {
        user_role: localStorage.getItem('role')!,
        userId: getUserId(),
      },
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
        SocketIoModule.forRoot(config),
      ],

      declarations: [ChatListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
