import Nav from '@/components/Nav'
import MobileMenu from '@/components/MobileMenu'

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Nav />
      <MobileMenu />
      <div className="frame max-w-[1280px] mx-auto">{children}</div>
    </>
  )
}
