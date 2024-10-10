// src/utils/cnFunctionFile.js
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Fungsi cn untuk menggabungkan kelas-kelas dengan benar.
 * @param  {...any} inputs - Kelas yang akan digabungkan.
 * @returns {string} - Kelas yang sudah digabungkan dan dioptimalkan.
 */
export function cn(...inputs) {
  return twMerge(clsx(...inputs));
}

