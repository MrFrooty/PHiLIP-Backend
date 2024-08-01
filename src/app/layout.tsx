import type { Metadata } from "next";
import { Inter } from "next/font/google";
import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";
import ClientToastContainer from '@/components/ui/toast-container';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PHiLIP Image Generator",
  description: "Generate images with PHiLIP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <ClientToastContainer />
      </body>
    </html>
  );
}