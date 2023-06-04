type TransacaoPagamento = "Boleto" | "Cartão de Crédito";
type TransacaoStatus =
  | "Paga"
  | "Recusada pela operadora de cartão"
  | "Aguardando pagamento"
  | "Estornada";

export interface ITransacoes {
  Status: TransacaoStatus;
  ID: number;
  Data: string;
  Nome: string;
  ["Forma de Pagamento"]: TransacaoPagamento;
  Email: string;
  ["Valor (R$)"]: string;
  ["Cliente Novo"]: number;
}
