
import { createSignal, type Component } from "solid-js";

interface Props {
  title: string;
  buy: number;
  sell: number;
  onChangeBuy: (buy: number) => void;
  onChangeSell: (sell: number) => void;
}

export const CurrencyCard: Component<Props> = (props) => {
  const [buy, setBuy] = createSignal(props.buy);
  const [sell, setSell] = createSignal(props.sell);

  const handleBuyClose = (val: number) => {
    props.onChangeBuy(val);
    setBuy(val)
    setInputShow()
  }

  const handleSellClose = (val: number) => {
    props.onChangeSell(val);
    setSell(val)
    setInputShow()
  }

  const [inputShow, setInputShow] = createSignal()
  return (
    <div class="flex py-4 justify-around bg-white rounded-lg items-center">
      <div class="flex gap-2 items-center">
        <img src={`/images/${props.title}.png`} class="h-full w-full" />
        <p class="uppercase font-bold text-2xl">{props.title}</p>
      </div>
      <div>
        <span class="text-3xl font-bold" ondblclick={() => setInputShow("buy")} classList={{ "hidden": inputShow() === "buy" }}>{buy()}</span>
        <input
          value={buy()}
          onblur={(e) => handleBuyClose(parseFloat(e.currentTarget.value))}
          onkeydown={(e) => e.key === "Enter" ? handleBuyClose(parseFloat(e.currentTarget.value)) : null}
          classList={{ "hidden": inputShow() !== "buy" }} />
      </div>
      <div>
        <span class="text-3xl font-bold" ondblclick={() => setInputShow("sell")} classList={{ "hidden": inputShow() === "sell" }}>{sell()}</span>
        <input
          value={sell()}
          onblur={(e) => handleSellClose(parseFloat(e.currentTarget.value))}
          onkeydown={(e) => e.key === "Enter" ? handleSellClose(parseFloat(e.currentTarget.value)) : null}
          classList={{ "hidden": inputShow() !== "sell" }} />
      </div>
    </div>
  )
}

