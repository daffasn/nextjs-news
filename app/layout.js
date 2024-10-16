import localFont from "next/font/local";
import "./globals.css";
import { Ubuntu } from 'next/font/google';
import { NextAuthProvider } from "@/components/Providers";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Separator from "@/components/Separator";
import Footer from "@/components/Footer";

const ubuntu = Ubuntu({
  weight: ['500'],
  subsets: ['latin'],
});

export const metadata = {
  title: "Next Blog",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${ubuntu.className} antialiased`}
      >
        <NextAuthProvider>
          <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          >
            <div className="flex flex-col min-h-screen px-5 lg:px-56 pt-14">
              <div className="flex-grow">
                <Navbar />
                <Separator />
                {children}
              </div>
              <Footer />
            </div>
            <Toaster
              toastOptions={{
                success: {
                  duration: 5000
                },
              }}
            />
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
