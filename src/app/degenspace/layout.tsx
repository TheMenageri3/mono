import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "~/styles/globals.css";
import "~/styles/degenspace.css";
import { UIProvider } from "~/_components/degenspace/providers/UIProvider";
import { View } from "~/_components/degenspace/View/View";

import { getServerAuthSession } from "~/server/auth";
import Navbar from "~/_components/final/Navbar";
import { Toaster } from "react-hot-toast";
// import { Navbar } from "./Navbar";

const inter = Inter({ subsets: ["latin"] });

const links = [
  {
    name: "Home",
    href: "/degenspace",
  },
  {
    name: "Job Board",
    href: "/degenspace/JobBoard",
  },
];

export const metadata: Metadata = {
  title: "DegenSpace",
  description: "A social community space for degens on solana ",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerAuthSession();

  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-white`}>
        <UIProvider>
          <Toaster />
          <div className="flex min-h-screen flex-col">
            <Navbar session={session} links={links} sticky={true} />
            <View>{children}</View>
          </div>
        </UIProvider>
      </body>
    </html>
  );
}
