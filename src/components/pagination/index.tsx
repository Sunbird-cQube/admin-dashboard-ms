import React, { FC, useCallback, useMemo, useState } from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import ReactPaginate from "react-paginate";
const calculatePagesCount = (pageSize: number, totalCount: number) => {
  // we suppose that if we have 0 items we want 1 empty page
  return totalCount < pageSize ? 1 : Math.ceil(totalCount / pageSize);
};

//@ts-ignore
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Pagination: FC<{
  perPage?: number;
  setPerPage: (arg: number) => void;
  page: number;
  setPage: (arg: any) => void;
  totalRecords: number;
  rowCount: number;
}> = ({ perPage, setPerPage, totalRecords, page, setPage, rowCount }) => {
  const [recsPerPage, setRecsPerPage] = useState(perPage || 10);
  const pageItems = useMemo(() => [5, 10, 20, 30], []);

  const onPageSizeChange = useCallback(
    (newSize: number) => () => {
      console.log({ newSize });
      setRecsPerPage(newSize);
      setPerPage(newSize);
    },
    [setPerPage]
  );

  const totalPages = useMemo(
    () => calculatePagesCount(recsPerPage, totalRecords),
    [recsPerPage, totalRecords]
  );
 
 

 
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="next >"
      onPageChange={(ev) => {
        setPage(ev.selected+1);
      }}
      pageRangeDisplayed={5}
      pageCount={totalPages}
      previousLabel="< previous"
      renderOnZeroPageCount={null}
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousClassName="page-item"
      previousLinkClassName="page-link"
      nextClassName="page-item"
      nextLinkClassName="page-link"
      breakClassName="page-item"
      breakLinkClassName="page-link"
      marginPagesDisplayed={2}
      containerClassName="pagination"
      activeClassName="active"
      //  forcePage={pageOffset}
    />
  );
};

export default Pagination;
