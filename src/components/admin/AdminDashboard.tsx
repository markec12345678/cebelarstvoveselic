'use client'

import { useCallback, useEffect, useState } from 'react'
import {
  RefreshCw,
  MessageSquare,
  Users,
  UserCheck,
  TrendingUp,
  Mail,
  Globe,
  Inbox,
} from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

// ── Types ──────────────────────────────────────────────────────────────

interface Submission {
  id: string
  name: string
  email: string
  subject: string
  message: string
  lang: string
  createdAt: string
}

interface Subscriber {
  id: string
  email: string
  lang: string
  active: boolean
  createdAt: string
}

interface Stats {
  totalSubmissions: number
  totalSubscribers: number
  activeSubscribers: number
  recentSubmissions: number
  recentSubscribers: number
}

// ── Helpers ────────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('sl-SI', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function LangBadge({ lang }: { lang: string }) {
  return (
    <Badge variant="outline" className="gap-1 text-xs">
      <Globe className="size-3" />
      {lang === 'sl' ? 'SLO' : lang === 'en' ? 'ENG' : lang.toUpperCase()}
    </Badge>
  )
}

// ── Stat Card ──────────────────────────────────────────────────────────

function StatCard({
  title,
  value,
  icon: Icon,
  description,
  accent,
}: {
  title: string
  value: number
  icon: React.ElementType
  description: string
  accent?: string
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon
          className={`size-5 ${accent ?? 'text-amber-500'}`}
        />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  )
}

// ── Loading Skeletons ──────────────────────────────────────────────────

function StatsSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="size-5 rounded" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-16 mb-2" />
            <Skeleton className="h-3 w-32" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function TableSkeleton({ rows = 5, cols = 5 }: { rows?: number; cols?: number }) {
  return (
    <div className="rounded-md border">
      <div className="border-b px-4 py-3">
        <div className="flex gap-4">
          {Array.from({ length: cols }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-20" />
          ))}
        </div>
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="border-b px-4 py-3 last:border-0">
          <div className="flex gap-4">
            {Array.from({ length: cols }).map((_, j) => (
              <Skeleton key={j} className="h-4 flex-1" />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Empty State ────────────────────────────────────────────────────────

function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 rounded-full bg-muted p-4">
        <Icon className="size-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground max-w-sm">{description}</p>
    </div>
  )
}

// ── Main Component ─────────────────────────────────────────────────────

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const [statsRes, submissionsRes, subscribersRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/admin/submissions'),
        fetch('/api/admin/subscribers'),
      ])

      if (!statsRes.ok || !submissionsRes.ok || !subscribersRes.ok) {
        throw new Error('Failed to fetch data from server.')
      }

      const statsData = await statsRes.json()
      const submissionsData = await submissionsRes.json()
      const subscribersData = await subscribersRes.json()

      setStats(statsData.data)
      setSubmissions(submissionsData.data)
      setSubscribers(subscribersData.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-sm text-muted-foreground">
            Pregled kontaktnih vprašanj in naročnikov na novice.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchData}
          disabled={loading}
          className="w-fit gap-2"
        >
          <RefreshCw className={`size-4 ${loading ? 'animate-spin' : ''}`} />
          Osveži
        </Button>
      </div>

      {/* Error state */}
      {error && (
        <Card className="border-destructive/50 bg-destructive/5">
          <CardContent className="flex items-center gap-3 py-4">
            <div className="rounded-full bg-destructive/10 p-2">
              <MessageSquare className="size-5 text-destructive" />
            </div>
            <div>
              <p className="text-sm font-medium text-destructive">Napaka pri nalaganju</p>
              <p className="text-xs text-muted-foreground">{error}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats */}
      {loading && !stats ? (
        <StatsSkeleton />
      ) : stats ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Skupna vprašanja"
            value={stats.totalSubmissions}
            icon={MessageSquare}
            description="Vse kontaktne oddaje"
          />
          <StatCard
            title="Naročniki"
            value={stats.totalSubscribers}
            icon={Users}
            description="Vsi naročniki na novice"
          />
          <StatCard
            title="Aktivni naročniki"
            value={stats.activeSubscribers}
            icon={UserCheck}
            description="Trenutno aktivne naročnine"
            accent="text-emerald-500"
          />
          <StatCard
            title="Zadnjih 7 dni"
            value={stats.recentSubmissions + stats.recentSubscribers}
            icon={TrendingUp}
            description={`${stats.recentSubmissions} vprašanj · ${stats.recentSubscribers} naročnikov`}
            accent="text-amber-600"
          />
        </div>
      ) : null}

      {/* Tabs: Submissions & Subscribers */}
      <Tabs defaultValue="submissions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="submissions" className="gap-1.5">
            <Inbox className="size-4" />
            Vprašanja
            {submissions.length > 0 && (
              <Badge variant="secondary" className="ml-1 text-[10px] px-1.5 py-0">
                {submissions.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="subscribers" className="gap-1.5">
            <Mail className="size-4" />
            Naročniki
            {subscribers.length > 0 && (
              <Badge variant="secondary" className="ml-1 text-[10px] px-1.5 py-0">
                {subscribers.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        {/* ── Submissions Tab ─────────────────────────────────── */}
        <TabsContent value="submissions">
          {loading && !submissions.length ? (
            <TableSkeleton rows={6} cols={5} />
          ) : submissions.length === 0 ? (
            <EmptyState
              icon={MessageSquare}
              title="Ni še nobenih vprašanj"
              description="Ko bodo obiskovalci izpolnili kontaktirni obrazec, bodo njihova vprašanja prikazana tukaj."
            />
          ) : (
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[160px]">Datum</TableHead>
                      <TableHead>Ime</TableHead>
                      <TableHead className="hidden sm:table-cell">E-pošta</TableHead>
                      <TableHead className="hidden md:table-cell">Zadeva</TableHead>
                      <TableHead className="w-[70px]">Jezik</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="max-h-96 overflow-y-auto">
                    {submissions.map((s) => (
                      <TableRow key={s.id}>
                        <TableCell className="text-xs text-muted-foreground">
                          {formatDate(s.createdAt)}
                        </TableCell>
                        <TableCell className="font-medium">{s.name}</TableCell>
                        <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                          {s.email}
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-sm max-w-[200px] truncate">
                          {s.subject}
                        </TableCell>
                        <TableCell>
                          <LangBadge lang={s.lang} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* ── Subscribers Tab ─────────────────────────────────── */}
        <TabsContent value="subscribers">
          {loading && !subscribers.length ? (
            <TableSkeleton rows={6} cols={4} />
          ) : subscribers.length === 0 ? (
            <EmptyState
              icon={Users}
              title="Ni še nobenih naročnikov"
              description="Ko se obiskovalci naročijo na novice, bodo prikazani tukaj."
            />
          ) : (
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[160px]">Datum</TableHead>
                      <TableHead>E-pošta</TableHead>
                      <TableHead className="w-[70px]">Jezik</TableHead>
                      <TableHead className="w-[90px]">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="max-h-96 overflow-y-auto">
                    {subscribers.map((s) => (
                      <TableRow key={s.id}>
                        <TableCell className="text-xs text-muted-foreground">
                          {formatDate(s.createdAt)}
                        </TableCell>
                        <TableCell className="font-medium">{s.email}</TableCell>
                        <TableCell>
                          <LangBadge lang={s.lang} />
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={s.active ? 'default' : 'secondary'}
                            className={
                              s.active
                                ? 'bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800'
                                : ''
                            }
                          >
                            {s.active ? 'Aktiven' : 'Neaktiven'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
