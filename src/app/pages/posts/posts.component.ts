import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

import { Post } from '../../models/post.model';
import { PostService } from '../../services/post.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit, OnDestroy {
  posts: Observable<Post[]>;

  constructor(
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    if (this.route.snapshot.queryParamMap.get('reload')) {
      console.log('Reload');
    } else {
      this.loadData('newest');
    }
  }

  ngOnDestroy() {
    this.posts = null;
  }

  loadData(orderby: string) {
    this.postService.getAllPostSorted(orderby).subscribe(
      (data) => {
        this.posts = data;
      },
      (error) => console.log(error)
    );
  }

  navigateToAddPost() {
    this.router.navigate(['posts/add']);
  }

  sortPost(e) {
    this.loadData(e);
  }

  deletePost(id: number) {
    this.postService.deletePost(id).subscribe(
      (data) => {
        console.log(data);
        this.loadData('newest');
      },
      (error) => console.log(error)
    );
  }
}
