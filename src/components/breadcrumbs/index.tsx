import { FC, useCallback, useEffect, useState } from "react";
import { Popover } from "@headlessui/react";
import { userService } from "@/services";
import Link from "next/link";
import { IoMdArrowBack } from "react-icons/io";

const Breadcrumbs: FC<any> = ({ setActiveTab, token ,goBack}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const onClick = useCallback(
    (type: string) => () => {
      setActiveTab(type);
    },
    [setActiveTab]
  );

  const onDownload = useCallback(() => {
    userService.downloadIngestFiles(token).then((res) => {
      const url = window?.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      const fileName = `ingest-${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}#${new Date().getHours()}_${new Date().getMinutes()}.zip`;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();

      // Clean up
      window?.URL.revokeObjectURL(url);
    });
  }, [token]);

  // useEffect(()=>{
  //   onDownload();
  // },[onDownload])
  return (
    <header className="bg-white">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          {/* <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
           
          <IoMdArrowBack
            size="2rem"
            className="cursor-pointer"
            onClick={goBack}
          />
      
            <button
            onClick={onClick("list")}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Go Back
          </button>
          </a> */}
           <IoMdArrowBack
            size="2rem"
            className="cursor-pointer"
            onClick={goBack}
          />
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            {/* <Bars3Icon className="h-6 w-6" aria-hidden="true" /> */}
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <button
            onClick={onClick("list")}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            List
          </button>
          <button
            onClick={onClick("dimensions")}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Dimensions
          </button>
          <button
            onClick={onClick("events")}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Events
          </button>
          <button
            onClick={onDownload}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Download Ingest
          </button>

        </Popover.Group>
      </nav>
    </header>
  );
};

export default Breadcrumbs;
