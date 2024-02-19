"use client";

import { FC } from "react";
import { redirect, usePathname, useRouter, useSearchParams } from "next/navigation";

interface PagingProps {
  page: number;
  countActivities: number;
  perPage: number;
  };

export const Paging: FC<PagingProps> = ({ page = 1, countActivities, perPage }: PagingProps) => {

  const router = useRouter()
  const pathname = usePathname()
  // skipped and limited
  const start = (Number(page) - 1) * Number(perPage);
  const end = start + Number(perPage); // 5, 10, 15 ...

  const hasNextPage = end < countActivities;
  const hasPrevPage = start > 0;

  const nextPage = (nextPage: number) => {
    console.log("pathname", pathname)
    // redirect
    router.push(`${pathname}?page=${nextPage}`)
  }

  const getPageRange = (currentPage: number, totalPages: number) => {
    const delta = 1;
    const range: any[] = [];

    const startPage = (page - delta) < 1 ? 1 : (page - delta);
    const endPage = Math.ceil(countActivities / perPage)

    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }

    return range;
  };

  const pageRange = getPageRange(page, countActivities);

  return (
    <div className="join flex justify-center pt-5">
      <button
        className="join-item btn"
        disabled={!hasPrevPage}
        onClick={() => {
          router.push(`allactivity?page=${Number(page) - 1}`);
        }}
      >
        «
      </button>

      {pageRange.map((pageNumber, index) => (
        <span
          key={index}
          className={`join-item btn ${pageNumber === page && "btn-active"}`}
          onClick={() => { if (typeof (pageNumber) === 'number' && !(pageNumber === page)) { nextPage(pageNumber) }}}
          style={{ cursor: pageNumber === page ? 'auto' : 'pointer', fontWeight: pageNumber === page ? 'bold' : 'normal' }}
        >
          {pageNumber}
        </span>
      ))}
      <button
        className="join-item btn"
        disabled={!hasNextPage}
        onClick={() => nextPage(page + 1)}
      >
        »
      </button>
    </div>
  );
};
