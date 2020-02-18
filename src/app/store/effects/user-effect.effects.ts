import { Injectable } from '@angular/core';
import { Actions, Effect, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../services/user.service'
import { UserActionTypes } from '../actions/index'
import { map, mergeMap, catchError } from 'rxjs/operators';
import { async } from '@angular/core/testing';
import { Action, Store } from '@ngrx/store';
import { of } from 'rxjs';

import {
  LoadUsersSuccess, LoadUsersFailure,
  EditUserFailure,
  EditUserSuccess,
  DeleteUser,
  DeleteUserFailure,
  DeleteUserSuccess,
  AddNewUserFailure,
  AddNewUserSuccess
} from '../actions/user.actions'
import { User } from '@interfaces';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) { }
  loadUseres$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActionTypes.LoadUsers),
      mergeMap(async () => {
        try {
          let users: User[]
          try {
            users = this.userService.laodUserListFromLocalstorage()
          } catch (error) {
            console.log('LOAD FROM API');
            users = await this.userService.requestUsersFormApi()
          }
          return new LoadUsersSuccess(users)
        } catch (error) {
          return new LoadUsersFailure({ error })
        }
      }),

    )
  })
  editUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActionTypes.EditUser),
      mergeMap(async (payload: { user: User & { index: number }, type: string }) => {
        try {
          const savedUser = this.userService.saveUserToLocalStorage(payload.user)
          return new EditUserSuccess(savedUser)
        } catch (error) {

          console.error(error);

          return new EditUserFailure({ error })
        }
      })
    )
  })
  deleteUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActionTypes.DeleteUser),
      mergeMap(async (payload: { index: number }) => {
        try {
          this.userService.deleteUser(payload.index)
          return new DeleteUserSuccess(payload.index)
        } catch (error) {
          console.error(error);
          return new DeleteUserFailure({ error })
        }
      })
    )
  })
  addNewUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActionTypes.AddNewUser),
      mergeMap(async (payload: { newUser: User }) => {
        try {
          this.userService.addNewUser(payload.newUser)
          return new AddNewUserSuccess(payload.newUser)
        } catch (error) {
          return new AddNewUserFailure({ error })
        }
      })
    )
  })

}
