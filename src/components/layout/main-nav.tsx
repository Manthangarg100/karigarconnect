"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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
  Home,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { signOut } from '@/app/auth/actions';
import { onAuthChanges } from '@/lib/firebase/auth';
import type { User as FirebaseUser } from 'firebase/auth';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
  { href: '/visual-enhancer', label: 'AI Visual Enhancer', icon: Sparkles },
  { href: '/story-weaver', label: 'AI Story Weaver', icon: PenSquare },
  { href: '/voice-storefront', label: 'Voice-to-Storefront', icon: Mic },
  { href: '/marketing-tool', label: 'AI Marketing Assistant', icon: Megaphone },
  { href: '/profile', label: 'Artisan Profile', icon: User },
  { href: '/transactions', label: 'Transactions', icon: DollarSign },
];

export function MainNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const [user, setUser] = useState<FirebaseUser | null>(null);


  useEffect(() => {
    const unsubscribe = onAuthChanges(setUser);
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    const result = await signOut();
    if(result.success) {
      router.push('/login');
    } else {
      toast({
        variant: "destructive",
        title: "Sign Out Failed",
        description: result.error,
      });
    }
  }

  const displayName = user?.displayName || user?.email || 'Artisan';
  const displayInitial = displayName.charAt(0).toUpperCase();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 p-2">
          <Palette className="w-8 h-8 text-primary" />
          <div className="flex flex-col">
            <h1 className="text-xl font-headline font-semibold">KarigarConnect</h1>
            <p className="text-xs text-muted-foreground">AI Assistant</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href}>
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
           {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                 <Button variant="outline" className="w-full justify-start group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:w-auto p-2">
                    <Avatar className="h-6 w-6 mr-2 group-data-[collapsible=icon]:m-0">
                      <AvatarImage src={user.photoURL || undefined} alt={displayName} />
                      <AvatarFallback>{displayInitial}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start group-data-[collapsible=icon]:hidden">
                       <span className="text-sm font-medium">{displayName}</span>
                    </div>
                  </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 mb-2">
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
           )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}