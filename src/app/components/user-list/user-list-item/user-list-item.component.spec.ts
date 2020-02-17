import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListItemComponent } from './user-list-item.component';
import { MatCardModule, MatButtonModule } from '@angular/material'
import { StoreModule, Store } from '@ngrx/store';
import { reducers, metaReducers, State, DeleteUser, LoadUsers } from '@store';
import { MatDialogModule } from '@angular/material'
import { fakeUsers } from 'src/app/app.component.spec';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserFormComponent } from '../../user-form/user-form.component'
import { ReactiveFormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material'
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
// import {MatDialogModule} from '@angular/material'
describe('UserListItemComponent', () => {
  let component: UserListItemComponent;
  let fixture: ComponentFixture<UserListItemComponent>;
  let store: MockStore<State>;
  const initialState = {
    userState: {
      users: JSON.parse(localStorage.getItem('users'))
    }
  };
  beforeAll(() => {
    localStorage.clear()
    localStorage.setItem('users', JSON.stringify(fakeUsers))
  })
  afterAll(() => {
    localStorage.clear()
  })
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatButtonModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatInputModule,
        StoreModule.forRoot(reducers, {
          metaReducers
        })],
      providers: [provideMockStore({ initialState })],
      declarations: [UserListItemComponent, UserFormComponent],

    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [UserFormComponent],
      }
    }).compileComponents();
    fixture = TestBed.createComponent(UserListItemComponent);
    component = fixture.componentInstance;
    store = TestBed.get<Store<State>>(Store);

    component.user = fakeUsers[0]
    component.index = 0
    fixture.detectChanges();
  }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should open modal', () => {
    component.openDialog()
    fixture.detectChanges();
    expect(document.body.getElementsByClassName('cdk-overlay-container').length).toBeGreaterThan(0)
  })

});
