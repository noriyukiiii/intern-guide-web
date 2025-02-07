import { Sidebar } from "./components/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full max-w-full overflow-x-hidden">
      <div className="flex-shrink-0">
        <Sidebar />
      </div>
      <main className="flex-1 h-[calc(100vh-89px)]">
        {children}
      </main>
    </div>
  );
}