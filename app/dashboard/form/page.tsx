import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import FormQuestions from "./FormQuestions";
import { authOptions, getUser } from "@/lib/server";

export const revalidate = 0;

export default async function Form() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return redirect("/register");
  }
  const user = await getUser(session.user.id);
  if (!user) {
    return redirect("/register");
  }
  if (user.formInfo != null) {
    return redirect("/dashboard/form/success")
  }

  return <FormQuestions />;
}
