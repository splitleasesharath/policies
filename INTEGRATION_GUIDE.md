# Integration Guide - Adding Policies Page to Existing Site

This guide helps you integrate the policies page into your existing Split Lease website.

## Integration Options

### Option 1: Standalone Page (Recommended)
Host the policies page separately and link to it from your main site.

**Pros:**
- Easy to deploy
- No conflicts with existing code
- Independent updates
- Can use different hosting

**Cons:**
- Separate deployment
- Different URL structure

### Option 2: Integrated Section
Copy the policies page code into your existing site structure.

**Pros:**
- Unified codebase
- Same URL structure
- Shared navigation/footer
- Consistent branding

**Cons:**
- More integration work
- Potential CSS conflicts
- Requires build process if using framework

---

## Option 1: Standalone Implementation

### Step 1: Deploy Policies Page

Deploy to a subdomain or subdirectory:
```
https://policies.splitlease.com
https://splitlease.com/policies/
```

### Step 2: Update Existing Site Links

Add links to the policies page in your main site:

```html
<!-- In footer -->
<a href="https://splitlease.com/policies/#privacy-policy">Privacy Policy</a>
<a href="https://splitlease.com/policies/#terms-of-use">Terms of Use</a>
<a href="https://splitlease.com/policies/#cancellation-and-refund-policy">Cancellation Policy</a>
```

### Step 3: Update Navigation

If you have a legal/policies link in your main navigation:
```html
<a href="https://splitlease.com/policies/">Policies</a>
```

### Step 4: Consistent Branding

Make sure the policies page matches your main site:
1. Use same logo
2. Match colors in `css/variables.css`
3. Update header/footer to match main site
4. Use same fonts

---

## Option 2: Full Integration

### For React Applications

#### 1. Convert to React Components

**Create PolicyPage Component:**
```jsx
// src/pages/PoliciesPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PolicySidebar from '../components/PolicySidebar';
import PolicyViewer from '../components/PolicyViewer';
import { getPolicies, getPolicyBySlug } from '../services/policiesService';
import './PoliciesPage.css';

const PoliciesPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [policies, setPolicies] = useState([]);
  const [currentPolicy, setCurrentPolicy] = useState(null);

  useEffect(() => {
    loadPolicies();
  }, []);

  useEffect(() => {
    if (slug) {
      loadPolicy(slug);
    } else if (policies.length > 0) {
      navigate(`/policies/${policies[0].slug}`);
    }
  }, [slug, policies]);

  const loadPolicies = async () => {
    const data = await getPolicies();
    setPolicies(data);
  };

  const loadPolicy = async (slug) => {
    const policy = await getPolicyBySlug(slug);
    setCurrentPolicy(policy);
  };

  return (
    <div className="policies-page">
      <div className="content-wrapper">
        <PolicySidebar
          policies={policies}
          activeSlug={slug}
          onPolicyClick={(slug) => navigate(`/policies/${slug}`)}
        />
        <PolicyViewer policy={currentPolicy} />
      </div>
    </div>
  );
};

export default PoliciesPage;
```

**Create Service:**
```javascript
// src/services/policiesService.js
import policiesData from '../data/policies.json';

export const getPolicies = async () => {
  return policiesData.filter(p => p.visible_on_policies_page);
};

export const getPolicyBySlug = async (slug) => {
  return policiesData.find(p => p.slug === slug);
};
```

**Add Route:**
```jsx
// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PoliciesPage from './pages/PoliciesPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Your existing routes */}
        <Route path="/policies" element={<PoliciesPage />} />
        <Route path="/policies/:slug" element={<PoliciesPage />} />
      </Routes>
    </BrowserRouter>
  );
}
```

#### 2. Copy CSS Files

Copy the CSS files to your React project:
```
src/
  styles/
    policies/
      variables.css
      layout.css
      components.css
```

Import in your component:
```jsx
import '../styles/policies/variables.css';
import '../styles/policies/layout.css';
import '../styles/policies/components.css';
```

---

### For Vue.js Applications

#### 1. Create Vue Components

