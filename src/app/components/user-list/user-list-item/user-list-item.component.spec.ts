import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListItemComponent } from './user-list-item.component';
import { fakeUsers } from 'src/app/app.component.spec';
import { provideMockStore } from '@ngrx/store/testing';
import { UserFormComponent } from '../../user-form/user-form.component'

import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

import { SharedModule } from '../../../shared/shared.module'

describe('UserListItemComponent', () => {
  let component: UserListItemComponent;
  let fixture: ComponentFixture<UserListItemComponent>;
  const initialState = {
    userState: {
      users: JSON.parse(localStorage.getItem('users'))
    }
  };
  beforeAll(() => {
    localStorage.setItem('users', JSON.stringify(fakeUsers))
  })

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
      ],
      providers: [provideMockStore({ initialState })],
      declarations: [UserListItemComponent, UserFormComponent],

    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [UserFormComponent],
      }
    }).compileComponents();
    fixture = TestBed.createComponent(UserListItemComponent);
    component = fixture.componentInstance;
    component.user = fakeUsers[0]
    component.index = 0
    fixture.detectChanges();
  }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should open modal and close it', () => {
    component.openDialog()
    // fixture.detectChanges();
    expect(document.body.getElementsByClassName('cdk-overlay-container').length).toBeGreaterThan(0)
    fixture.detectChanges();
    component.dialog.closeAll()
    fixture.detectChanges();
  })
});
