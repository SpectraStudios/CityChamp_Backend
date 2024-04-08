'use client';

import Image from "next/image";

export default function AccountDetailFeature({ limit = 12 }) {
  return (
    <div className="flex flex-wrap gap-2 p-4 justify-center">
      {[...Array(limit)].map((_, index) => (
        <div
          key={index}
          className="flex items-center justify-center w-full h-full bg-zinc-900 text-white overflow-hidden sm:w-1/3 md:w-1/4"
        >
          <Image
            alt="Scan"
            src="https://placehold.co/250x250?text=Scan"
            layout="responsive"
            width={250}
            height={250}
            className="w-100 h-100"
          />
        </div>
      ))}
    </div>
  );
}
