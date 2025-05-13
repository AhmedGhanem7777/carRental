import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SaveToLaterComponent } from './save-to-later/save-to-later.component';
import { NotFoundComponent } from '../../shared/components/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '', component: SaveToLaterComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SavedRoutingModule { }
