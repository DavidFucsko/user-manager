import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { User } from 'src/app/models/user.model';
import { SharedModule } from '../../shared/shared.module';

import { UserDetailsComponent } from './user-details.component';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, SharedModule, DirectivesModule],
      declarations: [UserDetailsComponent],
      providers: [FormBuilder]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    component.userData = new User();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('modifyUser', () => {
    it('should emit modified user', () => {
      const expectedUser = { ...component.userForm.value, ...{ id: component.userData.id, name: 'Test' } };
      spyOn(component.userModified, 'emit');
      spyOn(component, 'modifyUser').and.callThrough();

      component.userForm.controls.name.setValue('Test');
      component.modifyUser();
      expect(component.userModified.emit).toHaveBeenCalled();
      expect(component.userModified.emit).toHaveBeenCalledWith(expectedUser);
      expect(component.modifyUser).toHaveBeenCalled();
    });
  });

  describe('deleteUser', () => {
    it('should emit delete user id', () => {
      const expectedUserId = 1;
      spyOn(component.userDeleted, 'emit');
      spyOn(component, 'deleteUser').and.callThrough();

      component.userData.id = 1;
      component.deleteUser();
      expect(component.userDeleted.emit).toHaveBeenCalled();
      expect(component.userDeleted.emit).toHaveBeenCalledWith(expectedUserId);
      expect(component.deleteUser).toHaveBeenCalled();
    });
  });
});
