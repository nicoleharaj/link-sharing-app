import { ButtonHTMLAttributes } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "../utils/merge";

const buttonVariants = cva(
  "w-fit px-[27px] py-[11px] rounded-lg disabled:opacity-25 disabled:cursor-not-allowed outline-none focus:ring-4 focus:ring-purple/25",
  {
    variants: {
      variant: {
        primary:
          "text-white bg-purple active:shadow-active active:bg-purple-hover disabled:shadow-none disabled:active:bg-purple",
        secondary:
          "text-purple border border-purple active:bg-purple-light disabled:active:bg-transparent",
      },
    },

    defaultVariants: {
      variant: "primary",
    },
  },
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export default function Button({
  className,
  children,
  variant,
  ...props
}: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, className }))} {...props}>
      {children}
    </button>
  );
}
