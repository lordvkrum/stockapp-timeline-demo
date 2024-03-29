import React from "react";

interface AlertProps {
  text: string;
}

const Alert = ({ text }: AlertProps): JSX.Element => {
  return (
    <div
      className="p-3 border rounded-lg border-gray-600 bg-gray-800 text-white"
      role="alert"
    >
      {text}
    </div>
  );
};

export default Alert;
