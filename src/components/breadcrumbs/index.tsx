import { FC, useCallback, useEffect, useState } from "react";
import { Popover } from "@headlessui/react";
import { userService } from "@/services";
import Link from "next/link";
import { IoMdArrowBack } from "react-icons/io";
import Loader from "../fullscreenLoader";

const Breadcrumbs: FC<any> = ({ setActiveTab, token ,goBack}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
const [loading, setLoading] = useState(false);
  const onClick = useCallback(
    (type: string) => () => {
      setActiveTab(type);
    },
    [setActiveTab]
  );

  const onDownload = useCallback(() => {
    setLoading(true);
    userService.downloadIngestFiles(token).then((res) => {
      setLoading(false);
      const url = window?.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      const fileName = `ingest-${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}#${new Date().getHours()}_${new Date().getMinutes()}.zip`;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();

      // Clean up
      window?.URL.revokeObjectURL(url);
    }).catch(err=>{
      setLoading(false);
      console.log({err})
    });
  }, [token]);


  return (
    <header className="bg-white">
      <Loader loading={loading} />
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
      
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
