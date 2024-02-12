import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import prisma from "@/lib/prisma";
import {
  duplicateEntry,
  filterBodyAndValidate,
  getUserFromRequest,
  missingFields,
  redirect,
  wrongMethod,
} from "@/lib/server";
import { NextResponse } from 'next/server';

const fields = ["name", "description", "tracks", "srcLink", "videoLink", "public", "icon"] as const;
const req_fields = ["name", "description", "tracks"] as const;

export default async function PUT(req: Request) {
  if (req.method != "PUT") {
    return wrongMethod();
  }

  const user = await getUserFromRequest();
  if (!user) {
    return redirect("/api/auth/signin");
  }

  // https://stackoverflow.com/questions/61190495/how-to-create-object-from-another-without-undefined-properties
  const body = filterBodyAndValidate(await req.json(), fields, req_fields);
  if (!body) {
    return missingFields();
  }

  if (!user.team || !user.teamId) {
    return redirect("/dashboard/team/create");
  }

  if (!user.team.submission) {
    return redirect("/dashboard/submission/create");
  }

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