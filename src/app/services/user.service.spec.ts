import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { ApiService } from './api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeUsers } from '../app.component.spec'


describe('UserService', () => {
  beforeAll(() => {
    localStorage.clear()
    localStorage.setItem('users', JSON.stringify(fakeUsers))
  })
  afterAll(() => {
    localStorage.clear()
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
    expect(typeof users[0].id).toBe('number')
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
});
