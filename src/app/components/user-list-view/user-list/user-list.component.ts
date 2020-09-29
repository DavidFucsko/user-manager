import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { UserListService } from 'src/app/services/user-list/user-list.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public userList$: Observable<User[]>;

  constructor(private userListService: UserListService) { }

  ngOnInit(): void {
    this.userList$ = this.fetchUsers();
  }

  trackByFunction(_, item): number {
    return item.id;
  }

  modifyUser(user: User): void {
    !!user.id ? this.updateUser(user) : this.createUser(user);
  }

  deleteUser(userid: number): void {
    this.userListService.deleteUser(userid).subscribe(result => {
      if (result !== 'success') {
        alert(result);
      } else {
        // For demonstration purposes only!
        this.userList$ = this.userList$.pipe(
          map(userList => userList.filter(user => user.id !== userid))
        );
      }
    });
  }

  addUserTemplate(): void {
    this.userList$ = this.userList$.pipe(
      map(userList => [new User(), ...userList])
    );
  }

  private fetchUsers(): Observable<User[]> {
    return this.userListService.getUsers();
  }

  private updateUser(user: User): void {
    this.userListService.modifyUser(user).subscribe((result: string) => {
      this.handleResponse(result, alert.bind(this, result));
    });
  }

  private createUser(user: User): void {

    this.userListService.createUser(user).subscribe((response: { result: string, user: User }) => {
      this.handleResponse(response.result, () => {
        // For demonstration purposes only!
        this.userList$ = this.userList$.pipe(
          map(userList => userList.filter(userToRemove => !!userToRemove.id)),
          map(userList => [response.user, ...userList]));
      });
    });
  }

  private handleResponse(result: string, success: () => void = () => ({})): void {
    result !== 'success' ? alert(result) : success();
  }
}
