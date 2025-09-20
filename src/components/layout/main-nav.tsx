"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  LayoutGrid,
  Sparkles,
  PenSquare,
  Mic,
  Megaphone,
  User,
  DollarSign,
  Palette,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutGrid },
  { href: '/visual-enhancer', label: 'AI Visual Enhancer', icon: Sparkles },
  { href: '/story-weaver', label: 'AI Story Weaver', icon: PenSquare },
  { href: '/voice-storefront', label: 'Voice-to-Storefront', icon: Mic },
  { href: '/marketing-tool', label: 'Marketing Tool', icon: Megaphone },
  { href: '/profile', label: 'Artisan Profile', icon: User },
  { href: '/transactions', label: 'Transactions', icon: DollarSign },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 p-2">
          <Palette className="w-8 h-8 text-primary" />
          <div className="flex flex-col">
            <h1 className="text-xl font-headline font-semibold">CraftConnect</h1>
            <p className="text-xs text-muted-foreground">AI Assistant</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} passHref legacyBehavior>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={item.label}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <Separator className="my-1" />
        <div className="p-2">
            <Button variant="outline" className="w-full justify-start group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:w-auto p-2">
              <User className="group-data-[collapsible=icon]:m-0 mr-2" />
              <span className="group-data-[collapsible=icon]:hidden">User Profile</span>
            </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
