import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';

import { SharedModule } from '../../shared/shared.module'

import { UserListComponent } from './user-list.component';
import { UserListItemComponent } from '../../components/user-list/user-list-item/user-list-item.component'
import { UserFormComponent } from '../user-form/user-form.component';


import { State } from '../../store/reducers'
import { fakeUsers } from 'src/app/app.component.spec';
import { By, } from '@angular/platform-browser';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let store: MockStore<State>;
  const initialState = {
    userState: {
      users: fakeUsers
    }
  };
  beforeAll(() => {
    localStorage.setItem('users', JSON.stringify(fakeUsers))
  })

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
      ],
      providers: [provideMockStore({ initialState })],
      declarations: [UserListComponent, UserListItemComponent, UserFormComponent],
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [UserFormComponent],
      }
    }).compileComponents();

    store = TestBed.get<Store<State>>(Store);
    // Dispatch don`t work in tests!????
    // store.dispatch(new LoadUsers())
    store.refreshState()
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.debugElement.componentInstance;
    component.users = store.select(state => {
      return state.userState.users.map((user, index) => {
        return { ...user, index }
      })
    })
    fixture.detectChanges();
  })
  it('should have store', () => {
    expect(fixture.debugElement.context.store).toBeTruthy()
  })
  it('should have main block and footer', () => {
    expect(fixture.debugElement.children.length).toBe(2)
    expect(fixture.debugElement.children[0].name).toBe('main')
    expect(fixture.debugElement.children[1].name).toBe('footer')
  })
  it('should render cards', () => {
    store.refreshState()
    fixture.detectChanges()
    expect(fixture.debugElement.nativeElement.querySelectorAll('app-user-list-item').length).toBeGreaterThan(0)
  })
  it('expect to have add user button', () => {
    const button = fixture.debugElement.nativeElement.querySelector('footer').querySelector('button')
    expect(button).toBeTruthy()
  })
  it('should footer button open modal with form', () => {
    const button = fixture.debugElement.nativeElement.querySelector('footer').querySelector('button')
    button.click()
    const modal = document.body.getElementsByClassName('cdk-overlay-container')
    expect(modal).toBeTruthy()
    expect(modal.length).toBe(1)
    const form = modal[0].querySelector('form')
    expect(form).toBeTruthy()
    const closeButton = modal[0].querySelector('button')
    closeButton.click()
  })
  it('should delete user', () => {
    const compiled = fixture.debugElement.nativeElement
    const mainElement = compiled.querySelector('main') as HTMLElement
    fixture.detectChanges()
    expect(mainElement.children.length).toBe(2)
    store.setState({
      userState: {
        users: fakeUsers.splice(0, 1)
      }
    })
    store.refreshState()
    fixture.detectChanges()
    expect(mainElement.children.length).toBe(1)
  })
});
