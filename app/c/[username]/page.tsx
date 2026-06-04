import type { Metadata } from 'next'

interface Props {
  params: Promise<{ username: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params
  return { title: `@${username} — Creonex` }
}

export default async function CreatorProfilePage({ params }: Props): Promise<React.ReactElement> {
  const { username } = await params
  return (
    <div className="p-8">
      {/* TODO: public creator profile for @{username} */}
      <p className="text-muted-foreground">@{username}</p>
    </div>
  )
}
