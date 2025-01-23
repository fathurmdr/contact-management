import { redirect } from "next/navigation";
import { getAuth } from "@/server/data/auth.data";

export default async function AuthTemplate({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const auth = await getAuth();

  if (auth) {
    return redirect("/contacts");
  }
  return children;
}
