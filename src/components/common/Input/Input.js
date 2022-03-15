import { ErrorMessage } from "../ErrorMessage";
import React from "react";
import { forwardRef } from "react";
import clsx from "clsx";

const Input = (
  {
    label,
    errorText,
    onPaste,
    autoFocus = true,
    type = "text",
    placeholder,
    ...rest
  },
  ref
) => {
  return (
    <>
      {label && (
        <>
          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-base text-black-default">
              <div className="inputField">
                {label}
                <input
                  autoFocus={autoFocus}
                  onPaste={onPaste}
                  className={`rounded border w-full h-12 px-4 py-3 hover:shadow-sm focus:border-gray-300 focus:bg-white focus:ring-0 ${clsx(
                    "border-gray-200",
                    errorText && "border-red-500"
                  )}`}
                  ref={ref}
                  placeholder={placeholder}
                  type={type}
                  {...rest}
                />
              </div>
            </label>
          </div>
          <ErrorMessage message={errorText || ""} />
        </>
      )}
    </>
  );
};

export default forwardRef(Input);
