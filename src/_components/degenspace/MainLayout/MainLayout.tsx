"use client";

import H3 from "~/_components/final/H3";
import { usePathname } from "next/navigation";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const showHeading = !pathname.includes("JobBoard");

  return (
    <main className="min-h-screen px-10 py-8 md:px-6">
      {showHeading && (
        <H3 className="mb-6 font-bold text-primary">Trending Posts ⚡</H3>
      )}
      <div className="mx-auto max-w-3xl lg:max-w-none">{children}</div>
    </main>
  );
};
