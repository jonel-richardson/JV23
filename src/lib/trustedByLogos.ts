import type { StaticImageData } from 'next/image'

import cantineMaschio from '../../public/images/trusted-by/cantine-maschio.png'
import diplomatico from '../../public/images/trusted-by/diplomatico.png'
import ginMare from '../../public/images/trusted-by/gin-mare.png'
import greyGoose from '../../public/images/trusted-by/grey-goose.png'
import jpChenet from '../../public/images/trusted-by/jp-chenet.png'
import patron from '../../public/images/trusted-by/patron.png'
import tribe from '../../public/images/trusted-by/tribe.png'

// Static map from Sanity slug → imported PNG. Static imports let Next.js
// inline accurate width/height from PNG metadata at build time so the
// marquee track has stable dimensions from frame 1 (fixes the cold-cache
// flicker bug where <img> + w-auto contributed zero width until decode).
// Keys must match TRUSTED_BY_LOGO_SLUGS in constants.ts — when Nathan
// adds a brand, drop the PNG into /public/images/trusted-by/, add an
// import here, and append the slug to TRUSTED_BY_LOGO_SLUGS.
export const TRUSTED_BY_LOGOS: Record<string, StaticImageData> = {
  'cantine-maschio': cantineMaschio,
  diplomatico,
  'gin-mare': ginMare,
  'grey-goose': greyGoose,
  'jp-chenet': jpChenet,
  patron,
  tribe,
}
