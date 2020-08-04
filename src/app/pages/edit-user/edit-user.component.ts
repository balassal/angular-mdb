import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  id: number;
  user: User;
  confirmPassword: string = '';
  error = {
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    roles: '',
  };
  isAdmin: boolean = false;
  isUser: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.user = new User();
    this.id = this.route.snapshot.params['id'];
    this.userService.getUserById(this.id).subscribe(
      (data) => {
        this.user = data;
        this.isAdmin = this.user.roles.includes('admin') ? true : false;
        this.isUser = this.user.roles.includes('user') ? true : false;
      },
      (error) => console.log(error)
    );
  }

  onSubmit() {
    this.error = this.validateUser(this.user, this.confirmPassword);

    if (this.errorIsEmpty()) {
      if (this.isAdmin && this.isUser) this.user.roles = 'admin, user';
      if (!this.isAdmin && this.isUser) this.user.roles = 'user';
      if (this.isAdmin && !this.isUser) this.user.roles = 'admin';

      this.userService.updateUser(this.id, this.user).subscribe(
        (data) => console.log(data),
        (error) => console.log(error)
      );
      this.backToList();
    }
  }

  backToList() {
    this.router.navigate(['users']);
  }

  errorIsEmpty = () => {
    return (
      !this.error.username &&
      !this.error.email &&
      !this.error.password &&
      !this.error.confirmPassword &&
      !this.error.roles
    );
  };

  validateUser(user: User, pass: string) {
    const err = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      roles: '',
    };

    if (!user.username) {
      err.username = 'Username is required!';
    }
    if (!user.email) {
      err.email = 'Email is required!';
    }
    if (!this.validateEmail(user.email)) {
      err.email = 'Email is not valid!';
    }
    if (!user.password) {
      err.password = 'Password is required!';
    }
    if (user.password != pass) {
      err.confirmPassword = 'Confirm Password does not match!';
    }
    if (!this.isAdmin && !this.isUser) {
      err.roles = 'Role is required!';
    }

    return err;
  }

  validateEmail = (email: string) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
}
