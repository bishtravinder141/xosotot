import NextLink from "next/link";
import type { HTMLAttributes } from "react";
import { Fragment } from "react";
import { twMerge } from "tailwind-merge";

type BreadcrumbsProps = HTMLAttributes<HTMLParagraphElement> & {
  path: { label: string; href: string }[];
};

export default function Breadcrumbs(props: BreadcrumbsProps) {
  const { path, children, className, ...attrs } = props;

  return (
    <p {...attrs} className={twMerge("text-xs font-bold", className)}>
      {path.map((item, index) => (
        // eslint-disable-next-line react/no-array-index-key -- -
        <Fragment key={index}>
          <NextLink href={item.href}>{item.label}</NextLink> &gt;{" "}
        </Fragment>
      ))}

      <mark className="bg-transparent text-blue-500">{children}</mark>
    </p>
  );
}
