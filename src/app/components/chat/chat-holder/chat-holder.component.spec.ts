import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

import { ChatHolderComponent } from './chat-holder.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

describe('ChatHolderComponent', () => {
  let component: ChatHolderComponent;
  let fixture: ComponentFixture<ChatHolderComponent>;

  function getUserId() {
    if (localStorage.getItem('userJSON') !== null) {
      return JSON.parse(localStorage.getItem('userJSON')!).id;
    } else {
      return 'null';
    }
  }

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
      declarations: [ChatHolderComponent],
      imports: [
        SocketIoModule.forRoot(config),
        HttpClientTestingModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeUndefined();
  // });
});
