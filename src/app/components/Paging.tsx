"use client";

import { FC } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface PagingProps {
  activities: any[];
  };

export const Paging: FC<PagingProps> = ({activities}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";
  const per_page = searchParams.get('per_page') ?? '10'

  // skipped and limited
  const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page); // 5, 10, 15 ...

  const hasNextPage = end < activities.length;
  const hasPrevPage = start > 0;

  return (
    <div className="join flex justify-center pt-5">
      <button
        className="join-item btn"
        disabled={!hasPrevPage}
        onClick={() => {
          router.push(`allactivity?page=${Number(page) - 1}&per_page=${per_page}`);
        }}
      >
        «
      </button>

      <button className="join-item btn">
        {" "}
        {page}
      </button>

      <button
        className="join-item btn"
        disabled={!hasNextPage}
        onClick={() => {
          router.push(`allactivity/?page=${Number(page) + 1}&per_page=${per_page}`);
        }}
      >
        »
      </button>
    </div>
  );
};
