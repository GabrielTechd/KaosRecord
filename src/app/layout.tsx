import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

// Import Poppins font with specific weights
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Add the weights you need
  style: ["normal", "italic"], // Add styles if needed
});

export const metadata: Metadata = {
  title: "Kaos Records",
  description: "kaos records - sua produtora",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
