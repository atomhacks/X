import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { duplicateEntry, filterBody, getUserFromRequest, missingFields, unauthorized, wrongMethod } from "@/lib/server";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

const fields = ["name", "users"] as const;

export default async function POST(req: Request) {
  if (req.method != "POST") {
    return wrongMethod();
  }

  const user = await getUserFromRequest();
  if (!user) {
    return unauthorized();
  }
  if (!user.team || !user.teamId) {
    return unauthorized();
  }

  let body = filterBody(await req.json(), fields);
  if (!body) {
    return missingFields();
  }
  console.log(body);

  let { users: ids, ...restOfBody } = body;
  // if the users in body are also currently in team, that is deletion
  // if not add it
  // Hackathon level code
  ids = user.team.users
    .map((user) => user.id)
    .filter((id) => !ids.some((new_id: string) => id == new_id))
    .concat(ids.filter((id: string) => !user.team!.users.some((user) => user.id == id)));
  console.log(ids);

  try {
    const team = await prisma.team.update({
      where: {
        id: user.teamId,
      },
      data: {
        ...restOfBody,
        users: {
          set: ids.map((id: string) => ({
            id,
          })),
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