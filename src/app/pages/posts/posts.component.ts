import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Post } from '../../models/post.model';
import { PostService } from '../../services/post.service';

@Component({
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  posts: Observable<Post[]>;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.postService.getAllPost().subscribe(
      (data) => {
        this.posts = data;
      },
      (error) => console.log(error)
    );
  }
}
