import React from "react";

type InputFieldProps = {
  label: string;
  placeholder: string;
  type?: "text" | "email" | "password";
  error?: string;
  gutterBottom?: number;
};

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    { label, placeholder, type = "text", error, gutterBottom = 20, ...props },
    ref
  ) => {
    return (
      <React.Fragment>
        <div style={{ marginBottom: `${gutterBottom}px` }}>
          <label
            htmlFor={label}
            className="block mb-2 text-sm font-medium text-black"
          >
            {label}
          </label>
          <input
            ref={ref}
            autoComplete="off"
            type={type}
            id={label}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder={placeholder}
            {...props}
          />
          {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
        </div>
      </React.Fragment>
    );
  }
);

export default InputField;
