

import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { UserListComponent } from './components/user-list/user-list.component';
import { UserListItemComponent } from './components/user-list/user-list-item/user-list-item.component';
import { UserFormComponent } from './components/user-form/user-form.component'

import { SharedModule } from './shared/shared.module'


@NgModule({
  entryComponents: [UserFormComponent],

  declarations: [
    AppComponent,
    UserListComponent,
    UserListItemComponent,
    UserFormComponent
  ],
  imports: [
    SharedModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
