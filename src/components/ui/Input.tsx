import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...rest }, ref) => (
    <input
      ref={ref}
      className={cn(
        "w-full h-10 px-3 rounded-md glass-subtle text-text placeholder:text-text-subtle outline-none focus:border-brand/60 focus:bg-white/5 transition",
        className
      )}
      {...rest}
    />
  )
);
Input.displayName = "Input";
