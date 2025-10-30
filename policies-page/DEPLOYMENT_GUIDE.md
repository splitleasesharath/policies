# Deployment Guide - Split Lease Policies Page

This guide will help you deploy the policies page from development to production.

## Pre-Deployment Checklist

### ✅ Content
- [ ] All PDF files are uploaded to the `pdfs/` folder or CDN
- [ ] PDF URLs in `js/policies-data.js` are correct
- [ ] All policy names and descriptions are accurate
- [ ] Download links are tested and working

### ✅ Branding
- [ ] Logo URL is updated in `index.html`
- [ ] Company name is correct throughout
- [ ] Brand colors are set in `css/variables.css`
- [ ] Footer content is updated

### ✅ Links
- [ ] All header navigation links point to correct pages
- [ ] Footer links are valid
- [ ] Emergency assistance button is configured
- [ ] "Explore Rentals" button links correctly

### ✅ Testing
- [ ] Test on Chrome, Firefox, Safari
- [ ] Test on mobile devices
- [ ] Test all policy navigation
- [ ] Test PDF viewing and downloading
- [ ] Test back-to-top functionality
- [ ] Test browser back/forward buttons

### ✅ Performance
- [ ] PDFs are optimized for web
- [ ] Images are compressed
- [ ] No console errors
- [ ] Page loads in under 2 seconds

---

## Deployment Options

### Option 1: GitHub Pages (Free)

**Best for:** Static hosting, version control, free SSL

#### Steps:

1. **Create GitHub Repository**
   ```bash
   cd policies-page
   git init
   git add .
   git commit -m "Initial commit: Policies page"
   ```

2. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/yourusername/policies-page.git
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to repository Settings
   - Navigate to "Pages" section
   - Select source: `main` branch, `/ (root)` folder
   - Save

4. **Access Your Site**
   - URL: `https://yourusername.github.io/policies-page/`
   - Custom domain optional

---

### Option 2: Netlify (Recommended)

**Best for:** Easy deployment, automatic HTTPS, custom domains

#### Steps:

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Deploy**
   ```bash
   cd policies-page
   netlify deploy --prod
   ```

4. **Configure**
   - Set publish directory: `.` (current directory)
   - Netlify will provide a URL: `https://random-name.netlify.app`

5. **Custom Domain** (Optional)
   - In Netlify dashboard: Domain Settings → Add custom domain
   - Add DNS records as instructed

#### Netlify Configuration File

Create `netlify.toml` in the root:

```toml
[build]
  publish = "."

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"

[[headers]]
  for = "*.pdf"
  [headers.values]
    Content-Type = "application/pdf"
    Cache-Control = "public, max-age=31536000"
```

---

### Option 3: Vercel

**Best for:** Fast deployment, edge network, automatic HTTPS

#### Steps:

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd policies-page
   vercel --prod
   ```

4. **Custom Domain**
   - In Vercel dashboard: Settings → Domains
   - Add your domain and follow DNS instructions

---

### Option 4: Traditional Web Hosting (cPanel, FTP)

**Best for:** Existing hosting, full control

#### Steps:

1. **Prepare Files**
   - Ensure all PDFs are in place
   - Test locally one more time
   - Zip the `policies-page` folder

2. **Upload via FTP**
   ```
   Use FileZilla or similar FTP client:
   - Host: ftp.yoursite.com
   - Username: your-username
   - Password: your-password
   - Upload to: /public_html/policies/
   ```

3. **Upload via cPanel**
   - Login to cPanel
   - File Manager → public_html
   - Create `policies` folder
   - Upload all files
   - Extract if zipped

4. **Access**
   - URL: `https://yoursite.com/policies/`

---

### Option 5: AWS S3 + CloudFront

**Best for:** Scalability, CDN, high traffic

#### Steps:

1. **Create S3 Bucket**
   ```bash
   aws s3 mb s3://your-policies-bucket
   ```

2. **Upload Files**
   ```bash
   cd policies-page
   aws s3 sync . s3://your-policies-bucket --acl public-read
   ```

3. **Enable Static Website Hosting**
   - In S3 bucket properties
   - Enable "Static website hosting"
   - Index document: `index.html`

4. **Create CloudFront Distribution**
   - Origin: Your S3 bucket
   - Enable HTTPS
   - Set cache behaviors

5. **Configure Custom Domain**
   - Add CNAME record pointing to CloudFront URL
   - Add SSL certificate in ACM

---

## Post-Deployment

### 1. Test Production Site

```bash
# Test all policies load
# Test PDF viewing
# Test mobile responsiveness
# Test download functionality
```

### 2. Setup Monitoring

**Google Analytics** (Optional)

Add to `index.html` before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 3. Setup CDN for PDFs (Recommended)

**Using AWS S3 + CloudFront:**

