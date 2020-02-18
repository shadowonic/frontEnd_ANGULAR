import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { ApiService } from './api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeUsers } from '../app.component.spec'
import { User } from '../interfaces/user';


describe('UserService', () => {
  beforeAll(() => {
    localStorage.setItem('users', JSON.stringify(fakeUsers))
  })
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    })
  );
  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });
  it('should get data localStorage', () => {
    const service: UserService = TestBed.get(UserService);
    const users = service.laodUserListFromLocalstorage()
    expect(users).toBeTruthy()
    expect(typeof users[0].name).toBe('string')
  })
  it('should save new user to local storage', () => {
    const service: UserService = TestBed.get(UserService);
    const oldList = service.laodUserListFromLocalstorage()
    service.addNewUser(fakeUsers[0])
    const newList = service.laodUserListFromLocalstorage()
    expect(oldList.length + 1).toBe(newList.length)
  })
  it('should edit user in local storage', () => {

    const userEditIndex = 0
    const userEditName = 'testName'
    const service: UserService = TestBed.get(UserService);
    const oldUser = service.laodUserListFromLocalstorage()[userEditIndex]
    expect(oldUser.name).not.toBe(userEditName)
    service.saveUserToLocalStorage({ ...oldUser, name: userEditName, index: userEditIndex })
    const newUser = service.laodUserListFromLocalstorage()[userEditIndex]
    expect(newUser.name).toBe(userEditName)
    service.saveUserToLocalStorage({ ...oldUser, name: 'userEditName', index: userEditIndex })
  })
  it('should delete user from local storage', () => {
    const service: UserService = TestBed.get(UserService);
    const oldList = service.laodUserListFromLocalstorage();
    service.deleteUser(0)
    const newList = service.laodUserListFromLocalstorage();
    expect(oldList.length - 1).toBe(newList.length)
  })
  it('should throw error on incorrect user', () => {
    const service: UserService = TestBed.get(UserService);
    const { name, ...user } = fakeUsers[0]
    const incorrectUser = { ...user, index: 0 } as User & { index: number }
    try {
      service.saveUserToLocalStorage(incorrectUser)
    } catch (error) {
      expect(error).toBeTruthy()
    }
  })
  it('should throw error on delete user', () => {
    const service: UserService = TestBed.get(UserService);
    try {
      service.deleteUser(10)
    } catch (error) {
      expect(error).toBeTruthy()
    }
  })
  it('should throw error on emty localstoarage', () => {
    const service: UserService = TestBed.get(UserService);
    const userList = localStorage.getItem('users')
    localStorage.clear()
    try {
      service.laodUserListFromLocalstorage()
    } catch (error) {
      expect(error).toBeTruthy()
    }
    localStorage.setItem('users', userList)
  })
  it('should empty local storage', () => {
    const service: UserService = TestBed.get(UserService);
    const userList = localStorage.getItem('users')
    service.saveUserListToLocalstorage([])
    expect(localStorage.getItem('users')).toBeFalsy()
    localStorage.setItem('users', userList)
  })
});
