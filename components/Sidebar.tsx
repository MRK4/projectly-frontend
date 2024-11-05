import {
  Users,
  ChevronUp,
  User2,
  Home,
  Folder,
  Search,
  Settings,
  List,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import axiosInstance from "../lib/axiosInstance";
import { useRouter } from "next/navigation";
import { cp } from "fs";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useUser } from "@/context/UserContext";
import { ThemeToggler } from "./ThemeToggler";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Activity",
    url: "/activity",
    icon: List,
  },
  {
    title: "Teams",
    url: "/teams",
    icon: Users,
  },
  {
    title: "Projets",
    url: "/projects",
    icon: Folder,
  },
];

export function AppSidebar() {
  const { user, loading } = useUser();
  const router = useRouter();

  const signout = async () => {
    try {
      await axiosInstance.post("/users/logout");
      router.push("/");
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  return (
    <Sidebar variant="floating" collapsible="offcanvas">
      <SidebarContent className="bg-background justify-between overflow-hidden">
        <SidebarGroup>
          <SidebarGroupLabel>Projectly</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="rounded-xl">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <ThemeToggler />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <User2 /> {user?.username ?? "Guest"}
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="flex flex-col gap-1 w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem>
                    <span>My account</span>
                  </DropdownMenuItem>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button className="w-full" variant={"destructive"}>
                        Sign out
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you sure you want to disconnect?
                        </AlertDialogTitle>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={signout}>
                          Disconnect
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
          <Button asChild className="text-muted" variant={"link"}>
            <Link href={"https://github.com/MRK4/projectly"} target="_blank">
              Projectly's source code here
            </Link>
          </Button>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
