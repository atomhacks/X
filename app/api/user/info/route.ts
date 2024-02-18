import { getUserFromRequest, unauthorized, wrongMethod } from "@/lib/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  if (req.method != "GET") {
    wrongMethod();
  }

  const user = await getUserFromRequest();
  if (user == null) {
    return unauthorized();
  }

  return NextResponse.json(user);
}