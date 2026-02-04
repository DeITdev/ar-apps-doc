"use client"

import * as React from "react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"
import { CopyButton } from "@/components/ui/copy-button"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

type CodeTabsProps = {
  codes: Record<string, string>
  className?: string
}

export function CodeTabs({ codes, className }: CodeTabsProps) {
  const { resolvedTheme } = useTheme()
  const [value, setValue] = React.useState<string>(Object.keys(codes)[0] || "")
  const [highlightedCodes, setHighlightedCodes] = React.useState<Record<string, string>>({})

  const themeRef = React.useRef(resolvedTheme)
  const keys = Object.keys(codes)
  const isSingleTab = keys.length === 1

  React.useEffect(() => {
    themeRef.current = resolvedTheme
  }, [resolvedTheme])

  React.useEffect(() => {
    let cancelled = false

    async function loadHighlightedCode() {
      try {
        const { codeToHtml } = await import("shiki")
        const newHighlightedCodes: Record<string, string> = {}
        const currentTheme = themeRef.current

        const entries = Object.entries(codes)
        const results = await Promise.all(
          entries.map(async ([key, val]) => {
            const highlighted = await codeToHtml(val, {
              lang: "bash",
              themes: {
                light: "github-light",
                dark: "github-dark",
              },
              defaultColor: currentTheme === "dark" ? "dark" : "light",
            })
            return [key, highlighted] as const
          })
        )

        if (cancelled) return

        for (const [key, highlighted] of results) {
          newHighlightedCodes[key] = highlighted
        }

        requestAnimationFrame(() => {
          if (!cancelled) {
            setHighlightedCodes(newHighlightedCodes)
          }
        })
      } catch (error) {
        console.error("Error highlighting codes", error)
      }
    }

    loadHighlightedCode()

    return () => {
      cancelled = true
    }
  }, [codes, resolvedTheme])

  return (
    <Tabs
      value={value}
      onValueChange={setValue}
      className={cn("w-full overflow-hidden rounded-lg bg-muted", className)}
    >
      <div className="flex items-center justify-between px-4 py-2">
        {!isSingleTab && (
          <TabsList className="bg-transparent p-0 h-auto">
            {keys.map((key) => (
              <TabsTrigger
                key={key}
                value={key}
                className="rounded-none border-b-2 border-transparent bg-transparent px-4 pb-2 pt-2 font-mono text-sm shadow-none data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                {key}
              </TabsTrigger>
            ))}
          </TabsList>
        )}
        {isSingleTab && <div />}
        <CopyButton value={codes[value] || ""} />
      </div>
      {Object.entries(codes).map(([key, code]) => (
        <TabsContent key={key} value={key} className="mt-0">
          <div className="px-4 pb-4 [&>pre]:m-0 [&>pre]:bg-transparent [&>pre]:p-0 [&_code]:bg-transparent">
            {highlightedCodes[key] ? (
              <div
                dangerouslySetInnerHTML={{ __html: highlightedCodes[key] }}
                className="text-sm [&_pre]:bg-transparent [&_code]:bg-transparent"
              />
            ) : (
              <pre className="text-sm font-mono">{code}</pre>
            )}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}
