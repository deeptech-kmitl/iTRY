import { NextResponse } from "next/server";
import { uploadFileToS3 } from "../../create/staffActivity/route";

export async function POST(request: any) {
    try {
      const formData = await request.formData();
      const file = formData.get("file") as File;
  
      if (!file) {
        return NextResponse.json({ error: "File is required." }, { status: 400 });
      }
  
      const buffer = Buffer.from(await file.arrayBuffer());
      const fileName = await uploadFileToS3(buffer, file.name);
      console.log("yayy");
      return NextResponse.json({ success: true, fileName });
    } catch (error) {
      return NextResponse.json({ error });
    }
  }