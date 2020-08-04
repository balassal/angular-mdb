import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category.model';

@Component({
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent implements OnInit {
  post: Post;
  categories: Observable<Category[]>;
  error = {
    title: '',
    category: '',
    author: '',
    content: '',
  };
  message: string = '';

  constructor(
    private postService: PostService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.post = new Post();
    this.post.content = '';
    this.categoryService.getAllCategory().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => console.log(error)
    );
  }

  onSubmit() {
    this.error = this.postValidation(this.post);

    if (this.errorIsEmpty()) {
      this.post.status = 'published';
      this.postService.createPost(this.post).subscribe(
        (data) => {
          console.log(data);
        },
        (error) => console.log(error)
      );
      this.router.navigate(['posts']);
    }
  }

  errorIsEmpty = () => {
    return (
      this.error.title == '' ||
      this.error.author == '' ||
      this.error.category == null ||
      this.error.content == ''
    );
  };

  backToList() {
    this.router.navigate(['posts']);
  }

  postValidation = (post: Post) => {
    let error = {
      title: '',
      category: '',
      author: '',
      content: '',
    };

    if (post.title == '' || post.title == null) {
      error.title = 'Title is required!';
    }
    if (post.category == null) {
      error.category = 'Category is required!';
    }
    if (post.author == '' || post.author == null) {
      error.author = 'Author is required!';
    }
    if (post.content == '' || post.content == null) {
      error.content = 'Content is required!';
    }

    return error;
  };
}
