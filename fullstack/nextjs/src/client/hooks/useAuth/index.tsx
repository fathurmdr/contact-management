"use client";

import { useContext } from "react";
import { AuthContext } from "@/client/providers/AuthProvider";

export default function useAuth() {
  const auth = useContext(AuthContext);
  return auth;
}
