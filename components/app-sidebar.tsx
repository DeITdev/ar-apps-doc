"use client"

import * as React from "react"
import { ChevronRight } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { DocSwitcher } from "@/components/doc-switcher"
import { useDoc } from "@/contexts/doc-context"
import { type NavItem, type NavSubItem } from "@/constants"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { activeDoc, activeSection, setActiveSection, setActiveParent } = useDoc()

  const handleSectionClick = (parent: NavItem, subItem: NavSubItem) => {
    setActiveParent(parent)
    setActiveSection(subItem)
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <DocSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {activeDoc.navMain.map((item) => (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={item.isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title} className="cursor-pointer">
                      {item.icon && <item.icon className="size-4" />}
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={activeSection?.title === subItem.title}
                            className="cursor-pointer"
                          >
                            <button
                              onClick={() => handleSectionClick(item, subItem)}
                              className="w-full text-left"
                            >
                              <span>{subItem.title}</span>
                            </button>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
