import React from "react";
import { FaGripLines } from "react-icons/fa";

function Navbar() {
  return (
    <div className="w-full h-fit bg-white absolute top-0 text-center text-indigo-900 font-bold text-md sm:text-2xl py-3 flex justify-start items-center z-[10]">
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side">
          <label htmlFor="my-drawer" className="drawer-overlay m-4">
            <FaGripLines size="2rem" />
          </label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li>
              <a>Dashboard</a>
            </li>
            <li>
              <a>Data Debugger</a>
            </li>
            <li>
              <a>Schema Creation</a>
            </li>
          </ul>
        </div>
      </div>
      <p>State Vidya Samiksha Kendra</p>
    </div>
  );
}

export default Navbar;
