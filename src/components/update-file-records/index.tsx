import { userService } from "@/services";
import { map } from "lodash";
import React, { FC, useCallback, useState } from "react";
import GenericDisplayTable from "../generic-display-table";
import Loader from "../fullscreenLoader";

const UpdateFileRecords: FC<any> = ({ data, name, token }) => {
  const [records, setRecords] = useState(data);
  const [filename, setFilename] = useState<any>(null);
  const [fileContent, setFileContent] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const fetchFileContent = useCallback(
    (ev: any) => {
      setLoading(true);
      setFilename(ev.target.value);
      if (name === "Dimensions") {
        userService
          .getDimensionFileContent(token, ev.target.value)
          .then((res) => {
            setLoading(false);
            setFileContent(JSON.parse(res.data.content));
          }).catch(err=>{
            console.log({err})
            setLoading(false);
          });
      }
    },
    [name, token]
  );

  return (
    <div>
        <Loader loading={loading} />
      <h3>{name}</h3>
      <div>
        Select File
        <select
          className="bg-white border px-2 py-1 w-full"
          value={filename}
          onChange={fetchFileContent}
        >
          {map(records, ({ name }) => (
            <option key={name}>{name}</option>
          ))}
        </select>
      </div>
      {fileContent && (
        <div>
          <GenericDisplayTable data={fileContent} />
        </div>
      )}
    </div>
  );
};

export default UpdateFileRecords;
