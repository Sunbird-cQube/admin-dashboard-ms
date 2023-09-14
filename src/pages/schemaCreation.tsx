import { useCallback, useState } from "react";
import swal from "sweetalert";
import { IoMdArrowBack } from "react-icons/io";
import { BsUpload } from "react-icons/bs";
import { userService } from "@/services";
import { v4 as uuidv4 } from "uuid";
import UpdateEventTable from "@/components/update-event-table";
import MetricDimensionRecords from "@/components/metric-dimension-records.tsx";
import Loader from "@/components/fullscreenLoader";

const SchemaCreationPage = () => {
  const [token, setToken] = useState(uuidv4());
  //const [token, setToken] = useState('4bbaabb5-745e-4b93-81f7-ed135c236292');
  const [showTable, setShowTable] = useState(false);
  const [tabledata, setTabledata] = useState([]);
  const [ingestFileResult, setIngestFileResult] = useState(null);
 const [loading, setLoading] = useState(false);

  const uploadHandler = async (file: File) => {
    if (file) {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file, file.name);
      userService
        .uploadRawCSV(token, formData)
        .then((responseData) => {
          setLoading(false);
          setTabledata(responseData.data.column_metadata);
          setShowTable(true);
        })
        .catch((err) => {
          setLoading(false);
        });
    } else {
      swal("", "No File Selected", "warn");
    }
  };

  const onUpdate = useCallback(
    (newRecords: any,programInfo:any) => {
      setLoading(true);
      userService
        .generateIngestFiles(token, newRecords,programInfo)
        .then((res) => {
          setLoading(false);
          swal("", "File Ingested successfully", "success");
          setIngestFileResult(res.data);
        })
        .catch((err) => {
          setLoading(false);
          swal("", `${err.message}`, "error");
        });
    },
    [token]
  );

  const goBack = useCallback(() => {
    setShowTable(false);
    setTabledata([]);
    setIngestFileResult(null);
    const newToken = uuidv4();
    localStorage.setItem("token", newToken);
    setToken(newToken);
  }, []);

  return (
    <div className="flex items-center justfy-center h-full text-black min-h-100">
     <Loader loading={loading} />
      <div className="bg-white  rounded-lg p-2 w-full h-full min-h-100" style={{minHeight:'90vh'}}>

        {!showTable ? (
          <>
            <div className="flex items-center sm:flex-row flex-col justify-center sm:justify-start text-center sm:text-left m-auto">
              <div className="sm:ml-12 p-2 border-2 border-solid border-indigo-900 text-indigo-900 rounded-lg cursor-pointer mt-auto mb-2">
                <input
                  type="file"
                  name="file"
                  id="file-input"
                  className="hidden"
                  // @ts-ignore
                  onChange={(e) => uploadHandler(e?.target?.files[0])}
                />
                <label
                  htmlFor="file-input"
                  className="px-2 cursor-pointer select-none inline-flex items-center font-demi"
                >
                  <BsUpload size="1rem" />
                  &nbsp;&nbsp;Upload File
                </label>
              </div>
            </div>
          </>
        ) : (
          <div className="overflow-auto sm:rounded-lg w-[100%] max-h-[85%]">
            {ingestFileResult ? (
              <MetricDimensionRecords data={ingestFileResult} token={token} goBack={goBack}/>
            ) : (
              <UpdateEventTable data={tabledata} onUpdate={onUpdate} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SchemaCreationPage;
