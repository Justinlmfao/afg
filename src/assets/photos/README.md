# Photographs

Every photograph on the site. The build resizes them and makes AVIF and WebP
versions (see `src/components/Photo.astro`), so keep the originals here at
about 1600px wide.

Sessions at Ho Man Tin Ling To Catholic School:

| File | What it shows | Where it appears |
| --- | --- | --- |
| `teaching-classroom.jpg` | A tutor leading a session, a pupil's hand raised | Home, full width under the hero |
| `teaching-chalkboard-maths.jpg` | A tutor working through 1117 × 1117 on the chalkboard | The thumbnail in the AI for All case |
| `teaching-ai-study-partner.jpg` | Explaining a maths idea aloud to an AI | Home gallery |
| `teaching-ai-tools.jpg` | Two tutors introducing what an AI assistant can do | Teaching, "Where we teach" |
| `teaching-english-careers.jpg` | The English module | Teaching, "Where we teach" |
| `teaching-exploring-interests.jpg` | Using AI to explore interests | Teaching, "Where we teach" |

The team:

| File | Where it appears |
| --- | --- |
| `team-classroom.jpg` | About, People: six members in the classroom |
| `team-outside-school.jpg` | About, People: outside the school |

Sessions with Victoria Shanghai Academy:

| Prefix | Year |
| --- | --- |
| `vsa-2024-25-*.jpg` | 2024–25: AI in local communities |
| `vsa-2025-26-*.jpg` | 2025–26: what AI can make better, and how it gets misused |

Three of these appear on the home page and three on Teaching. The rest are
kept here for when a gallery is changed; a photo that no page names is not
built or published.

Notes:

- A gallery takes three photographs (one large, two small) or two side by
  side, with one caption each; the component joins them into a single
  caption. On phones only the first photograph shows, so put the best first.
- Photos are cropped to fit their frame. If a face is cut off, pass
  `position` (and `positionPhone` for narrow screens) to `<Photo>`, e.g.
  `position="50% 38%"`.
- Only photographs the school and families have agreed to. No children's
  names in captions or alt text.
