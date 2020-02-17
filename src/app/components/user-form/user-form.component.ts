import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from '@interfaces'
import { Store } from '@ngrx/store';
import { State, EditUser, AddNewUser } from '../../store'
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl(null, Validators.required),
    username: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.email, Validators.required]),
    phone: new FormControl(null, Validators.required),
    website: new FormControl(null, Validators.required),

  })
  constructor(
    private store: Store<State>,
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User & { index: number }) { }

  ngOnInit() {

    if (this.data) {
      for (const key in this.data) {
        if (this.data.hasOwnProperty(key) && this.form.controls[key]) {
          this.form.controls[key].setValue(this.data[key])
        }
      }
    }
  }

  saveUser() {
    if (!this.form.valid) {
      return
    }
    if (this.data) {
      this.store.dispatch(new EditUser({ ...this.form.value, index: this.data.index }))
      this.dialogRef.close()
    } else {
      this.store.dispatch(new AddNewUser(this.form.value))
      this.dialogRef.close()
    }
  }
}
