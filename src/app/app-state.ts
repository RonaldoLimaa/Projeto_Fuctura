import { OperacaoTypeEnum } from "./shared/emuns/operacao-type.enum";
import { IDespesa } from "./shared/models/despesa.interface";
import { IReceita } from "./shared/models/receita.interface";

export class AppState{
    token:string = '';
    operacao = OperacaoTypeEnum.SALVAR;
    despesaSelecionada!: IDespesa;
    receitaSelecionada!: IReceita;
}
