import {Titillium_Web, Ubuntu_Mono } from "next/font/google";

export const body = Ubuntu_Mono({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "700"],
  preload: true,
  display: "block",
});
export const heading = Titillium_Web({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["200", "300", "400", "600", "700", "900"],
  preload: true,
  display: "block",
});
