import { ITransacao } from "./types";

//type predicate
type TransacaoValor = ITransacao & { valor: number };

function filtrarValor(transacao: ITransacao): transacao is TransacaoValor {
  return transacao.valor !== null;
}

export default function estatisticas(transacoes: ITransacao[]) {
  return transacoes.filter(filtrarValor).reduce((acc, item) => {
    return acc + item.valor;
  }, 0);
}
