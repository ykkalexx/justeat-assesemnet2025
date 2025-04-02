import React, { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "primary",
      size = "md",
      fullWidth = false,
      isLoading = false,
      loadingText = "Loading...",
      startIcon,
      endIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const variants = {
      primary: "bg-[#ff8000] hover:bg-[#ff9933] text-white",
      secondary: "bg-gray-100 hover:bg-gray-200 text-gray-900",
      outline:
        "border-2 border-[#ff8000] text-[#ff8000] hover:bg-[#ff8000] hover:text-white",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    let buttonClasses = "font-semibold rounded-xl transition-all duration-300 ";
    buttonClasses += "focus:outline-none focus:ring-2 focus:ring-offset-2 ";
    buttonClasses += "transform hover:scale-[1.02] active:scale-[0.98] ";

    buttonClasses += variants[variant] + " ";

    if (variant === "primary") buttonClasses += "focus:ring-[#ff8000]/50 ";
    if (variant === "secondary") buttonClasses += "focus:ring-gray-200 ";
    if (variant === "outline") buttonClasses += "focus:ring-[#ff8000]/50 ";

    buttonClasses += sizes[size] + " ";

    if (fullWidth) buttonClasses += "w-full ";

    buttonClasses +=
      "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ";

    if (isLoading) buttonClasses += "cursor-wait ";

    buttonClasses += className;

    return (
      <button
        ref={ref}
        disabled={isLoading || disabled}
        className={buttonClasses}
        {...props}
      >
        <div className="flex items-center justify-center gap-2">
          {!isLoading && startIcon && (
            <span className="inline-flex shrink-0">{startIcon}</span>
          )}

          {isLoading ? (
            <div className="flex items-center gap-2">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4"
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
              {loadingText}
            </div>
          ) : (
            children
          )}

          {!isLoading && endIcon && (
            <span className="inline-flex shrink-0">{endIcon}</span>
          )}
        </div>
      </button>
    );
  }
);

Button.displayName = "Button";
