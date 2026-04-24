import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type ToastType = "success" | "error" | "info";

interface ToastProps {
  message: string;
  type?: ToastType;
  onClose?: () => void;
}

export function Toast({ message, type = "info", onClose }: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  if (!visible) return null;

  return (
    <div
      className={cn(
        "fixed top-6 right-6 z-50 px-4 py-3 rounded-lg shadow-lg border text-sm font-medium animate-in slide-in-from-top-2",
        type === "success" && "bg-success text-success-foreground border-transparent",
        type === "error" && "bg-destructive text-destructive-foreground border-transparent",
        type === "info" && "bg-card text-card-foreground border-border"
      )}
    >
      {message}
    </div>
  );
}
