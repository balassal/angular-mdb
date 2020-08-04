import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { PostsComponent } from './pages/posts/posts.component';
import { PostDetailsComponent } from './pages/post-details/post-details.component';
import { AddPostComponent } from './pages/add-post/add-post.component';
import { EditPostComponent } from './pages/edit-post/edit-post.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { AddUserComponent } from './pages/add-user/add-user.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'posts/details/:id', component: PostDetailsComponent },
  { path: 'posts/add', component: AddPostComponent },
  { path: 'posts/edit/:id', component: EditPostComponent },
  { path: 'users', component: UserListComponent },
  { path: 'users/edit/:id', component: EditUserComponent },
  { path: 'users/add', component: AddUserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
