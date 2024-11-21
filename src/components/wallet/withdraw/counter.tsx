"use client";

import WalletWithdrawWinner from "@components/wallet/withdraw/winner";
import { Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";

type Winner = {
  id: number;
  name: string;
  game: string;
  avatar: string;
  amount: number;
};

type WalletWithdrawWinnersCounterProps = {
  winners: Winner[];
};

export default function WalletWithdrawWinnersCounter(props: WalletWithdrawWinnersCounterProps) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setOffset((state) => state + 1);
    }, 3_000);

    return function cancel() {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="relative flex h-72 flex-col gap-2.5 overflow-hidden">
      {props.winners.map((winner, index) => {
        const show = (index + offset) % props.winners.length < 4;
        const order = (index + offset) % props.winners.length;

        return (
          // eslint-disable-next-line react/no-array-index-key -- -
          <Transition.Root as={Fragment} key={`${winner.id}-${index}`} show={show}>
            <Transition.Child as={Fragment} enterFrom="scale-0 h-0" enterTo="h-16">
              <div className="transition-[transform,height] duration-300" style={{ order }}>
                <WalletWithdrawWinner {...winner} />
              </div>
            </Transition.Child>
          </Transition.Root>
        );
      })}
    </div>
  );
}
