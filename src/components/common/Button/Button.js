import React from "react";
// import { Spinner } from "./Spinner";

const Button = ({ children, isLoading = false, ...rest }, ref) => {
  const Spinner = () => {
    return (
      <div className="flex justify-center">
        <svg
          className="animate-spin  h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    );
  };
  return (
    <button
      style={{
        width: "100%",
        height: "47px",
      }}
      ref={ref}
      {...rest}
      disabled={isLoading}
      className="text-lg text-white w-[500px] bg-green-400 font-demibold mx-auto -light border border-transparent shadow-sm hover:bg-green-600 focus:outline-none"
      type="submit"
    >
      {isLoading ? <Spinner /> : children}
    </button>
  );
};

export default React.forwardRef(Button);
