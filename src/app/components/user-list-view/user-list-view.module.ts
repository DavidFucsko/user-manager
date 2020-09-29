import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserListViewRoutingModule } from './user-list-view-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [UserListComponent, UserDetailsComponent],
  imports: [
    CommonModule,
    UserListViewRoutingModule,
    SharedModule,
    DirectivesModule,
    ReactiveFormsModule
  ]
})
export class UserListViewModule { }
