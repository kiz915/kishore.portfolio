# KISHORE — Portfolio Website

A modern, original personal portfolio built with HTML5, CSS3, and vanilla JavaScript.

## 📁 Folder Structure

```
portfolio/
├── index.html          ← Main HTML (all sections)
├── css/
│   └── style.css       ← All styling, themes, animations
├── js/
│   └── script.js       ← All interactivity & animations
├── assets/
│   ├── images/         ← Add your photos here
│   └── icons/          ← Custom icons if needed
└── README.md
```

## ✨ Features

- Light theme default + Dark mode toggle (remembers preference)
- Custom geometric K logo in SVG
- Animated page loader with K draw animation
- Hero section with staggered entrance animations
- Typing text animation cycling through 7 phrases
- Scrolling tech ticker strip
- Bento-grid skills layout with animated progress bars
- Timeline-based About section
- Hover-animated project cards
- Certification cards with animated progress bars
- 4-post blog grid with featured card layout
- Contact form with validation
- Resume download (generates .txt file)
- Scroll reveal for every section
- Floating WhatsApp button
- Back-to-top button
- Fully responsive (mobile/tablet/desktop)

---

## 🚀 Deploy to GitHub Pages

### Step 1 — Create GitHub Repository

1. Go to https://github.com and log in
2. Click **New repository**
3. Name it exactly: `kishore-portfolio` (or `username.github.io` for a root page)
4. Set to **Public** ✓
5. Click **Create repository**

### Step 2 — Upload Your Files

**Option A — GitHub Web Upload (easiest):**
1. Open your new repo
2. Click **Add file → Upload files**
3. Drag in the entire `portfolio/` folder contents
4. Commit the upload

**Option B — Git CLI:**
```bash
cd portfolio
git init
git add .
git commit -m "Initial portfolio deploy"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/kishore-portfolio.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages

1. In your repo, go to **Settings → Pages**
2. Under **Source**, select **Deploy from a branch**
3. Branch: `main` | Folder: `/ (root)`
4. Click **Save**
5. Wait 1–2 minutes, then visit:
   `https://YOUR_USERNAME.github.io/kishore-portfolio/`

---

## 🎨 Customization

### Change Colors
Edit CSS variables at the top of `css/style.css`:
```css
:root {
  --primary:   #4f46e5;   /* Indigo — change to any color */
  --accent:    #8b5cf6;   /* Violet */
  --bg:        #f8fafc;   /* Off-white background */
}
```

### Add a Real Photo
Replace the SVG avatar in `index.html` with:
```html
<img src="assets/images/photo.jpg" alt="Kishore" class="hcard-avatar-img" />
```
And add CSS:
```css
.hcard-avatar-img { width: 100px; height: 100px; border-radius: 22px; object-fit: cover; }
```

### Connect Contact Form (Firebase)
In `js/script.js`, replace the `setTimeout` mock with Firebase Firestore:
```js
import { addDoc, collection } from "firebase/firestore";
await addDoc(collection(db, "messages"), { fname, email, msg, ts: new Date() });
```

### Update Blog / Projects
Edit the HTML cards directly in `index.html` — each card is clearly labeled with comments.

---

## 📄 License

Built by KISHORE for personal use. Free to modify.

