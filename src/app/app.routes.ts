import { Routes } from '@angular/router';
import { ListadoAvisosPage } from './paginas/listado-avisos/listado-avisos.page';
import { FormularioAvisosPage } from './paginas/formulario-avisos/formulario-avisos.page';

export const routes: Routes = [
  { path: '', redirectTo: 'listado-avisos', pathMatch: 'full' },
  { path: 'listado-avisos', component: ListadoAvisosPage },
  { path: 'formulario-avisos', component: FormularioAvisosPage },
];


