import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { UserListComponent } from './components/user-list/user-list.component'
import { UserListItemComponent } from './components/user-list/user-list-item/user-list-item.component'
import { MatCardModule, MatDialogModule } from '@angular/material'
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/effects/user-effect.effects';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/reducers';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { User } from '@interfaces';
import { UserFormComponent } from './components/user-form/user-form.component';

export const fakeUsers: User[] = [
  {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
  },
  {
    id: 2,
    name: "Ervin Howell",
    username: "Antonette",
    email: "Shanna@melissa.tv",
    phone: "010-692-6593 x09125",
    website: "anastasia.net",

  },
]

describe('AppComponent', () => {
  let fixture: ComponentFixture<UserFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        UserFormComponent,
        BrowserAnimationsModule,
        MatDialogModule,
        HttpClientTestingModule,
        RouterTestingModule,
        MatCardModule,
        EffectsModule.forRoot([UserEffects]),
        StoreModule.forRoot(reducers, {
          metaReducers,
          runtimeChecks: {
            strictStateImmutability: true,
            strictActionImmutability: true
          }
        }),
      ],

      declarations: [
        UserFormComponent,
        AppComponent,
        UserListComponent,
        UserListItemComponent
      ],
    }).compileComponents();
  }));



});
