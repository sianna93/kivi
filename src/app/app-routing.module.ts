import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {environment} from '../environments/environment';

const routes: Routes = [
  {path: '', loadChildren: './paciente/paciente.module#PacienteModule'},
  {path: 'main', loadChildren: './main/main.module#MainModule'},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
