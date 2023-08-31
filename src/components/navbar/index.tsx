import React from "react";
import Image from "next/image";
import { FaGripLines } from "react-icons/fa";
import DebuggerIcon from "@/assets/images/debuggerIcon.png";
import DashboardIcon from "@/assets/images/dashbaordIcon.png";
import SchemaIcon from "@/assets/images/schemaIcon.png";
import ProfileIcon from "@/assets/images/profileIcon.png";
import router from "next/router";
import { userService } from '../../services';
import Link from "next/link";

function Navbar() {
  return (
    <div className="flex items-center w-full h-[60px] bg-white fixed top-0 text-center text-indigo-900 font-bold text-md sm:text-2xl z-[10] px-2">
      <div className="drawer text-left w-fit">
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
              <Link href="/dashboard">
                <Image src={DashboardIcon} alt="DashboardIcon" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/debugger">
                <Image src={DebuggerIcon} alt="DebuggerIcon" />
                Data Debugger
              </Link>
            </li>
            <li>
              <Link href="/debugger">
                <Image src={SchemaIcon} alt="SchemaIcon" />
                Schema Creation
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex-1">
        <p className="text-center">Vidya Samiksha Kendra</p>
      </div>
      <div className='cursor-pointer pr-4 flex self-center'>
        <Image src={ProfileIcon} alt='ProfileIcon' onClick={() => userService.logout()} />
      </div>
    </div>
  );
}

export default Navbar;
