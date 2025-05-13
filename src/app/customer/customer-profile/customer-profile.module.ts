import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerProfileRoutingModule } from './customer-profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangePassComponent } from './change-pass/change-pass.component';


@NgModule({
  declarations: [
    ProfileComponent,
    ChangePassComponent
  ],
  imports: [
    CommonModule,
    CustomerProfileRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CustomerProfileModule { }
