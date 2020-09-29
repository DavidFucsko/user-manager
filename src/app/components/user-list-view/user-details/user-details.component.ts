import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  public userForm: FormGroup;

  @Input()
  userData: User;

  @Output()
  userModified: EventEmitter<User> = new EventEmitter();

  @Output()
  userDeleted: EventEmitter<number> = new EventEmitter();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  public modifyUser(): void {
    this.userModified.emit(this.getModifiedUser());
  }

  private initForm(): void {
    this.userForm = this.formBuilder.group({
      name: [this.userData.name],
      username: [this.userData.username],
      email: [this.userData.email],
      address: this.formBuilder.group({
        street: [this.userData.address.street],
        suite: [this.userData.address.suite],
        city: [this.userData.address.city],
        zipcode: [this.userData.address.zipcode],
        geo: this.formBuilder.group({
          lat: [this.userData.address.geo.lat],
          lng: [this.userData.address.geo.lng]
        })
      }),
      phone: [this.userData.phone],
      website: [this.userData.website],
      company: this.formBuilder.group({
        name: [this.userData.company.name],
        catchPhrase: [this.userData.company.catchPhrase],
        bs: [this.userData.company.bs]
      })
    });
  }

  private getModifiedUser(): User {
    return ({ ...this.userForm.value, ...{ id: this.userData.id } });
  }

  deleteUser(): void {
    this.userDeleted.emit(this.userData.id);
  }
}
