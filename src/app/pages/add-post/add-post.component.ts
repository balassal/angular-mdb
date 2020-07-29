import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import postValidation from '../../validation/validation';

@Component({
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent implements OnInit {
  post: Post = new Post();
  categories: Observable<Category[]>;
  category: Category = new Category();
  error = {
    title: '',
    category: '',
    author: '',
    content: '',
  };

  constructor(
    private postService: PostService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoryService.getAllCategory().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => console.log(error)
    );
  }

  onSubmit(e) {
    e.preventDefault();

    this.error = postValidation(this.post);

    console.log(this.error);
  }
}
