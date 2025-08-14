import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  pageCount: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  pageCount,
  onPageChange,
  currentPage,
}: PaginationProps & { currentPage: number }) {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => onPageChange(event.selected + 1)}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      forcePage={currentPage - 1}
      previousLabel="<"
      containerClassName={css.pagination}
      activeClassName={css.active}
    />
  );
}
