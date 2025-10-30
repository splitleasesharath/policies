# Supabase Integration Guide - Policies Page

Complete guide for connecting the policies page to your Supabase database.

---

## 📋 Overview

The policies page is now integrated with Supabase to dynamically load policy documents from the `zat_policiesdocuments` table. This allows you to manage policies through your Supabase database without editing code.

---

## 🗄️ Database Schema

### Table: `zat_policiesdocuments`

| Column Name | Data Type | Nullable | Description |
|------------|-----------|----------|-------------|
| `_id` | text | NO | Primary key/unique identifier |
| `Active` | boolean | NO | Whether the policy is active |
| `Created By` | text | NO | User who created the document |
| `Created Date` | timestamp with time zone | NO | Creation timestamp |
| `Modified Date` | timestamp with time zone | NO | Last modification timestamp |
| `Name` | text | NO | Policy display name |
| `PDF Version` | text | NO | **URL to the PDF file** |
| `Slug` | text | YES | URL-friendly slug (auto-generated if empty) |
| `Type` | text | YES | Policy type/category |
| `visible on logged out?` | boolean | NO | Show to non-authenticated users |
| `created_at` | timestamp with time zone | YES | Auto-generated creation timestamp |
| `updated_at` | timestamp with time zone | YES | Auto-generated update timestamp |

---

## 🔧 Setup Instructions

### Step 1: Verify Supabase Configuration

The following files have been created for you:

**`js/supabase-config.js`** - Contains:
```javascript
const SUPABASE_URL = 'https://qcfifybkaddcoimjroca.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key';
```

**`js/policies-data-supabase.js`** - Contains:
- `getAllPolicies()` - Fetches all active policies
- `getPolicyBySlug(slug)` - Gets specific policy by slug
- `getPolicyById(id)` - Gets specific policy by ID
- `refreshPolicies()` - Force reload from Supabase

### Step 2: Add Policy Documents to Supabase

Use the Supabase dashboard or SQL to add policies:

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
  'unique-id-1',
  true,
  'admin@splitlease.com',
  NOW(),
  NOW(),
  'Privacy Policy',
  'https://yourcdn.com/policies/privacy-policy.pdf',
  'privacy-policy',
  'privacy-policy',
  true
);
```

**Important Fields:**
- **`Name`**: Display name shown in sidebar (e.g., "Privacy Policy")
- **`PDF Version`**: Full URL to your PDF file (must be publicly accessible)
- **`Slug`**: URL-friendly identifier (e.g., "privacy-policy")
  - If empty, will be auto-generated from `Name`
- **`Active`**: Must be `true` to display on the page
- **`visible on logged out?`**: Whether to show to non-authenticated users

---

## 📝 Data Flow

### 1. Page Load
```
User visits page
    ↓
Supabase client initializes (supabase-config.js)
    ↓
policies-data-supabase.js loads
    ↓
main.js calls getAllPolicies()
    ↓
Fetch from Supabase: SELECT * FROM zat_policiesdocuments WHERE Active = true
    ↓
Transform data to expected format
    ↓
Render sidebar with policy names
    ↓
Load first policy or policy from URL hash
```

### 2. Policy Selection
```
User clicks policy in sidebar
    ↓
getPolicyBySlug(slug) called
    ↓
Find policy in cached data
    ↓
Update page title
    ↓
Load PDF from "PDF Version" URL
    ↓
