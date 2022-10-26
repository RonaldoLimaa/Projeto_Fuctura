import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as moment from 'moment';
import Swal from 'sweetalert2';

import { MenuTypeEnum } from 'src/app/shared/emuns/menu-type.enum';
import { IDespesa } from 'src/app/shared/models/despesa.interface';
import { LancamentosService } from 'src/app/shared/services/lancamentos.service';
import { MenuService } from 'src/app/shared/services/menu.service';

@Component({
  selector: 'app-despesas',
  templateUrl: './despesas.component.html',
  styleUrls: ['./despesas.component.css']
})
export class DespesasComponent implements OnInit {

  formulario!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private menuService: MenuService,
    private lancamentosService: LancamentosService
  ) { }

  get buttonLabel(): string {
    return this.lancamentosService.modoEdicao ? 'Editar' : 'Salvar';
  }

  get tipos(): string[] {
    return ['Alimentação','Transporte','Educação','Investimentos','Moradia'];
  }

  ngOnInit(): void {
    this.menuService.ondeEstou = MenuTypeEnum.LANCAMENTO_DESPESA;
    this.iniciarFormulario();
    this.verificarModoEdicao();
  }

  private verificarModoEdicao(): void {
    if (this.lancamentosService.modoEdicao) {
      const despesa = this.lancamentosService.despesaSelecionada;
      this.loadDespesa(despesa);
    }
  }

  private iniciarFormulario(): void {
    const hoje = moment().format();
    this.formulario = this.formBuilder.group({
      tipo: ['', Validators.required],
      descricao: ['', Validators.required, Validators.minLength(5)],
      ehFixo: [false, [Validators.required]],
      data: [hoje, [Validators.required]],
      valor: ['', [Validators.required]]
    });
  }

  private loadFormulario(despesa: IDespesa): void {
    if (despesa) {
      const valor = new Intl.NumberFormat('pt-BR', {minimumFractionDigits: 2}).format(despesa.valor);
      this.formulario.patchValue({
        tipo: despesa.tipo,
        descricao: despesa.descricao,
        // ehFixo: despesa.ehFixo,
        data: despesa.data,
        valor: valor
      });
    }
  }

  private loadDespesa(despesa: IDespesa): void {
    this.lancamentosService.obterDespesa(despesa).subscribe({
      next: (resp) => {
        if (resp.status === HttpStatusCode.Ok) {
          const lancamento = resp.body;
          if (lancamento) {
            const despesa: IDespesa = {
              data: moment(lancamento.data).format(),
              descricao: lancamento.descricao,
              ehFixo: lancamento.ehFixo,
              tipo: lancamento.tipo,
              valor: lancamento.valor,
              id: lancamento.id
            };
            this.loadFormulario(despesa);
          }
        }
      },
      error: (err: HttpErrorResponse) => {
        Swal.fire(
          'Ocorreu um erro ao carregar a Despesa',
          err.error.mensagem,
          'warning'
          );
      }
    });
  }

  private save(despesa: IDespesa): void {
    this.lancamentosService.criarDespesa(despesa).subscribe({
      next: (resp) => {
        if (resp.status === HttpStatusCode.Ok || resp.status === HttpStatusCode.Created){
          // limpar o formulario
          this.formulario.reset();
          // mensagem
          Swal.fire(
            'Criar Despesa',
            'Despesa criada com sucesso!',
            'success'
            );
        }
      },
      error: (err: HttpErrorResponse) => {
        Swal.fire(
          'ALERTA: Criar Despesa',
          err.error.mensagem,
          'warning'
          );
      }
    });
  }

  private update(despesa: IDespesa): void {
    this.lancamentosService.atualizarDespesa(despesa).subscribe({
      next: (resp) => {
        if (resp.status === HttpStatusCode.Ok){
          // limpar o formulario
          this.formulario.reset();
          // mensagem
          Swal.fire(
            'Atualizar Despesa',
            'Despesa atualizada com sucesso!',
            'success'
            );
        }
      },
      error: (err: HttpErrorResponse) => {
        Swal.fire(
          'ALERTA: Atualizar Despesa',
          err.error.mensagem,
          'warning'
          );
      }
    });
  }

  onSalvar(): void {
    const despesa: IDespesa = this.formulario.value;
    // formatar o valor
    despesa.valor = +(despesa.valor.toString().replace('.','').replace(',','.'));
    // formatar a data
    despesa.data = moment(despesa.data).format('YYYY-MM-DD');
    if (this.lancamentosService.modoEdicao) {
      this.update(despesa);
    } else {
      this.save(despesa);
    }
  }

}
