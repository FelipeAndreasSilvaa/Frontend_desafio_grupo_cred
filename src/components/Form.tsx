import { FormHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Form({ className, ...props }: FormHTMLAttributes<HTMLFormElement>) {
  return <form className={cn("space-y-4", className)} {...props} />;
}

export function FormGrid({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("grid grid-cols-1 sm:grid-cols-2 gap-4", className)}
      {...props}
    />
  );
}
