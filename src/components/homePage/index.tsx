import { useState } from "react";
import papa from "papaparse";
import swal from "sweetalert";
import { IoMdArrowBack } from "react-icons/io";
import { BsUpload } from "react-icons/bs"

const HomePage = () => {
  const [selectedOption, setSelectedOption] = useState("event grammar");
  const [showTable, setShowTable] = useState(false);
  const [tabledata, setTabledata] = useState([]);
  const [errordata, setErrordata] = useState([]);

  const handleOptionChange = (option: any) => {
    setSelectedOption(option);
  };

  const uploadHandler = async (file: File) => {
    if (file) {
      const formData = new FormData();
      formData.append("grammar", file, file.name);
      formData.append(
        "type",
        selectedOption.toLowerCase().split(" ").join("-")
      );

      papa.parse(file, {
        complete: function (results, file) {
          //@ts-ignore
          setTabledata(results?.data);
        },
      });

      try {
        const response = await fetch(
          "https://cqube-admin.onrender.com/admin/validate",
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          setErrordata(responseData.errors);
          swal("", "File uploaded successfully", "success");
        } else {
          console.log("Error uploading file");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      swal("", "No File Selected", "warn");
    }
  };

  const handleDebug = () => {
    let modifiedData = tabledata;

    errordata &&
      errordata?.length > 0 &&
      errordata?.map((data: any) => {
        const value = modifiedData?.[data?.row][data?.col];
        // @ts-ignore
        if (!value?.error) {
          // @ts-ignore
          modifiedData[data?.row][data?.col] = {
            error: data.error,
            value,
          };
        }
      });
    setShowTable(true);
  };

  return (
    <div className="flex items-center justfy-center h-full text-black">
      <div className="bg-white h-[60vh] sm:h-[80vh] w-[80vw] m-auto rounded-lg p-6">
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
            <p className="pb-2">Select type of data to be debugged</p>
            <div className="pb-4 flex sm:flex-row flex-col">
              <div className="mr-6">
                <input
                  type="radio"
                  name="option"
                  id="dimension"
                  className="hidden"
                  checked={selectedOption === "dimension"}
                  onChange={() => handleOptionChange("dimension")}
                />
                <label
                  htmlFor="dimension"
                  className="px-2 cursor-pointer select-none inline-flex items-center"
                >
                  <span
                    className={`w-4 h-4 inline-block mr-1 rounded-full transition-all duration-300 ${
                      selectedOption === "dimension"
                        ? "bg-blue-500"
                        : "bg-gray-300"
                    }`}
                  ></span>
                  Dimension
                </label>
              </div>
              <div className="sm:ml-6">
                <input
                  type="radio"
                  name="option"
                  id="event grammar"
                  className="hidden"
                  checked={selectedOption === "event grammar"}
                  onChange={() => handleOptionChange("event grammar")}
                />
                <label
                  htmlFor="event grammar"
                  className="px-2 cursor-pointer select-none inline-flex items-center"
                >
                  <span
                    className={`w-4 h-4 inline-block mr-1 rounded-full transition-all duration-300 ${
                      selectedOption === "event grammar"
                        ? "bg-blue-500"
                        : "bg-gray-300"
                    }`}
                  ></span>
                  Event
                </label>
              </div>
            </div>

            <div className="flex items-center sm:flex-row flex-col justify-center sm:justify-start text-center sm:text-left m-auto">
              <div className="mt-4">
                <label htmlFor="schema">Select Dimension / Event schema</label>
                <br></br>
                <select
                  name="schema"
                  className="my-2 bg-white border-solid border-2 border-black rounded-md p-2 w-full"
                >
                  <option value="state">State Schema</option>
                  <option value="district">District Schema</option>
                  <option value="city">City Schema</option>
                  <option value="block">Block Schema</option>
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
                  <BsUpload size='1rem' />
                  &nbsp;&nbsp;Upload File
                </label>
              </div>
            </div>
            <div className="text-center sm:text-left">
              <button
                className="py-2 px-4 bg-indigo-900 text-white rounded-lg mt-4 cursor-pointer disabled:opacity-50"
                onClick={handleDebug}
                disabled={tabledata?.length === 0}
              >
                Start Debugging
              </button>
            </div>
          </>
        ) : (
          <div className="overflow-auto sm:rounded-lg w-[100%] max-h-[85%]">
            <table className="w-full text-sm text-left text-black mt-4">
              <thead className="text-xs text-black uppercase bg-gray-50">
                {tabledata?.map(
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
                          </th>
                        ))}
                      </tr>
                    )
                )}
              </thead>
              <tbody>
                {tabledata?.map(
                  (data: any, row: any) =>
                    row > 0 && (
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
                              {columnData?.error
                                ? columnData?.value
                                : columnData}
                            </td>
                          </>
                        ))}
                      </tr>
                    )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
