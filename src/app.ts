import estatisticas from "./estatisticas.js";
import { fetchData } from "./fetch.js";
import normalizarTransacao from "./normalizarTransacao.js";
import { ITransacao, ITransacaoInc } from "./types";

async function handleData() {
  const data = await fetchData<ITransacaoInc[]>(
    "https://api.origamid.dev/json/transacoes.json?"
  );

  if (!data) return;

  const transacoes = data.map(normalizarTransacao);
  preencherTabela(transacoes);
  preencherEstatisticas(transacoes);

  function preencherEstatisticas(transacoes: ITransacao[]): void {
    const data = estatisticas(transacoes);

    const totalElement = document.querySelector<HTMLElement>("#total span");
    if (totalElement) {
      totalElement.innerText = String(
        `R$ ${data.toLocaleString("PT-BR", {
          style: "currency",
          currency: "BRL",
        })}`
      );
    }
    console.log(transacoes);
  }

  function preencherTabela(transacoes: ITransacao[]): void {
    const tabela = document.querySelector("#transacoes tbody");
    if (!tabela) return;
    transacoes.forEach((transacao) => {
      tabela.innerHTML += `
        <tr>
          <td>${transacao.nome}</td>
          <td>${transacao.email}</td>
          <td> R$${transacao.moeda}</td>
          <td>${transacao.formaPagamento}</td>
          <td>${transacao.status}</td>
          <td>${transacao.data.toLocaleDateString()}</td>
        </tr>
      `;
    });
  }
}

handleData();