**PoliciesPage.vue:**
```vue
<template>
  <div class="policies-page">
    <div class="content-wrapper">
      <PolicySidebar
        :policies="policies"
        :active-slug="currentSlug"
        @policy-selected="handlePolicyChange"
      />
      <PolicyViewer :policy="currentPolicy" />
    </div>
  </div>
</template>

<script>
import PolicySidebar from '@/components/PolicySidebar.vue';
import PolicyViewer from '@/components/PolicyViewer.vue';
import { getPolicies, getPolicyBySlug } from '@/services/policies';

export default {
  name: 'PoliciesPage',
  components: { PolicySidebar, PolicyViewer },
  data() {
    return {
      policies: [],
      currentPolicy: null,
      currentSlug: this.$route.params.slug
    };
  },
  async created() {
    this.policies = await getPolicies();
    if (this.currentSlug) {
      this.loadPolicy(this.currentSlug);
    } else if (this.policies.length > 0) {
      this.$router.push(`/policies/${this.policies[0].slug}`);
    }
  },
  methods: {
    async loadPolicy(slug) {
      this.currentPolicy = await getPolicyBySlug(slug);
    },
    handlePolicyChange(slug) {
      this.$router.push(`/policies/${slug}`);
    }
  },
  watch: {
    '$route.params.slug'(newSlug) {
      if (newSlug) {
        this.loadPolicy(newSlug);
      }
    }
  }
};
</script>

<style scoped>
@import '@/assets/css/policies/variables.css';
@import '@/assets/css/policies/layout.css';
@import '@/assets/css/policies/components.css';
</style>
```

**Add Route:**
```javascript
// router/index.js
{
  path: '/policies',
  name: 'Policies',
  component: () => import('@/views/PoliciesPage.vue')
},
{
  path: '/policies/:slug',
  name: 'PolicyDetail',
  component: () => import('@/views/PoliciesPage.vue')
}
```

---

### For Next.js Applications

#### 1. Create Page

```jsx
// pages/policies/[slug].js
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import PolicySidebar from '@/components/PolicySidebar';
import PolicyViewer from '@/components/PolicyViewer';
import { getPolicies, getPolicyBySlug } from '@/lib/policies';

export default function PoliciesPage({ policies }) {
  const router = useRouter();
  const { slug } = router.query;
  const [currentPolicy, setCurrentPolicy] = useState(null);

  useEffect(() => {
    if (slug) {
      const policy = getPolicyBySlug(slug);
      setCurrentPolicy(policy);
    }
  }, [slug]);

  return (
    <div className="policies-page">
      <PolicySidebar
        policies={policies}
        activeSlug={slug}
        onPolicyClick={(slug) => router.push(`/policies/${slug}`)}
      />
      <PolicyViewer policy={currentPolicy} />
    </div>
  );
}

export async function getStaticProps() {
  const policies = getPolicies();
  return { props: { policies } };
}

export async function getStaticPaths() {
  const policies = getPolicies();
  const paths = policies.map((policy) => ({
    params: { slug: policy.slug },
  }));
  return { paths, fallback: false };
}
```

---

## Sharing Header/Footer

### Method 1: Copy Markup

Copy the header and footer HTML from the policies page into your existing header/footer components.

### Method 2: Create Reusable Components

Extract header and footer into separate files that both sites can use:

```
shared/
  components/
    Header.html
    Footer.html
  css/
    header.css
    footer.css
```

Include via server-side includes, PHP, or your framework's component system.

### Method 3: Use Web Components

Create custom elements for shared UI:

```html
<split-lease-header></split-lease-header>
<split-lease-footer></split-lease-footer>
```

---

## CSS Integration

### Preventing Conflicts

#### 1. Namespace CSS

Wrap all policies page styles in a namespace:

```css
/* Before */
.sidebar { ... }

/* After */
.policies-page .sidebar { ... }
```

#### 2. Use CSS Modules (React/Vue)

```jsx
import styles from './PoliciesPage.module.css';

<div className={styles.sidebar}>...</div>
```

#### 3. Scope Variables

