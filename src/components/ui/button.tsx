import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-display font-semibold tracking-tight transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-brand text-white shadow-[0_8px_30px_-6px_rgba(255,90,31,0.55)] hover:bg-brand-dark hover:shadow-[0_12px_40px_-6px_rgba(255,90,31,0.7)] hover:-translate-y-0.5 active:translate-y-0",
        secondary:
          "glass text-foreground hover:border-brand/50 hover:-translate-y-0.5",
        ghost: "hover:bg-mist text-foreground",
        outline:
          "border border-border-soft text-foreground hover:border-brand hover:text-brand",
        link: "text-brand underline-offset-4 hover:underline p-0",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-12 px-6 text-[15px]",
        lg: "h-14 px-8 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
);
Button.displayName = "Button";