1. Upload PDFs to S3 bucket
2. Get CloudFront URLs
3. Update `js/policies-data.js`:

```javascript
pdfUrl: "https://d123456abcdef.cloudfront.net/policies/privacy-policy.pdf"
```

**Using Cloudflare:**

1. Upload PDFs to your hosting
2. Enable Cloudflare for your domain
3. PDFs automatically cached at edge locations

---

## Environment-Specific Configuration

### Development
```javascript
// js/policies-data.js
const BASE_URL = 'pdfs/'; // Local files
```

### Production
```javascript
// js/policies-data.js
const BASE_URL = 'https://cdn.yoursite.com/policies/'; // CDN
```

Update all `pdfUrl` values:
```javascript
pdfUrl: BASE_URL + 'privacy-policy.pdf'
```

---

## SSL/HTTPS Configuration

### Free SSL Options:

1. **Let's Encrypt** (Traditional hosting)
   - Most hosts offer free Let's Encrypt SSL
   - Enable in cPanel or hosting dashboard

2. **Cloudflare** (Any hosting)
   - Sign up for free Cloudflare account
   - Add your domain
   - Enable "Full" SSL mode
   - Instant HTTPS

3. **Netlify/Vercel/GitHub Pages**
   - Automatic HTTPS included
   - No configuration needed

---

## Custom Domain Setup

### DNS Configuration

Add these records to your DNS provider:

**For Netlify:**
```
Type: CNAME
Name: policies (or @)
Value: your-site.netlify.app
```

**For Vercel:**
```
Type: CNAME
Name: policies (or @)
Value: cname.vercel-dns.com
```

**For GitHub Pages:**
```
Type: CNAME
Name: policies (or @)
Value: yourusername.github.io
```

---

## Maintenance & Updates

### Update Policy Content

1. Replace PDF file in `pdfs/` folder or CDN
2. Update `lastUpdated` date in `policies-data.js`
3. Clear cache if using CDN
4. Test changes

### Add New Policy

1. Add PDF file
2. Add entry to `POLICIES_DATA` array
3. Deploy changes
4. Test new policy loads correctly

---

## Troubleshooting

### PDFs Not Loading in Production

**Issue:** PDFs work locally but not in production

**Solutions:**
- Check file paths are correct (case-sensitive on Linux servers)
- Verify CORS headers for external PDFs
- Check file permissions (should be 644)
- Ensure PDFs are uploaded to correct directory

### Mixed Content Warnings

**Issue:** Page is HTTPS but resources are HTTP

**Solution:**
- Ensure all resources use HTTPS
- Update any HTTP URLs to HTTPS
- Use protocol-relative URLs: `//domain.com/file.pdf`

### Page Not Found (404)

**Issue:** URL returns 404 error

**Solution:**
- Check file is in correct directory
- Verify index.html exists
- Check web server configuration
- Ensure URL is correct

---

## Performance Optimization

### 1. Enable Compression

**Netlify/Vercel:** Automatic

**Apache (.htaccess):**
```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript
</IfModule>
```

**Nginx:**
```nginx
gzip on;
gzip_types text/css application/javascript application/json;
```

### 2. Cache Headers

```apache
# .htaccess
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType application/pdf "access plus 1 month"
</IfModule>
```

### 3. PDF Optimization

Use tools like:
- Adobe Acrobat Pro (Optimize PDF)
- Smallpdf.com
- PDF Compressor

Target size: Under 5MB per PDF

---

## Security Best Practices

1. **No Sensitive Data:** Don't include API keys or secrets in frontend code
2. **HTTPS Only:** Always use HTTPS in production
3. **Content Security Policy:** Add CSP headers
4. **Regular Updates:** Keep monitoring for security issues

---

## Rollback Plan

If deployment fails:

1. **Revert Git Commit:**
   ```bash
   git revert HEAD
   git push origin main
   ```

2. **Restore Backup:**
   - Keep previous version as backup
   - Replace files with backup version

3. **DNS Rollback:**
   - Point domain back to previous server
   - Wait for DNS propagation (5-30 minutes)

---

## Support Resources

- [Netlify Docs](https://docs.netlify.com)
- [Vercel Docs](https://vercel.com/docs)
- [GitHub Pages Docs](https://docs.github.com/pages)
- [MDN Web Docs](https://developer.mozilla.org)

---

## Deployment Checklist Summary

- [ ] All content reviewed and updated
- [ ] PDFs uploaded and accessible
- [ ] Site tested locally
- [ ] Deployment method chosen
- [ ] Files uploaded/deployed
- [ ] Custom domain configured (if applicable)
- [ ] SSL/HTTPS enabled
- [ ] Production site tested
- [ ] Analytics configured (optional)
- [ ] CDN configured for PDFs (optional)
- [ ] Backup created
- [ ] Stakeholders notified

---

**Last Updated:** January 2025
**Version:** 1.0
