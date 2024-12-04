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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { signIn, signOut } from "next-auth/react";
import { AvatarImage, Avatar } from "~/_components/Avatar";
import Image from "next/image";

export function SignIn({
  provider,
  ...props
}: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={async () => {
        await signIn(provider);
      }}
    >
      <Button {...props}>Sign In</Button>
    </form>
  );
}

export function SignOut(props: React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={async () => {
        await signOut();
      }}
      className="w-full"
    >
      <Button variant="ghost" className="w-full p-0" {...props}>
        Sign Out
      </Button>
    </form>
  );
}

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
  return <DegenSpaceLogo />;
};

export type NavLink = {
  name: string;
  href: string;
};

export const Navbar = ({
  links,
  session,
  sticky = false,
  hideSearch = false,
}: {
  links: NavLink[];
  session: Session | null;
  sticky?: boolean;
  hideSearch?: boolean;
}) => {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "relative flex h-[82px] w-full items-center justify-between bg-white p-4",
        sticky && "sticky top-0 z-50",
      )}
    >
      {" "}
      <div className="flex max-w-3xl flex-1 items-center">
        <Link href="/" className="mr-4">
          <div className="flex h-[60px] w-[300px] items-center justify-center rounded-lg bg-black px-8">
            <div className="relative flex h-[50px] w-[300px] items-center justify-center">
              <Image src={"/turbine-logo-text.svg"} layout="fill" alt="logo" />
            </div>
          </div>
        </Link>
        {!hideSearch && (
          <button className="hidden flex-1 lg:block">
            <span className="sr-only">Search</span>
            <SearchBar placeholder="Search the universe" />
          </button>
        )}
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
          <AuthShowcase session={session} />
        </div>
      </div>
      <MobileMenu pathname={pathname} links={links} session={session} />
    </nav>
  );
};

async function UserButton({ session }: { session: Session | null }) {
  if (!session?.user) return <SignIn />;
  return (
    <div className="z-100 flex items-center gap-2">
      <span className="hidden text-sm sm:inline-flex">
        {session.user.email}
      </span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={
                  session.user.image && session.user.image !== ""
                    ? session.user.image
                    : `https://api.dicebear.com/9.x/thumbs/svg?seed=${Math.floor(Math.random() * 100000) + 1}&randomizeIds=true`
                }
                alt={session.user.name ?? ""}
              />
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {session.user.name}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {session.user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuItem>
            <SignOut />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function AuthShowcase({ session }: { session: Session | null }) {
  return (
    <div className="relative ml-4">
      <UserButton session={session} />
    </div>
  );
}

export default Navbar;
