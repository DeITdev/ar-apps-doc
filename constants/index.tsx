import {
    Bot,
    Hand,
    Layers,
    type LucideIcon,
} from "lucide-react"

import { privateAiNavMain } from "./private-ai"
import { arIndustrialNavMain } from "./ar-industrial-equipment"
import { vrSaviorHandPoseNavMain } from "./vr-savior-hand-pose"

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
        id: "vr-savior-hand-pose",
        name: "VR Savior Hand Pose",
        version: "v1.0.0",
        logo: Hand,
        navMain: vrSaviorHandPoseNavMain,
    },
    {
        id: "private-ai",
        name: "Private AI Assistant",
        version: "v1.0.0",
        logo: Bot,
        navMain: privateAiNavMain,
    },
    {
        id: "ar-app",
        name: "AR Industrial Equipment",
        version: "v1.0.0",
        logo: Layers,
        navMain: arIndustrialNavMain,
    },
]
