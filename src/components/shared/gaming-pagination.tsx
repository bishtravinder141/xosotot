"use client";

import { useRouter } from "next/navigation";
import { useRef, type ComponentPropsWithoutRef } from "react";

type PaginationProps = ComponentPropsWithoutRef<"nav"> & {
  page: number;
  limit: number;
  total: number;
  sibling?: number;
  boundary?: number;
};

export default function GamingPagination(props: PaginationProps) {
  const { page, limit, total, boundary = 1, ...attrs } = props;
  const lastPage = Math.ceil(total / limit);

  const router = useRouter();
  const target = useRef<HTMLDivElement>(null);

  const handler = (value: number) => () => {
    const params = new URLSearchParams(window.location.search);

    if (value < 1) {
      params.delete("page");
    } else {
      params.set("page", value.toString());
    }

    router.replace(`?${params.toString()}`, {
      scroll: false,
    });

    let top = 0;
    const parent = target.current?.parentElement;

    if (parent) {
      const styles = getComputedStyle(parent);

      top = parent.offsetTop - parseInt(styles.scrollMarginTop);
    }

    scrollTo({ behavior: "smooth", top });
  };

  return (
    <nav {...attrs} aria-label="Pagination Navigation" ref={target} role="navigation">
      <ul className="inline-flex items-center text-[0.625rem] font-bold text-blue-500">
        <li className="mr-6 inline-flex shrink-0">
          <button
            aria-label="Goto Previous Page"
            className="size-6 rounded bg-blue-500 text-white ring-1 ring-blue-500 transition-colors"
            disabled={page < 2}
            onClick={handler(page - 1)}
            type="button"
          >
            {"<"}
          </button>
        </li>

        <li className="inline-flex shrink-0">
          <button
            aria-current="page"
            aria-label={`Goto Page ${page}`}
            className="rounded ring-blue-500 transition-colors"
            disabled
            type="button"
          >
            {page}
          </button>
        </li>

        <li className="inline-flex shrink-0 items-center justify-center">
          <span>/</span>
        </li>

        {Array.from(Array(Math.max(Math.min(lastPage - page, boundary), 0))).map((_, offset, list) => (
          // eslint-disable-next-line react/no-array-index-key -- -
          <li className="inline-flex shrink-0" key={`next:boundary:${offset}`}>
            <button
              aria-label={`Goto Page ${lastPage - list.length + offset + 1}`}
              className="rounded transition-colors"
              onClick={handler(lastPage - list.length + offset + 1)}
              type="button"
            >
              {lastPage - list.length + offset + 1}
            </button>
          </li>
        ))}

        {lastPage === page &&
          <li className="inline-flex shrink-0">
            <button
              aria-label={`Goto Page ${lastPage}`}
              className="size-6 rounded transition-colors"
              onClick={handler(lastPage)}
              type="button"
            >
              {lastPage}
            </button>
          </li>
        }

        <li className="ml-6 inline-flex shrink-0">
          <button
            aria-label="Goto Next Page"
            className="size-6 rounded bg-blue-500 text-white ring-1 ring-blue-500 transition-colors"
            disabled={page >= lastPage}
            onClick={handler(page + 1)}
            type="button"
          >
            {">"}
          </button>
        </li>
      </ul>
    </nav>
  );
}
