import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const balatroFont = localFont({
  src: "../../public/fonts/balatro.ttf",
});

export const metadata: Metadata = {
  title: "Balatro",
  description: "Balatro game client",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${balatroFont.className} antialiased`}>{children}</body>
    </html>
  );
}
