import { Injectable } from '@angular/core';
import { ApiService } from './api.service'
import { User, ApiUser } from '../interfaces/user'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiSevice: ApiService) {

  }
  requestUsersFormApi = async (): Promise<User[]> => {
    try {
      const users = (await this.apiSevice.get<ApiUser[]>('http://jsonplaceholder.typicode.com/users').toPromise()).map((user): User => {
        const { company, address, id, ...cutUser } = user
        return cutUser
      })
      this.saveUserListToLocalstorage(users)
      return users
    } catch (error) {
      throw error
    }
  }
  saveUserToLocalStorage(user: User & { index: number }) {
    try {
      const userList = JSON.parse(localStorage.getItem('users')) as User[]
      if (!userList) {
        throw new Error('expect localStorage have User List')
      }
      const { index, ...userForSave } = user
      // check keys of user object => this shold do api if we have that
      const keys = ['phone',
        'website',
        'name',
        'username',
        'email']

      keys.forEach(key => {
        if (!userForSave.hasOwnProperty(key)) {
          throw new Error(`invalid user!! should have key ${key}`)
        }
      })
      // end check
      userList[user.index] = userForSave;
      localStorage.setItem('users', JSON.stringify(userList))
      return user
    } catch (error) {
      throw error
    }
  }
  saveUserListToLocalstorage(users: User[]) {
    try {
      if (!users || users && !users.length) {
        // return
        localStorage.clear()
      } else {
        localStorage.setItem('users', JSON.stringify(users))
      }

    } catch (error) {
      throw error
    }
  }
  deleteUser(index: number) {
    try {
      const userList = JSON.parse(localStorage.getItem('users')) as User[]
      if (!userList) {
        throw new Error('expect localStorage have User List')
      }
      if (!userList[index]) {
        throw new Error('User don`t exist')
      }
      userList.splice(index, 1)
      this.saveUserListToLocalstorage(userList)
    } catch (error) {
      throw error
    }

  }
  laodUserListFromLocalstorage() {
    try {
      const users: User[] = JSON.parse(localStorage.getItem('users')) as User[]
      if (!users) {
        throw new Error('no users in localstorage')
      }
      return users
    } catch (error) {
      throw error
    }
  }
  addNewUser(user: User) {
    try {
      const userList = JSON.parse(localStorage.getItem('users')) as User[]
      if (!userList) {
        localStorage.setItem('users', JSON.stringify([user]))
      } else {
        localStorage.setItem('users', JSON.stringify([...userList, user]));
      }
    } catch (error) {
      throw error
    }

  }
}
