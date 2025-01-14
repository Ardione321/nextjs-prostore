"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { formUrlQuery } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationLink,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
type PaginationProps = {
  page: number | string;
  totalPages: number;
  numberOfPages: number[];
  urlParamName?: string;
};
const Paginations = ({
  page,
  totalPages,
  numberOfPages,
  urlParamName,
}: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = (btnType: string) => {
    const pageValue = btnType === "next" ? Number(page) + 1 : Number(page) - 1;
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: urlParamName || "page",
      value: pageValue.toString(),
    });

    router.push(newUrl);
  };

  return (
    <div className="flex gap-2">
      {/* <Button
        size="lg"
        variant="outline"
        className="w-28"
        disabled={Number(page) <= 1}
        onClick={() => handleClick("prev")}
      >
        Previous
      </Button>
      <Button
        size="lg"
        variant="outline"
        className="w-28"
        disabled={Number(page) >= totalPages}
        onClick={() => handleClick("next")}
      >
        Next
      </Button> */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => handleClick("prev")}
              aria-disabled={Number(page) <= 1}
              tabIndex={Number(page) <= 1 ? -1 : undefined}
              className={
                Number(page) <= 1 ? "pointer-events-none opacity-50" : undefined
              }
            />
          </PaginationItem>
          <PaginationItem>
            {numberOfPages.map((number) => (
              <PaginationLink
                href={number !== page ? `?page=${number}` : undefined}
                key={number}
                aria-disabled={Number(number) === page}
                className={`px-4 py-2 border rounded-lg ${
                  number === page ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-white text-black hover:bg-gray-100'
                }`}
              >
                {number}
              </PaginationLink>
            ))}
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => handleClick("next")}
              aria-disabled={Number(page) >= totalPages}
              tabIndex={Number(page) >= totalPages ? totalPages : undefined}
              className={
                Number(page) >= totalPages
                  ? "pointer-events-none opacity-50"
                  : undefined
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default Paginations;
