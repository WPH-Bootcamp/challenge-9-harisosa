"use client";

import Image from "next/image";

type Category = {
  id: string;
  label: string;
  iconSrc: string;
};

const CATEGORIES: Category[] = [
  { id: "all", label: "All Restaurant", iconSrc: "/icon/all.svg" },
  { id: "nearby", label: "Nearby", iconSrc: "/icon/near-by.svg" },
  { id: "discount", label: "Discount", iconSrc: "/icon/discount.svg" },
  { id: "best", label: "Best Seller", iconSrc: "/icon/best-seller.svg" },
  { id: "delivery", label: "Delivery", iconSrc: "/icon/delivery.svg" },
  { id: "lunch", label: "Lunch", iconSrc: "/icon/lunch.svg" },
];

export default function Categories() {
  return (
    <section className="mx-auto max-w-6xl px-4">
      <div className="mt-6 rounded-3xl bg-white p-6">
        <div className="grid grid-cols-3 gap-6 sm:grid-cols-6">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              className="flex flex-col items-center gap-3"
            >
              <div
                className="
                lg:w-40.25 lg:h-25
                  flex h-16 w-16 items-center justify-center
                  rounded-2xl bg-white
                  shadow-sm
                  transition
                  hover:shadow-md hover:-translate-y-px
                "
              >
                <div className="relative lg:w-16.25 lg:h-16.25  h-10 w-10">
                  <Image
                    src={c.iconSrc}
                    alt={c.label}
                    fill
                    className="object-contain"
                    sizes="40px"
                  />
                </div>
              </div>
              <span className="text-xs font-semibold text-black/80">
                {c.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
