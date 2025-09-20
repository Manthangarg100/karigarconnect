
import { MainNav } from "@/components/layout/main-nav";
import { SidebarProvider, Sidebar, SidebarInset } from "@/components/ui/sidebar";
import { AuthGuard } from "@/components/auth-guard";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthGuard>
            <SidebarProvider>
                <Sidebar>
                    <MainNav />
                </Sidebar>
                <SidebarInset>
                    {children}
                </SidebarInset>
            </SidebarProvider>
        </AuthGuard>
    );
}
