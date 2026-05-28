import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const button = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary:
          "bg-brand text-white hover:bg-brand-hover shadow-[0_6px_24px_-6px_rgba(168,85,247,0.6)]",
        secondary: "glass-subtle glass-hover text-text",
        outline:
          "border border-white/10 text-text hover:bg-white/5 backdrop-blur-md",
        ghost: "text-text-muted hover:text-text hover:bg-white/5",
        up: "bg-up text-black hover:opacity-90 shadow-[0_4px_16px_-4px_rgba(34,197,94,0.45)]",
        down: "bg-down text-white hover:opacity-90 shadow-[0_4px_16px_-4px_rgba(239,68,68,0.45)]",
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
