import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

import { SharedModule } from './shared/shared.module'

import { AppComponent } from './app.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserListComponent } from './components/user-list/user-list.component'
import { UserListItemComponent } from './components/user-list/user-list-item/user-list-item.component'

import { User } from '@interfaces';




export const fakeUsers: User[] = [
  {
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
  },
  {
    name: "Ervin Howell",
    username: "Antonette",
    email: "Shanna@melissa.tv",
    phone: "010-692-6593 x09125",
    website: "anastasia.net",
  },
]

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent
  beforeAll(() => {
    localStorage.setItem('users', JSON.stringify(fakeUsers))
  })
  afterAll(() => {
    fixture.destroy()
  })
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule,
      ],
      declarations: [
        UserFormComponent,
        AppComponent,
        UserListComponent,
        UserListItemComponent
      ],
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [UserFormComponent],
      }
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  })
  it('should have user-list component', () => {
    expect(fixture.debugElement.children.length).toBe(1)
    expect(fixture.debugElement.children[0].name).toBe('app-user-list')
  })

});
