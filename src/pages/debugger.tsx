import { useCallback, useEffect, useMemo, useState } from "react";
import papa from "papaparse";
import swal from "sweetalert";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import { BsUpload } from "react-icons/bs";
import { userService } from "@/services";
import Table from "@/components/table";
import dynamic from "next/dynamic";
import { filter, map, uniq } from "lodash";
import Loader from "@/components/fullscreenLoader";
import DataTableComp from "@/components/data-table";
import { read } from "fs";

const StepperComponent = dynamic(() => import("@/components/stepper"), {
  ssr: false,
});

const DebuggerPage = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [showTable, setShowTable] = useState(false);
  const [grammarData, setGrammarData] = useState([]);
  const [errordata, setErrordata] = useState<any>(null);
  const [grammarFile, setGrammarFile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [temp, setTemp] = useState();
  const [schemaData, setSchemaData] = useState([
    { id: 1, name: "Dimension Grammar", value: "dimension-grammar", step: 1 },
    { id: 2, name: "Dimension Data", value: "dimension-data", step: 2 },
    { id: 3, name: "Event Grammar", value: "event-grammar", step: 1 },
    { id: 4, name: "Event Data", value: "event-data", step: 2 },
  ]);
  const [selectedSchema, setSelectedSchema] = useState("dimension-grammar");

  const handleSchemaChange = useCallback((ev: any) => {
    setSelectedSchema(ev.target.value);
  }, []);

  const uploadHandler = useCallback(
    (file: File) => {
      setIsLoading(true);
      if (file) {
        const formData = new FormData();
        if (activeStep === 1) {
          setGrammarFile(file);

          formData.append("grammar", file, file.name);
          formData.append("type", selectedSchema);
        } else {
          formData.append("grammar", grammarFile, grammarFile.name);
          formData.append("data", file, file.name);
          formData.append("type", selectedSchema);
        }

        papa.parse(file, {
          complete: function (results, file) {
            //@ts-ignore
            setGrammarData(results?.data);
          },
        });

        // const reader = new FileReader();

        // reader.onload = function (e) {
        //   //@ts-ignore
        //   const text = e.target.result;
        //   //@ts-ignore
        //   setTemp(text);
        // };

        // reader.readAsText(file);
    
     

        userService
          .debugSchema(formData)
          .then((response) => {
            setIsLoading(false);
            setErrordata(response.data.errors);
            swal("", "File uploaded successfully", "success");
          })
          .catch((err) => {
            setIsLoading(false);
            swal("", `${err.message}`, "error");
          });
      } else {
        swal("", "No File Selected", "warn");
      }
    },

    [activeStep, grammarFile, selectedSchema]
  );

  const handleDebug = () => {
    let modifiedData = [...grammarData];
    if (errordata?.length === 0) {
      swal("", "It's a valid schema", "success");
      goTo(2)();
      return;
    } else {
      const errorRows = uniq(map(errordata, (ed: any) => ed.row));
      errordata &&
        errordata?.length > 0 &&
        errordata?.map((data: any) => {
          const value = modifiedData?.[data?.row][data?.col];
          // @ts-ignore
          if (!value?.error) {
            // @ts-ignore
            modifiedData[data?.row][data?.col] = {
              //@ts-ignore
              error: data.error,
              value,
            };
          }
         
        });

      setGrammarData(modifiedData);

      setShowTable(true);
    }
  };

  const steps = useMemo(
    () => [
      {
        id: 1,
        label: "Validate Grammar",
      },
      {
        id: 2,
        label: "Validate Data",
      },
    ],
    []
  );

  const goTo = useCallback(
    (step: number) => () => {
      {
        setActiveStep(step);
        setGrammarData([]);
        setShowTable(false);
        setErrordata([]);
        setSelectedSchema("dimension-data");
      }
    },
    []
  );

  const selectOptions = useMemo(
    () => filter(schemaData, { step: activeStep }),
    [activeStep, schemaData]
  );

  const showStepper = useMemo(
    () => errordata && errordata.length === 0,
    [errordata]
  );
  return (
    <div className="flex items-center justfy-center h-full text-black">
      <div
        className="bg-white  w-full m-auto rounded-lg p-2"
        style={{ minHeight: "80vh" }}
      >
        <Loader loading={isLoading} />
        <StepperComponent steps={steps} activeStep={activeStep} />

        {showTable ? (
          <IoMdArrowBack
            size="2rem"
            className="cursor-pointer"
            onClick={() => setShowTable(false)}
          />
        ) : (
          <></>
        )}
        {!showTable ? (
          <>
            <div className="flex items-center sm:flex-row flex-col justify-center sm:justify-start text-center sm:text-left m-auto">
              <div className="mt-4">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                  {activeStep === 1 ? "Grammar Validation" : "Data Validation"}
                </h2>

                <label htmlFor="schema">Select Grammar / Data</label>
                <br></br>
                <select
                  name="schema"
                  value={selectedSchema}
                  className="my-2 bg-white border-solid border-2 border-black rounded-md p-2 w-full"
                  onChange={handleSchemaChange}
                >
                  {selectOptions?.map((record) => (
                    <option value={record.value} key={record.id}>
                      {record?.name}
                    </option>
                  ))}
                </select>
              </div>
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
                  &nbsp;&nbsp;{isLoading ? "Uploading..." : "Upload File"}
                </label>
              </div>
            </div>
            <div className="text-center sm:text-left">
              <button
                className="py-2 px-4 bg-indigo-900 text-white rounded-lg mt-4 cursor-pointer disabled:opacity-50"
                onClick={handleDebug}
                disabled={grammarData?.length === 0 || isLoading}
              >
                Debug {activeStep === 1 ? "Grammar" : "Data"}
              </button>
            </div>
          </>
        ) : (
          <div className="overflow-auto sm:rounded-lg w-[100%] max-h-[85%]">
            <Table tabledata={grammarData} showEdit={false} />
            {/* <DataTableComp tabledata={grammarData} showEdit={false} temp={temp}/> */}
          </div>
        )}
        {showStepper && (
          <div>
            <button
              className="btn btn-primary btn-sm mt-3 mx-auto"
              disabled={activeStep === 1}
              onClick={goTo(1)}
            >
              <IoMdArrowBack />
              Back
            </button>
            <button
              className="btn btn-primary btn-sm mt-3 ml-3"
              disabled={activeStep === 2}
              onClick={goTo(2)}
            >
              Validate Data <IoMdArrowForward />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DebuggerPage;
