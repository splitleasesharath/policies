# Split Lease Policies Page

A standalone, lightweight policies page converted from Bubble to pure HTML/CSS/JavaScript.

## 📁 File Structure

```
policies-page/
├── index.html              # Main HTML file
├── css/
│   ├── variables.css       # CSS custom properties and design tokens
│   ├── layout.css          # Layout and responsive styles
│   └── components.css      # Component-specific styles
├── js/
│   ├── policies-data.js    # Policy documents database
│   └── main.js             # Main JavaScript functionality
├── fonts/                  # Custom fonts (optional)
├── pdfs/                   # PDF documents storage
└── README.md               # This file
```

## 🚀 Features

- **Dynamic Policy Loading**: Policies are loaded dynamically from a JavaScript data file
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Smooth Navigation**: Hash-based routing with browser back/forward support
- **PDF Viewer**: Embedded PDF viewer with download capability
- **Sticky Sidebar**: Contents sidebar stays visible while scrolling (desktop)
- **Back to Top**: Smooth scroll to top functionality
- **SEO Friendly**: Clean URLs with hash navigation

## 📋 Setup Instructions

### 1. Add Your PDF Files

Place your actual PDF policy documents in the `pdfs/` folder:

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

### 2. Update Policy Data

Edit `js/policies-data.js` to match your actual PDF files and policy names.

### 3. Customize Branding

Update the following in `index.html`:
- Logo URL in the header
- Company name
- Footer links and content

### 4. Configure Colors

Modify `css/variables.css` to match your brand colors:
- `--purple-dark`: Primary dark color
- `--purple-main`: Main brand color
- `--purple-light`: Light accent color

### 5. Test Locally

Open `index.html` in a web browser to test. For full functionality, use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit: `http://localhost:8000`

## 🎨 Customization Guide

### Adding New Policies

1. Add the PDF file to the `pdfs/` folder
2. Add a new entry to `POLICIES_DATA` in `js/policies-data.js`:

```javascript
{
  id: 11,
  name: "New Policy Name",
  slug: "new-policy-slug",
  type: "new-policy",
  pdfUrl: "pdfs/new-policy.pdf",
  visible_on_policies_page: true,
  visible_on_logged_out: true,
  displayOrder: 11,
  lastUpdated: "2024-02-01"
}
```

### Changing Layout

Edit `css/layout.css` to adjust:
- Container widths (`--container-width`)
- Sidebar width (`--sidebar-width`)
- Spacing and padding
- Responsive breakpoints

### Updating Colors

All colors are defined in `css/variables.css` as CSS custom properties. Update them to match your brand.

## 🔗 URL Structure

The page uses hash-based routing:

```
/policies-page/index.html#cancellation-and-refund-policy
/policies-page/index.html#privacy-policy
/policies-page/index.html#terms-of-use
```

Benefits:
- Works without server-side routing
- Browser back/forward support
- Shareable links to specific policies
- No page reloads

## 📱 Responsive Breakpoints

- **Desktop**: 900px and above (sidebar + content side-by-side)
- **Tablet**: 768px - 900px (stacked layout)
- **Mobile**: Below 768px (simplified navigation)

## 🌐 Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Full support

## 🔧 Integration Options

### Option 1: Standalone Page
Host this as a separate page on your domain: `yoursite.com/policies/`

### Option 2: Integrate with Existing Site
Copy the content section and CSS into your existing layout.

### Option 3: API-Driven Version
Replace `policies-data.js` with API calls to fetch policies from a backend:

```javascript
async function getAllPolicies() {
  const response = await fetch('/api/policies');
  return await response.json();
}
```

## 📊 Performance

- **Page Size**: ~50-100KB (without PDFs)
- **Load Time**: <1 second
- **No Dependencies**: Pure vanilla JavaScript
- **PDF Lazy Loading**: PDFs only load when selected

## 🔐 Security Considerations

1. **PDF Storage**: Store PDFs on a secure CDN
2. **Access Control**: Add authentication if needed
3. **CORS**: Configure proper CORS headers for PDF embedding
4. **XSS Protection**: All content is safely escaped

## 🚀 Deployment

### GitHub Pages
1. Push to GitHub repository
2. Enable GitHub Pages in settings
3. Access at: `username.github.io/policies-page`

### Netlify/Vercel
1. Connect repository
2. Deploy (no build step needed)
3. Custom domain optional

### Traditional Hosting
1. Upload entire `policies-page/` folder via FTP
2. Access at: `yoursite.com/policies-page/`

## 📝 Notes

- Replace placeholder PDF URLs with actual CDN/server URLs
- Consider adding a search functionality for large policy collections
- Add analytics tracking if needed
- Test PDF rendering across different browsers
- Consider using PDF.js for better cross-browser compatibility

## 🆘 Troubleshooting

### PDFs Not Loading
- Check file paths in `policies-data.js`
- Ensure PDFs are in the correct folder
- Check browser console for errors
- Verify CORS headers if loading from external CDN

### Styling Issues
- Clear browser cache
- Check CSS file paths in `index.html`
- Verify CSS custom properties are supported

### Navigation Not Working
- Check JavaScript console for errors
- Ensure both JS files are loaded
- Verify hash URLs are correct

## 📄 License

This is a custom implementation for Split Lease. Modify as needed for your use case.

## 🤝 Support

For questions or issues, refer to the original Bubble app implementation or contact the development team.
