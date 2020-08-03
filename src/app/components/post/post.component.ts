import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() post: Post;
  @Output() deletePost: EventEmitter<number> = new EventEmitter();

  tags: string[];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.tags = this.post.tags.trim().split(',');
  }

  showDetails(id: number) {
    this.router.navigate(['posts/details', id]);
  }

  onEdit(id: number) {
    this.router.navigate(['posts/edit', id]);
  }

  onDelete(id: number) {
    if (
      confirm('Are you sure to delete post with title ' + this.post.title + '?')
    ) {
      this.deletePost.emit(id);
    }
  }
}
