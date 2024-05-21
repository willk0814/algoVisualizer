import { Inter } from "next/font/google";
import { Noto_Sans_Mono } from "next/font/google"
import { Noto_Sans_Symbols_2 } from "next/font/google";
import { Ojuju } from "next/font/google";

import "./globals.css";

const noto_2 = Noto_Sans_Symbols_2({ subsets: ["latin"], weight: '400'})
const ojuju = Ojuju({ subsets: ["latin"], weight: '200'})
const inter = Inter({ subsets: ["latin"] });
const noto = Noto_Sans_Mono({ subsets: ["latin"], weight: '400' });

export const metadata = {
  title: "Algo Visualizer",
  description: "Visualize classic pathfinding and sorting algorithms in an interactive web app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={noto.className}>{children}</body>
    </html>
  );
}
