import StudentModel from "@/server/schemas/studentSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const sid = formData.get("sid");
    if (!sid) return NextResponse.json({ error: "invalid studentID" });

    const doc = await StudentModel.findOne({ sid });
    const isFirstTime = !doc;

    if (isFirstTime) {
      const doc = new StudentModel({ sid });
      const saved = await doc.save();
      if (saved) {
        return NextResponse.json({
          success: "logged in successfully",
          uid: sid,
          voted: false
        });
      }
    } else {
      if (doc)
        return NextResponse.json({
          success: "logged in successfully",
          uid: sid,
          voted: doc.voted
        });
    }

    return NextResponse.json({
      error: "login failed"
    });
  } catch (error) {
    return NextResponse.json({ error: "server error" });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { sid } = await req.json();
    if (!sid) return NextResponse.json({ error: "invalid studentID" });

    const doc = await StudentModel.findOne({ sid });
    if (doc) {
      return NextResponse.json({
        success: "success",
        voted: doc.voted
      });
    }

    return NextResponse.json({
      error: "failed to fetch status"
    });
  } catch (error) {
    return NextResponse.json({ error: "server error" });
  }
}
