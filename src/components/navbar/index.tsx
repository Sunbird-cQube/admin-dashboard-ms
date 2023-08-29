import React from "react";
import Image from "next/image";
import { FaGripLines } from "react-icons/fa";
import DebuggerIcon from "@/assets/images/debuggerIcon.png";
import DashboardIcon from "@/assets/images/dashbaordIcon.png";
import SchemaIcon from "@/assets/images/schemaIcon.png";
import ProfileIcon from "@/assets/images/profileIcon.png";
import router from "next/router";

function Navbar() {
  return (
    <div className="w-full h-fit bg-white absolute top-0 text-center text-indigo-900 font-bold text-md sm:text-2xl py-3 flex z-[10]">
      <div className="drawer m-2 text-left w-fit">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label htmlFor="my-drawer" className="drawer-button cursor-pointer">
            <FaGripLines size="2rem" />
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 min-h-full bg-white text-black text-lg font-demi">
            <li>
              <a>
                <Image src={DashboardIcon} alt="DashboardIcon" />
                Dashboard
              </a>
            </li>
            <li>
              <a>
                <Image src={DebuggerIcon} alt="DebuggerIcon" />
                Data Debugger
              </a>
            </li>
            <li>
              <a>
                <Image src={SchemaIcon} alt="SchemaIcon" />
                Schema Creation
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p className="text-center m-auto w-full">State Vidya Samiksha Kendra</p>
      <div className='cursor-pointer p-2'><Image src={ProfileIcon} alt='ProfileIcon' /></div>
    </div>
  );
}

export default Navbar;
