import prisma from "@/lib/prisma";
import { duplicateEntry, filterBodyAndValidate, getUserFromRequest, missingFields, redirect, wrongMethod } from "@/lib/server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";

const fields = ["name", "description", "tracks"] as const;
const req_fields = ["name", "description", "tracks"] as const;

export async function POST(req: Request) {
  if (req.method != "POST") {
    return wrongMethod();
  }

  // https://stackoverflow.com/questions/61190495/how-to-create-object-from-another-without-undefined-properties
  const body = filterBodyAndValidate(await req.json(), fields, req_fields);
  if (!body) {
    return missingFields();
  }

  const user = await getUserFromRequest();
  if (!user) {
    return redirect("/api/auth/signin");
  }

  if (!user.teamId) {
    return redirect("/dashboard/team/create")
  }

  const { tracks, ...restOfBody } = body;

  try {
    const submission = await prisma.submission.create({
      data: {
        ...restOfBody,
        tracks: {
          connectOrCreate: tracks.map((track: string) => ({
            where: {
              type: track,
            },
            create: {
              type: track,
            },
          }))
        },
        team: {
          connect:
          {
            id: user.teamId,
          },
        },
      },
      include: {
        team: {
          include: {
            users: true,
            submission: true,
          }
        }
      },
    });
    return NextResponse.json(submission, { status: 201 });
  } catch (error) {
    console.log(error);
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code == "P2002") {
        return duplicateEntry();
      }
    }
    return NextResponse.json({ message: "unknown error" }, { status: 400 });
  }
}