import { cn } from "../../../utils/merge";
import { cva } from "class-variance-authority";
import { TextFieldProps } from "..";

const textInputVariants = cva(
  "rounded-lg border bg-white py-3 px-4 outline-none",
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

// TODO add error message
export default function ProfileInput({
  className,
  type = "text",
  icon = "/images/icon-link.svg",
  variant,
  onClick,
  errorMessage,
  name,
  label,
  id,
  ...props
}: TextFieldProps) {
  return (
    <div className="flex flex-col gap-1 tablet:flex-row tablet:items-center">
      {label ? (
        <label
          htmlFor={id}
          className="text-body-s text-gray-dark tablet:w-1/2 tablet:text-base tablet:text-gray"
        >
          {label}
        </label>
      ) : (
        <label htmlFor={id} className="sr-only">
          {name}
        </label>
      )}
      <div className="relative tablet:w-full" onClick={onClick}>
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
