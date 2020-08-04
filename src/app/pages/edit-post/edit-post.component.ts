import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { Category } from 'src/app/models/category.model';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
})
export class EditPostComponent implements OnInit {
  id: number;
  post: Post;
  categories: Observable<Category[]>;
  error = {
    title: '',
    category: '',
    author: '',
    content: '',
  };
  isPublic: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private categoryService: CategoryService
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

    this.categoryService.getAllCategory().subscribe(
      (data) => (this.categories = data),
      (error) => console.log(error)
    );
  }

  onSubmit(e) {
    e.preventDefault();

    this.error = this.postValidation(this.post);

    if (this.errorIsEmpty()) {
      this.post.status = this.isPublic ? 'published' : 'unpublished';

      this.postService.updatePost(this.id, this.post).subscribe(
        (data) => console.log(data),
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
