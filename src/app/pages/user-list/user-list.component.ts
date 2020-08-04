import { Component, OnInit, HostListener } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users: User[];
  searchText: string = '';

  constructor(private userService: UserService, private router: Router) {}

  @HostListener('input') oninput() {
    this.searchItems();
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.userService.getAllUser().subscribe(
      (data) => (this.users = data),
      (error) => console.log(error)
    );
  }

  deleteUser(id: number) {
    if (confirm('Are u sure to delete this USER?')) {
      this.users = this.users.filter((user) => user.id !== id);
      this.userService.deleteUser(id).subscribe(
        (data) => console.log(data),
        (error) => console.log(error)
      );
    }
  }

  onAddUser() {
    this.router.navigate(['posts/add']);
  }

  searchItems() {
    if (!this.searchText) {
      this.loadData();
    } else {
      this.users = this.users.filter((user) => {
        return (
          user.username.includes(this.searchText) ||
          user.id.toString().includes(this.searchText) ||
          user.email.includes(this.searchText)
        );
      });
      console.log(this.users);
    }
  }
}
