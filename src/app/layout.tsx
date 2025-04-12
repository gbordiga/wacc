import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WACC Calculator",
  description:
    "Calculate the Weighted Average Cost of Capital (WACC) and Cost of Equity for your business",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen`}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">{children}</main>
          <footer className="py-6 text-center border-t">
            <div className="container mx-auto">
              <p className="text-sm text-muted-foreground">
                WACC Calculator © {new Date().getFullYear()}
              </p>
            </div>
          </footer>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
