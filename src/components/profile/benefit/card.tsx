import NextImage from "next/image";
import type { PropsWithChildren } from "react";

type BenefitCardProps = PropsWithChildren<{
  image: string;
  title: string;
  description: string;
}>;

export default function BenefitCard(props: BenefitCardProps) {
  return (
    <div className="flex gap-2.5 rounded-2xl bg-blue-100 p-2.5">
      <div className="box-content flex size-16 shrink-0 rounded-2xl bg-white p-1">
        <NextImage alt="Benefit" className="m-auto size-11" height={44} src={props.image} width={44} />
      </div>

      <div className="my-1.5 flex flex-col gap-1 text-[0.625rem]">
        <strong>{props.title}</strong>

        <p>{props.description}</p>

        <div className="mt-auto flex gap-2.5">{props.children}</div>
      </div>
    </div>
  );
}
