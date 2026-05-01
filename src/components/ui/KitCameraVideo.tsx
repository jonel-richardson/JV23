'use client'

import { useReducedMotion } from '@/hooks/useReducedMotion'
import { KIT_CAMERA_VIDEO } from '@/lib/constants'

// Decorative looping camera rotation. Sized by parent — the wrapping
// element decides width / height / aspect; KitCameraVideo just fills
// the container and crops with object-cover. Mobile parent gives a
// wide cropped band (full content width × 280px); desktop parent gives
// a vertical thumbnail (244px × ~441px via aspect-[416/752]). For users
// without a reduced-motion preference, the video autoplays muted on a
// continuous loop. Reduced-motion users see the still first frame
// natively via preload="metadata" once autoplay/loop are suppressed —
// no separate poster image needed.
export default function KitCameraVideo() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl">
      <video
        src={KIT_CAMERA_VIDEO.src}
        autoPlay={!prefersReducedMotion}
        loop={!prefersReducedMotion}
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="h-full w-full object-cover"
      />
    </div>
  )
}
