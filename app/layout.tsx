import { Poppins } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from '@/components/providers/AuthProvider'
import { Toaster } from 'sonner'

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "UK Homes - Uttarakhand Real Estate",
  description: "Find your dream property in Uttarakhand - The Land of Gods",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-poppins`}>
        <AuthProvider>
          <Toaster position="top-right" />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
