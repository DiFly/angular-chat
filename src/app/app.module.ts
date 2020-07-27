import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatNavBarComponent } from './component/chat-nav-bar/chat-nav-bar.component';
import { ChatThreadsComponent } from './component/chat-threads/chat-threads.component';
import { ChatWindowComponent } from './component/chat-window/chat-window.component';
import { ChatThreadComponent } from './component/chat-thread/chat-thread.component';
import { ChatPageComponent } from './component/chat-page/chat-page.component';
import { ChatMessageComponent } from './component/chat-message/chat-message.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatNavBarComponent,
    ChatThreadsComponent,
    ChatWindowComponent,
    ChatThreadComponent,
    ChatPageComponent,
    ChatMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
