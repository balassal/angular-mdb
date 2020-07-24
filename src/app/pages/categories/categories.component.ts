import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';

@Component({
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categories: Observable<Category[]>;
  categoryTitle: string = '';
  categoryId: number;
  willUpdate = false;

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
    let category = new Category();
    category.title = this.categoryTitle;
    this.categoryService.createCategory(category).subscribe(
      (data) => console.log(data),
      (error) => console.log(error)
    );
    this.categoryTitle = '';
    this.loadData();
  }

  updateCategory() {
    let category = new Category();
    category.id = this.categoryId;
    category.title = this.categoryTitle;
    this.categoryService.updateCategory(this.categoryId, category).subscribe(
      (data) => console.log(data),
      (error) => console.log(error)
    );
    this.categoryTitle = '';
    this.categoryId = null;
    this.willUpdate = false;
    this.loadData();
  }

  onDelete(id: number) {
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
