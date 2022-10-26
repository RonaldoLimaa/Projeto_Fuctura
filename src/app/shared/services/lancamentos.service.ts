import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app-state';
import { AppSettings } from 'src/app/app.settings';
import { OperacaoTypeEnum } from '../emuns/operacao-type.enum';
import { IDespesa } from '../models/despesa.interface';
import { ILancamento } from '../models/lancamento.interface';
import { IReceita } from '../models/receita.interface';
import { DaoService } from './dao.service';

@Injectable({
  providedIn: 'root'
})
export class LancamentosService {

  constructor(
    private dao: DaoService,
    private state: AppState
  ) { }

  get modoEdicao(): boolean {
    return this.state.operacao === OperacaoTypeEnum.EDITAR;
  }

  set modoEdicao(ehEdicao: boolean) {
    if (ehEdicao) {
      this.state.operacao = OperacaoTypeEnum.EDITAR;
    } else {
      this.state.operacao = OperacaoTypeEnum.SALVAR;
    }
  }

  get despesaSelecionada(): IDespesa {
    return this.state.despesaSelecionada;
  }

  set despesaSelecionada(selecionada: IDespesa) {
    this.state.despesaSelecionada = selecionada;
  }

  get receitaSelecionada(): IReceita {
    return this.state.receitaSelecionada;
  }

  set receitaSelecionada(selecionada: IReceita) {
    this.state.receitaSelecionada = selecionada;
  }


  /**
   * criar uma nova despesa
   * @param despesa instancia de uma despesa
   * @returns retorna objeto lancamento criada
   */
  criarDespesa(despesa: IDespesa): Observable<HttpResponse<ILancamento>> {
    return this.dao.post<ILancamento>(AppSettings.API_LANCAMENTOS,
      this.despesaToLancamento(despesa), DaoService.MEDIA_TYPE_APP_JSON);
  }
  /**
   * atualiza uma despesa existente
   * @param despesa instancia de uma despesa
   * @returns retorna objeto lancamento alterada
   */
  atualizarDespesa(despesa: IDespesa): Observable<HttpResponse<ILancamento>> {
    return this.dao.put<ILancamento>(`${AppSettings.API_LANCAMENTOS}/${despesa.id}`,
    this.despesaToLancamento(despesa), DaoService.MEDIA_TYPE_APP_JSON);
  }
  /**
   * listar despesas criadas
   * @returns retorna lista de lancamentos
   */
  listaDespesas(): Observable<HttpResponse<ILancamento[]>> {
    return this.dao.get<ILancamento[]>(AppSettings.API_LANCAMENTOS, DaoService.MEDIA_TYPE_APP_JSON);
  }
  /**
   * recupera a despesa do id informado
   * @param despesa instancia de uma despesa
   * @returns retorna objeto lancamento
   */
  obterDespesa(despesa: IDespesa): Observable<HttpResponse<ILancamento>> {
    return this.dao.get<ILancamento>(`${AppSettings.API_LANCAMENTOS}/${despesa.id}`, DaoService.MEDIA_TYPE_APP_JSON);
  }
  /**
   * reove uma despesa existe
   * @param despesa instancia de uma despesa
   * @returns retorna objeto lancamento removida
   */
  removerDespesa(despesa: IDespesa): Observable<HttpResponse<ILancamento>> {
    return this.dao.delete<ILancamento>(`${AppSettings.API_LANCAMENTOS}/${despesa.id}`, DaoService.MEDIA_TYPE_APP_JSON);
  }

  private despesaToLancamento(despesa: IDespesa): ILancamento {
    const lancamento: ILancamento = {
      data: despesa.data,
      descricao: despesa.descricao,
      ehFixo: despesa.ehFixo,
      tipo: despesa.tipo,
      valor: despesa.valor,
      ehReceita: false,
      id: despesa.id
    };
    return lancamento;
  }

  private receitaToLancamento(receita: IReceita): ILancamento {
    const lancamento: ILancamento = {
      data: receita.data,
      descricao: receita.descricao,
      ehFixo: receita.ehFixo,
      tipo: receita.tipo,
      valor: receita.valor,
      ehReceita: true,
      id: receita.id
    };
    return lancamento;
  }
}
