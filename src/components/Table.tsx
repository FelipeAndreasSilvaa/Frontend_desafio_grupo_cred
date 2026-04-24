import { cn } from "@/lib/utils";

export function Table({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="w-full overflow-auto rounded-lg border border-border bg-card">
      <table className={cn("w-full text-sm", className)} {...props} />
    </div>
  );
}

export function THead(props: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className="bg-muted/50 text-left text-xs uppercase tracking-wide text-muted-foreground" {...props} />;
}

export function TBody(props: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className="divide-y divide-border" {...props} />;
}

export function TR(props: React.HTMLAttributes<HTMLTableRowElement>) {
  return <tr className="hover:bg-muted/30 transition-colors" {...props} />;
}

export function TH({ className, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return <th className={cn("px-4 py-3 font-medium", className)} {...props} />;
}

export function TD({ className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className={cn("px-4 py-3 text-foreground", className)} {...props} />;
}
