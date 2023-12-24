import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextResponse,  NextRequest} from "next/server";

export async function POST(request: Request) {
  const { title, description } = await request.json();
  await connectMongoDB();
  await Topic.create({title, description});
  return NextResponse.json({ message: "Topic Created"}, { status: 201 })
}

export async function GET() {
  await connectMongoDB();
  const topics = await Topic.find();
  return NextResponse.json({ topics })
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Topic.findByIdAndDelete(id);
  return NextResponse.json({message: "Topic deleted"}, {status: 200})
}
