'use client'

import { motion } from 'motion/react'
import { DashboardTopbar } from '@/components/layout/dashboard-topbar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { mockNotes } from '@/data/mock-resources'
import { toast } from 'sonner'

export default function NotesPage(): React.ReactElement {
  return (
    <>
      <DashboardTopbar
        title="Notes"
        showSearch
        action={
          <Button size="sm" className="text-xs" onClick={() => toast.success('New note created')}>
            <FontAwesomeIcon icon={faPlus} className="mr-1 size-3.5" />
            New note
          </Button>
        }
      />
      <div className="space-y-4 p-4 sm:p-6">
        <p className="text-sm text-muted-foreground">Your notes from courses and sessions.</p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {mockNotes.map((note, i) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: Math.min(i, 6) * 0.04 }}
            >
              <Card className="h-full transition-shadow hover:shadow-sm">
                <CardContent className="space-y-2 p-4">
                  <p className="text-sm font-medium">{note.title}</p>
                  <p className="text-xs leading-relaxed text-muted-foreground">{note.snippet}</p>
                  <div className="flex items-center justify-between pt-1 text-[11px] text-muted-foreground">
                    <span className="truncate">{note.course}</span>
                    <span className="shrink-0">{note.date}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  )
}
