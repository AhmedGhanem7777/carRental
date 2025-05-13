import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SavedRoutingModule } from './saved-routing.module';
import { SaveToLaterComponent } from './save-to-later/save-to-later.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    SaveToLaterComponent
  ],
  imports: [
    CommonModule,
    SavedRoutingModule,
    SharedModule
  ]
})
export class SavedModule { }
