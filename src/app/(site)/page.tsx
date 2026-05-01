import { Suspense } from 'react'
import Hero from '@/components/scenes/Hero'
import About from '@/components/scenes/About'
import FeaturedWork from '@/components/scenes/FeaturedWork'
import FeaturedWorkSkeleton from '@/components/scenes/FeaturedWorkSkeleton'
import TrustedBy from '@/components/scenes/TrustedBy'
import TrustedBySkeleton from '@/components/scenes/TrustedBySkeleton'
import Kit from '@/components/scenes/Kit'
import KitSkeleton from '@/components/scenes/KitSkeleton'
import Services from '@/components/scenes/Services'
import ServicesSkeleton from '@/components/scenes/ServicesSkeleton'
import WordsFromSet from '@/components/scenes/WordsFromSet'
import WordsFromSetSkeleton from '@/components/scenes/WordsFromSetSkeleton'
import Inquire from '@/components/scenes/Inquire'

export const revalidate = 60

export default function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Suspense fallback={<FeaturedWorkSkeleton />}>
        <FeaturedWork />
      </Suspense>
      <Suspense fallback={<TrustedBySkeleton />}>
        <TrustedBy />
      </Suspense>
      <Suspense fallback={<KitSkeleton />}>
        <Kit />
      </Suspense>
      <Suspense fallback={<ServicesSkeleton />}>
        <Services />
      </Suspense>
      <Suspense fallback={<WordsFromSetSkeleton />}>
        <WordsFromSet />
      </Suspense>
      <Inquire />
    </main>
  )
}
