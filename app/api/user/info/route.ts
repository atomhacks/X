import { authOptions, getUser, getUserFromRequest, unauthorized, wrongMethod } from "@/lib/server";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export default async function GET(req: Request) {
  if (req.method != "GET") {
    wrongMethod();
  }

  const user = await getUserFromRequest();
  if (user == null) {
    return unauthorized();
  }

  return NextResponse.json(user);
}