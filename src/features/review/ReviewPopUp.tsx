"use client";

import * as React from "react";
import { Star, X } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/ui/dialog";
import { Button } from "@/ui/button";


import type { CreateReviewPayload } from "@/types/review";
import { useCreateReview } from "@/services/queries/useCreateReview";
import { Textarea } from "@/ui/textarea";

type ReviewDialogProps = {
  open: boolean;
  onOpenChange: (v: boolean) => void;

  // dari order card
  transactionId: string;
  restaurantId: number;
  menuIds: number[]; // ambil dari items menuId
};

export function ReviewDialog({
  open,
  onOpenChange,
  transactionId,
  restaurantId,
  menuIds,
}: ReviewDialogProps) {
  const [star, setStar] = React.useState<CreateReviewPayload["star"]>(5);
  const [comment, setComment] = React.useState("");

  const { mutateAsync, isPending } = useCreateReview();

  React.useEffect(() => {
    if (open) {
      setStar(5);
      setComment("");
    }
  }, [open]);

  async function onSubmit() {
    const payload: CreateReviewPayload = {
      transactionId,
      restaurantId,
      star,
      comment,
      menuIds,
    };

    await mutateAsync(payload);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-2xl p-0">
        <div className="p-6">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-lg font-semibold">
                Give Review
              </DialogTitle>

              <DialogClose asChild>
                <button
                  type="button"
                  className="rounded-full p-2 hover:bg-muted"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </DialogClose>
            </div>
          </DialogHeader>

          <div className="mt-5 text-center">
            <div className="text-sm font-semibold">Give Rating</div>
            <StarRating value={star} onChange={setStar} />
          </div>

          <div className="mt-4">
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Please share your thoughts about our service!"
              className="min-h-35 resize-none rounded-xl"
            />
          </div>

          <Button
            type="button"
            disabled={isPending}
            onClick={onSubmit}
            className="mt-5 h-12 w-full rounded-full bg-red-600 text-white hover:bg-red-700"
          >
            {isPending ? "Sending..." : "Send"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function StarRating({
  value,
  onChange,
}: {
  value: 1 | 2 | 3 | 4 | 5;
  onChange: (v: 1 | 2 | 3 | 4 | 5) => void;
}) {
  return (
    <div className="mt-3 flex items-center justify-center gap-2">
      {([1, 2, 3, 4, 5] as const).map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          className="rounded-md p-1"
          aria-label={`Rate ${n} star`}
        >
          <Star
            className={cn(
              "h-7 w-7",
              n <= value ? "fill-amber-400 text-amber-400" : "text-gray-300"
            )}
          />
        </button>
      ))}
    </div>
  );
}
