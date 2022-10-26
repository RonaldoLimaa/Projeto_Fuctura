import { DaoService } from './services/dao.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { MaterialModule } from '../material/material.module';
import { LancamentosService } from './services/lancamentos.service';
import { AutenticadorService } from './services/autenticador.service';
import { UsuarioService } from './services/usuario.service';
import { MenuService } from './services/menu.service';
import { AutenticadorGuard } from './seguranca/autenticador.guard';
import { LogoutComponent } from './components/logout/logout.component';
import { DinheiroDirective } from './directives/dinheiro.directive';
import { MaiusculoDirective } from './directives/maiusculo.directive';



@NgModule({
  declarations: [
    MenuComponent,
    LogoutComponent,
    DinheiroDirective,
    MaiusculoDirective
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    MenuComponent,
    LogoutComponent,
    DinheiroDirective,
    MaiusculoDirective
  ],
  providers: [
    DaoService,
    MenuService,
    UsuarioService,
    LancamentosService,
    AutenticadorService,
    AutenticadorGuard
  ]
})
export class SharedModule { }
