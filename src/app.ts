import { fetchData } from "./fetch.js";
import normalizarTransacao from "./normalizarTransacao.js";
import { ITransacaoInc } from "./types";

async function handleData() {
  const data = await fetchData<ITransacaoInc[]>(
    "https://api.origamid.dev/json/transacoes.json?"
  );

  if(!data) return;

  const transacoes = data.map(normalizarTransacao)
  console.log(transacoes);
  
}

handleData();
