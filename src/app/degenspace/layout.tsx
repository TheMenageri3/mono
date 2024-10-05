import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "~/styles/globals.css";
import "~/styles/degenspace.css";
import { UIProvider } from "~/_components/degenspace/providers/UIProvider";
import { TopBar } from "~/_components/degenspace/Topbar/TopBar";
import { View } from "~/_components/degenspace/View/View";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DegenSpace",
  description: "A social community space for degens on solana ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} mx-[10px] min-w-[350px] overflow-hidden md:mx-[150px]`}
      >
        <UIProvider>
          <div className="flex h-screen flex-col gap-[2px]">
            <View>{children}</View>
          </div>
        </UIProvider>
      </body>
    </html>
  );
}
