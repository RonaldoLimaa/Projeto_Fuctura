
export interface ILancamento {
  id?: number;
  tipo: string;
  descricao: string;
  ehFixo: boolean;
  data: string;
  valor: number;
  ehReceita: boolean;
  mensagem?: string;
}
