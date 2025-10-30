# Quick Start Guide - Policies Page

Get your policies page up and running in 5 minutes!

## Step 1: Add Your PDF Files (2 minutes)

Place your policy PDFs in the `pdfs/` folder with these exact names:

```
pdfs/
├── background-check-consent.pdf
├── cancellation-refund-policy.pdf
├── community-guidelines.pdf
├── cookie-policy.pdf
├── fees-overview.pdf
├── host-guarantee.pdf
├── host-guarantee-terms.pdf
├── payments-terms.pdf
├── privacy-policy.pdf
└── terms-of-use.pdf
```

**Don't have PDFs yet?** The page will still load - just add them later.

---

## Step 2: Test Locally (1 minute)

### Option A: Simple (Double-click)
Just open `index.html` in your web browser.

### Option B: Local Server (Better for testing)

**Using Python:**
```bash
cd policies-page
python -m http.server 8000
```

**Using Node.js:**
```bash
cd policies-page
npx http-server -p 8000
```

**Using PHP:**
```bash
cd policies-page
php -S localhost:8000
```

Then visit: `http://localhost:8000`

---

## Step 3: Customize (2 minutes)

### Update Logo
Edit `index.html` line ~20:
```html
<img src="YOUR_LOGO_URL_HERE" alt="Split Lease" class="logo">
```

### Update Colors
Edit `css/variables.css` to match your brand:
```css
--purple-dark: #2E1A47;   /* Change to your dark color */
--purple-main: #4A2B6B;   /* Change to your main color */
```

### Update Footer Links
Edit `index.html` footer section (~135-200) with your actual links.

---

## Step 4: Deploy (5 minutes)

### Easiest: Netlify Drop

1. Go to [Netlify Drop](https://app.netlify.com/drop)
2. Drag the entire `policies-page` folder
3. Done! You'll get a URL like: `https://random-name.netlify.app`

### Alternative: GitHub Pages

```bash
cd policies-page
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

Then enable GitHub Pages in repo settings.

---

## That's It! 🎉

Your policies page is now live.

## What You Get

✅ Responsive design (mobile, tablet, desktop)
✅ 10 pre-configured policy types
✅ PDF viewer with download
✅ Smooth navigation
✅ SEO-friendly URLs
✅ Browser back/forward support
✅ No dependencies or build process

---

## Next Steps

### Add More Policies
1. Add PDF to `pdfs/` folder
2. Add entry to `js/policies-data.js`
3. Refresh page

### Customize Further
- See `README.md` for detailed customization
- See `DEPLOYMENT_GUIDE.md` for advanced deployment

### Get Help
- Check browser console for errors
- Verify file paths are correct
- Ensure PDFs are accessible

---

## Common Issues

**PDFs not showing?**
- Check file names match exactly
- Ensure PDFs are in `pdfs/` folder
- Try refreshing with Ctrl+F5

**Styling looks off?**
- Clear browser cache
- Check all CSS files loaded
- Try different browser

**Navigation not working?**
- Check JavaScript console
- Ensure both JS files loaded
- Try hard refresh

---

## Pro Tips

1. **Use CDN for PDFs**: Upload PDFs to a CDN for better performance
2. **Optimize PDFs**: Keep files under 5MB each
3. **Test Mobile**: Always test on actual mobile devices
4. **Add Analytics**: Track which policies users view most
5. **Regular Updates**: Keep policies current and dated

---

## File Checklist

```
✅ index.html              - Main page
✅ css/variables.css       - Design tokens
✅ css/layout.css          - Layout styles
✅ css/components.css      - Component styles
✅ js/policies-data.js     - Policy database
✅ js/main.js              - JavaScript logic
📄 pdfs/*.pdf              - Your policy documents
✅ README.md               - Full documentation
✅ DEPLOYMENT_GUIDE.md     - Deploy instructions
✅ QUICK_START.md          - This file
```

---

**Need more help?** Check the full `README.md` or `DEPLOYMENT_GUIDE.md`

**Ready to deploy?** You're all set! 🚀
