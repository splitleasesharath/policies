# Supabase Quick Start - 5 Minutes

Get your policies page connected to Supabase in 5 minutes!

---

## ✅ What's Already Done

The integration is **already complete**! Here's what's been set up:

- ✅ Supabase client configured
- ✅ JavaScript updated to fetch from database
- ✅ Async data loading implemented
- ✅ Error handling added
- ✅ Caching strategy in place

---

## 🚀 Next Steps

### Step 1: Add Your First Policy (2 minutes)

Open your Supabase SQL editor and run:

```sql
INSERT INTO zat_policiesdocuments (
  "_id",
  "Active",
  "Created By",
  "Created Date",
  "Modified Date",
  "Name",
  "PDF Version",
  "Slug",
  "Type",
  "visible on logged out?"
) VALUES (
  gen_random_uuid()::text,
  true,
  'admin',
  NOW(),
  NOW(),
  'Privacy Policy',
  'https://your-cdn.com/policies/privacy-policy.pdf',
  'privacy-policy',
  'privacy-policy',
  true
);
```

**Replace:**
- `https://your-cdn.com/policies/privacy-policy.pdf` with your actual PDF URL

---

### Step 2: Test the Page (1 minute)

1. Open `index.html` in your browser
2. Check browser console (F12) for:
   ```
   ✅ Supabase client initialized
   ✅ Policies DB (Supabase) initialized
   📡 Fetching policies from Supabase...
   ✅ Fetched policies: [...]
   📋 Loaded policies: [...]
   ```

3. You should see your policy in the sidebar!

---

### Step 3: Add More Policies (2 minutes)

Use this template for each policy:

```sql
INSERT INTO zat_policiesdocuments (
  "_id", "Active", "Created By", "Created Date", "Modified Date",
  "Name", "PDF Version", "Slug", "Type", "visible on logged out?"
) VALUES (
  gen_random_uuid()::text, true, 'admin', NOW(), NOW(),
  'Terms of Use',
  'https://your-cdn.com/policies/terms-of-use.pdf',
  'terms-of-use',
  'terms-of-use',
  true
);
```

**Add these common policies:**
- Privacy Policy
- Terms of Use
- Cancellation and Refund Policy
- Cookie Policy
- Community Guidelines

---

## 📋 Field Guide

| Field | What It Does | Example |
|-------|-------------|---------|
| **Name** | Display name in sidebar | "Privacy Policy" |
| **PDF Version** | URL to your PDF file | "https://cdn.com/privacy.pdf" |
| **Slug** | URL identifier | "privacy-policy" |
| **Active** | Show on page? | `true` or `false` |
| **visible on logged out?** | Show to everyone? | `true` |

---

## 🔐 Security Setup (Optional but Recommended)

Enable Row Level Security:

```sql
-- Enable RLS
ALTER TABLE zat_policiesdocuments ENABLE ROW LEVEL SECURITY;

-- Allow public to read active policies
CREATE POLICY "Public read active policies"
ON zat_policiesdocuments
FOR SELECT
TO anon
USING (Active = true AND "visible on logged out?" = true);
```

---

## ✨ How It Works

```
User visits page
    ↓
Supabase fetches active policies
    ↓
Sidebar shows policy names
    ↓
User clicks policy
    ↓
PDF loads from "PDF Version" URL
```

---

## 🐛 Quick Troubleshooting

**No policies showing?**
```javascript
// In browser console (F12)
const policies = await window.PoliciesDB.getAllPolicies();
console.log(policies);
```

**PDF not loading?**
- Check the PDF URL works in a new browser tab
- Ensure PDF is publicly accessible
- Check CORS settings if hosted on external server

---

## 🎯 That's It!

Your policies page is now connected to Supabase!

**Next:**
- Add all your policy documents
- Upload PDFs to your CDN
- Test on different devices
- Deploy to production

**Full Documentation:**
- See `SUPABASE_INTEGRATION.md` for complete details
- See `README.md` for general page setup

---

**Need Help?**
Check the browser console for detailed error messages and logs.

---

**Last Updated:** January 30, 2025
**Version:** 1.0
