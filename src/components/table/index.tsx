import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import EditModal from "../edit-modal";
import Pagination from "../pagination";

const Table: FC<{ tabledata: any; commonErrors?: string[], showEdit?: boolean }> = ({
  tabledata,
  commonErrors,
  showEdit = true,
}) => {
  const [perPage, setPerPage] = useState(50);
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(tabledata);
  const [recordsToDisplay, setRecordsToDisplay] = useState([]);
  // const validData = useMemo(
  //   () => tabledata?.filter((x: any) => x?.[0] !== ""),
  //   [tabledata]
  // );
  const [isOpen, setIsOpen] = useState(false);
  const [dataToEdit, setDataToEdit] = useState<{
    data: Array<string>;
    row: number;
  } | null>(null);

  const onEditRow = useCallback((data: any, row: any) => {
    setDataToEdit({ data, row });
    setIsOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(()=>{
  

  // Calculate the start and end indexes for the current page
  const startIndex = (page - 1) * perPage;
  const endIndex = Math.min(startIndex + perPage, totalRecords?.length);

  // Get the records for the current page
  const pageRecords = totalRecords?.slice(startIndex, endIndex);
  setRecordsToDisplay(pageRecords)
 
  },[page, perPage, totalRecords])

 
  return (
    <>
    <Pagination
        page={page}
        perPage={perPage}
        setPage={setPage}
        setPerPage={setPerPage}
        totalRecords={totalRecords.length || 0}
        rowCount={recordsToDisplay?.length || 0}
      />
      <table className="w-full text-sm text-left text-black mt-4">
        {/* <thead className="text-xs text-black uppercase bg-gray-50">
          {recordsToDisplay?.map(
            (data: any, index: any) =>
              index == 0 && (
                <tr
                  className="bg-gray-100 border-2 border-dashed border-[#e1edff]"
                  key={index}
                >
                  {data?.map((row: any, ind: any) => (
                    <th
                      className={`px-6 py-4 text-center ${
                        row?.error && "bg-red-200 cursor-pointer"
                      }`}
                      key={ind}
                      title={row?.error ? row?.error : ""}
                    >
                      {row?.error ? row?.value : row}
                      <br />

                    </th>
                  ))}
                  {showEdit && (
                    <th className={`px-6 py-4 text-center`}>Edit</th>
                  )}
                </tr>
              )
          )}
        </thead> */}
        <tbody>
          {commonErrors && commonErrors.length > 0 && (
            <div>
              {commonErrors.map(commonError => (
                <p style={{ fontSize: "10px", color: "red" }}>{commonError}</p>
              ))}
            </div>
          )}
          {recordsToDisplay?.map((data: any, row: any) => {
            
            return (
              <tr className="bg-white border-b" key={row}>
                {data?.map((columnData: any, column: any) => (
                  <>
                    <td
                      className={`px-6 py-4 text-center ${
                        columnData?.error && "bg-red-200 cursor-pointer"
                      } font-regular`}
                      key={column}
                      title={columnData?.error ? columnData?.error : ""}
                    >
                      {/* {columnData?.error ? columnData?.value : columnData} */}
                      {/* <input type="text" className="form-control bg-white text-dark" value={columnData? columnData?.value : columnData} onChange={(ev)=>{
                            console.log({ev,column,data})
                          }}/> */}
                      {columnData?.error ? columnData?.value : columnData}
                      <br />
                      {columnData?.error && (
                        <span style={{ fontSize: "10px", color: "red" }}>
                          {columnData?.error}
                        </span>
                      )}
                    </td>
                  </>
                ))}
                {showEdit && (
                  <td>
                    <button onClick={() => onEditRow(data, row)}>
                      Click to Edit
                    </button>
                  </td>
                )}
              </tr>
            );
            //   }
          })}
        </tbody>
      </table>

      
      <>
        {dataToEdit && isOpen && (
          <EditModal data={dataToEdit} onClose={onClose} isOpen={isOpen} />
        )}
      </>
    </>
  );
};

export default Table;
