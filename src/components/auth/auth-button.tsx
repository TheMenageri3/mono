"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function AuthButton() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <button className="btn btn-ghost">
        <span className="loading loading-spinner loading-sm"></span>
      </button>
    );
  }

  if (session) {
    return (
      <div className="dropdown dropdown-end">
        <button tabIndex={0} className="btn btn-ghost">
          {session.user?.email}
        </button>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <button
              onClick={() => {
                signOut();
                router.push("/");
              }}
            >
              Sign Out
            </button>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <button
      className="btn btn-ghost"
      onClick={() => {
        router.push("/auth/login");
      }}
    >
      Sign In
    </button>
  );
}
