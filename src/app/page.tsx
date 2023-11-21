"use client";
import { useState } from "react";
import useSWR from "swr";
export default function Home() {
  const [file, setFile] = useState<File>();
  const fetcher = async (url: string, body: any) =>
    await fetch(url, { method: "POST", body }).then((res) => res.json());
  console.log("=========", file);
  return (
    <div className="w-screen h-screen flex flex-row items-center bg-slate-900 justify-center">
      <div className="md:h-[500px] md:w-[300px] w-[100px] h-[200px] rounded-md md:px-[16px] md:py-[32px] bg-white/70 ">
        <input
          type="file"
          id="file"
          style={{ display: "none" }}
          // @ts-ignore
          onChange={(e) => setFile(e.target.files[0])}
        />
        <h1 className="text-2xl mb-4 text-center mt-8 ">
          Upload image to s3 bucket
        </h1>
        <label htmlFor="file">
          <div className="w-full h-[32px] rounded-md text-center flex items-center justify-center bg-slate-800 text-white">
            {" "}
            choose file
          </div>
        </label>
        <div className="w-full h-[32px] rounded-md text-center flex items-center justify-center bg-blue-800 text-white mt-[24px]">
          {" "}
          Upload
        </div>
        <div className="w-full flex items-center gap-2 mt-[24px]">
          {" "}
          <div className="h-[1px] bg-black w-[40%]" />{" "}
          <div className="text-center"> Priview</div>
          <div className="h-[1px] bg-black w-[40%]" />
        </div>
        <div className="w-full mt-[24px]">
          <img />
        </div>
      </div>
    </div>
  );
}
