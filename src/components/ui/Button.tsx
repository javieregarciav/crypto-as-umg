import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const button = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary: "bg-brand text-white hover:bg-brand-hover",
        secondary: "bg-white/[0.04] text-text hover:bg-white/[0.08] border border-white/[0.06]",
        outline: "border border-white/10 text-text hover:bg-white/5",
        ghost: "text-text-muted hover:text-text hover:bg-white/5",
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
