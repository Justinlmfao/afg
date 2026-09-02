# Programme photos

These are the real photos from sessions at Ho Man Tin Ling To Catholic School,
shown in the "In the classroom" gallery on the Teaching page (and the first one
also heads the Teaching panel on the home page).

| Filename | What it shows |
| --- | --- |
| `teaching-classroom.jpg` | Feature tile — a tutor leading a session, a pupil's hand raised |
| `teaching-chalkboard-maths.jpg` | A tutor working through the 1117 × 1117 mental-arithmetic shortcut |
| `teaching-ai-study-partner.jpg` | Explaining a maths idea aloud to an AI to check understanding |
| `teaching-ai-tools.jpg` | Two tutors introducing what an AI assistant can do |
| `teaching-exploring-interests.jpg` | Using AI to explore interests — dinosaurs, space, music |
| `teaching-english-careers.jpg` | The English module: how English opens career doors |

Team and cover photographs:

| Filename | Where it appears |
| --- | --- |
| `home-cover.jpg` | Home page hero — five members in the school courtyard |
| `team-classroom.jpg` | Team page — six members in the classroom |
| `team-outside-school.jpg` | Team page and the About origin section — outside Ling To |

Notes:

- All six are 1600 px wide, roughly 3:2, and 155–190 KB. They're displayed with
  `object-fit: cover`, so they crop gracefully into each frame.
- **Six photos fill the gallery grid exactly** (the first spans two columns and
  two rows; the other five fill the remaining cells). If you add or remove one,
  the last row will be uneven — either keep the count at six, or adjust the
  grid in `src/pages/teaching.astro`.
- To change the order, the captions, or which photo is the feature tile, edit
  the `photos` array near the top of `src/pages/teaching.astro`. The `alt` text
  is also used as the lightbox caption, so keep it descriptive.
- To swap a photo, replace the file with the same filename (resize to ~1600 px
  wide first so the page stays fast).
- **Consent:** pupils' faces are visible. Keep whatever permission the schools
  and families have given on file, and swap out any photo if that changes.
