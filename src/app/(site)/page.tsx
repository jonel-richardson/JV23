import { Suspense } from 'react'
import Hero from '@/components/scenes/Hero'
import About from '@/components/scenes/About'
import FeaturedWork from '@/components/scenes/FeaturedWork'
import FeaturedWorkSkeleton from '@/components/scenes/FeaturedWorkSkeleton'

export const revalidate = 60

export default function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Suspense fallback={<FeaturedWorkSkeleton />}>
        <FeaturedWork />
      </Suspense>
    </main>
  )
}
