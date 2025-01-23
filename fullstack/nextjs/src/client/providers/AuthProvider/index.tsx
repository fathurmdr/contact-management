"use client";

import { createContext } from "react";

const intialAuth: Auth = {
  sessionId: "",
  expiresAt: 0,
  user: {
    id: 0,
    name: "",
    email: "",
    phoneNumber: "",
    bio: "",
  },
};

export const AuthContext = createContext<Auth>(intialAuth);

export default function AuthProvider({
  children,
  auth,
}: {
  children: React.ReactNode;
  auth: Auth;
}) {
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
