import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralRoutingModule } from './general-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    DashboardComponent,
    UsersComponent,
  ],
  imports: [
    CommonModule,
    GeneralRoutingModule,
    FormsModule,
    SharedModule,
    NgChartsModule
  ]
})
export class GeneralModule { }
