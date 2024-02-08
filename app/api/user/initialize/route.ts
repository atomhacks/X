import { wrongMethod, unauthorized, missingFields, filterBodyAndValidate, authOptions } from "@/lib/server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const requiredFields = ["name", "osis", "experience", "year", "hasTeam", "shirtSize"] as const;
const fields = [...requiredFields, "hasTeam", "shouldMatchTeam", "teamMembers"] as const;

export async function POST(req: Request) {
  if (req.method != "POST") {
    return wrongMethod();
  }
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return unauthorized();
  }

  const json = await req.json();
  console.log(json);

  const body = filterBodyAndValidate(json, fields, requiredFields);
  if (!body) {
    return missingFields();
  }

  const updateUser = await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      name: body.name,
      formInfo: {
        upsert: {
          create: {
            ...body,
          },
          update: {
            ...body,
          },
        },
      },
    },
  });
  console.log(updateUser);
  return NextResponse.json({ updateUser }, { status: 201 });
}
