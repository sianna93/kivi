import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {environment} from '../environments/environment';

const routes: Routes = [
  {path: '', loadChildren: './main/main.module#MainModule'},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
