import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() post: Post;

  tags: string[];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.tags = this.post.tags.trim().split(',');
  }

  showDetails(id: number) {
    this.router.navigate(['posts/details', id]);
  }
}
