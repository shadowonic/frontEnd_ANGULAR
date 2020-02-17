import { createAction, props, createReducer, on } from '@ngrx/store'
import { UserActionTypes } from '../actions/user.actions'
import { User } from '@interfaces'

export const stateFeatureKey = 'user';
export interface UserState {
  users: User[]
}
export const userState: UserState = {
  users: []
}
const setUserList = createAction(UserActionTypes.LoadUsersSuccess, props<{ users: User[] }>())
const editUser = createAction(UserActionTypes.EditUserSuccess, props<{ user: User & { index: number } }>())
const deleteUser = createAction(UserActionTypes.DeleteUserSuccess, props<{ index: number }>())
const addUSer = createAction(UserActionTypes.AddNewUserSuccess, props<{ newUser: User }>())
// const deleteUser = createAction()
export const userReducer = createReducer(userState,
  on(setUserList, (state, payload) => {
    return { ...state, users: payload.users }
  }),
  on(editUser, (state, payload) => {
    let newState = Array.from(state.users);
    newState[payload.user.index] = payload.user
    return { ...state, users: newState }
  }),
  on(deleteUser, (state, payload) => {
    const userList = Array.from(state.users)
    userList.splice(payload.index, 1)
    return { ...state, users: userList }
  }),
  on(addUSer, (state, payload) => {

    return { ...state, users: [...state.users, payload.newUser] }
  })

)
