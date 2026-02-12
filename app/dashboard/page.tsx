"use client"

import React from "react"

import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ModeToggle } from "@/components/mode-toggle"
import { useDoc } from "@/contexts/doc-context"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { CodeTabs } from "@/components/ui/code-tabs"
import { CopyButton } from "@/components/ui/copy-button"
import { TableOfContents } from "@/components/ui/toc"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { cn, slugify } from "@/lib/utils"
import { Info, AlertTriangle, Flame, CircleAlert, Lightbulb } from "lucide-react"

function DashboardContent() {
  const { activeDoc, activeParent, activeSection } = useDoc()

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-20 bg-background flex h-16 shrink-0 items-center justify-between gap-2 border-b px-3 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <span className="text-muted-foreground">{activeDoc.name}</span>
                </BreadcrumbItem>
                {activeParent && (
                  <>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem className="hidden md:block">
                      <span className="text-muted-foreground">{activeParent.title}</span>
                    </BreadcrumbItem>
                  </>
                )}
                {activeSection && (
                  <>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{activeSection.title}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <ModeToggle />
        </header>
        <div className="flex flex-1 gap-6 p-6">
          <div className="flex-1 min-w-0 prose prose-neutral dark:prose-invert max-w-none">
            {activeSection?.content ? (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => {
                    const text = String(children)
                    const id = slugify(text)
                    return (
                      <h1 id={id} className="text-3xl font-bold tracking-tight mb-4">{children}</h1>
                    )
                  },
                  h2: ({ children }) => {
                    const text = String(children)
                    const id = slugify(text)
                    return (
                      <h2 id={id} className="text-2xl font-semibold tracking-tight mt-8 mb-4">{children}</h2>
                    )
                  },
                  h3: ({ children }) => {
                    const text = String(children)
                    const id = slugify(text)
                    return (
                      <h3 id={id} className="text-xl font-semibold tracking-tight mt-6 mb-3">{children}</h3>
                    )
                  },
                  p: ({ children }) => (
                    <p className="leading-7 [&:not(:first-child)]:mt-4">{children}</p>
                  ),
                  ul: ({ children }) => (
                    <ul className="my-4 ml-6 list-disc [&>li]:mt-2">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="my-4 ml-6 list-decimal [&>li]:mt-2">{children}</ol>
                  ),

                  img: ({ className, ...props }) => (
                    <img className={cn("rounded-xl border mb-6 max-w-full h-auto", className)} {...props} />
                  ),
                  code: ({ className, children, ...props }) => {
                    const isInline = !className
                    const isCodeTabs = className?.includes("language-codetabs")

                    if (isCodeTabs) {
                      try {
                        const codes = JSON.parse(String(children).trim())
                        return <CodeTabs codes={codes} className="my-6" />
                      } catch (e) {
                        console.error("Failed to parse codetabs", e)
                        return (
                          <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
                            Error parsing code tabs
                          </div>
                        )
                      }
                    }

                    if (isInline) {
                      return (
                        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm" {...props}>
                          {children}
                        </code>
                      )
                    }
                    return (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    )
                  },
                  pre: ({ children, node, ...props }) => {
                    // Check if this pre contains a codetabs code block
                    const codeElement = node?.children?.[0]
                    if (codeElement?.type === 'element' && codeElement?.tagName === 'code') {
                      const className = codeElement.properties?.className
                      if (Array.isArray(className) && className.some((c) => String(c).includes('language-codetabs'))) {
                        // Return children directly without pre wrapper
                        return <>{children}</>
                      }
                    }

                    // Extract text content for copy button
                    const extractText = (node: unknown): string => {
                      if (!node || typeof node !== 'object') return ''
                      const n = node as { type?: string; value?: string; children?: unknown[] }
                      if (n.type === 'text') return n.value || ''
                      if (n.children) return n.children.map(extractText).join('')
                      return ''
                    }
                    const textContent = node ? extractText(node) : ''

                    return (
                      <div className="relative mb-4 mt-4 rounded-lg bg-[#f6f8fa] dark:bg-[#1c2128] overflow-hidden">
                        {textContent && (
                          <CopyButton
                            value={textContent}
                            className="absolute top-2 right-2 text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 z-10"
                          />
                        )}
                        <pre className="overflow-x-auto p-4 pr-12 m-0 [&_code]:text-[#24292f] dark:[&_code]:text-[#c9d1d9] [&_code]:bg-transparent" {...props}>
                          {children}
                        </pre>
                      </div>
                    )
                  },
                  table: ({ children }) => (
                    <div className="my-6 overflow-x-auto">
                      <Table>{children}</Table>
                    </div>
                  ),
                  thead: ({ children }) => (
                    <TableHeader>{children}</TableHeader>
                  ),
                  tbody: ({ children }) => (
                    <TableBody>{children}</TableBody>
                  ),
                  tr: ({ children }) => (
                    <TableRow>{children}</TableRow>
                  ),
                  th: ({ children }) => (
                    <TableHead>{children}</TableHead>
                  ),
                  td: ({ children }) => (
                    <TableCell>{children}</TableCell>
                  ),
                  blockquote: ({ children }) => {
                    // Extract text content from children to detect alert type
                    const extractTextContent = (node: React.ReactNode): string => {
                      if (typeof node === 'string') return node
                      if (Array.isArray(node)) return node.map(extractTextContent).join('')
                      if (React.isValidElement(node)) {
                        const props = node.props as { children?: React.ReactNode }
                        if (props.children) return extractTextContent(props.children)
                      }
                      return ''
                    }
                    const text = extractTextContent(children)
                    const alertMatch = text.match(/^\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*/i)

                    if (alertMatch) {
                      const type = alertMatch[1].toLowerCase() as 'note' | 'tip' | 'important' | 'warning' | 'caution'
                      const icons = {
                        note: <Info className="h-4 w-4" />,
                        tip: <Lightbulb className="h-4 w-4" />,
                        important: <CircleAlert className="h-4 w-4" />,
                        warning: <AlertTriangle className="h-4 w-4" />,
                        caution: <Flame className="h-4 w-4" />,
                      }
                      const labels = {
                        note: 'NOTE',
                        tip: 'TIP',
                        important: 'IMPORTANT',
                        warning: 'WARNING',
                        caution: 'CAUTION',
                      }

                      // Remove the [!TYPE] marker from the rendered content
                      const cleanChildren = React.Children.map(children, (child) => {
                        if (React.isValidElement(child)) {
                          const props = child.props as { children?: React.ReactNode }
                          if (props.children) {
                            const childText = extractTextContent(child)
                            if (childText.match(/^\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*/i)) {
                              const cleaned = childText.replace(/^\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*/i, '')
                              if (!cleaned.trim()) return null
                              return <p className="leading-relaxed m-0">{cleaned}</p>
                            }
                          }
                        }
                        return child
                      })?.filter(Boolean)

                      return (
                        <Alert variant={type} className="my-6">
                          {icons[type]}
                          <AlertTitle className="font-bold">{labels[type]}</AlertTitle>
                          <AlertDescription>{cleanChildren}</AlertDescription>
                        </Alert>
                      )
                    }

                    return (
                      <blockquote className="mt-6 border-l-2 pl-6 italic">{children}</blockquote>
                    )
                  },
                }}
              >
                {activeSection.content}
              </ReactMarkdown>
            ) : (
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                <p>Select a section from the sidebar to view its content.</p>
              </div>
            )}
          </div>
          {activeSection?.content && (
            <aside className="hidden xl:block w-64 shrink-0">
              <div className="sticky top-20">
                <TableOfContents content={activeSection.content} />
              </div>
            </aside>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default function Page() {
  return <DashboardContent />
}