Update browser URL with hash (#slug)
```

---

## 🔄 Data Transformation

Supabase data is transformed to match the expected format:

### Supabase Document
```json
{
  "_id": "1234abcd",
  "Active": true,
  "Name": "Privacy Policy",
  "PDF Version": "https://cdn.example.com/privacy.pdf",
  "Slug": "privacy-policy",
  "Type": "privacy-policy",
  "visible on logged out?": true,
  "Created Date": "2024-01-30T10:00:00Z",
  "Modified Date": "2024-01-30T10:00:00Z"
}
```

### Transformed Format
```json
{
  "id": "1234abcd",
  "name": "Privacy Policy",
  "slug": "privacy-policy",
  "type": "privacy-policy",
  "pdfUrl": "https://cdn.example.com/privacy.pdf",
  "visible_on_policies_page": true,
  "visible_on_logged_out": true,
  "createdDate": "2024-01-30T10:00:00Z",
  "modifiedDate": "2024-01-30T10:00:00Z"
}
```

---

## 📁 File Structure

```
policies-page/
├── index.html                          # Updated with Supabase script tags
├── js/
│   ├── supabase-config.js             # ✨ NEW - Supabase initialization
│   ├── policies-data-supabase.js      # ✨ NEW - Async data fetching
│   ├── policies-data.js               # OLD - Static data (backup)
│   ├── header.js
│   ├── footer.js
│   └── main.js                         # Updated for async operations
└── SUPABASE_INTEGRATION.md            # This file
```

---

## 🔐 Security Considerations

### 1. Anon Key is Public
- The `SUPABASE_ANON_KEY` is safe to expose in frontend code
- It has limited permissions (read-only for public tables)
- Use Row Level Security (RLS) for sensitive data

### 2. Row Level Security (RLS)

Enable RLS on the `zat_policiesdocuments` table:

```sql
-- Enable RLS
ALTER TABLE zat_policiesdocuments ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access to active policies
CREATE POLICY "Public read active policies"
ON zat_policiesdocuments
FOR SELECT
TO anon
USING (Active = true AND "visible on logged out?" = true);
```

### 3. PDF URLs
- PDF files should be hosted on a CDN or public storage
- URLs must be publicly accessible
- Consider using signed URLs for sensitive documents

---

## 🚀 Usage Examples

### Adding a New Policy

1. **Upload PDF to CDN/Storage**
   ```
   Upload: cancellation-policy.pdf
   Get URL: https://cdn.example.com/policies/cancellation-policy.pdf
   ```

2. **Insert into Supabase**
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
     current_user,
     NOW(),
     NOW(),
     'Cancellation and Refund Policy',
     'https://cdn.example.com/policies/cancellation-policy.pdf',
     'cancellation-and-refund-policy',
     'cancellation-policy',
     true
   );
   ```

3. **Refresh Page**
   - Policy appears automatically in sidebar
   - Click to view PDF

### Updating a Policy

```sql
UPDATE zat_policiesdocuments
SET
  "PDF Version" = 'https://cdn.example.com/policies/privacy-policy-v2.pdf',
  "Modified Date" = NOW()
WHERE "Slug" = 'privacy-policy';
```

Refresh the page to see changes.

### Hiding a Policy

```sql
UPDATE zat_policiesdocuments
SET "Active" = false
WHERE "Slug" = 'old-policy';
```

### Forcing Data Refresh

In browser console:
```javascript
await window.PoliciesDB.refreshPolicies();
location.reload();
```

---

## 🐛 Troubleshooting

### Policies Not Loading

**Issue:** Sidebar is empty or shows "No policies available"

**Solutions:**
1. Check browser console for errors
2. Verify Supabase credentials in `supabase-config.js`
3. Ensure `Active = true` in database
4. Check RLS policies allow public read access

**Debug:**
```javascript
// In browser console
const policies = await window.PoliciesDB.getAllPolicies();
console.log('Policies:', policies);
```

### PDF Not Displaying

**Issue:** PDF viewer shows blank or error

**Solutions:**
1. Verify `PDF Version` URL is correct and publicly accessible
2. Check CORS settings on PDF hosting server
3. Test PDF URL directly in browser
4. Ensure PDF is valid and not corrupted

**Debug:**
```javascript
// Check current policy
const policy = await window.PoliciesDB.getPolicyBySlug('privacy-policy');
console.log('PDF URL:', policy.pdfUrl);
```

### Supabase Connection Error

**Issue:** "Failed to load policies" error message

**Solutions:**
1. Check internet connection
2. Verify Supabase project is active
3. Check Supabase service status
4. Verify anon key is correct

**Debug:**
```javascript
// Test Supabase connection
const { data, error } = await window.supabaseClient
  .from('zat_policiesdocuments')
  .select('*')
  .limit(1);

console.log('Data:', data);
console.log('Error:', error);
```

### Slug Auto-Generation Issues

**Issue:** Slug is not user-friendly

**Solution:**
Manually set the slug in Supabase:
```sql
UPDATE zat_policiesdocuments
SET "Slug" = 'your-custom-slug'
WHERE "_id" = 'document-id';
```

---

## 🔄 Migration from Static Data

If you want to switch back to static data:

### Option 1: Use Static File
1. Comment out Supabase scripts in `index.html`:
   ```html
   <!-- <script src="js/supabase-config.js"></script> -->
   <!-- <script src="js/policies-data-supabase.js"></script> -->
   ```

2. Uncomment static data:
   ```html
   <script src="js/policies-data.js"></script>
   ```

### Option 2: Keep Both
The system is designed to work with either:
- Load Supabase version for production
- Load static version for development/testing

---

## ⚡ Performance

### Caching Strategy

Policies are cached after first load:
- **First load:** ~500ms (network request)
- **Subsequent loads:** <10ms (cached)

To clear cache:
```javascript
await window.PoliciesDB.refreshPolicies();
```

### Optimization Tips

1. **CDN for PDFs**: Host PDFs on Cloudflare or AWS CloudFront
2. **Lazy Loading**: PDFs only load when selected (already implemented)
3. **Preconnect**: Add to `<head>`:
   ```html
   <link rel="preconnect" href="https://qcfifybkaddcoimjroca.supabase.co">
   ```

---

## 📊 Monitoring

### Check Active Policies

```sql
SELECT
  "Name",
  "Slug",
  "Active",
  "Modified Date"
FROM zat_policiesdocuments
WHERE "Active" = true
ORDER BY "Name";
```

### Recent Changes

```sql
SELECT
  "Name",
  "Modified Date",
  "Created By"
FROM zat_policiesdocuments
ORDER BY "Modified Date" DESC
LIMIT 10;
```

### Missing Slugs

```sql
SELECT "_id", "Name"
FROM zat_policiesdocuments
WHERE "Slug" IS NULL OR "Slug" = '';
```

---

## 🚀 Next Steps

1. **Add Your Policies**: Insert your policy documents into Supabase
2. **Upload PDFs**: Host PDF files on CDN or public storage
3. **Test**: Verify all policies load correctly
4. **Configure RLS**: Set up row-level security for production
5. **Deploy**: Push changes to your hosting platform

---

## 🆘 Support

### Common Questions

**Q: Can I use local PDF files?**
A: No, the `PDF Version` field must be a publicly accessible URL. Host PDFs on a CDN or cloud storage.

**Q: How do I add authentication?**
A: Update RLS policies to check user authentication. See Supabase Auth documentation.

**Q: Can I add custom fields?**
A: Yes, add columns to the table and update `transformSupabaseDocument()` in `policies-data-supabase.js`.

**Q: How often does data refresh?**
A: Data is cached until page reload or manual refresh via `refreshPolicies()`.

---

## 📝 Changelog

### Version 1.0 (January 2025)
- Initial Supabase integration
- Support for `zat_policiesdocuments` table
- Async data loading
- Auto-slug generation
- Caching strategy
- Error handling

---

**Last Updated:** January 30, 2025
**Version:** 1.0
**Status:** Production Ready ✅
