"use client"

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
import { ModeToggle } from "@/components/mode-toggle"
import { useDoc } from "@/contexts/doc-context"
import ReactMarkdown from "react-markdown"

function DashboardContent() {
  const { activeDoc, activeParent, activeSection } = useDoc()

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-3 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
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
        <div className="flex flex-1 flex-col gap-4 p-6">
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            {activeSection?.content ? (
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-3xl font-bold tracking-tight mb-4">{children}</h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-semibold tracking-tight mt-8 mb-4">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-semibold tracking-tight mt-6 mb-3">{children}</h3>
                  ),
                  p: ({ children }) => (
                    <p className="leading-7 [&:not(:first-child)]:mt-4">{children}</p>
                  ),
                  ul: ({ children }) => (
                    <ul className="my-4 ml-6 list-disc [&>li]:mt-2">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="my-4 ml-6 list-decimal [&>li]:mt-2">{children}</ol>
                  ),
                  code: ({ className, children, ...props }) => {
                    const isInline = !className
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
                  pre: ({ children }) => (
                    <pre className="mb-4 mt-4 overflow-x-auto rounded-lg bg-muted p-4">
                      {children}
                    </pre>
                  ),
                  table: ({ children }) => (
                    <div className="my-6 w-full overflow-y-auto">
                      <table className="w-full">{children}</table>
                    </div>
                  ),
                  th: ({ children }) => (
                    <th className="border px-4 py-2 text-left font-bold">{children}</th>
                  ),
                  td: ({ children }) => (
                    <td className="border px-4 py-2">{children}</td>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="mt-6 border-l-2 pl-6 italic">{children}</blockquote>
                  ),
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
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default function Page() {
  return <DashboardContent />
}
