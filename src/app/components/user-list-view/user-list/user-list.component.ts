import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.sass']
})
export class UserListComponent implements OnInit {

  get userList(): { id: number, name: string }[] {
    return [{ id: 1, name: 'user1' }, { id: 2, name: 'user2' }, { id: 3, name: 'user3' }];
  }

  constructor() { }

  ngOnInit(): void {
  }

  trackByFunction(_, item): number {
    return item.id;
  }

}
