// Make every size of the site icon from public/favicon.svg.
//
//   npm run icons
//
// Run it only when the icon itself changes; the files it writes are
// committed. It produces:
//
//   favicon.ico            16, 32 and 48px in one file: what a browser or a
//                          search engine fetches when it asks for /favicon.ico
//   favicon-32.png         browser tabs
//   favicon-48.png         \ Google shows a site's icon beside its search
//   favicon-96.png         / results, and wants a square in a multiple of 48px
//   apple-touch-icon.png   180px, for an iPhone or iPad home screen. A full
//                          square: iOS rounds the corners itself, and would
//                          show transparent corners as black.
//   icon-192.png           \ Android home screen and install prompts, listed
//   icon-512.png           / in site.webmanifest
//   icon-maskable-512.png  the same on a full square, which Android may crop
//                          to a circle or squircle

import fs from 'node:fs';
import sharp from 'sharp';

const svg = fs.readFileSync('public/favicon.svg', 'utf8');
// The same mark on a full square, for the places that round the corners themselves.
const square = svg.replace(/(<rect[^>]*?)\s+rx="[^"]*"/, '$1');
if (square === svg) throw new Error('make-icons: expected a rounded <rect> background in public/favicon.svg');

const png = (source, size) => sharp(Buffer.from(source), { density: 600 }).resize(size, size).png().toBuffer();

/** An .ico file holding several PNG images (every current browser reads these). */
function ico(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(images.length, 4);
  let offset = 6 + 16 * images.length;
  const entries = images.map(({ size, data }) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size, 0); // width
    entry.writeUInt8(size, 1); // height
    entry.writeUInt16LE(1, 4); // colour planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += data.length;
    return entry;
  });
  return Buffer.concat([header, ...entries, ...images.map((image) => image.data)]);
}

const write = (name, data) => {
  fs.writeFileSync(`public/${name}`, data);
  console.log(`public/${name}`);
};

write('favicon.ico', ico(await Promise.all([16, 32, 48].map(async (size) => ({ size, data: await png(svg, size) })))));
for (const size of [32, 48, 96]) write(`favicon-${size}.png`, await png(svg, size));
write('apple-touch-icon.png', await png(square, 180));
write('icon-192.png', await png(svg, 192));
write('icon-512.png', await png(svg, 512));
write('icon-maskable-512.png', await png(square, 512));
