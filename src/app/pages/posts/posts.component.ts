import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';

import { Post } from '../../models/post.model';
import { PostService } from '../../services/post.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit, OnDestroy {
  posts: Post[];
  searchText: string = '';

  constructor(
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  @HostListener('input') oninput() {
    this.searchItems();
  }

  ngOnInit() {
    this.loadData('newest');
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
    this.posts = this.posts.filter((post) => post.id !== id);

    this.postService.deletePost(id).subscribe(
      (data) => {
        console.log(data);
        this.loadData('newest');
      },
      (error) => console.log(error)
    );
  }

  searchItems() {
    if (!this.searchText) {
      this.loadData('newest');
    } else {
      this.posts = this.posts.filter((post) => {
        return (
          post.title.includes(this.searchText) ||
          post.id.toString().includes(this.searchText) ||
          post.author.includes(this.searchText) ||
          post.tags.includes(this.searchText) ||
          post.content.includes(this.searchText) ||
          post.category.title.includes(this.searchText)
        );
      });
    }
  }
}
