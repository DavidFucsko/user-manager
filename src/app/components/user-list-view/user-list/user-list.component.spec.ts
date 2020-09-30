import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';

import { of } from 'rxjs';

import { User } from 'src/app/models/user.model';
import { UserListService } from 'src/app/services/user-list/user-list.service';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { UserListComponent } from './user-list.component';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { SharedModule } from '../../shared/shared.module';

describe('UserListComponent', () => {
  const dummyUserList = of([{ ...new User(), ...{ name: 'Test', id: 1 } }, { ...new User(), ...{ name: 'Test2', id: 2 } }] as User[]);

  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userListServiceStub;

  beforeEach(async () => {
    userListServiceStub = jasmine.createSpyObj('userListServiceStub', ['deleteUser', 'getUsers', 'modifyUser', 'createUser']);
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        SharedModule,
        DirectivesModule,
        ReactiveFormsModule],
      declarations: [UserListComponent, UserDetailsComponent],
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

  it('should render', waitForAsync(() => {
    userListServiceStub.getUsers.and.returnValue(dummyUserList);
    component.ngOnInit();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const userListElements = fixture.nativeElement.querySelectorAll('app-data-card');
      expect(userListServiceStub.getUsers).toHaveBeenCalled();
      expect(userListElements.length).toEqual(2);
    });
  }));
  describe('modifyUser', () => {
    const dummyUser = { id: 1 } as User;
    it('should alert if modify is success when user has id', fakeAsync(() => {
      userListServiceStub.modifyUser.and.returnValue(of('success'));
      spyOn(window, 'alert');
      component.modifyUser(dummyUser);
      tick();
      expect(window.alert).toHaveBeenCalledWith('success');
    }));

    it('should alert error if modify fail when user has id', fakeAsync(() => {
      userListServiceStub.modifyUser.and.returnValue(of('error'));
      spyOn(window, 'alert');
      component.modifyUser(dummyUser);
      tick();
      expect(userListServiceStub.modifyUser).toHaveBeenCalledWith(dummyUser);
      expect(window.alert).toHaveBeenCalledWith('error');
    }));

    it('should create new user when called with empty id user', fakeAsync(() => {
      const userToCreate = { id: null } as User;
      component.userList$ = of([]);
      userListServiceStub.createUser.and.returnValue(of({ result: 'success', user: dummyUser }));
      component.modifyUser(userToCreate);
      tick();
      expect(userListServiceStub.createUser).toHaveBeenCalledWith(userToCreate);
      component.userList$.subscribe(userList => {
        expect(userList.length).toEqual(1);
      });
    }));
    it('should alert error when create user fail and called with empty id user', fakeAsync(() => {
      const userToCreate = { id: null } as User;
      component.userList$ = of([]);
      spyOn(window, 'alert');
      userListServiceStub.createUser.and.returnValue(of({ result: 'error', user: userToCreate }));
      component.modifyUser(userToCreate);
      tick();
      expect(userListServiceStub.createUser).toHaveBeenCalledWith(userToCreate);
      component.userList$.subscribe(userList => {
        expect(userList.length).toEqual(0);
      });
      expect(window.alert).toHaveBeenCalledWith('error');
    }));
  });

  describe('deleteUser', () => {
    it('should remove user with the given id', fakeAsync(() => {
      component.userList$ = of([{ id: 1 } as User]);
      userListServiceStub.deleteUser.and.returnValue(of('success'));
      component.deleteUser(1);
      tick();
      expect(userListServiceStub.deleteUser).toHaveBeenCalledWith(1);
      component.userList$.subscribe(userList => expect(userList.length).toEqual(0));
    }));

    it('should alert error when delete user fail with the given id', fakeAsync(() => {
      component.userList$ = of([{ id: 1 } as User]);
      userListServiceStub.deleteUser.and.returnValue(of('error'));
      spyOn(window, 'alert');
      component.deleteUser(1);
      tick();
      expect(userListServiceStub.deleteUser).toHaveBeenCalledWith(1);
      component.userList$.subscribe(userList => expect(userList.length).toEqual(1));
      expect(window.alert).toHaveBeenCalledWith('error');
    }));
  });

  describe('addUserTemplate', () => {
    it('should add an empty template to the front of the list', () => {
      userListServiceStub.getUsers.and.returnValue(dummyUserList);
      component.ngOnInit();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        component.addUserTemplate();
        fixture.detectChanges();
        const userListElements = fixture.nativeElement.querySelectorAll('app-data-card');
        expect(userListElements.length).toEqual(3);

        expect(userListElements[0].querySelector('#name').value).toEqual('');
      });
    });
  });
});
