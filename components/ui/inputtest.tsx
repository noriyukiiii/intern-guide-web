import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  endContent?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, endContent, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <div className="absolute right-2 top-2.5">{endContent}</div>
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-xl border-2 border-input bg-background px-3 py-6 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus:border-[#095890]",
            className,
            error && "border-destructive"
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-destructive text-xs">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
