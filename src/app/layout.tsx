import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WACC Calculator | wacc.less.style",
  description:
    "Calculate the Weighted Average Cost of Capital (WACC) and Cost of Equity for your business",
  metadataBase: new URL("https://wacc.less.style"),
  creator: "Giacomo Bordiga",
  keywords: [
    "WACC",
    "financial calculator",
    "weighted average cost of capital",
    "finance",
    "investment",
  ],
  openGraph: {
    title: "WACC Calculator | wacc.less.style",
    description:
      "Calculate the Weighted Average Cost of Capital (WACC) for your business",
    url: "https://wacc.less.style",
    type: "website",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#5135E8",
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
                <a
                  href="https://wacc.less.style"
                  className="hover:text-primary transition-colors"
                >
                  wacc.less.style
                </a>{" "}
                © {new Date().getFullYear()} • Created by{" "}
                <a
                  href="https://github.com/gbordiga/wacc"
                  className="font-medium hover:text-primary transition-colors"
                >
                  Giacomo Bordiga
                </a>
              </p>
            </div>
          </footer>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
