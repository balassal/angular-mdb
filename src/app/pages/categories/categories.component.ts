import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';

@Component({
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categories: Category[];
  categoryTitle: string = '';
  categoryId: number;
  willUpdate = false;
  error: string = '';

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.categoryService.getAllCategory().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  createCategory() {
    if (this.categoryTitle == '') {
      this.error = 'Category title is required!';
    } else {
      let category = new Category();
      category.title = this.categoryTitle;
      this.categories = [...this.categories, category];
      this.categoryService.createCategory(category).subscribe(
        (data) => console.log(data),
        (error) => console.log(error)
      );
      this.categoryTitle = '';
      this.loadData();
    }
  }

  updateCategory() {
    if (this.categoryTitle == '') {
      this.error = 'Category title is required!';
    } else {
      let category = new Category();
      category.id = this.categoryId;
      category.title = this.categoryTitle;

      this.categories = this.categories.filter((cat) => cat.id !== category.id);
      this.categories = [...this.categories, category];

      this.categoryService.updateCategory(this.categoryId, category).subscribe(
        (data) => console.log(data),
        (error) => console.log(error)
      );
      this.categoryTitle = '';
      this.categoryId = null;
      this.willUpdate = false;
    }
  }

  onDelete(id: number) {
    this.categories = this.categories.filter((category) => category.id !== id);
    this.categoryService.deleteCategory(id).subscribe(
      (data) => {
        console.log(data);
        this.loadData();
      },
      (error) => console.log(error)
    );
  }

  onEdit(id: number) {
    this.willUpdate = true;
    this.categoryId = id;
  }
}
