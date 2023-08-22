"use client"
import React, { FC, createContext, useEffect, useState } from "react";
import { User } from "@prisma/client";

interface IProps {
  children: React.ReactNode;
}

export const UserContext = createContext<{user: User}>(null);

const UserContextProvider: FC<IProps> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    async function getUser() {
      try {
        const response = await fetch('/api/getCurrentUser');
        const result = await response.json();
        setUser(result);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }

    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
