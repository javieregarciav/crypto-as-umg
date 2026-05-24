import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const button = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary: "bg-brand text-black hover:bg-brand-hover",
        secondary: "bg-bg-hover text-text hover:bg-border",
        outline: "border border-border text-text hover:bg-bg-hover",
        ghost: "text-text-muted hover:text-text hover:bg-bg-hover",
        up: "bg-up text-black hover:opacity-90",
        down: "bg-down text-white hover:opacity-90",
      },
      size: {
        sm: "h-8 px-3",
        md: "h-10 px-4",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

type Props = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof button>;

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ className, variant, size, ...rest }, ref) => (
    <button
      ref={ref}
      className={cn(button({ variant, size }), className)}
      {...rest}
    />
  )
);
Button.displayName = "Button";
