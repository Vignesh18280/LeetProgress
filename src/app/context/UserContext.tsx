"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import httpAxios from "../utils/httpAxios";
import { toast } from "sonner";
import { AxiosError } from "axios";

interface User {
  name: string;
  email: string;
  profileUrl: string;
  user: {
    image: string;
    name: string;
  };
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  fetchUser: () => Promise<void>;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser: User = JSON.parse(storedUser);
        toast.success(`Welcome back ${parsedUser?.name}`);
        setUser(parsedUser);
        return;
      }

      const response = await httpAxios.get<User>("/api/current");
      setUser(response.data);
    } catch (error: unknown) {
      const err = error as AxiosError;
      if (err.response?.status === 401) {
        setUser(null);
      } else {
        console.error("Failed to fetch user", err);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <UserContext.Provider value={{ user, setUser, fetchUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
