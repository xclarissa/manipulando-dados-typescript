import countBy from "./countby.js";
function filtrarValor(transacao) {
    return transacao.valor !== null;
}
//com classe
var Estatiscas = /** @class */ (function () {
    function Estatiscas(transacoes) {
        this.transacoes = transacoes;
        this.total = this.setTotal();
        this.pagamento = this.setPagamento();
        this.status = this.setStatus();
        this.semana = this.setSemana();
        this.melhorDia = this.setMelhorDia();
    }
    Estatiscas.prototype.setTotal = function () {
        return this.transacoes.filter(filtrarValor).reduce(function (acc, item) {
            return acc + item.valor;
        }, 0);
    };
    Estatiscas.prototype.setPagamento = function () {
        return countBy(this.transacoes.map(function (_a) {
            var formaPagamento = _a.formaPagamento;
            return formaPagamento;
        }));
    };
    Estatiscas.prototype.setStatus = function () {
        return countBy(this.transacoes.map(function (_a) {
            var status = _a.status;
            return status;
        }));
    };
    Estatiscas.prototype.setSemana = function () {
        var _a;
        var semana = (_a = {},
            _a["Domingo"] = 0,
            _a["Segunda"] = 0,
            _a["Terça"] = 0,
            _a["Quarta"] = 0,
            _a["Quinta"] = 0,
            _a["Sexta"] = 0,
            _a["Sábado"] = 0,
            _a);
        for (var i = 0; i < this.transacoes.length; i++) {
            var day = this.transacoes[i].data.getDay();
            if (day === 0)
                semana["Domingo"] += 1;
            if (day === 1)
                semana["Segunda"] += 1;
            if (day === 2)
                semana["Terça"] += 1;
            if (day === 3)
                semana["Quarta"] += 1;
            if (day === 4)
                semana["Quinta"] += 1;
            if (day === 5)
                semana["Sexta"] += 1;
            if (day === 5)
                semana["Sábado"] += 1;
        }
        return semana;
    };
    Estatiscas.prototype.setMelhorDia = function () {
        return Object.entries(this.semana).sort(function (a, b) {
            return b[1] - a[1];
        })[0];
    };
    return Estatiscas;
}());
export default Estatiscas;
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
