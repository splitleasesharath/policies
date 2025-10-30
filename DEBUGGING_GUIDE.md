# Debugging Guide - Policies Page Not Showing Documents

## Issue Report
**Problem:** After Supabase integration, policy document names are not showing in the Content sidebar.

## What We Know

### ✅ Database is Working
- Table: `zat_policiesdocuments` exists
- 5+ policies found with Active=true
- Data structure confirmed:
  - **Name** field: "Community Guidelines", "Privacy Policy", etc.
  - **PDF Version** field: Contains valid S3 URLs
  - **Slug** field: Populated correctly
  - **Active** field: Set to `true`
  - **visible on logged out?**: Set to `true`

### ✅ Configuration is Correct
- Supabase URL: `https://qcfifybkaddcoimjroca.supabase.co`
- Anon Key: Valid and matches project
- Row Level Security (RLS): **DISABLED** (so public access should work)

## Debugging Steps

### Step 1: Test Supabase Connection

I've created a test page to verify the connection works.

**Open this file in your browser:**
```
policies-page/test-supabase.html
```

**What to check:**
1. Does it say "✅ Supabase client is initialized"?
2. Click "Fetch Policies" - do you see policy names?
3. Check browser console (F12) for any errors

### Step 2: Check Main Page Console

**Open the main policies page:**
```
policies-page/index.html
```

**Open browser console (F12) and look for:**
```
✅ Supabase client initialized
✅ Policies DB (Supabase) initialized
📡 Fetching policies from Supabase...
✅ Fetched policies: [...]
📋 Loaded policies: [...]
```

**If you see errors instead:**
- Copy the error message
- Check what line number it's on
- This will tell us exactly what's failing

### Step 3: Manual Test in Console

With the main page open, run this in the browser console:

```javascript
// Test 1: Check if Supabase client exists
console.log('Supabase client:', window.supabaseClient);

// Test 2: Check if PoliciesDB exists
console.log('PoliciesDB:', window.PoliciesDB);

// Test 3: Try to fetch policies
const policies = await window.PoliciesDB.getAllPolicies();
console.log('Policies:', policies);

// Test 4: Check if policies have the right format
console.log('First policy:', policies[0]);
```

## Common Issues and Solutions

### Issue 1: "supabaseClient is undefined"
**Cause:** Supabase CDN script didn't load
**Solution:** Check internet connection, try reloading page

### Issue 2: "PoliciesDB is undefined"
**Cause:** policies-data-supabase.js didn't load
**Solution:** Check that index.html has correct script tags in this order:
```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="js/supabase-config.js"></script>
<script src="js/policies-data-supabase.js"></script>
<script src="js/main.js"></script>
```

### Issue 3: Policies array is empty
**Cause:** Data fetching or transformation issue
**Solution:** Run raw query in console:
```javascript
const { data, error } = await window.supabaseClient
  .from('zat_policiesdocuments')
  .select('*')
  .eq('Active', true);
console.log('Raw data:', data);
console.log('Error:', error);
```

### Issue 4: CORS Error
**Cause:** Supabase project settings
**Solution:** This shouldn't happen with the anon key, but check Supabase dashboard → Settings → API

### Issue 5: Sidebar Shows "Loading..." Forever
**Cause:** JavaScript error preventing init() from completing
**Solution:** Check console for specific error, likely in main.js init() function

## Script Loading Order

**CRITICAL:** Scripts must load in this exact order:

1. **Supabase CDN** - Provides `window.supabase` object
2. **supabase-config.js** - Creates `window.supabaseClient`
3. **policies-data-supabase.js** - Creates `window.PoliciesDB` functions
4. **main.js** - Uses PoliciesDB to fetch and display policies

Current index.html has:
```html
<!-- Supabase JavaScript Client -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

<!-- JavaScript Files -->
<script src="js/header.js"></script>
<script src="js/footer.js"></script>

<!-- Supabase Integration -->
<script src="js/supabase-config.js"></script>
<script src="js/policies-data-supabase.js"></script>

<!-- Main Page Logic -->
<script src="js/main.js"></script>
```

This is correct! ✅

## Expected Data Flow

```
Page loads
    ↓
DOMContentLoaded fires
    ↓
PoliciesPage constructor runs
    ↓
init() function runs (async)
    ↓
Shows "Loading policies..." in title
    ↓
Calls await window.PoliciesDB.getAllPolicies()
    ↓
PoliciesDB.getAllPolicies() checks cache
    ↓
Cache is null, so calls fetchPoliciesFromSupabase()
    ↓
Supabase query: SELECT * FROM zat_policiesdocuments WHERE Active = true
    ↓
Transform each document with transformSupabaseDocument()
    ↓
Store in cachedPolicies
    ↓
Return filtered and sorted policies
    ↓
renderSidebar() creates nav items
    ↓
checkURLAndLoadPolicy() loads first policy
```

## Sample Data From Database

Here's what's actually in your database:

```json
{
  "_id": "1601441974699x458851143272740200",
  "Name": "Community Guidelines",
  "PDF Version": "https://s3.amazonaws.com/appforest_uf/f1666818611942x385598094024033100/Community%20Guidelines%2010-26.pdf",
  "Slug": "community-guidelines",
  "Active": true,
  "visible on logged out?": true
}
```

After transformation, it becomes:

```json
{
  "id": "1601441974699x458851143272740200",
  "name": "Community Guidelines",
  "pdfUrl": "https://s3.amazonaws.com/appforest_uf/f1666818611942x385598094024033100/Community%20Guidelines%2010-26.pdf",
  "slug": "community-guidelines",
  "visible_on_policies_page": true,
  "visible_on_logged_out": true
}
```

## Testing Checklist

- [ ] Open test-supabase.html and click "Fetch Policies"
- [ ] Verify you see 5+ policy names
- [ ] Open index.html
- [ ] Open browser console (F12)
- [ ] Look for console.log messages
- [ ] Check for any red error messages
- [ ] Run manual tests from Step 3 above
- [ ] Check if sidebar has policy names
- [ ] Click a policy name to test if PDF loads

## Next Steps

1. **Run the test page first** - This isolates the Supabase connection
2. **Check browser console on main page** - Look for specific errors
3. **Share the console output** - This will tell us exactly what's failing

## Quick Fix to Try

If the test page works but the main page doesn't, try hard-refreshing the main page:
- **Windows:** Ctrl + Shift + R
- **Mac:** Cmd + Shift + R

This clears the browser cache and reloads all scripts.

---

**Created:** January 30, 2025
**Status:** Awaiting test results
