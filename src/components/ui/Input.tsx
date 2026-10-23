import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...rest }, ref) => (
    <input
      ref={ref}
      className={cn(
        "w-full h-11 px-3.5 rounded-xl glass-subtle text-sm text-text placeholder:text-text-subtle outline-none focus:border-brand/50 focus:ring-2 focus:ring-brand/10 transition",
        className
      )}
      {...rest}
    />
  )
);
Input.displayName = "Input";
