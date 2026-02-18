"use client";

import { HistoryIcon, ListVideoIcon, ThumbsUpIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSession } from "@/lib/auth-client";

const items = [
  {
    title: "History",
    url: "/playlists/history",
    icon: HistoryIcon,
    auth: true,
  },
  {
    title: "Liked Videos",
    url: "/playlists/liked",
    icon: ThumbsUpIcon,
    auth: true,
  },
  {
    title: "All playlists",
    url: "/playlists",
    icon: ListVideoIcon,
  },
];

export const PersonalSection = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: (typeof items)[number]
  ) => {
    if (item.auth && !session) {
      e.preventDefault();
      router.push("/sign-in");
    }
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel></SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild tooltip={item.title} isActive={false}>
                <Link
                  href={item.url}
                  className="flex items-center gap-4"
                  onClick={(e) => handleClick(e, item)}
                >
                  <item.icon />
                  <span className="text-sm">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
