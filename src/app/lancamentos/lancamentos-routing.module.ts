import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutenticadorGuard } from '../shared/seguranca/autenticador.guard';
import { DespesasComponent } from './despesas/despesas.component';
import { ReceitasComponent } from './receitas/receitas.component';


const routes: Routes = [
{path: 'despesas', component: DespesasComponent, canActivate: [AutenticadorGuard] },
{path: 'receitas', component: ReceitasComponent, canActivate: [AutenticadorGuard] },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class LancamentosRoutingModule { }
