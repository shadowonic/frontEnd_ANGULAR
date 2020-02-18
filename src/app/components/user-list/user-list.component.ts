import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../interfaces'

import { UserActionTypes, LoadUsers } from '../../store/actions'

import { State } from '../../store'
import { MatDialog } from '@angular/material';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: Observable<User[]> = this.store.select(state => {
    return state.userState.users.map((user, index) => {
      return { ...user, index }
    })
  });
  constructor(private store: Store<State>, public dialog: MatDialog) { }

  ngOnInit() {
    this.store.dispatch(new LoadUsers());
  }
  openDialog(user?: User): void {
  this.dialog.open(UserFormComponent, {
      width: '250px',
      data: user || null
    });


  }

}






