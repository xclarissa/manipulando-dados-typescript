import { fetchData } from "./fetch.js";
import { ITransacoes } from "./types";

async function handleData() {
  const data = await fetchData<ITransacoes[]>(
    "https://api.origamid.dev/json/transacoes.json"
  );

  if (data) {
    data.forEach((item: ITransacoes) => {
     console.log( item.Status)
    });
  }
  console.log("data", data);
}

handleData();
