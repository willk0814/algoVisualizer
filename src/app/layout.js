
import { Noto_Sans_Mono } from "next/font/google"
import "./globals.css";

const noto = Noto_Sans_Mono({ subsets: ["latin"], weight: '400' });

export const metadata = {
  title: "Algo Visualizer",
  description: "Visualize classic pathfinding and sorting algorithms in an interactive web app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body className={noto.className}>
          {/* <Navbar /> */}
          {children}
          {/* <Footer /> */}
        </body>
    </html>
  );
}
