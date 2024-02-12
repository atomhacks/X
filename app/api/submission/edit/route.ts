import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import prisma from "@/lib/prisma";
import {
  duplicateEntry,
  filterBody,
  getUserFromRequest,
  missingFields,
  redirect,
  wrongMethod,
} from "@/lib/server";
import { NextResponse } from 'next/server';

const fields = ["name", "description", "tracks", "srcLink", "videoLink", "public", "icon", "media"] as const;

export async function POST(req: Request) {
  if (req.method != "POST") {
    return wrongMethod();
  }

  const user = await getUserFromRequest();
  if (!user) {
    return redirect("/api/auth/signin");
  }

  const json = await req.json();
  // https://stackoverflow.com/questions/61190495/how-to-create-object-from-another-without-undefined-properties
  const body = filterBody(json, fields);
  if (!body) {
    return missingFields();
  }

  if (!user.team || !user.teamId) {
    return redirect("/dashboard/team/create");
  }

  if (!user.team.submission) {
    return redirect("/dashboard/submission/create");
  }

  if (body.media) {
    body.media = {
      create: body.media.map((url: string) => ({
        url
      }))
    }
  }

  console.log(body);

  // TODO: currently it reassigns image so it replaces images after editiing
  // instead of appending
  try {
    const submission = await prisma.submission.update({
      where: {
        id: user.team.submission.id,
      },
      data: {
        ...body,
        team: {
          connect: {
            id: user.teamId,
          },
        },
      },
      include: {
        team: {
          include: {
            users: true,
            submission: true,
          },
        },
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
    return NextResponse.json({ message: "Unknown Error" }, { status: 400 });
  }
}