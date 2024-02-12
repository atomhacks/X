import prisma from "@/lib/prisma";
import { duplicateEntry, filterBodyAndValidate, missingFields, unauthorized, wrongMethod } from "@/lib/server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { getUserFromRequest } from "@/lib/server";
import { NextResponse } from "next/server";

const requiredFields = ["name", "users"] as const;
const fields = [...requiredFields] as const;

export default async function POST(req: Request) {
  if (req.method != "POST") {
    return wrongMethod();
  }
  const user = await getUserFromRequest();
  if (!user) {
    return unauthorized();
  }

  let body = filterBodyAndValidate(await req.json(), fields, requiredFields);
  if (!body) {
    return missingFields();
  }

  const { users: ids, ...restOfBody } = body;

  try {
    const team = await prisma.team.create({
      data: {
        ...restOfBody,
        users: {
          connect: ids
            .map((id: string) => ({
              id,
            }))
            .concat([{ id: user.id }]),
        },
      },
      include: {
        users: true,
      },
    });
    return NextResponse.json(team, { status: 201 });
  } catch (error) {
    console.log(error);
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code == "P2002") {
        return duplicateEntry();
      }
    }
  }
}