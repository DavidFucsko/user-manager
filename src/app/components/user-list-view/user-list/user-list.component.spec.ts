import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListService } from 'src/app/services/user-list/user-list.service';

import { UserListComponent } from './user-list.component';

const userListServiceStub = {
  deleteUser(): void { },
  getUsers(): void { },
  modifyUser(): void { },
  createUser(): void { }

};
describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserListComponent],
      providers: [
        {
          provide: UserListService,
          useValue: userListServiceStub
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
