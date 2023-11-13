"use client";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { status, data } = useSession();

  if (status === "loading") {
    return <div>is loading ...</div>;
  }

  if (status === "authenticated") {
    return (
      <div>
        <p>You are authenticated</p>{" "}
        <Link
          onClick={() => signOut()}
          className=" underline text-blue-500"
          href="/">
          logout
        </Link>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="">
        <p>you are unauthenticated</p>{" "}
        <Link className=" underline text-blue-500" href="/login">
          login here
        </Link>
      </div>
    );
  }
  return <div>hoem</div>;
}
