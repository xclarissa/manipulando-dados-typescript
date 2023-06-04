/**
  Recebe string '1.200,50' e retorna number 1200.50
 */
export default function moedaParaNumero(moeda) {
    var numero = Number(moeda.replaceAll(".", "").replace(",", "."));
    return isNaN(numero) ? null : numero;
}
