import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormComponent } from './user-form.component';
import { fakeUsers } from 'src/app/app.component.spec';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;
  beforeAll(() => {
    localStorage.setItem('users', JSON.stringify(fakeUsers))
  })
  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [ UserFormComponent ]
  //   })
  //   .compileComponents();
  // }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(UserFormComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
