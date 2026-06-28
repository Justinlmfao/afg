# Program photos

The Programs page shows a "In the classroom" gallery of these five images.
Right now each one is a **labelled placeholder** — replace each file with your
real photo, keeping the **exact same filename**, and the site picks it up
automatically (no code changes).

| Filename                          | The photo it should be                                                                 |
| --------------------------------- | -------------------------------------------------------------------------------------- |
| `teaching-classroom.jpg`          | Wide/feature shot — volunteer leading a session, a student with her hand raised        |
| `teaching-ai-word-problems.jpg`   | Volunteer holding a laptop, slide on using AI for a real-life maths word problem        |
| `teaching-maths-module.jpg`       | Two volunteers running the maths module (shape/space/measurement slide)                |
| `teaching-chalkboard.jpg`         | Volunteer working through the 1117×1117 mental-arithmetic shortcut on the chalkboard   |
| `teaching-prompting.jpg`          | Volunteer teaching students how to ask an AI good questions (Gemini "如何提問" slide)   |

Notes:
- **Landscape (roughly 3:2) JPGs** look best. They're displayed with
  `object-fit: cover`, so they'll crop gracefully to fit each frame.
- The first image (`teaching-classroom.jpg`) is the large feature tile.
- If you want to change the captions/alt text or the order, edit the `photos`
  array near the top of `src/pages/programs.astro`.
- Keep file sizes reasonable (ideally under ~400 KB each) so the page stays fast.
