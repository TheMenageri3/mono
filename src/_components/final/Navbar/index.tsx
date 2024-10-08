"use client";
import { DesearcherLogo } from "../Logo";
import { usePathname } from "next/navigation";
import { Wallet } from "./Wallet";
import { MobileMenu } from "./MobileMenu";
import Link from "next/link";
import { SearchBar } from "../Dashboard/Navbar";
import SolquestLogo from "~/_components/solquest/general/ui/Logo";
import { type Session } from "next-auth";
import { cn } from "~/utils";
import DegenSpaceLogo from "~/_components/degenspace/DegenSpaceLogo";
import Image from "next/image";

const getLogoFromPathname = (pathname: string) => {
  if (pathname.includes("research")) {
    if (pathname.includes("dashboard")) {
      return null;
    }
    return <DesearcherLogo />;
  }
  if (pathname.includes("newquest")) {
    return <SolquestLogo />;
  }
  if (pathname.includes("degenspace")) {
    return <DegenSpaceLogo />;
  }
};

export type NavLink = {
  name: string;
  href: string;
};

export const Navbar = ({
  links,
  session,
  sticky = false,
}: {
  links: NavLink[];
  session: Session | null;
  sticky?: boolean;
}) => {
  const pathname = usePathname();
  const logo = getLogoFromPathname(pathname);

  return (
    <nav
      className={cn(
        "relative flex h-[82px] items-center justify-between bg-white p-4",
        sticky && "sticky top-0 z-50",
      )}
    >
      {" "}
      <div className="flex max-w-3xl flex-1 items-center">
        <Link href="/" className="mr-4">
          {logo}
        </Link>
        <button className="hidden flex-1 lg:block">
          <span className="sr-only">Search</span>
          <SearchBar placeholder="Search the universe" />
        </button>
      </div>
      <div className="hidden flex-row items-center justify-between gap-[20px] lg:flex">
        {links.map((link) => (
          <div
            key={link.name}
            className={
              pathname === link.href
                ? "flex flex-row items-center gap-[10px] border-b-2 border-primary p-[5px]"
                : "flex flex-row items-center gap-[10px] border-b-2 border-transparent p-[5px]"
            }
          >
            <Link href={link.href} className="font-bold text-zinc-800">
              {link.name}
            </Link>
          </div>
        ))}
        <div className="flex items-center">
          <Wallet />
          <div className="ml-4">
            <Image
              src="/alice.png"
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full object-cover"
              style={{ width: "40px", height: "40px" }}
            />
          </div>
          <AuthShowcase session={session} />
        </div>
      </div>
      <MobileMenu pathname={pathname} links={links} session={session} />
    </nav>
  );
};

function AuthShowcase({ session }: { session: Session | null }) {
  return (
    <div className="ml-4">
      {" "}
      {/* Add some left margin for spacing */}
      <Link
        href={session ? "/api/auth/signout" : "/api/auth/signin"}
        className="text-md rounded-sm py-2 pl-2 pr-6 font-bold text-zinc-900 hover:text-primary"
      >
        {session ? "Sign out" : "Sign in"}
      </Link>
    </div>
  );
}

export default Navbar;
