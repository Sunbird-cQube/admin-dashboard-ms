import { normalizeModifiedRecords, normalizeRecords } from "@/utils";
import { map, omit } from "lodash";
import React, { FC, useCallback, useState } from "react";
import { IoMdTrash } from "react-icons/io";

const findSelectValue = (Obj: any) => {
  return Obj?.values?.metric ? "metric" : "dimension";
};

const UpdateEventTable: FC<any> = ({ data, onUpdate }) => {
  const [records, setRecords] = useState(normalizeRecords(data));

  const handleSelectChange = useCallback(
    (ev: any, b: string) => {
      const recordsClone = { ...records };
      recordsClone[b] = {
        ...recordsClone[b],
        values: {
          metric: ev.target.value === "metric",
          dimension: ev.target.value === "dimension",
        },
      };
      setRecords(recordsClone);
    },
    [records]
  );

  const handleSubmit = useCallback(() => {
    onUpdate(normalizeModifiedRecords(records))
  }, [records, onUpdate]);

  const onRemove = useCallback((keyToRemove: string) => {
    setRecords((prev: any) => omit(prev, [keyToRemove]));
  }, []);

  const handleInputChange = useCallback(
    (ev: any, key: string) => {
      const recordsClone = { ...records };
      recordsClone[key] = { ...recordsClone[key], key: ev.target.value };
      setRecords(recordsClone);
    },
    [records]
  );

 

  return (
    <div>
      <table className="w-full text-sm text-left text-black mt-4">
        <thead className="text-xs text-black uppercase bg-gray-50">
          <tr className="bg-gray-100 border-2 border-dashed border-[#e1edff] text-center">
            <td></td>
            <td>Field</td>
            <td></td>
            <td>Field Type</td>
            <td>Remove</td>
          </tr>
        </thead>
        <tbody className="border">
          {map(records, (rec_value, rec_key) => {
            return (
              <tr className="bg-white border-b" key={rec_key}>
                <td>#</td>

                <td>
                  <input
                    type="text"
                    className="bg-white border px-2 py-1 w-full"
                    defaultValue={records?.[rec_key]?.key}
                    onChange={(ev) => handleInputChange(ev, rec_key)}
                  />
                </td>
                <td></td>
                <td>
                  <select
                    className="bg-white border px-2 py-1 w-full"
                    value={findSelectValue(rec_value)}
                    onChange={(ev) => handleSelectChange(ev, rec_key)}
                  >
                    {map(omit(rec_value?.values,'updated_col_name'), (v, k) => (
                      <option value={k}>{k}</option>
                    ))}
                  </select>
                </td>
                <td className="text-center text-danger">
                  <IoMdTrash
                    size="1.2rem"
                    className="cursor-pointer mx-auto bg-danger"
                    color="#DC143C"
                    onClick={() => onRemove(rec_key)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <button className="btn btn-primary w-full mt-2" onClick={handleSubmit}>
          Update
        </button>
      </div>
    </div>
  );
};

export default UpdateEventTable;
