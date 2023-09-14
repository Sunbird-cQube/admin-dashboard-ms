import React, { FC, useCallback, useMemo, useState } from "react";
import EditModal from "../edit-modal";
import DataTable from "react-data-table-component";
import { capitalize, map } from "lodash";

function csvToArray(str: string, delimiter = ",") {
 
  const headers = str?.slice(0, str?.indexOf("\n")).split(delimiter);
  let count = 0;
 
  const rows = str?.slice(str?.indexOf("\n") + 1).split("\n");
  const arr = rows.map(function (row: any) {
    const values = row.split(delimiter);
    const el = headers.reduce(function (object, header, index) {
      //@ts-ignore
      object[header] = values[index];
      return { ...object, id: ++count };
    }, {});
   
    return el;
  });
  return arr;
}

const DataTableComp: FC<{ tabledata: any; showEdit?: boolean; temp?: any }> = ({
  tabledata,
  showEdit = true,
  temp,
}) => {
  const columns = useMemo(() => {
    const temp = tabledata[0];

    return map(temp, (t: any) => ({
      name: capitalize(t),
      selector: (row: any) => row?.[t],
    }));
  }, [tabledata]);

  const tableData = csvToArray(temp);

  return (
    <>
      {tableData && <DataTable columns={columns} data={tableData} pagination />}
    </>
  );
};

export default DataTableComp;
