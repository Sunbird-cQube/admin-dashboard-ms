import { useState } from "react";
import papa from "papaparse";
import swal from "sweetalert";
import { IoMdArrowBack } from "react-icons/io";
import { BsUpload } from "react-icons/bs"
import DashboardCard from "@/components/dashboard-card";

const DashboardPage = () => {
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
          console.log(responseData);
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
        console.log(value);
      });
    setShowTable(true);
  };

  return (
    <div className="flex items-center justfy-center h-full text-black">
      <DashboardCard />
    </div>
  );
};

export default DashboardPage;
