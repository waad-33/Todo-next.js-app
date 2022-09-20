import Link from "next/link";
import React from "react";
import { useUser } from "@auth0/nextjs-auth0";

export default function Navbar() {
  const { user } = useUser();
  return (
    <nav className="flex justify-between items-center py-4 border-b-2 border-blue-500/50">
      <p className="text-2xl font-bold text-grey-800 ">My Todos</p>

      <div className="flex">
        <Link href="/">
          <a className="mr-2 pt-2 text-blue-500 hover:text-blue-600">Home</a>
        </Link>
        {user ? (
          <a
            href="/api/auth/logout"
            className="rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4"
          >
            Logout
          </a>
        ) : (
          <a
            href="/api/auth/login"
            className="rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4"
          >
            Login
          </a>
        )}
      </div>
    </nav>
  );
}
