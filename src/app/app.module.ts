import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {
  MDBBootstrapModule,
  CollapseModule,
  WavesModule,
} from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { PostsComponent } from './pages/posts/posts.component';
import { PostDetailsComponent } from './pages/post-details/post-details.component';
import { PostComponent } from './components/post/post.component';
import { AddPostComponent } from './pages/add-post/add-post.component';
import { MessageComponent } from './components/message/message.component';
import { EditPostComponent } from './pages/edit-post/edit-post.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserComponent } from './components/user/user.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { AddUserComponent } from './pages/add-user/add-user.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CategoriesComponent,
    PostsComponent,
    PostDetailsComponent,
    PostComponent,
    AddPostComponent,
    MessageComponent,
    EditPostComponent,
    UserListComponent,
    UserComponent,
    EditUserComponent,
    AddUserComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    CollapseModule,
    WavesModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
