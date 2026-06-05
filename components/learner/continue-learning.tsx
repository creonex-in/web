'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import type { CourseProgress } from '@/types/resource'

interface ContinueLearningProps {
  course: CourseProgress
  index?: number
}

export function ContinueLearning({ course, index = 0 }: ContinueLearningProps): React.ReactElement {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: Math.min(index, 6) * 0.04 }}
      className="flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition-shadow hover:shadow-md sm:flex-row"
    >
      <div className="relative aspect-[16/9] w-full bg-muted sm:aspect-auto sm:w-44 sm:shrink-0">
        <Image
          src={course.image}
          alt={course.title}
          fill
          sizes="(max-width: 640px) 100vw, 176px"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-sm font-medium">{course.title}</p>
            <p className="text-xs text-muted-foreground">By {course.expertName}</p>
          </div>
          <span className="text-xs font-medium tabular-nums text-muted-foreground">
            {course.progress}%
          </span>
        </div>

        <Progress value={course.progress} className="h-1.5" />

        <p className="mt-1 text-xs text-muted-foreground">
          Next: <span className="text-foreground">{course.nextLesson}</span> · {course.nextLessonDuration}
        </p>

        <div className="mt-auto pt-2">
          <Button size="sm">
            <FontAwesomeIcon icon={faPlay} className="mr-1.5 size-3.5" />
            Resume
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
