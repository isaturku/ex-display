//@ts-nocheck
import { For } from "solid-js"
import { CurrencyCard } from "./components/CurrencyCard"
import { LazyStore } from "@tauri-apps/plugin-store"
import { currencies } from "./utils/currencies";

const store = new LazyStore("currencies.json");

async function setInitialValue(currency: string) {
  await store.set(currency, { sell: 100.10, buy: 100.10 })
}


async function changeBuy(currency: string, buy: number) {
  await store.set(currency, { ...(await store.get(currency) as object), buy })
}

async function changeSell(currency: string, sell: number) {
  await store.set(currency, { ...(await store.get(currency) as object), sell })
}

if (await store.length() === 0) {
  for (const currency of currencies) {
    await setInitialValue(currency)
  }
}

const currenciesStore = Array.from(await store.entries());
currenciesStore.sort((a, b) => currencies.indexOf(a[0]) - currencies.indexOf(b[0]))

function App() {
  return (
    <div class="h-screen w-full flex flex-col gap-6 px-12 py-4 bg-white bg-slate-800">
      <h1 class="uppercase text-center text-4xl font-bold text-white">sibora-2006</h1>
      <div class="grid flex-1 grid-cols-1 gap-6">
        <For each={currenciesStore}>
          {(c) => (<CurrencyCard
            onChangeBuy={(buy) => changeBuy(c[0], buy)}
            onChangeSell={(sell) => changeSell(c[0], sell)}
            title={c[0]}
            buy={c[1].buy}
            sell={c[1].sell}
          />)}
        </For>
      </div>
    </div>
  )
}

export default App
