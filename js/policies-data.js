// Policy Documents Database
// This file contains all the policy documents data

const POLICIES_DATA = [
  {
    id: 1,
    name: "Background Check Consent Form",
    slug: "background-check-consent",
    type: "background-check",
    pdfUrl: "pdfs/background-check-consent.pdf",
    visible_on_policies_page: true,
    visible_on_logged_out: true,
    displayOrder: 1,
    lastUpdated: "2024-01-15"
  },
  {
    id: 2,
    name: "Cancellation and Refund Policy",
    slug: "cancellation-and-refund-policy",
    type: "cancellation-policy",
    pdfUrl: "pdfs/cancellation-refund-policy.pdf",
    visible_on_policies_page: true,
    visible_on_logged_out: true,
    displayOrder: 2,
    lastUpdated: "2024-01-20"
  },
  {
    id: 3,
    name: "Community Guidelines",
    slug: "community-guidelines",
    type: "community-guidelines",
    pdfUrl: "pdfs/community-guidelines.pdf",
    visible_on_policies_page: true,
    visible_on_logged_out: true,
    displayOrder: 3,
    lastUpdated: "2024-01-18"
  },
  {
    id: 4,
    name: "Cookie Policy",
    slug: "cookie-policy",
    type: "cookie-policy",
    pdfUrl: "pdfs/cookie-policy.pdf",
    visible_on_policies_page: true,
    visible_on_logged_out: true,
    displayOrder: 4,
    lastUpdated: "2024-01-10"
  },
  {
    id: 5,
    name: "Fees Overview",
    slug: "fees-overview",
    type: "fees-overview",
    pdfUrl: "pdfs/fees-overview.pdf",
    visible_on_policies_page: true,
    visible_on_logged_out: true,
    displayOrder: 5,
    lastUpdated: "2024-01-25"
  },
  {
    id: 6,
    name: "Host Guarantee",
    slug: "host-guarantee",
    type: "host-guarantee",
    pdfUrl: "pdfs/host-guarantee.pdf",
    visible_on_policies_page: true,
    visible_on_logged_out: true,
    displayOrder: 6,
    lastUpdated: "2024-01-12"
  },
  {
    id: 7,
    name: "Host Guarantee Terms and Conditions",
    slug: "host-guarantee-terms",
    type: "host-guarantee-terms",
    pdfUrl: "pdfs/host-guarantee-terms.pdf",
    visible_on_policies_page: true,
    visible_on_logged_out: true,
    displayOrder: 7,
    lastUpdated: "2024-01-12"
  },
  {
    id: 8,
    name: "Payments Terms of Service",
    slug: "payments-terms",
    type: "payments-terms",
    pdfUrl: "pdfs/payments-terms.pdf",
    visible_on_policies_page: true,
    visible_on_logged_out: true,
    displayOrder: 8,
    lastUpdated: "2024-01-22"
  },
  {
    id: 9,
    name: "Privacy Policy",
    slug: "privacy-policy",
    type: "privacy-policy",
    pdfUrl: "pdfs/privacy-policy.pdf",
    visible_on_policies_page: true,
    visible_on_logged_out: true,
    displayOrder: 9,
    lastUpdated: "2024-01-30"
  },
  {
    id: 10,
    name: "Terms of Use",
    slug: "terms-of-use",
    type: "terms-of-use",
    pdfUrl: "pdfs/terms-of-use.pdf",
    visible_on_policies_page: true,
    visible_on_logged_out: true,
    displayOrder: 10,
    lastUpdated: "2024-01-30"
  }
];

// Function to get all visible policies
function getAllPolicies() {
  return POLICIES_DATA.filter(policy => policy.visible_on_policies_page)
                      .sort((a, b) => a.displayOrder - b.displayOrder);
}

// Function to get policy by slug
function getPolicyBySlug(slug) {
  return POLICIES_DATA.find(policy => policy.slug === slug);
}

// Function to get policy by ID
function getPolicyById(id) {
  return POLICIES_DATA.find(policy => policy.id === id);
}

// Export functions for use in main.js
window.PoliciesDB = {
  getAllPolicies,
  getPolicyBySlug,
  getPolicyById,
  policies: POLICIES_DATA
};
