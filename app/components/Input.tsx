"use client";

import React, { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "../utils/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      startIcon,
      endIcon,
      className,
      fullWidth = false,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn("flex flex-col gap-1", fullWidth && "w-full")}>
        {label && (
          <label className="text-sm font-medium text-gray-700">{label}</label>
        )}
        <div className="relative">
          {startIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              {startIcon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              // the base styles of the input
              "h-12 rounded-xl border bg-white px-4 text-base transition-all duration-200",
              "placeholder:text-gray-400",
              // the focus styles of the input
              "focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100",
              // the error styles of the input
              error
                ? "border-red-500 focus:border-red-500 focus:ring-red-100"
                : "border-gray-200",
              // the padding of the input when there is an icon
              startIcon && "pl-10",
              endIcon && "pr-10",
              // the width of the input
              fullWidth && "w-full",
              // the custom classes of the input
              className
            )}
            {...props}
          />
          {endIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
              {endIcon}
            </div>
          )}
        </div>
        {(error || helperText) && (
          <span
            className={cn("text-sm", error ? "text-red-500" : "text-gray-500")}
          >
            {error || helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
