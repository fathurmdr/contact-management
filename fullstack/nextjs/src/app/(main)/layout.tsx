import Sidebar from "./components/Sidebar";

export default async function MainTemplate({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex h-dvh w-full max-w-[768px] items-center justify-center gap-4 overflow-hidden py-6 font-[family-name:var(--font-geist-sans)]">
      <Sidebar />
      <div className="relative flex h-full flex-1 flex-col rounded-xl border border-gray-300 py-8">
        {children}
      </div>
    </div>
  );
}
