"use client"

import Image from "next/image"

import { cn } from "@/lib/utils"
import CustomLink from "./custom-link"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "./ui/navigation-menu"
import React from "react"
import { Button } from "./ui/button"

export function MainNav() {
    return (
        <div className="flex items-center gap-4">
            <CustomLink href="/">
                <Button variant="ghost" className="p-0">
                    <Image
                        src="/logo.png"
                        alt="Home"
                        width="32"
                        height="32"
                        className="min-w-8"
                    />
                </Button>
            </CustomLink>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink
                            href="/"
                            className={navigationMenuTriggerStyle()}
                        >
                            Conduit
                        </NavigationMenuLink>

                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink
                            href="posts/create"
                            className={navigationMenuTriggerStyle()}
                        >
                            Create
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"
