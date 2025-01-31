import type { Metadata } from "next";
import { Geist, Geist_Mono, Manrope, Inter  } from "next/font/google";
import "./globals.css";
import Footer from "./component/Footer";
import Header from "./component/Header";
import { Poppins, Montserrat, } from "next/font/google";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


const marope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-marope",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
});


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${marope.variable} ${inter.variable} antialiased`}>
        {/* <Header /> */}
        {children}
        <Footer />
      </body>
    </html>
  );
}