Use a prefix for CSS variables:
```css
:root {
  --policies-purple-main: #4A2B6B;
  --policies-gray-50: #F8F9FA;
}
```

---

## API Integration

### Create Backend Endpoints

Instead of static data, fetch from your backend:

**Node.js/Express:**
```javascript
// routes/policies.js
router.get('/api/policies', async (req, res) => {
  const policies = await Policy.find({ visible_on_policies_page: true });
  res.json(policies);
});

router.get('/api/policies/:slug', async (req, res) => {
  const policy = await Policy.findOne({ slug: req.params.slug });
  res.json(policy);
});
```

**Update Frontend:**
```javascript
// services/policiesService.js
export const getPolicies = async () => {
  const response = await fetch('/api/policies');
  return await response.json();
};

export const getPolicyBySlug = async (slug) => {
  const response = await fetch(`/api/policies/${slug}`);
  return await response.json();
};
```

---

## Authentication Integration

If policies require login:

```javascript
// Add auth check before loading policy
const loadPolicy = async (slug) => {
  // Check if user is authenticated
  if (!isAuthenticated() && policy.requiresAuth) {
    router.push('/login?redirect=/policies/' + slug);
    return;
  }

  const policy = await getPolicyBySlug(slug);
  setCurrentPolicy(policy);
};
```

---

## SEO Integration

### Add Meta Tags

```jsx
// React Helmet example
import { Helmet } from 'react-helmet';

<Helmet>
  <title>{currentPolicy?.name} | Split Lease</title>
  <meta name="description" content={`Split Lease ${currentPolicy?.name}`} />
  <link rel="canonical" href={`https://splitlease.com/policies/${slug}`} />
</Helmet>
```

### Generate Sitemap

Add policy pages to your sitemap.xml:
```xml
<url>
  <loc>https://splitlease.com/policies/privacy-policy</loc>
  <lastmod>2024-01-30</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

---

## Testing Integration

### Checklist

- [ ] Policies load correctly
- [ ] Navigation works
- [ ] PDFs display properly
- [ ] Styles don't conflict
- [ ] Mobile responsive
- [ ] Header/footer consistent
- [ ] Links work between main site and policies
- [ ] SEO meta tags present
- [ ] Analytics tracking works
- [ ] Authentication respected (if applicable)

---

## Rollout Strategy

### Phase 1: Soft Launch
1. Deploy to staging environment
2. Test thoroughly
3. Get stakeholder approval

### Phase 2: Parallel Deploy
1. Deploy policies page
2. Keep old policies links working
3. Add new links alongside old ones

### Phase 3: Full Migration
1. Update all links to new policies page
2. Set up redirects from old URLs
3. Monitor analytics

### Phase 4: Cleanup
1. Remove old policies code
2. Archive old files
3. Update documentation

---

## Migration from Bubble

If moving from Bubble policies page:

### 1. Export Policy Data

Export all policies from Bubble database to JSON or CSV.

### 2. Download PDFs

Download all PDF files from Bubble file storage.

### 3. Update URLs

Update any hardcoded Bubble URLs in your main site:
```javascript
// Before
const policyUrl = "https://splitlease.bubbleapps.io/version-test/policies";

// After
const policyUrl = "https://splitlease.com/policies";
```

### 4. Set Up Redirects

Redirect old Bubble URLs to new lite page:
```
/version-test/policies?document=123 → /policies/privacy-policy
```

---

## Support & Troubleshooting

### Common Issues

**CSS conflicts:**
- Use CSS modules or namespacing
- Check browser dev tools for conflicting styles
- Use more specific selectors

**React/Vue integration errors:**
- Check console for errors
- Verify all dependencies installed
- Ensure correct import paths

**PDFs not loading:**
- Check CORS headers
- Verify PDF URLs are correct
- Test PDF access directly in browser

---

## Need Help?

1. Check the main `README.md`
2. Review `DEPLOYMENT_GUIDE.md`
3. Check browser console for errors
4. Test in isolation first (standalone page)
5. Gradually integrate piece by piece

---

**Last Updated:** January 2025
