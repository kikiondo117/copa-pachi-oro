import { Header } from "./organisms/Header";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-full bg-blue-600 font-mono">
      <Header />
      {children}
    </div>
  );
}
