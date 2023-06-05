import Estatiscas from "./estatisticas.js";
import calcularEstatisticas from "./estatisticas.js";
import { fetchData } from "./fetch.js";
import normalizarTransacao from "./normalizarTransacao.js";
import { CountList, ITransacao, ITransacaoInc } from "./types";

async function handleData() {
  const data = await fetchData<ITransacaoInc[]>(
    "https://api.origamid.dev/json/transacoes.json?"
  );

  if (!data) return;

  const transacoes = data.map(normalizarTransacao);
  preencherTabela(transacoes);
  preencherEstatisticas(transacoes);

  function preencherLista(lista: CountList, containerId: string): void {
    const containerElement = document.getElementById(containerId);
    if (containerElement) {
      Object.keys(lista).forEach((key) => {
        containerElement.innerHTML += `<p>${key}: ${lista[key]}</p>`;
      });
    }
  }

  // com classe

  function preencherEstatisticas(transacoes: ITransacao[]): void {
    const data = new Estatiscas(transacoes);

    preencherLista(data.pagamento, "pagamento");
    preencherLista(data.status, "status");

    const totalElement = document.querySelector<HTMLElement>("#total span");
    if (totalElement) {
      totalElement.innerText = data.total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    }

    const diaElement = document.querySelector<HTMLElement>("#dia span");
    if (diaElement) {
      diaElement.innerText = data.melhorDia[0];
    }
  }

  // function preencherEstatisticas(transacoes: ITransacao[]): void {
  //   const data = calcularEstatisticas(transacoes);
  //   const status = data.status.map(status => status)
  //   preencherLista(data.pagamento, 'pagamento')
  //   preencherLista(status, 'status')
  //   //  Argument of type 'TransacaoStatus[]' is not assignable to parameter of type 'CountList'.
  //   // Index signature for type 'string' is missing in type 'TransacaoStatus[]'.

  //   const pagamentoElement = document.getElementById("pagamento");
  //   if (pagamentoElement) {
  //     Object.keys(data.pagamento).forEach((key) => {
  //       pagamentoElement.innerHTML += `
  //         <p>${key}: ${data.pagamento[key]}</p>
  //       `;
  //     });
  //   }

  //   const totalElement = document.querySelector<HTMLElement>("#total span");
  //   if (totalElement) {
  //     totalElement.innerText = String(
  //       `R$ ${data.total.toLocaleString("PT-BR", {
  //         style: "currency",
  //         currency: "BRL",
  //       })}`
  //     );
  //   }
  // }

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
