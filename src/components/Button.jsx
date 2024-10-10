"use client";

import { cn } from "../utils/cnFunctionFile";

export default function Button({ className, children, onClick }) {
  return (
    <button
      role="button"
      aria-label="Klik untuk melakukan aksi"
      onClick={onClick}
      className={cn(
        "flex justify-center items-center text-black bg-cyan-400 border-4 border-black rounded-lg px-6 py-2 text-lg font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-none",
        className
      )}
    >
      {children}
    </button>
  );
}
