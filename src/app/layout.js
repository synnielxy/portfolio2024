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
  openGraph: {
    title: "Synnie Li Portfolio",
    description: "Explore Synnie Li's portfolio – a showcase of innovative projects, creative web designs, and technical expertise.",
    url: "https://www.synnieli.com/",
    images: [
      {
        url: "https://www.synnieli.com/images/record-img.png",
        width: 1200,
        height: 630,
        alt: "Synnie Li's portfolio image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Synnie Li Portfolio",
    description: "Explore Synnie Li's portfolio – a showcase of innovative projects, creative web designs, and technical expertise.",
    images: ["https://www.synnieli.com/images/record-img.png"],
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
