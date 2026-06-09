import { Inter, Cinzel, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata = {
  title: "Young Uttarakhand Foundation – Registration",
  description:
    "Register with Young Uttarakhand Foundation (YUF) – Rooted in culture, united in progress. Join our community in Calgary, Alberta.",
  keywords: [
    "Young Uttarakhand Foundation",
    "YUF",
    "Uttarakhand",
    "Calgary",
    "registration",
    "Rangela Garhwal",
    "Chabila Kumaon",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cinzel.variable} ${playfairDisplay.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
