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

- One Topics homepage links to all six modules. There are no separate Practice or Progress pages. Older `#/topics`, `#/progress`, and general-practice bookmarks return to Topics.
- Each light-blue topic card has a practice progress bar and its own Practice / Resume practice button. The bar counts checked questions in that chapter's saved set, not correct answers. Completed sets offer Practice again.
- Each chapter saves its own question order, checked answers, hints and place. Starting or resuming another chapter preserves all other chapter sessions. The Topics homepage has no shared practice button.
- Topic pages also offer Review, Interactive platform and the chapter's current practice action, wrapping on small screens.
- Practice and completion summaries stay within each chapter. Active practice URLs identify the chapter so refreshing or using browser history restores the right set.
- Six review modules with suggested foundations and connections between concepts.
- **Six questions per chapter**, with retries of that chapter's missed questions. The source question bank retains all 42 questions, including six connecting questions reserved for future use; mixed-topic revision is not exposed in the interface.
- Hints, worked solutions, answer tolerances and a session summary.
- A personal review checklist, an unfinished-session resume option, and a **Clear progress** footer button. Clearing requires confirmation and returns to Topics.

Each chapter uses its six-question pool; retry sets contain the questions missed in that chapter's last set. Existing attempts, review marks, and saved records are retained when the navigation changes. The bank is finite and does not generate new questions with AI.

This is formative self-study practice. Answers and solutions are part of the public client-side source; the hub is not a secure examination or grading system.

## Run locally

Use **Node.js 18 or later**. Install the pinned dependencies with `npm ci`; no API keys are required. MathJax 4.1.3 and its font assets are served locally with the hub.

```sh
npm ci
npm test
npm run build
npm run dev
```

Open [http://127.0.0.1:3017/](http://127.0.0.1:3017/).

The development server serves the generated `dist/` folder and binds to the local machine. Run `npm run build` again after changing source files, then refresh the page. There is no automatic rebuild. The `PORT` environment variable can change the preview port.

Use the web server rather than opening `index.html` directly as a local file: the app uses JavaScript modules. `npm run build` copies the browser entry files, `content/` and `lib/` modules, and installed MathJax runtime/font files into `dist/`. The generated `vendor/` assets are not committed to Git.

## Progress and privacy

The hub does not ask for a name, student number, email address or login. Its review marks, checked answers and saved practice sessions are stored in this browser's `localStorage`, under `ce2134-learning-hub.v1`. Existing single-topic sessions migrate into the corresponding chapter without removing earlier attempts or review marks.

- Progress is local to the browser and website origin. It does not follow a student to another browser or device; local preview and a deployed site have separate records.
- Hub practice is not sent to an instructor dashboard or a reporting service and is not synchronised with the external labs.
- Clearing browser site data removes the saved record. The footer's **Clear progress** button also removes it after confirmation.
- If browser storage is unavailable, practice continues in memory and the page displays a notice that progress may not survive closing the page.

“Marked reviewed” is a student's own checklist entry. Practice accuracy describes recorded hub attempts; it is not evidence of lab completion or a course grade.

## Edit the teaching content

| Source | Purpose |
| --- | --- |
| `content/topics.js` | Module text, equations, assumptions, misconceptions, guided activities, prerequisite links and external lab URLs. |
| `content/questions.js` | The question bank, answer keys, hints, worked solutions, tags and numerical tolerances. |
| `lib/practice.js` | Grading, set selection, retry selection and session validation. |
| `lib/storage.js` | Local browser progress storage. |
| `mathjax-config.js`, `lib/math.js` | Local MathJax loading and equation rendering after navigation. |
| `app.js`, `styles.css`, `index.html` | Interface, navigation and presentation. |
| `tests/` | Question-bank and practice-logic checks. |

Edit the source files, not generated copies inside `dist/`. Numerical questions use `answer`, `unit` and an **absolute tolerance in that displayed unit**. Multiple-choice questions use a zero-based `answerIndex`. Keep question and topic IDs stable when the underlying task is unchanged so stored records continue to refer to the intended content. If a question's meaning changes substantially, give it a new ID.

Key equations in `content/topics.js` have a `tex` field written with `String.raw` for MathJax and a plain-text `formula` fallback. Keep both mathematically equivalent. The verbal streakline definition remains prose. Formulas remain readable if MathJax cannot load; the renderer also ignores detached elements when students navigate quickly between topics. Setup follows the [MathJax self-hosting documentation](https://docs.mathjax.org/en/latest/web/hosting.html).

Topic prose uses the `mathText` tagged template and `inlineMath(tex, fallback)` for individual symbols and inline expressions. Plain strings remain plain text; only explicitly authored math is typeset. Use `String.raw` for TeX containing backslashes and provide a readable fallback for accessibility and loading failures. Inline notation uses the surrounding text size and baseline, while key equations retain display layout.

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

## Render static hosting

The hub is live at [ce2134-learning-hub.onrender.com](https://ce2134-learning-hub.onrender.com/). Manage releases in the [Render dashboard](https://dashboard.render.com/static/srv-dalqvhu5vjqs738c9oa0).

It uses a **Render Static Site** with the following release settings:

| Setting | Value |
| --- | --- |
| Source branch | `main` |
| Root directory | Repository root |
| Build command | `npm ci && npm run build` |
| Publish directory | `dist` |
| Node.js version | `NODE_VERSION=24.14.1` |
| Dependency installation | `SKIP_INSTALL_DEPS=true` — the build command runs `npm ci` |
| Auto-deploy | Disabled |

The hub uses free static hosting and needs no database or application secrets. Its environment variables configure the build only.

Review changes in the local preview, run `npm test` and `npm run build`, then publish the approved revision to `main`. Deploy it manually from the Render dashboard. Pushing a commit alone does not update the public site.

Navigation uses hash routes such as `#/topic/pressure`, so the application does not require a server-side route rewrite. `scripts/serve.mjs` is a local preview helper; production serves the generated static files.

After deployment, verify the public URL, all six external launches, a numerical and multiple-choice answer, progress persistence on reload and the mobile layout. Deploying the hub does not require moving or redeploying the existing six applications.
