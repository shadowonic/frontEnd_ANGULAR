import { Action, createAction } from '@ngrx/store';
import { User } from '../../interfaces'


export enum UserActionTypes {
  LoadUsers = '[User] Load Users',
  LoadUsersSuccess = '[User] Load Users Success',
  LoadUsersFailure = '[User] Load Users Failure',

  EditUser = '[User] Edit User',
  EditUserSuccess = '[User] Edit UserSuccess',
  EditUserFailure = '[User] Edit UserFailure',

  DeleteUser = '[User] Delete User',
  DeleteUserSuccess = '[User] Delete UserSuccess',
  DeleteUserFailure = '[User] Delete UserFailure',

  AddNewUser = '[User] AddNewUserr',
  AddNewUserSuccess = '[User] AddNewUserrSuccess',
  AddNewUserFailure = '[User] AddNewUserrFailure'
}

// LOAD USER

export class LoadUsers implements Action {
  readonly type = UserActionTypes.LoadUsers;
}

export class LoadUsersSuccess implements Action {
  readonly type = UserActionTypes.LoadUsersSuccess;
  constructor(public users: User[]) { }
}

export class LoadUsersFailure implements Action {
  readonly type = UserActionTypes.LoadUsersFailure;
  constructor(public payload: { error: any }) { }
}

// EDIT USER

export class EditUser implements Action {
  readonly type = UserActionTypes.EditUser;
  constructor(public user: User & { index: number }) { }
}
export class EditUserSuccess implements Action {
  readonly type = UserActionTypes.EditUserSuccess;
  constructor(public user: User & { index: number }) { }
}

export class EditUserFailure implements Action {
  readonly type = UserActionTypes.EditUserFailure;
  constructor(public payload: { error: any }) { }
}

// DELETE USER
export class DeleteUser implements Action {
  readonly type = UserActionTypes.DeleteUser;
  constructor(public index: number) { }
}
export class DeleteUserSuccess implements Action {
  readonly type = UserActionTypes.DeleteUserSuccess;
  constructor(public index: number) { }
}

export class DeleteUserFailure implements Action {
  readonly type = UserActionTypes.DeleteUserFailure;
  constructor(public payload: { error: any }) { }
}

// ADD USER

export class AddNewUser {
  readonly type = UserActionTypes.AddNewUser
  constructor(public newUser: User) { }
}
export class AddNewUserSuccess {
  readonly type = UserActionTypes.AddNewUserSuccess
  constructor(public newUser: User) { }
}

export class AddNewUserFailure {
  readonly type = UserActionTypes.AddNewUserFailure;
  constructor(public payload: { error: any }) { }
}
export type UserActions =
  LoadUsers | LoadUsersSuccess | LoadUsersFailure
  | EditUser | EditUserSuccess | EditUserFailure
  | DeleteUser | DeleteUserSuccess | DeleteUserFailure
  | AddNewUser | AddNewUserSuccess | AddNewUserFailure;

