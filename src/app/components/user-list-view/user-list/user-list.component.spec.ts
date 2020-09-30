import { ComponentFixture, TestBed, fakeAsync, tick, async, waitForAsync } from '@angular/core/testing';
import { UserListService } from 'src/app/services/user-list/user-list.service';

import { UserListComponent } from './user-list.component';
import { User } from 'src/app/models/user.model';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { SharedModule } from '../../shared/shared.module';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { ReactiveFormsModule } from '@angular/forms';

fdescribe('UserListComponent', () => {
  const dummyUserList = of([{ ...new User(), ...{ name: 'Test', id: 1 } }, { ...new User(), ...{ name: 'Test2', id: 2 } }] as User[]);

  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userListServiceStub;

  beforeEach(async () => {
    userListServiceStub = jasmine.createSpyObj('userListServiceStub', ['deleteUser', 'getUsers', 'modifyUsers', 'createUser'])
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

  it('should modify user', waitForAsync(() => {
    userListServiceStub.getUsers.and.returnValue(dummyUserList);
    component.ngOnInit();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(userListServiceStub.getUsers).toHaveBeenCalled();
    });
  }));
});
