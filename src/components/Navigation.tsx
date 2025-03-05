
import { Building, BarChart3, Map, Search, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Dashboard",
    icon: BarChart3,
    path: "/dashboard",
  },
  {
    title: "Map View",
    icon: Map,
    path: "/map",
  },
  {
    title: "Properties",
    icon: Building,
    path: "/properties",
  },
  {
    title: "Investors",
    icon: Users,
    path: "/investors",
  },
  {
    title: "Search",
    icon: Search,
    path: "/search",
  },
];

export function Navigation() {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Link to="/" className="flex items-center space-x-2">
          <Building className="w-6 h-6" />
          <span className="font-semibold">Whale Watch NYC</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    asChild
                    active={location.pathname === item.path}
                  >
                    <Link to={item.path} className="flex items-center space-x-2">
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <div className="absolute bottom-4 left-4">
        <SidebarTrigger />
      </div>
    </Sidebar>
  );
}
