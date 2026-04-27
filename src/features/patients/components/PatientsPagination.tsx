import clsx from "clsx";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "../../../components/ui/pagination";
import type { PatientPaginatiosProps } from "../types/patient.types";

const PatientsPagination = ({
  totalPages,
  currentPage,
  onPageChange,
  totalRegister,
}: PatientPaginatiosProps) => {
  const visiblePages = 4;

  let start = currentPage - Math.floor(visiblePages / 2);
  const perPage = 4;

  const startRecord = (currentPage - 1) * perPage + 1;
  const endRecord = Math.min(currentPage * perPage, totalRegister);

  if (start < 1) start = 1;

  let end = start + visiblePages - 1;
  if (end > totalPages) {
    end = totalPages;
    start = Math.max(1, end - visiblePages + 1);
  }

  return (
    <div className="px-6 py-4 bg-slate-50/30 border border-t-0 border-slate-200 rounded-b-2xl flex items-center justify-between">
      <p className="flex gap-1 text-sm text-slate-500">
        <span className="font-bold">
          Mostrar {startRecord}-{endRecord}
        </span>
        de
        <span className="font-bold">{totalRegister}</span> resultados
      </p>

      <Pagination className="block w-auto mx-0">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className="cursor-pointer"
              size={""}
              onClick={() => {
                onPageChange(Math.max(1, currentPage - 1));
              }}
            />
          </PaginationItem>
          <PaginationItem></PaginationItem>
          {Array.from({ length: end - start + 1 }, (_, i) => start + i).map(
            (page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  className={clsx(
                    "cursor-pointer",
                    currentPage === page
                      ? "bg-primary-avatar hover:bg-primary-avatar/90 transition-all text-white hover:text-white"
                      : "",
                  )}
                  size={""}
                  onClick={() => {
                    onPageChange(page);
                  }}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ),
          )}
          <PaginationItem>
            <PaginationNext
              className="cursor-pointer"
              size={""}
              onClick={() => {
                onPageChange(Math.min(totalPages, currentPage + 1));
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PatientsPagination;
