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
  const keys = Object.keys(codes)
  const isSingleTab = keys.length === 1

  const themeRef = React.useRef(resolvedTheme)

  React.useEffect(() => {
    themeRef.current = resolvedTheme
  }, [resolvedTheme])

  // Format the code: replace literal \n with actual newlines
  const formatCode = (code: string) => {
    return code.replace(/\\n/g, "\n")
  }

  React.useEffect(() => {
    let cancelled = false

    async function highlight() {
      try {
        const { codeToHtml } = await import("shiki")
        const currentTheme = themeRef.current
        const results: Record<string, string> = {}

        for (const [key, code] of Object.entries(codes)) {
          const formatted = formatCode(code)
          const html = await codeToHtml(formatted, {
            lang: "bash",
            theme: currentTheme === "dark" ? "github-dark" : "github-light",
          })
          results[key] = html
        }

        if (!cancelled) {
          setHighlightedCodes(results)
        }
      } catch (error) {
        console.error("Shiki highlighting failed, using plain text:", error)
      }
    }

    highlight()

    return () => {
      cancelled = true
    }
  }, [codes, resolvedTheme])

  return (
    <Tabs
      value={value}
      onValueChange={setValue}
      className={cn(
        "w-full overflow-hidden rounded-lg",
        "bg-[#f6f8fa] dark:bg-[#1c2128]",
        className
      )}
    >
      {!isSingleTab && (
        <div className="flex items-center border-b border-[#d1d9e0] dark:border-[#30363d] px-4 pt-2">
          <TabsList className="bg-transparent p-0 h-auto">
            {keys.map((key) => (
              <TabsTrigger
                key={key}
                value={key}
                className="rounded-none border-b-2 border-transparent bg-transparent px-4 pb-2 pt-2 font-mono text-sm text-muted-foreground shadow-none data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                {key}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      )}
      {Object.entries(codes).map(([key, code]) => (
        <TabsContent key={key} value={key} className="mt-0">
          <div className="relative">
            <CopyButton
              value={formatCode(code)}
              className="absolute top-2 right-2 text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 z-10"
            />
            {highlightedCodes[key] ? (
              <div
                dangerouslySetInnerHTML={{ __html: highlightedCodes[key] }}
                className="overflow-x-auto [&_pre]:m-0 [&_pre]:p-4 [&_pre]:pr-12 [&_pre]:!bg-transparent [&_code]:!bg-transparent text-sm"
              />
            ) : (
              <pre className="overflow-x-auto p-4 pr-12 m-0">
                <code className="font-mono text-sm text-[#24292f] dark:text-[#c9d1d9] bg-transparent">
                  {formatCode(code)}
                </code>
              </pre>
            )}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}
