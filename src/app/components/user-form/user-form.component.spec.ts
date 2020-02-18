import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { UserFormComponent } from './user-form.component';
import { fakeUsers } from 'src/app/app.component.spec';
import { SharedModule } from '../../shared/shared.module'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { destroyPlatform } from '@angular/core';
import { By } from '@angular/platform-browser';
import { User } from '@interfaces';
const fakeUser: User & { index: number } = { ...fakeUsers[0], index: 0 }
describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [UserFormComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: fakeUser },
        { provide: MatDialogRef }
      ]
    })
  }));
  afterAll(() => {
    fixture.destroy()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    destroyPlatform()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain data', () => {
    expect(component.data).toBeTruthy()
  })
  it('should check if data written to form', () => {
    const form = component.form
    for (const key in fakeUser) {
      if (fakeUser.hasOwnProperty(key) && key !== 'index') {

        expect(form.controls[key].value).toBe(fakeUser[key])
      }
    }
  })
  for (const key in fakeUser) {
    if (fakeUser.hasOwnProperty(key) && key !== 'index') {
      it(`should check if ${key} written to form`, () => {
        fixture.detectChanges()
        expect(component.form.controls[key].value).toBe(fakeUser[key])
      })
    }
  }
  for (const key in fakeUser) {
    if (fakeUser.hasOwnProperty(key) && key !== 'index') {
      it(`should check control valid if ${key} is empty`, () => {
        component.form.controls[key].setValue(null)
        fixture.detectChanges()
        expect(component.form.controls.valid).toBeFalsy()
        expect(component.form.valid).toBeFalsy()
      })
    }
  }
  for (const key in fakeUser) {
    if (fakeUser.hasOwnProperty(key) && key !== 'index') {
      it(`should check save button disabled if ${key} invalid`, () => {
        component.form.controls[key].setValue(null)
        fixture.detectChanges()
        // SHOULD BE SO, BUT DON`T WORK
        // const saveButton = fixture.debugElement.query(By.css('button[innerText="Save"]'));
        const saveButton = fixture.debugElement.queryAll(By.css('button'))[1]
        expect(saveButton.attributes.disabled).toBeTruthy()
        expect(component.form.valid).toBeFalsy()
      })
    }
  }

  it('should check form valid with email', () => {
    expect(component.form.valid).toBeTruthy()
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    expect(buttons[1]).toBeTruthy()
    expect(buttons[1].attributes.disabled).toBeFalsy()
    component.form.controls.email.setValue('wrongEmail')
    fixture.detectChanges();
    const saveButton = fixture.debugElement.queryAll(By.css('button'))[1]
    expect(saveButton).toBeTruthy()
    fixture.detectChanges();
  })

});
