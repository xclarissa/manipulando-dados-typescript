function filtrarValor(transacao) {
    return transacao.valor !== null;
}
export default function estatisticas(transacoes) {
    return transacoes.filter(filtrarValor).reduce(function (acc, item) {
        return acc + item.valor;
    }, 0);
}
