# Photographs

Every photograph on the site. The build resizes them and makes AVIF and WebP
versions (see `src/components/Photo.astro`), so keep the originals here at
about 1600px wide.

Sessions at Ho Man Tin Ling To Catholic School. All six are in the "In the
classroom" grid on the Teaching page, in this order (the first is shown large):

| File | What it shows | Also appears |
| --- | --- | --- |
| `teaching-classroom.jpg` | A tutor leading a session, a pupil's hand raised | Home, full width under the hero |
| `teaching-chalkboard-maths.jpg` | A tutor working through 1117 × 1117 on the chalkboard | The thumbnail in the AI for All case |
| `teaching-ai-study-partner.jpg` | Explaining a maths idea aloud to an AI | Home gallery |
| `teaching-ai-tools.jpg` | Two tutors introducing what an AI assistant can do | |
| `teaching-exploring-interests.jpg` | Using AI to explore interests | |
| `teaching-english-careers.jpg` | The English module | |

The team (About page):

| File | Where it appears |
| --- | --- |
| `team-outside-school.jpg` | "How it started": outside the school |
| `team-classroom.jpg` | People: six members in the classroom |

Sessions with Victoria Shanghai Academy. All twelve are on the Teaching page,
six under each year; two also appear in the home gallery:

| Prefix | Year |
| --- | --- |
| `vsa-2024-25-*.jpg` | 2024–25: AI in local communities |
| `vsa-2025-26-*.jpg` | 2025–26: what AI can make better, and how it gets misused |

To change which photos show, or their order, edit the `photos` and `cohorts`
lists at the top of `src/pages/teaching.astro` and `src/pages/zh/teaching.astro`.

Notes:

- A `<Gallery>` takes three photographs (one large, two small) or two side by
  side, with one caption each; the component joins them into a single
  caption. On phones only the first photograph shows, so put the best first.
- A `<PhotoGrid>` shows a whole set, three across (two on phones), and each
  photograph opens at full size when pressed. Six fills two rows evenly.
- Photos are cropped to fit their frame. If a face is cut off, pass
  `position` (and `positionPhone` for narrow screens) to `<Photo>`, e.g.
  `position="50% 38%"`.
- Only photographs the school and families have agreed to. No children's
  names in captions or alt text.
