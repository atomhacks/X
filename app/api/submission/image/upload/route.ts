import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/server';

export async function POST(request: Request) {
  const body = (await request.json()) as HandleUploadBody;


  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (
        /*_pathname: string, */
        /* clientPayload?: string, */
      ) => {
        const user = await getUserFromRequest();
        if (!user) {
          throw new Error("Not Authenticated");
        }

        if (!user.team || !user.teamId) {
          throw new Error("No team");
        }

        if (!user.team.submission) {
          throw new Error("No Submission");
        }

        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/gif'],
          tokenPayload: JSON.stringify({
            submissionId: user.team.id,
          }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        console.log('blob upload completed', blob, tokenPayload);
        if (!tokenPayload) {
          throw new Error("Impossible");
        }

        // try {
        //   const { submissionId } = JSON.parse(tokenPayload);
        //   const existingSubmission = await getSubmission(submissionId);
        //   if (!existingSubmission) {
        //     throw new Error("No submission with id", submissionId);
        //   }
        //   const submission = await prisma.submission.update({
        //     where: {
        //       id: submissionId
        //     },
        //     data: {
        //       media: {
        //         create: [
        //           {
        //             url: blob.url
        //           }
        //         ]
        //       }
        //     }
        //   });
        //   console.log("success", submission);
        // } catch (error) {
        //   throw new Error(`Could not update user: ${error}`);
        // }
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }, // The webhook will retry 5 times waiting for a 200
    );
  }
}