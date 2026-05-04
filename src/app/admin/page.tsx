import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import AdminDashboard from '@/components/admin/AdminDashboard'

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold tracking-tight">
              🐝 Čebelarstvo Veselič
            </span>
            <span className="hidden text-sm text-muted-foreground sm:inline">
              — Admin Dashboard
            </span>
          </div>
          <Button variant="ghost" size="sm" asChild className="gap-1.5">
            <Link href="/">
              <ArrowLeft className="size-4" />
              <span className="hidden sm:inline">Nazaj na stran</span>
              <span className="sm:hidden">Nazaj</span>
            </Link>
          </Button>
        </div>
      </header>

      {/* Dashboard content */}
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <AdminDashboard />
      </div>
    </main>
  )
}
