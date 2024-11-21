"use client";

import CashLine from "@components/icon/ri/cash-line";
import { Counter } from "@components/primitive/counter";
import LoaderDialog from "@components/shared/loader-dialog";
import { format } from "@lib/format";
import { rem } from "@lib/utils";
import { useTranslations } from "next-intl";
import type { StaticImageData } from "next/image";
import NextImage from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useTransition, type MouseEventHandler } from "react";

type Winner = {
  name: string;
  amount: number;
  avatar: string;
};

type LotteryLinkProps = {
  slug: string;
  image: StaticImageData | string;
  label: string;
  title?: boolean;
  winners: Winner[];
};

export default function LotteryLink(props: LotteryLinkProps) {
  const t = useTranslations();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    startTransition(() => {
      event.preventDefault();

      router.push(`/lotteries/${props.slug}`);
    });
  };

  return (
    <>
      <NextLink
        className="flex flex-col rounded-b rounded-t-lg bg-gray-900 text-white"
        href={`/lotteries/${props.slug}`}
        onClick={onClick}
      >
        <figure className="relative overflow-hidden rounded-lg bg-red-200">
          <NextImage
            alt={props.label}
            className="aspect-21/9 h-auto w-full"
            placeholder="blur"
            priority
            src={props.image}
          />

          {props.title && (
            <figcaption className="absolute inset-x-0 top-0 p-2.5 text-sm font-bold tracking-wide">
              {props.label}
            </figcaption>
          )}
        </figure>
        <Counter className="h-8 px-2 tracking-wide">
          {props.winners.map((winner, index) => (
            // eslint-disable-next-line react/no-array-index-key -- -
            <div className="flex justify-between gap-1 p-2 pl-0" key={`${index}-${winner.name}`}>
              <div className="flex w-0 grow items-center gap-1">
                <NextImage
                  alt={winner.name}
                  className="size-4 shrink-0 rounded-full object-cover"
                  height={16}
                  src={winner.avatar}
                  width={16}
                />
                <span className="w-0 grow truncate text-sm leading-none">{winner.name + index}</span>
              </div>

              <div className="flex items-center gap-1">
                <CashLine className="text-green-600" size={rem(16)} />
                <span className="whitespace-nowrap text-xs font-bold leading-none">
                  {t("Got {value}", {
                    value: format(winner.amount, {
                      style: "currency",
                    }),
                  })}
                </span>
              </div>
            </div>
          ))}
        </Counter>{" "}
      </NextLink>

      <LoaderDialog show={isPending} />
    </>
  );
}
