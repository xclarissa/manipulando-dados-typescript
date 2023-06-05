import moedaParaNumero from "./moedaParaNumero.js";
import stringToDate from "./stringToDate.js";
import { ITransacao, ITransacaoInc } from "./types";

export default function normalizarTransacao(transacao: ITransacaoInc): ITransacao {
    return {
        status: transacao.Status,
        id: transacao.ID,
        data: stringToDate(transacao.Data),
        nome: transacao.Nome,
        formaPagamento: transacao["Forma de Pagamento"],
        email: transacao.Email,
        moeda: transacao["Valor (R$)"],
        valor: moedaParaNumero(transacao["Valor (R$)"]),
        clienteNovo: Boolean(transacao["Cliente Novo"]),
    }
}