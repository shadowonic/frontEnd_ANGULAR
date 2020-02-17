import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { User } from '@interfaces'
import { MatDialog } from '@angular/material';
import { UserFormComponent } from '../../user-form/user-form.component'
import { Store } from '@ngrx/store';
import { State, EditUser, DeleteUser } from '../../../store'

@Component({
  selector: 'app-user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.scss'],


})
export class UserListItemComponent {
  @Input()
  user?: User;
  // instead unique id
  @Input()
  index?: number
  constructor(private store: Store<State>, public dialog: MatDialog) { }
  openDialog = (user?: User, index?: number) => {
    this.dialog.open(UserFormComponent, {
      width: '350px',
      data: { ...user, index } || null
    });


  }


  deleteUser = () => {
    if (this.index !== 0 && !this.index) {
      // SHOULD ALWAYS EXIST
      throw new Error('no index')
    }
    this.store.dispatch(new DeleteUser(this.index))
  }
}
