import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

type ContainerProps = React.HTMLProps<HTMLDivElement>;

const Container = forwardRef<HTMLDivElement, ContainerProps>(function Container(
  { children, className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={twMerge(["rounded-xl bg-white p-6 tablet:p-10", className])}
      {...props}
    >
      {children}
    </div>
  );
});

export default Container;
