import { Subject, Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chat } from 'src/app/models/chat.model';
import { ResponseDTO } from 'src/app/models/response.dto';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private readonly API_URL = environment.API_URL + '/chat';

  constructor(private http: HttpClient) {}

  get(): Observable<Chat[]> {
    let subject = new Subject<Chat[]>();
    this.http.get<Chat[]>(this.API_URL).subscribe((res) => {
      let chats: Chat[] = res;

      subject.next(chats.filter((c) => c.messages?.length > 0));
    });
    return subject.asObservable();
  }

  getOne(userId: string): Observable<Chat> {
    let subject = new Subject<Chat>();
    this.http.get<ResponseDTO>(`${this.API_URL}/${userId}`).subscribe((res) => {
      if (res.success) subject.next(res.data);
    });
    return subject.asObservable();
  }

  getByUserId(userId: string): Observable<Chat> {
    return this.http.get<Chat>(`${this.API_URL}/${userId}`);
  }
}
