// Every photograph on the site, by file name. The files live in
// src/assets/photos/ so the build can resize them and make AVIF and WebP
// versions (see Photo.astro). To add a photo, drop the .jpg in that folder
// and use its file name.
import type { ImageMetadata } from 'astro';

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/photos/*.jpg', { eager: true });

export const photos: Record<string, ImageMetadata> = Object.fromEntries(
  Object.entries(files).map(([path, mod]) => [path.split('/').pop()!, mod.default])
);

export function photo(name: string): ImageMetadata {
  const found = photos[name];
  if (!found) throw new Error(`No photo called "${name}" in src/assets/photos/`);
  return found;
}
