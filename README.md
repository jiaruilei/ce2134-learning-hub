# CE2134 Learning Hub

A review and self-study hub that connects six existing CE2134 fluid-mechanics platforms. Each module combines learning objectives, essential equations, assumptions, common misconceptions, a guided lab activity and practice questions.

The hub is a separate static website. The six existing repositories and deployed applications remain unchanged. Lab links open their existing URLs in a new tab, leaving the hub available for review and practice.

## Modules and existing labs

| Module | Existing interactive platform |
| --- | --- |
| Hydrostatic pressure | [hydrostatic-pressure.onrender.com](https://hydrostatic-pressure.onrender.com/) |
| Hydrostatic forces | [hydrostatic-force-surfaces.onrender.com](https://hydrostatic-force-surfaces.onrender.com/) |
| Streamlines, pathlines & streaklines | [Flowlines_interactive](https://jiaruilei.github.io/Flowlines_interactive/) |
| Conservation of mass | [Conservation-of-Mass](https://jiaruilei.github.io/Conservation-of-Mass/) |
| Bernoulli & energy | [bernoulli-pipe-hgl-egl.onrender.com](https://bernoulli-pipe-hgl-egl.onrender.com/) |
| Momentum & jet forces | [jet-flow](https://jiaruilei.github.io/jet-flow/) |

These are external lab launches, not embedded or copied applications. The hub does not read their activity, quiz results or teaching records. Each lab retains its own behaviour and recording notices.

## Review and practice

- Six review modules with suggested foundations and connections between concepts.
- **42 fixed, editable questions:** six per topic, plus six questions connecting multiple topics; 19 numerical and 23 multiple-choice questions.
- Topic practice, mixed revision, connecting problems and retries of questions most recently answered incorrectly.
- Hints, worked solutions, answer tolerances and a session summary.
- A personal review checklist, practice accuracy, an unfinished-session resume option and a downloadable JSON copy of the browser's practice record.

A six-question mixed set includes one question from each topic. Longer mixed sets use additional distinct questions. A topic or connecting-problem set uses its six-question pool; retry sets use the available missed questions. The bank is finite and does not generate new questions with AI.

This is formative self-study practice. Answers and solutions are part of the public client-side source; the hub is not a secure examination or grading system.

## Run locally

Use **Node.js 18 or later**. The project has no third-party dependencies or API keys, so no package installation is needed.

```sh
npm test
npm run build
npm run dev
```

Open [http://127.0.0.1:3017/](http://127.0.0.1:3017/).

The development server serves the generated `dist/` folder and binds to the local machine. Run `npm run build` again after changing source files, then refresh the page. There is no automatic rebuild. The `PORT` environment variable can change the preview port.

Use the web server rather than opening `index.html` directly as a local file: the app uses JavaScript modules. `npm run build` copies the browser entry files and the `content/` and `lib/` modules into `dist/`.

## Progress and privacy

The hub does not ask for a name, student number, email address or login. Its review marks, checked answers and saved practice session are stored in this browser's `localStorage`, under `ce2134-learning-hub.v1`.

- Progress is local to the browser and website origin. It does not follow a student to another browser or device; local preview and a deployed site have separate records.
- Hub practice is not sent to an instructor dashboard or a reporting service and is not synchronised with the external labs.
- Clearing browser site data removes the saved record. The hub also provides a clear-record action with confirmation.
- If browser storage is unavailable, practice continues in memory and the page displays a notice that progress may not survive closing the page.
- **Download my record** creates a JSON file for personal reference. It does not submit that file to anyone.

“Marked reviewed” is a student's own checklist entry. Practice accuracy describes recorded hub attempts; it is not evidence of lab completion or a course grade.

## Edit the teaching content

| Source | Purpose |
| --- | --- |
| `content/topics.js` | Module text, equations, assumptions, misconceptions, guided activities, prerequisite links and external lab URLs. |
| `content/questions.js` | The question bank, answer keys, hints, worked solutions, tags and numerical tolerances. |
| `lib/practice.js` | Grading, set selection, retry selection and session validation. |
| `lib/storage.js` | Local browser progress storage. |
| `app.js`, `styles.css`, `index.html` | Interface, navigation and presentation. |
| `tests/` | Question-bank and practice-logic checks. |

Edit the source files, not generated copies inside `dist/`. Numerical questions use `answer`, `unit` and an **absolute tolerance in that displayed unit**. Multiple-choice questions use a zero-based `answerIndex`. Keep question and topic IDs stable when the underlying task is unchanged so stored records continue to refer to the intended content. If a question's meaning changes substantially, give it a new ID.

After content changes, run `npm test` and `npm run build`, then inspect the affected pages in the local preview. Automated checks complement instructor review; they cannot establish that the material matches the intended lecture or assessment standard.

### Instructor review before release

Check the learning sequence, notation, difficulty, answer keys and worked reasoning against the course. In particular:

- Use the stated pressure reference, vertical depth and assumptions in hydrostatics.
- Keep the centroid distinct from the centre of pressure, and determine curved-surface force directions from the wetted side.
- Use the constants stated in each question; numerical gravity calculations in this bank use **g = 9.80 m/s²**.
- Distinguish HGL from pressure head and state the ideal-flow assumptions behind Bernoulli's equation.
- Distinguish force on the fluid from force on the vane, and follow the coordinate directions stated in each question.
- Open all six lab links and confirm the guided steps still match the available controls.
- Check keyboard use, narrow-screen layouts and a full practice session before sharing the hub with students.

## Render static hosting after review

The hub is prepared for instructor review. **No Render deployment of this hub has been performed as part of this build.** The external platforms listed above already have their own hosting.

After the instructor approves the hub for release, connect this repository as a **Render Static Site** with:

| Setting | Value |
| --- | --- |
| Root directory | Repository root |
| Build command | `npm run build` |
| Publish directory | `dist` |
| Runtime/build requirement | Node.js 18 or later |
| Environment variables | None required by the hub |

Navigation uses hash routes such as `#/topic/pressure`, so the application does not require a server-side route rewrite. `scripts/serve.mjs` is a local preview helper; production serves the generated static files.

After deployment, verify the public URL, all six external launches, a numerical and multiple-choice answer, progress persistence on reload and the mobile layout. Deploying the hub does not require moving or redeploying the existing six applications.
