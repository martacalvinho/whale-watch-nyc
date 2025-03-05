
import { SidebarProvider } from "@/components/ui/sidebar";
import { Navigation } from "./Navigation";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Navigation />
        <main className="flex-1 overflow-y-auto">
          <div className="container py-6 space-y-8 animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
