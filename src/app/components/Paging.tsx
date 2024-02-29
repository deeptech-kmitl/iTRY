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
  const pageRange: any[] = [];
  const start = 1;
  const end = Math.ceil(countActivities / perPage) || 1;

  const hasNextPage = page < end;
  const hasPrevPage = page > 1;

  const nextPage = (nextPage: number) => {
    // redirect
    router.push(`${pathname}?page=${nextPage}`)
  }

  for (let i = start; i <= end; i++) {
    pageRange.push(i);
  }

  console.log("start", start)
  console.log("end", end)
  console.log("pageRange", pageRange)


  return (
    <div className="join flex justify-center pt-5">
      <button
        className="join-item btn"
        disabled={!hasPrevPage}
        onClick={() => nextPage(page - 1)}
      >
        «
      </button>

      {pageRange.map((pageNumber, index) => (
        <span
          key={index}
          className={`join-item btn ${pageNumber === page && "btn-active"}`}
          onClick={() => { if (typeof (pageNumber) === 'number' && !(pageNumber === page)) { nextPage(pageNumber) } }}
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
