import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  user: User;
  confirmPassword: string = '';
  error = {
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
  };

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.user = new User();
  }

  backToList() {
    this.router.navigate(['users']);
  }

  onSubmit() {
    this.error = this.validateUser(this.user, this.confirmPassword);

    if (this.errorIsEmpty()) {
      this.userService.createUser(this.user).subscribe(
        (data) => console.log(data),
        (error) => console.log(error)
      );
      this.router.navigate(['users']);
    }
  }

  errorIsEmpty = () => {
    return (
      !this.error.username &&
      !this.error.email &&
      !this.error.password &&
      !this.error.confirmPassword
    );
  };

  validateUser(user: User, pass: string) {
    const err = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
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

    return err;
  }

  validateEmail = (email: string) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
}
