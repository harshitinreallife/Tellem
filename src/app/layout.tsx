import type { Metadata } from "next";
import {Encode_Sans_Expanded} from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "@/components/ui/sonner"


const font = Encode_Sans_Expanded({
  subsets: ['latin'],
  weight: "800"
});

export const metadata: Metadata = {
  title: "Tell'em",
  description: "Say what you really think and feel.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
    >
      <AuthProvider>

        <body className = {`${font.className} min-h-screen flex flex-col`} >{children}
          <Toaster />

        </body>
      </AuthProvider>
    </html>
  );
}
