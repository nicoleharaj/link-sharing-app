import { InputHTMLAttributes } from "react";
import { cn } from "../../utils/merge";
import Image from "next/image";
import { VariantProps, cva } from "class-variance-authority";

const textInputVariants = cva(
  "rounded-lg border bg-white py-3 pl-11 pr-2 outline-none",
  {
    variants: {
      variant: {
        default:
          "border-gray-border active:border-purple active:shadow-active focus:border-purple focus:shadow-active caret-purple",
        error: "border-red text-red caret-red",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface TextFieldProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof textInputVariants> {
  icon?: string;
  errorMessage?: string;
  label?: string;
  noIcon?: boolean;
}

// TODO add error message
export default function TextField({
  className,
  type = "text",
  icon = "/images/icon-link.svg",
  variant,
  onClick,
  errorMessage,
  name,
  noIcon,
  label,
  id,
  ...props
}: TextFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      {label ? (
        <label htmlFor={id} className="text-body-s text-gray-dark">
          {label}
        </label>
      ) : (
        <label htmlFor={id} className="sr-only">
          {name}
        </label>
      )}
      <div className="relative" onClick={onClick}>
        {!noIcon && (
          <span className="absolute left-0 top-0 ml-[2px] flex h-full w-11 select-none items-center justify-center">
            <Image src={icon} width={16} height={16} alt="Text input icon" />
          </span>
        )}

        <input
          type={type}
          name={name}
          id={id}
          {...props}
          className={cn(textInputVariants({ variant, className }))}
        />

        {errorMessage && (
          <div className="text-sm absolute right-0 top-0 mr-1 mt-[1px] flex h-full items-center justify-center px-2 text-red">
            <span className="bg-white px-2 py-1">{errorMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
}
