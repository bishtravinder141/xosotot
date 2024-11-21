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

export default function Pagination(props: PaginationProps) {
  const { page, limit, total, sibling = 1, boundary = 1, ...attrs } = props;
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
        <li className="mr-2 inline-flex shrink-0">
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

        {Array.from(Array(Math.max(Math.min(page - 1, boundary), 0))).map((_, offset) => (
          // eslint-disable-next-line react/no-array-index-key -- -
          <li className="inline-flex shrink-0" key={`previous:boundary:${offset}`}>
            <button
              aria-label={`Goto Page ${offset + 1}`}
              className="size-6 rounded transition-colors"
              onClick={handler(offset + 1)}
              type="button"
            >
              {offset + 1}
            </button>
          </li>
        ))}

        {page - boundary - sibling - 1 > 0 && page - boundary - sibling - 1 < 2 && (
          <li className="inline-flex shrink-0">
            <button
              aria-label={`Goto Page ${boundary + 1}`}
              className="size-6 rounded transition-colors"
              onClick={handler(boundary + 1)}
              type="button"
            >
              {boundary + 1}
            </button>
          </li>
        )}

        {page - boundary - sibling - 1 > 1 && (
          <li className="inline-flex size-6 shrink-0 items-center justify-center">
            <span>...</span>
          </li>
        )}

        {Array.from(Array(Math.max(Math.min(page - boundary - 1, sibling), 0))).map((_, offset, list) => (
          // eslint-disable-next-line react/no-array-index-key -- -
          <li className="inline-flex shrink-0" key={`previous:sibling:${offset}`}>
            <button
              aria-label={`Goto Page ${page - list.length + offset}`}
              className="size-6 rounded transition-colors"
              onClick={handler(page - list.length + offset)}
              type="button"
            >
              {page - list.length + offset}
            </button>
          </li>
        ))}

        <li className="inline-flex shrink-0">
          <button
            aria-current="page"
            aria-label={`Goto Page ${page}`}
            className="size-6 rounded ring-1 ring-blue-500 transition-colors"
            disabled
            type="button"
          >
            {page}
          </button>
        </li>

        {Array.from(Array(Math.max(Math.min(lastPage - page - boundary, sibling), 0))).map((_, offset) => (
          // eslint-disable-next-line react/no-array-index-key -- -
          <li className="inline-flex shrink-0" key={`next:sibling:${offset}`}>
            <button
              aria-label={`Goto Page ${page + offset + 1}`}
              className="size-6 rounded transition-colors"
              onClick={handler(page + offset + 1)}
              type="button"
            >
              {page + offset + 1}
            </button>
          </li>
        ))}

        {lastPage - page - boundary - sibling > 1 && (
          <li className="inline-flex size-6 shrink-0 items-center justify-center">
            <span>...</span>
          </li>
        )}

        {lastPage - page - boundary - sibling > 0 && lastPage - page - boundary - sibling < 2 && (
          <li className="inline-flex shrink-0">
            <button
              aria-label={`Goto Page ${lastPage - boundary}`}
              className="size-6 rounded transition-colors"
              onClick={handler(lastPage - boundary)}
              type="button"
            >
              {lastPage - boundary}
            </button>
          </li>
        )}

        {Array.from(Array(Math.max(Math.min(lastPage - page, boundary), 0))).map((_, offset, list) => (
          // eslint-disable-next-line react/no-array-index-key -- -
          <li className="inline-flex shrink-0" key={`next:boundary:${offset}`}>
            <button
              aria-label={`Goto Page ${lastPage - list.length + offset + 1}`}
              className="size-6 rounded transition-colors"
              onClick={handler(lastPage - list.length + offset + 1)}
              type="button"
            >
              {lastPage - list.length + offset + 1}
            </button>
          </li>
        ))}

        <li className="ml-2 inline-flex shrink-0">
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
