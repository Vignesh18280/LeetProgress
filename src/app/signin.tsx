"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import httpAxios from "./utils/httpAxios";
import { toast } from "sonner";

export default function SignIn({ session }: { session: Session | null }) {
  const router = useRouter();

  useEffect(() => {
    // console.log(session);
    if (!session) {
      router.push("/login");
      return;
    }
    const auth = async () => {
      localStorage.setItem("user", JSON.stringify(session));
      // const result = await httpAxios.post("/api/createToken", session).then((response) => response.data)
      // const data = await result.json();
      // console.log(data);
      toast.success(`Wellcome back ${session?.user?.name}`)
      router.push('/problems');
    }
    auth();
  }, []);

  return null;
}
