import { connectDB } from "@/server/conectDB";
import FacultyModel from "@/server/schemas/facultySchema";
import StudentModel from "@/server/schemas/studentSchema";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function PUT(req: NextRequest) {
  try {
    const formData = await req.formData();
    const education = formData.get("education");
    const punctuality = formData.get("punctuality");
    const dressing = formData.get("dressing");
    const sid = formData.get("sid");
    console.log(sid);

    if (!education || !punctuality || !dressing || !sid)
      return NextResponse.json({ error: "invalid request" });

    const doc = await StudentModel.findOne({ sid });
    if (!doc) return NextResponse.json({ error: "student not found" });
    if (doc.voted) return NextResponse.json({ error: "student already voted" });
    const D = await FacultyModel.updateOne(
      { name: dressing },
      { $inc: { dressing: 1 } }
    );
    const E = await FacultyModel.updateOne(
      { name: education },
      { $inc: { education: 1 } }
    );
    const P = await FacultyModel.updateOne(
      { name: punctuality },
      { $inc: { punctuality: 1 } }
    );

    const update = await StudentModel.updateOne({ sid }, { voted: true });

    if (
      D.acknowledged &&
      E.acknowledged &&
      P.acknowledged &&
      update.acknowledged
    ) {
      return NextResponse.json({
        success: "voted successfully"
      });
    }

    return NextResponse.json({
      error: "failed to cast vote"
    });
  } catch (error) {
    return NextResponse.json({ error: "server error" });
  }
}
