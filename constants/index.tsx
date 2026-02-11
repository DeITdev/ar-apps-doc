import {
    Bot,
    Layers,
    type LucideIcon,
} from "lucide-react"

import { privateAiNavMain } from "./private-ai"
import { arIndustrialNavMain } from "./ar-ndustrial-equipment"

// Navigation item type
export type NavSubItem = {
    title: string
    url: string
    isActive?: boolean
    content?: string
}

export type NavItem = {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: NavSubItem[]
}

// Documentation type definition
export type Documentation = {
    id: string
    name: string
    version: string
    logo: LucideIcon
    navMain: NavItem[]
}

// List of available documentations with their navigation
export const documentations: Documentation[] = [
    {
        id: "private-ai",
        name: "Private AI Assistant",
        version: "v1.0.0",
        logo: Bot,
        navMain: privateAiNavMain,
    },
    {
        id: "ar-app",
        name: "AR Application",
        version: "v1.0.0",
        logo: Layers,
        navMain: arIndustrialNavMain,
    },
]
