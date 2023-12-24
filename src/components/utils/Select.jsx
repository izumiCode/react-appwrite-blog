import React, { useId } from "react";

function Select({ options, label, className = "", ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full dropdown dropdown-bottom">
      {label && (
        <label tabIndex={0} role="button" className="btn m-1">
          Select
        </label>
      )}
      <select
        tabIndex={0}
        className={`dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 ${className}`}
      >
        {options?.map((option) => (
          <option className="py-2" key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
