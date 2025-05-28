
import { auth } from "../../auth";
import { Session } from "next-auth";
import SignIn from "../signin";

export default async function SignInPage() {
  const session : Session | null = await auth();

  return <SignIn session={session} />;
}
