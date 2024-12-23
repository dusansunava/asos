import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2, MoveLeft } from "lucide-react";
import { Message } from "@/providers/intl/IntlMessage";
import { Link } from "react-router-dom";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      type = "button",
      asChild = false,
      isLoading = false,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        type={type}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        <>
          <Loader2
            className={cn(
              "w-4 h-4 animate-spin",
              !isLoading && "hidden",
              size !== "icon" && "mr-2"
            )}
          />
          {(size !== "icon" ? true : !isLoading) && children}{" "}
        </>
      </Comp>
    );
  }
);
Button.displayName = "Button";

type BackButtonProps = {
  to: string;
  label?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const BackButton = ({
  className,
  children,
  label,
  to,
  ...props
}: BackButtonProps) => {
  return (
    <Button className={cn(className)} variant="link" {...props}>
      {children ? (
        children
      ) : (
        <Link to={to} className="flex">
          <MoveLeft className="mr-1" />
          {!label ? (
            <Message exactly>Common.back</Message>
          ) : (
            <Message exactly>{label}</Message>
          )}
        </Link>
      )}
    </Button>
  );
};

export { Button, buttonVariants, BackButton };
