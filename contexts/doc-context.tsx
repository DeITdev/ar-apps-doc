"use client"

import * as React from "react"
import { documentations, type Documentation, type NavItem, type NavSubItem } from "@/constants"

type DocContextType = {
    activeDoc: Documentation
    setActiveDoc: (doc: Documentation) => void
    activeSection: NavSubItem | null
    setActiveSection: (section: NavSubItem | null) => void
    activeParent: NavItem | null
    setActiveParent: (parent: NavItem | null) => void
}

const DocContext = React.createContext<DocContextType | undefined>(undefined)

export function DocProvider({ children }: { children: React.ReactNode }) {
    const [activeDoc, setActiveDoc] = React.useState<Documentation>(documentations[0])
    const [activeSection, setActiveSection] = React.useState<NavSubItem | null>(
        documentations[0].navMain[0]?.items?.[0] || null
    )
    const [activeParent, setActiveParent] = React.useState<NavItem | null>(
        documentations[0].navMain[0] || null
    )

    // Update section and parent when doc changes
    const handleSetActiveDoc = React.useCallback((doc: Documentation) => {
        setActiveDoc(doc)
        const firstParent = doc.navMain[0] || null
        const firstSection = firstParent?.items?.[0] || null
        setActiveParent(firstParent)
        setActiveSection(firstSection)
    }, [])

    return (
        <DocContext.Provider value={{
            activeDoc,
            setActiveDoc: handleSetActiveDoc,
            activeSection,
            setActiveSection,
            activeParent,
            setActiveParent
        }}>
            {children}
        </DocContext.Provider>
    )
}

export function useDoc() {
    const context = React.useContext(DocContext)
    if (context === undefined) {
        throw new Error("useDoc must be used within a DocProvider")
    }
    return context
}
