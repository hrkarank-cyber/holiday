# Holiday Hearth — Festive Holiday Welcome

A responsive, festive holiday welcome experience built with React, Tailwind CSS, and Framer Motion.

## 🚀 Pushing to GitHub & Deploying to GitHub Pages

### Method 1: Automatic Deployment via GitHub Actions (Recommended)

This repository includes a pre-configured GitHub Actions workflow in `.github/workflows/deploy.yml`.

1. **Initialize Git and commit your code** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "feat: festive holiday welcome page"
   ```

2. **Create a new repository on GitHub** (e.g. `holiday-hearth` or `<username>.github.io`).

3. **Link your local repository and push**:
   ```bash
   git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPOSITORY_NAME>.git
   git branch -M main
   git push -u origin main
   ```

4. **Enable GitHub Pages in your repository settings**:
   - Go to your GitHub repository in your browser.
   - Navigate to **Settings** > **Pages** (under "Code and automation").
   - Under **Build and deployment** > **Source**, select **GitHub Actions**.
   - Your site will build and deploy automatically! The live URL will be shown in the GitHub Pages settings.

---

### Method 2: Manual Deployment via `gh-pages` CLI

If you prefer deploying directly from your terminal:

1. **Deploy to `gh-pages` branch**:
   ```bash
   npm run deploy
   ```

2. **In GitHub Settings**:
   - Go to **Settings** > **Pages**.
   - Under **Source**, select **Deploy from a branch**.
   - Select the `gh-pages` branch and `/ (root)` folder, then click **Save**.

---

## 🛠 Local Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build production bundle
npm run build
```
