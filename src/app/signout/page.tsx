"use client";

import { signOut } from "next-auth/react";
import httpAxios from "../utils/httpAxios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUser } from "../context/UserContext";

export default function SignOutButton() {
  const { fetchUser } = useUser();
  const router = useRouter();
  const handleLogout = async () => {

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      localStorage.clear();
      signOut({ callbackUrl: "/" });
      toast.success("logged out successfully");
      return;
    }

    try {
      const response = await httpAxios.post("/api/logout").then((res) => res.data);
      if (response.success) {
        await fetchUser();
        router.push("/");
        toast.success(response.message);
      }
    } catch (error) {
      toast.error("Failed to logout");
      console.error("Logout error:", error);
    }
  };


  return (
    <button
      onClick={handleLogout}
      className="cursor-pointer px-4 py-2 rounded-md hover:bg-gray-300 transition-all"
    >
      Log Out
    </button>
  );
}

 