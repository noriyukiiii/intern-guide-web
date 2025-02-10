import { Sidebar } from "./components/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full max-w-full overflow-x">
      <div className="flex-shrink-0 md:w-[270px]">
        <Sidebar />
      </div>
      <main className="flex-1 h-[calc(100vh-89px)] font-Prompt overflow-y-auto">
        {children}
      </main>
    </div>
  );
}