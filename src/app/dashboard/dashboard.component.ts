import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MenuTypeEnum } from '../shared/emuns/menu-type.enum';
import { IDespesa } from '../shared/models/despesa.interface';
import { IReceita } from '../shared/models/receita.interface';
import { LancamentosService } from '../shared/services/lancamentos.service';
import { MenuService } from '../shared/services/menu.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dataSourceDespesas: IDespesa[] = [];
  dataSourceReceitas: IReceita[] = [];
  displayedColumns = ['data','valor','tipo','fixo','descricao','acoes'];

  constructor(
    private router: Router,
    private menuService: MenuService,
    private lancamentosService: LancamentosService
  ) { }

  ngOnInit(): void {
    this.lastDespesas();
    this.lastReceitas();
    this.menuService.ondeEstou = MenuTypeEnum.DASHBOARD;
  }

  private lastDespesas(): void {
    this.lancamentosService.listaDespesas().subscribe({
      next: (resp) => {
        if(resp.status === HttpStatusCode.Ok) {
          const lancamentos = resp.body;
          if (lancamentos && lancamentos.length > 0) {
            this.dataSourceDespesas = lancamentos
              // filtrar as despesas
              .filter(l => l.ehReceita === false)
              // transforma o lancamento em despesa
              .map( lancamento => {
                const despesa: IDespesa = {
                  data: lancamento.data,
                  descricao: lancamento.descricao,
                  ehFixo: lancamento.ehFixo,
                  tipo: lancamento.tipo,
                  valor: lancamento.valor,
                  id: lancamento.id
                };
                return despesa;
              });
          }
        }
      }
    });
  }

  private removeDespesa(despesa: IDespesa): void {
    this.lancamentosService.removerDespesa(despesa).subscribe({
      next: (resp) => {
        if (resp.status === HttpStatusCode.Ok) {
          // atualizar a listagem
          this.lastDespesas();
          // mensagem
          Swal.fire(
            'Removido!',
            'Despesa removido com sucesso.',
            'success'
            );
        }
      },
      error: (err: HttpErrorResponse) => {
        if (err.status < 500) {
          Swal.fire(
            'Erro ao remover a Despesa',
            err.error.mensagem,
            'warning'
            );
        } else {
          Swal.fire(
            'Erro inespesado',
            err.error.mensagem,
            'error'
            );
        }
      }
    });
  }

  private lastReceitas(): void {

  }

  onEditDespesa(despesa: IDespesa) {
    this.lancamentosService.despesaSelecionada = despesa;
    this.lancamentosService.modoEdicao = true;
    this.router.navigate(['lancamentos/despesas']);
  }

  onRemoveDespesa(despesa: IDespesa) {
    Swal.fire({
      title: 'Remover Despesa',
      text: 'Deseja remover a despesa "' + despesa.descricao.toUpperCase() + '" ?',
      icon: 'question',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      showCancelButton: true,
      focusConfirm: false,
    }).then((result) => {
      // Se confirmar remover
      if (result.isConfirmed) {
        this.removeDespesa(despesa);
      }
    });
  }

  onEditReceita(receita: IReceita) {

  }

  onRemoveReceita(receita: IReceita) {

  }

}
