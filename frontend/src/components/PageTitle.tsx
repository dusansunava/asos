import { cn } from "@/lib/utils";
import { Message } from "@/providers/intl/IntlMessage";
import { HTMLAttributes } from "react";

const PageTitle = ({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLHeadElement>) => {
  return (
    <h1
      {...props}
      className={cn(
        "text-4xl mb-6 flex justify-center lg:justify-start lg:pl-4",
        className
      )}
    >
      {children ? children : <Message>pageTitle</Message>}
    </h1>
  );
};

export default PageTitle;
