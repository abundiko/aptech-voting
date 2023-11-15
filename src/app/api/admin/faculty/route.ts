import { connectDB } from "@/server/conectDB";
import FacultyModel from "@/server/schemas/facultySchema";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const { count, start } = json;

    // fetch all the documents in the faculty collection
    const docs = await FacultyModel.find({});
    if (docs) {
      return NextResponse.json({
        success: "all documents",
        data: docs
      });
    }

    return NextResponse.json({
      error: "failed to get faculties"
    });
  } catch (error) {
    return NextResponse.json({ error: "server error" });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const json = await req.json();
    const { name } = json;

    const doc = await FacultyModel.deleteOne({ name });
    if (doc.acknowledged) {
      return NextResponse.json({
        success: `deleted ${name} successfully`,
        data: doc
      });
    }

    return NextResponse.json({
      error: "failed to delete"
    });
  } catch (error) {
    return NextResponse.json({ error: "server error" });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const formData = await req.formData();
    const name = formData.get("name");
    const title = formData.get("title");
    if (!name || !title) return NextResponse.json({ error: "invalid faculty" });

    const doc = new FacultyModel({ name, title });
    const saved = await doc.save();
    if (saved) {
      return NextResponse.json({
        success: "saved successfully",
        uid: saved._id.toString()
      });
    }

    return NextResponse.json({
      error: "failed to save faculty"
    });
  } catch (error) {
    return NextResponse.json({ error: "server error" });
  }
}
