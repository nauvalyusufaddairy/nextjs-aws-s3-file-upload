"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
export default function Login() {
  const { status } = useSession();
  const router = useRouter();

  if (status === "authenticated") {
    router.push("/");
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-slate-800">
      <div className="md:h-[500px] md:w-[300px] bg-white/10 rounded-md flex flex-col justify-center px-4">
        <button
          className="w-full h-[36px] bg-blue-500 text-white rounded-sm"
          onClick={() => signIn("google")}>
          {" "}
          Google{" "}
        </button>
      </div>
    </div>
  );
}
