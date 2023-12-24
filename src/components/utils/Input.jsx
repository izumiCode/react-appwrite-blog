import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, placeholder, type = "text", className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full ">
      {label && (
        <>
          <label className={`label`} htmlFor={id}>
            {label}
          </label>
          <input
            type={type}
            placeholder={placeholder}
            className={`input input-bordered ${className}`}
            required
            ref={ref}
            {...props}
            id={id}
          />
        </>
      )}
    </div>
  );
});

export default Input;
