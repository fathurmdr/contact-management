import { redirect } from "next/navigation";
import HeaderProfile from "./components/HeaderProfile";
import Sidebar from "./components/Sidebar";
import { getAuth } from "@/server/data/auth.data";
import AuthProvider from "@/client/providers/AuthProvider";

export default async function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const auth = await getAuth();

  if (!auth) {
    redirect("/");
  }

  return (
    <AuthProvider auth={auth}>
      <div className="flex h-dvh w-full max-w-[768px] items-center justify-center gap-4 overflow-hidden pb-14 font-[family-name:var(--font-geist-sans)] sm:py-6">
        <Sidebar />
        <div className="relative flex h-full flex-1 flex-col border-gray-300 py-6 sm:rounded-xl sm:border">
          <HeaderProfile />
          {children}
        </div>
      </div>
    </AuthProvider>
  );
}
