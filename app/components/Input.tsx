import React, { InputHTMLAttributes, forwardRef } from "react";

// this whole component feels is overkill but gotta do what you gotta do

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      startIcon,
      endIcon,
      className = "",
      fullWidth = false,
      ...props
    },
    ref
  ) => {
    let inputClasses =
      "h-12 rounded-xl border bg-white px-4 text-base transition-all duration-200 placeholder:text-gray-400 focus:outline-none focus:ring-2";

    inputClasses += error
      ? " border-red-500 focus:border-red-500 focus:ring-red-100"
      : " border-gray-200 focus:border-blue-500 focus:ring-blue-100";

    if (startIcon) inputClasses += " pl-10";
    if (endIcon) inputClasses += " pr-10";
    if (fullWidth) inputClasses += " w-full";

    inputClasses += className ? ` ${className}` : "";

    return (
      <div
        className={
          fullWidth ? "flex flex-col gap-1 w-full" : "flex flex-col gap-1"
        }
      >
        {label && (
          <label className="text-sm font-medium text-gray-700">{label}</label>
        )}
        <div className="relative">
          {startIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              {startIcon}
            </div>
          )}
          <input ref={ref} className={inputClasses} {...props} />
          {endIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
              {endIcon}
            </div>
          )}
        </div>
        {(error || helperText) && (
          <span
            className={error ? "text-sm text-red-500" : "text-sm text-gray-500"}
          >
            {error || helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
