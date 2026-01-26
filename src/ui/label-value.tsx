import { cn } from "@/lib/utils";

export function LabelValue({
  label,
  value,
  strong,
}: {
  label: string;
  value: React.ReactNode;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <div
        className={cn(
          strong ? "font-semibold text-foreground" : "text-muted-foreground"
        )}
      >
        {label}
      </div>

      <div
        className={cn(
          strong ? "text-base font-bold" : "font-medium"
        )}
      >
        {value}
      </div>
    </div>
  );
}