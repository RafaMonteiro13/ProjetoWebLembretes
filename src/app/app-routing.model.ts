import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LembreteInserirComponent } from './lembrete/lembrete-inserir/lembrete-inserir.component';
import { LembreteListaComponent } from './lembrete/lembrete-lista/lembrete-lista.component';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';

const routes: Routes = [
  {path: '', component: LembreteListaComponent},
  {path: 'criar', component: LembreteInserirComponent},
  {path: 'editar/:idLembrete', component: LembreteInserirComponent}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule {

}
