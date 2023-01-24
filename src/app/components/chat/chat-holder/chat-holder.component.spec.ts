import { ComponentFixture, TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

import { ChatHolderComponent } from './chat-holder.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

describe('ChatHolderComponent', () => {
  let component: ChatHolderComponent;
  let fixture: ComponentFixture<ChatHolderComponent>;

  const config: SocketIoConfig = {
    url: environment.SOCKET_URL,
    options: { query: `user_role=${localStorage.getItem('role')}` },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatHolderComponent],
      imports: [SocketIoModule.forRoot(config)],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
