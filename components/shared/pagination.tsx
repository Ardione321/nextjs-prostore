"use client";
import { useRouter, useSearchParams } from "next/navigation";
// import { Button } from "../ui/button";
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
  const currentPage = Number(page);

  const handleClick = (btnTypeOrPageNumber: string | number) => {
    let pageValue: number;
    console.log(numberOfPages)
    // Determine if the input is a button type (e.g., "next", "prev") or a specific page number
    if (typeof btnTypeOrPageNumber === "string") {
      pageValue =
        btnTypeOrPageNumber === "next" ? currentPage + 1 : currentPage - 1;
    } else {
      pageValue = btnTypeOrPageNumber; // Use the specific page number directly
    }

    // Generate the new URL with the updated page query parameter
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: urlParamName || "page",
      value: pageValue.toString(),
    });

    // Navigate to the new URL
    router.push(newUrl);
  };

  const maxDisplay = 10;
  const startPage = Math.floor((currentPage - 1) / maxDisplay) * maxDisplay + 1;
  const endPage = Math.min(startPage + maxDisplay - 1, totalPages);

  const paginationNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, idx) => startPage + idx
  );

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
              aria-disabled={currentPage <= 1}
              tabIndex={currentPage <= 1 ? -1 : undefined}
              className={
                currentPage <= 1 ? "pointer-events-none opacity-50" : undefined
              }
            />
          </PaginationItem>
          {paginationNumbers.map((number) => (
            <PaginationItem key={number}>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(number);
                }}
                aria-disabled={number === currentPage}
                className={`px-4 py-2 border rounded-lg ${
                  number === currentPage
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-white text-black hover:bg-gray-100"
                }`}
              >
                {number}
              </PaginationLink>
            </PaginationItem>
          ))}

          {/* Ellipsis */}
          {endPage < totalPages && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

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
