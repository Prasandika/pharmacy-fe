import { User } from './models/user.model';
import { ChatMessageComponent } from './components/chat/chat-holder/chat-message/chat-message.component';
import { ChatHolderComponent } from './components/chat/chat-holder/chat-holder.component';
import { ChatListComponent } from './components/chat/chat-list/chat-list.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { ProductComponent } from './components/product/product.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductsListComponent } from './components/dashboard/products-list/products-list.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

import { OrderComponent } from './components/order/order.component';
import { ProductDetailsComponent } from './components/product/product-details/product-details.component';
import { ProductListAdminComponent } from './components/product/product-list-admin/product-list-admin.component';
import { ProductItemComponent } from './components/dashboard/product-item/product-item.component';
import { CartComponent } from './components/cart/cart.component';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ChatComponent } from './components/chat/chat.component';
import { AuthInterceptor } from './components/interceptors/auth.interceptor';
const config: SocketIoConfig = {
  url: environment.API_URL,
  options: {
    query: {
      user_role: localStorage.getItem('role')!,
      userId: getUserId(),
    },
  },
};

function getUserId() {
  if (localStorage.getItem('userJSON') !== null) {
    return JSON.parse(localStorage.getItem('userJSON')!).id;
  } else {
    return 'null';
  }
}

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ProductsListComponent,
    NavBarComponent,
    OrderComponent,
    ProductDetailsComponent,
    ProductListAdminComponent,
    ProductItemComponent,
    CartComponent,
    ChatComponent,
    ChatListComponent,
    ChatHolderComponent,
    ChatMessageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added

    SocketIoModule.forRoot(config),

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
