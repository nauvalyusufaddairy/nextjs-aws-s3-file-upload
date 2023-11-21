"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import useSWR from "swr";
export default function Home() {
  const [media, setMedia] = useState("");
  const [file, setFile] = useState<File>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("file", file as Blob);

    const data = await fetch("http://localhost:3000/api/document", {
      method: "POST",
      body: formData,
    });
    const res = await data.json();

    setMedia(res.url);
    console.log(res.url);
  };
  useEffect(() => {}, [media]);

  return (
    <div className="w-screen h-screen bg-slate-900 flex flex-row items-center justify-center ">
      <div className="md:w-[300px] md:h-[500px] rounded-md bg-white/80 flex-col items-center md:px-[16px] md:pt-[32px] ">
        <form onSubmit={handleSubmit}>
          <h1 className="text-center text-black/60 font-[800] mb-[32px] ">
            {" "}
            Upload your file to AWS S3
          </h1>
          <input
            type="file"
            className=" mb-[16px]"
            id="input"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files?.[0])}
          />
          <label htmlFor="input">
            <div
              className="w-full h-[32px] rounded-md bg-slate-800 text-white flex items-center justify-center mb-[24px]"
              placeholder="choose your file"
            >
              browse file
            </div>
          </label>
          {file && file.type !== "image/jpeg" ? (
            <p className="text-red-500">
              expected file image/jpeg but get {file.type}
            </p>
          ) : (
            ""
          )}
          <button
            disabled={file?.type !== "image/jpeg" || undefined ? true : false}
            className="w-full h-[32px] rounded-md bg-blue-600 text-white disabled:bg-blue-600/50 disabled:cursor-not-allowed "
          >
            {" "}
            Upload
          </button>
        </form>
        {/* <img className="w-full h-[200px] mt-4" src={media} alt="altmant" /> */}

        <Link
          className=" text-purple-900 font-[800] italic underline"
          href={media}
        />
      </div>
    </div>
  );
}
