import { Inter, Inria_Serif } from "next/font/google";
import Common from "./common.js"
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const inriaSerif = Inria_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  variable: "--font-inria-serif",
});

const inriaSerifNormal = Inria_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
  variable: "--font-inria-serif-normal",
});

export const metadata = {
  title: "Synnie Li",
  description:
    "Explore Synnie Li's portfolio – a showcase of innovative projects, creative web designs, and technical expertise.",
  icons: {
    icon: "/images/logo.png",
  },
};


export default function RootLayout({ children }) {
  

  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${inriaSerif.variable} ${inriaSerifNormal.variable}`}
      >
        <Common>{children}</Common>
        
      </body>
    </html>
  );
}
