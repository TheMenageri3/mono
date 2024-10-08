import "~/styles/globals.css";
import "~/styles/deresearcher.css";

import type { Metadata } from "next";
import { UIProvider } from "~/_components/final/Providers/UIProvider";
import Navbar from "~/_components/final/Navbar";
import { getServerAuthSession } from "~/server/auth";
import { learnNavLinks } from "~/app/research/static";

export const metadata: Metadata = {
  title: {
    default: "Research | The Menagerie",
    template: "%s | Research",
  },
  description: "A decentralized research platform on Solana",
};

// Every page in the /research route will inherit this RootLayout component
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerAuthSession();
  return (
    <UIProvider>
      <Navbar links={learnNavLinks} session={session} />
      <main className="flex-1 overflow-hidden">{children}</main>
    </UIProvider>
  );
}
