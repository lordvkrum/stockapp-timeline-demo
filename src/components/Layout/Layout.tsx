import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import classNames from "classnames";

function Layout() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      <nav className="flex-shrink-0 w-full border-b bg-gray-800 border-gray-700">
        <div className="p-3 flex items-center justify-start">
          <button
            className="p-1 ps-3 pe-3 me-3 sm:hidden text-white bg-gray-700 rounded-lg"
            onClick={() => setOpenMenu((prev) => !prev)}
            data-testid="toggle-side-button"
          >
            Search
          </button>
          <span className="text-xl font-semibold text-white">
            StockApp Timeline Demo
          </span>
        </div>
      </nav>
      <div className="relative flex-1">
        <aside
          className={classNames(
            "absolute top-0 left-0 z-10 w-64 h-full p-3 transition-transform -translate-x-full sm:translate-x-0 bg-gray-800",
            {
              "transform-none": openMenu,
            }
          )}
          data-testid="side-content"
        >
          SIDE CONTENT
        </aside>
        <main
          className="p-3 sm:ml-64 h-full overflow-y-auto bg-gray-300"
          data-testid="main-content"
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
