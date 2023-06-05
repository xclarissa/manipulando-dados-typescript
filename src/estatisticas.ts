import countBy from "./countby.js";
import { CountList, ITransacao } from "./types";

//type predicate
type TransacaoValor = ITransacao & { valor: number };

function filtrarValor(transacao: ITransacao): transacao is TransacaoValor {
  return transacao.valor !== null;
}

//com classe

export default class Estatiscas {
  private transacoes;
  total;
  pagamento;
  status;
  semana;
  melhorDia;
  constructor(transacoes: ITransacao[]) {
    this.transacoes = transacoes;
    this.total = this.setTotal();
    this.pagamento = this.setPagamento();
    this.status = this.setStatus();
    this.semana = this.setSemana();
    this.melhorDia = this.setMelhorDia();
  }

  private setTotal() {
    return this.transacoes.filter(filtrarValor).reduce((acc, item) => {
      return acc + item.valor;
    }, 0);
  }

  private setPagamento() {
    return countBy(this.transacoes.map(({ formaPagamento }) => formaPagamento));
  }

  private setStatus() {
    return countBy(this.transacoes.map(({ status }) => status));
  }

  private setSemana() {
    const semana = {
      ["Domingo"]: 0,
      ["Segunda"]: 0,
      ["Terça"]: 0,
      ["Quarta"]: 0,
      ["Quinta"]: 0,
      ["Sexta"]: 0,
      ["Sábado"]: 0,
    };
    for (let i = 0; i < this.transacoes.length; i++) {
      const day = this.transacoes[i].data.getDay();
      if (day === 0) semana["Domingo"] += 1;
      if (day === 1) semana["Segunda"] += 1;
      if (day === 2) semana["Terça"] += 1;
      if (day === 3) semana["Quarta"] += 1;
      if (day === 4) semana["Quinta"] += 1;
      if (day === 5) semana["Sexta"] += 1;
      if (day === 5) semana["Sábado"] += 1;
    }
    return semana;
  }
  private setMelhorDia() {
    return Object.entries(this.semana).sort((a, b) => {
      return b[1] - a[1];
    })[0];
  }
}

// export default function calcularEstatisticas(transacoes: ITransacao[]) {
//   const setTotal = () => {
//     return transacoes.filter(filtrarValor).reduce((acc, item) => {
//       return acc + item.valor;
//     }, 0);
//   };

//   const setPagamento = () => {
//     return countBy(transacoes.map(({ formaPagamento }) => formaPagamento));
//   };

//   const setStatus = () => {
//     return transacoes.map(({ status }) => status)
//   };

//   return {
//     total: setTotal(),
//     pagamento: setPagamento(),
//     status: setStatus(),
//   };

// }

//   const total = transacoes.filter(filtrarValor).reduce((acc, item) => {
//     return acc + item.valor;
//   }, 0);

//   const pagamentos = transacoes.map(({ formaPagamento }) => formaPagamento);
//   const totalPagamentos = countBy(pagamentos);
//   const status = transacoes.map(({ status }) => status);

//   console.log(totalPagamentos)
//   return { total, totalPagamentos, status };
