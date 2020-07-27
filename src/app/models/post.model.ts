import { Category } from './category.model';

export class Post {
  id: number;
  title: string;
  author: string;
  status: string;
  tags: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  category: Category;
}
