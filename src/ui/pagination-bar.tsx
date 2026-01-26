import * as React from "react";
import { Button } from "@/ui/button";

type PaginationBarProps = {
  page: number;
  totalPages?: number; // boleh 0 / undefined
  canPrev: boolean;
  canNext: boolean;
  isLoading?: boolean;
  onPrev: () => void;
  onNext: () => void;
};

export const PaginationBar: React.FC<PaginationBarProps> = ({
  page,
  totalPages,
  canPrev,
  canNext,
  isLoading = false,
  onPrev,
  onNext,
}) => {
  return (
    <div className="flex items-center justify-end gap-2">
      <Button
        variant="outline"
        className="rounded-xl"
        disabled={!canPrev || isLoading}
        onClick={onPrev}
      >
        Prev
      </Button>

      <div className="text-sm text-muted-foreground">
        Page {page}
        {totalPages ? ` / ${Math.max(1, totalPages)}` : ""}
      </div>

      <Button
        variant="outline"
        className="rounded-xl"
        disabled={!canNext || isLoading}
        onClick={onNext}
      >
        Next
      </Button>
    </div>
  );
};
