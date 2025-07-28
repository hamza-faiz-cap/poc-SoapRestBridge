import { Component, signal } from '@angular/core';
import { UserListComponent } from './user-list.component';
import { UserFormComponent } from './user-form.component';

@Component({
  selector: 'app-root',
  imports: [UserListComponent, UserFormComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-users');
}
