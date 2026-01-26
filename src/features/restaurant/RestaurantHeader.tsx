"use client";

import Image from "next/image";
import { Share2 } from "lucide-react";
import { Button } from "@/ui/button";
import { Rating } from "@/components/Rating";

type RestaurantHeaderProps = {
    logo?: string;
    name: string;
    rating?: number;
    place?: string;
    distanceKm?: number;
    onShare?: () => void;
};

export const RestaurantHeader = ({
    logo,
    name,
    rating,
    place,
    distanceKm,
    onShare,
}: RestaurantHeaderProps) => {
    return (
        <div className="w-full h-46 py-8">
            <div className="flex items-center justify-between gap-4 h-full">
                <div className="flex items-center gap-4 min-w-0">
                    <div className="relative h-30 w-30 rounded-full overflow-hidden bg-muted shrink-0">
                        {logo ? <Image src={logo} alt={`${name} logo`} fill className="object-cover" /> : null}
                    </div>

                    <div className="min-w-0">
                        <div className="flex items-center gap-2 min-w-0">
                            <h1 className="text-2xl font-extrabold truncate">{name}</h1>
                        </div>
                        {typeof rating === "number" ? (
                            <Rating rating={rating} />
                        ) : null}

                        <div className="text-sm text-muted-foreground truncate">
                            {place ?? ""}
                            {place && typeof distanceKm === "number" ? "  ·  " : ""}
                            {typeof distanceKm === "number" ? `${distanceKm} km` : ""}
                        </div>
                    </div>
                </div>

                <Button
                    variant="outline"
                    className="rounded-full px-5"
                    onClick={onShare}
                >
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                </Button>
            </div>
        </div>
    );
}
