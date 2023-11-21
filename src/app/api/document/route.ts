// import { NextRequest } from "next/server";
// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
// import { File } from "buffer";

// export async function POST(req: NextRequest) {
//     const client = new S3Client({region:"us-east-1"})

//     const formData = await req.formData()
//     const files = formData.getAll('file')
//     const res = await Promise.all(files.map(async(file)=>{
//         // @ts-ignore
//         const body =  (await file.arrayBuffer) as Buffer
//         client.send(new PutObjectCommand({
//             Bucket:"plaidpost/blogapp",
//             Key:file.

//         }))
//     }))
// }

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const client = new S3Client({ region: "us-east-1" });
  const formData = await req.formData();
  const file: File | null = formData.get("file") as unknown as File;
  if (!file) {
    return new NextResponse(JSON.stringify({ succes: false }), { status: 500 });
  }
  const byte = await file.arrayBuffer();
  const buffer = Buffer.from(byte);

  const params = {};

  await client
    .send(
      new PutObjectCommand({
        Bucket: "https://plaidpost.s3.amazonaws.com/blogapp/",
        Body: buffer,
        Key: file.name,
      })
    )
    .then((val) => new NextResponse(JSON.stringify(val), { status: 200 }))
    .catch((err) => new NextResponse(JSON.stringify(err), { status: 500 }));
}
