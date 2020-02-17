import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';

import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { userReducer } from '../../store/reducers/userReducer'
import { Store, MemoizedSelector, StoreModule } from '@ngrx/store';
import { State, reducers, metaReducers } from '../../store/reducers'
import { MatButtonModule, MatCardModule } from '@angular/material'
import { fakeUsers } from 'src/app/app.component.spec';
import { UserListItemComponent } from '../../components/user-list/user-list-item/user-list-item.component'

import { LoadUsers, DeleteUser, DeleteUserSuccess } from '../../store/actions'
import { state } from '../../store'
import { MatDialogModule } from '@angular/material'
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from 'src/app/store/effects/user-effect.effects';
import { HttpClientModule } from '@angular/common/http'
// import {state} from '../../store/reducers'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    localStorage.clear()
    localStorage.setItem('users', JSON.stringify(fakeUsers))

  })
  afterAll(() => {
    localStorage.clear()
  })
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatCardModule, MatDialogModule,
        BrowserAnimationsModule,
        HttpClientModule,
        EffectsModule.forRoot([UserEffects]),
        StoreModule.forRoot(reducers, {
          metaReducers
        }),
      ],
      providers: [provideMockStore({ initialState })],
      declarations: [UserListComponent, UserListItemComponent],
    }).compileComponents();

    store = TestBed.get<Store<State>>(Store);
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
  it('should render cards', () => {
    store.refreshState()
    fixture.detectChanges()
    const compiled = fixture.debugElement.nativeElement
    const mainElement = compiled.querySelector('main') as HTMLElement
    expect(mainElement.children).toBeTruthy()
  })
  it('check if user name rendered', () => {
    store.refreshState()
    fixture.detectChanges()
    const compiled = fixture.debugElement.nativeElement
    const mainElement = compiled.querySelector('main') as HTMLElement
    const textContent = mainElement.textContent as string
    expect(textContent.includes(fakeUsers[0].name)).toBeTruthy()
    expect(textContent.includes(fakeUsers[0].username)).toBeTruthy()
  })
  it('delete user', () => {

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
