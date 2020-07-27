import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
})
export class PostDetailsComponent implements OnInit {
  id: number;
  post: Post;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.post = new Post();
    this.id = this.route.snapshot.params['id'];
    this.postService.getPostById(this.id).subscribe(
      (data) => {
        this.post = data;
      },
      (error) => console.log(error)
    );
  }

  backToList() {
    this.router.navigate(['posts']);
  }
}
