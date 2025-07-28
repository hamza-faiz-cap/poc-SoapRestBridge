import { Component } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Add User</h2>
    <form (ngSubmit)="addUser()" #userForm="ngForm">
      <input name="name" [(ngModel)]="user.name" placeholder="Name" required />
      <input name="email" [(ngModel)]="user.email" placeholder="Email" required />
      <button type="submit">Add</button>
    </form>
    <div *ngIf="message">{{ message }}</div>
  `
})
export class UserFormComponent {
  user: User = { name: '', email: '' };
  message = '';

  constructor(private userService: UserService) {}

  addUser() {
    this.userService.addUser(this.user).subscribe(
      res => {
        this.message = 'User added!';
        this.user = { name: '', email: '' };
      },
      err => {
        this.message = 'Error adding user.';
      }
    );
  }
}
