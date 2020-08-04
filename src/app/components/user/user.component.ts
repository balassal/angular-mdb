import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  @Input() user: User;
  @Output() deleteUser: EventEmitter<number> = new EventEmitter();

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onEdit(id: number) {
    this.router.navigate(['users/edit', id]);
  }

  onDelete(id: number) {
    this.deleteUser.emit(id);
  }
}
