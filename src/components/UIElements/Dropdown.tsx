import React, { useState } from "react";
import classNames from "classnames";

interface DropdownProps {
  text: string;
  value: string;
  options: Array<{
    key: string;
    text: string;
    onClick: () => void;
  }>;
}

const Dropdown = ({ text, value, options }: DropdownProps): JSX.Element => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  return (
    <div className="relative flex-1">
      <button
        className="flex-1 p-3 w-full text-white bg-blue-700 rounded-lg"
        onClick={() => setOpenMenu((prev) => !prev)}
        data-testid="dropdown-button"
      >
        {text}
      </button>
      {openMenu && (
        <div className="absolute mt-1 z-10 w-full bg-gray-600 rounded-lg max-h-64 overflow-y-auto">
          <ul className="text-gray-200">
            {options.map((item, index) => {
              return (
                <li
                  key={item.key}
                  className={classNames(
                    "block p-3 hover:bg-gray-700 hover:text-white",
                    {
                      "rounded-t-lg": index === 0,
                      "rounded-b-large": index === options.length,
                      "bg-gray-700 text-white": value === item.key,
                    }
                  )}
                >
                  <button
                    className="w-full"
                    onClick={() => {
                      item.onClick();
                      setOpenMenu(false);
                    }}
                    data-testid={`${item.key}-button`}
                  >
                    {item.text}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
