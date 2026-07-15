# Bicycle Wagga Wagga — website + editor

This is the BWW website, rebuilt so committee members can edit text, photos
and PDFs through a simple web form — no code required after setup.

**How it works:** the design (colours, fonts, layout) is fixed in the
templates and CSS. The words, ride times, photos and documents live in
plain data files (`src/_data/*.yaml`). A free visual editor called
**Decap CMS** reads and writes those files for you through a form at
`/admin`. Editors log in with their own free GitHub account; when
someone saves a change, it's committed to GitHub, and Netlify
automatically rebuilds and republishes the live site within a minute
or two.

Nobody needs to touch HTML, YAML, or git commands directly — but each
editor does need their own (free) GitHub account, since that's what
proves who they are. This setup is free for a site this size (GitHub
free tier + Netlify free tier), and doesn't rely on Netlify's Identity
service, which Netlify has deprecated.

---

## One-time setup (do this once)

You'll need two free accounts: **GitHub** and **Netlify**.

### 1. Put this project on GitHub
1. Create a free account at github.com if the club doesn't have one
   (this can be a shared club account, or one belonging to whoever's
   coordinating the site).
2. Create a new repository (e.g. `bww-website`). It can be public —
   there's nothing sensitive in it — or private if you'd rather.
3. Upload everything in this folder to that repository (drag-and-drop
   works on github.com for a first upload, or use GitHub Desktop if
   you'd rather not use the command line).

### 2. Connect it to Netlify
1. Create a free account at netlify.com (signing up with your GitHub
   account is easiest).
2. Click **Add new site → Import an existing project**, choose GitHub,
   and select the repository you just created.
3. Netlify will detect the build settings from `netlify.toml`
   automatically (build command `npm run build`, publish folder
   `_site`). Click **Deploy**.
4. Wait for the first deploy to finish — your site is now live at a
   `*.netlify.app` address. (You can point your real bww.org.au domain
   at it afterwards under **Domain settings** — happy to walk through
   that separately when you're ready.)

### 3. Register a GitHub OAuth App (lets people log into /admin)
This is a one-time, five-minute step. It creates a way for GitHub to
tell your site "yes, this person really does own this GitHub account"
— Netlify just relays that handshake; it never sees or stores anyone's
password.

1. In GitHub, go to **Settings → Developer settings → OAuth Apps →
   New OAuth App** (github.com/settings/developers).
2. Fill in:
   - **Application name**: `BWW Website Editor` (anything you like)
   - **Homepage URL**: your site's URL (e.g. `https://bww.org.au` or
     the `*.netlify.app` address)
   - **Authorization callback URL**: `https://api.netlify.com/auth/done`
     — this exact URL, regardless of your own domain.
3. Click **Register application**, then **Generate a new client secret**.
   Copy the **Client ID** and **Client secret**.
4. In your Netlify site dashboard, go to **Project configuration →
   General → Access control → OAuth**, click **Install provider**,
   choose **GitHub**, and paste in the Client ID and secret.
5. Open `admin/config.yml` in the repo and replace
   `YOUR-GITHUB-USERNAME/bww-website` on the `repo:` line with your
   actual GitHub username/organisation and repository name, then
   commit that change (via github.com's web editor is fine).

### 4. Add each committee editor as a Collaborator
Because editors authenticate with their own GitHub account, each one
needs permission to write to the repository:
1. In the GitHub repo, go to **Settings → Collaborators → Add people**.
2. Enter each committee member's GitHub username or email and send
   the invite. They'll need a free GitHub account of their own (github.com
   → Sign up, takes a minute) if they don't already have one.
3. **Turn on two-factor authentication** on the repo owner's GitHub
   account at minimum, and encourage collaborators to do the same —
   this matters more for security than anything else in this setup.

### 5. Start editing
Go to `https://your-site-name.netlify.app/admin` (or `bww.org.au/admin`
once your domain is connected) and click **Login with GitHub**. Once
authorised, you'll see a form-based editor: **Home page**, **About
page**, **Rides page**, **Jersey page**, **Membership page**, **FAQ
page**, **Contact page**, and **Site settings**. Click into any of
these to edit text, add/remove list items (like FAQ entries or ride
schedule rows), or swap a photo. Click **Publish** and the live site
updates automatically within a minute or two.

---

## What committee members can edit day-to-day

- **Rides page** — ride schedule times, descriptions, policies, visitor routes
- **Jersey page** — the photo gallery, story text
- **Membership page** — fees, how-to-join steps, benefits
- **FAQ page** — add, remove or edit any question and answer
- **Contact page** — committee names and roles
- **About page** — history text, safety campaigns, committee documents
- **Site settings** — club email, phone, footer text

Design elements (colours, fonts, the home page's route-line layout)
are intentionally not editable through the form — that keeps the site
looking consistent no matter who's updating content. If the design
itself ever needs to change, that's a job for whoever manages the code
(or come back here).

---

## Local preview (optional, for anyone comfortable with a terminal)

```bash
npm install
npm run start   # serves the site at http://localhost:8080 with live reload
npm run build   # builds the production site into _site/
```

## Project structure

```
src/
  _data/         ← all editable content lives here (YAML files)
  _includes/     ← shared header/footer template (base.njk)
  assets/        ← CSS, JS, images, PDFs (not edited through the CMS)
  *.njk          ← page templates (pull content from _data/)
admin/
  index.html     ← loads the Decap CMS editor
  config.yml     ← defines which fields show up in the editor
```
