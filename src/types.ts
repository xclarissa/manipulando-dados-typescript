type TransacaoPagamento = "Boleto" | "Cartão de Crédito";
type TransacaoStatus =
  | "Paga"
  | "Recusada pela operadora de cartão"
  | "Aguardando pagamento"
  | "Estornada";

export interface ITransacaoInc {
  Status: TransacaoStatus;
  ID: number;
  Data: string;
  Nome: string;
  ["Forma de Pagamento"]: TransacaoPagamento;
  Email: string;
  ["Valor (R$)"]: string;
  ["Cliente Novo"]: number;
}

export interface ITransacao {
  status: TransacaoStatus;
  id: number;
  data: string;
  nome: string;
  formaPagamento: TransacaoPagamento;
  email: string;
  moeda: string;
  valor: number | null;
  clienteNovo: boolean;
}
