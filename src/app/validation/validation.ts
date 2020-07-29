import { Post } from '../models/post.model';

const postValidation = (post: Post) => {
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

export default postValidation;
