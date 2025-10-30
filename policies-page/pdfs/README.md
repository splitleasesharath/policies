# PDF Documents Folder

Place your policy PDF documents in this folder.

## Required Files

The following PDF files should be added here:

1. `background-check-consent.pdf` - Background Check Consent Form
2. `cancellation-refund-policy.pdf` - Cancellation and Refund Policy
3. `community-guidelines.pdf` - Community Guidelines
4. `cookie-policy.pdf` - Cookie Policy
5. `fees-overview.pdf` - Fees Overview
6. `host-guarantee.pdf` - Host Guarantee
7. `host-guarantee-terms.pdf` - Host Guarantee Terms and Conditions
8. `payments-terms.pdf` - Payments Terms of Service
9. `privacy-policy.pdf` - Privacy Policy
10. `terms-of-use.pdf` - Terms of Use

## Important Notes

- **File Names**: Ensure PDF file names match exactly what's specified in `js/policies-data.js`
- **File Format**: All files should be in PDF format
- **File Size**: Optimize PDFs for web (recommended: under 5MB each)
- **Accessibility**: Ensure PDFs are accessible (tagged, searchable text)

## Alternative: Use CDN URLs

Instead of storing PDFs locally, you can use URLs from a CDN. Update the `pdfUrl` property in `js/policies-data.js`:

```javascript
{
  id: 1,
  name: "Privacy Policy",
  slug: "privacy-policy",
  pdfUrl: "https://your-cdn.com/documents/privacy-policy.pdf",
  // ... rest of properties
}
```

## Creating Sample PDFs for Testing

If you need placeholder PDFs for testing:

1. Create a simple document in Word/Google Docs
2. Add some sample text
3. Export as PDF
4. Save with the correct filename in this folder

## CORS Considerations

If loading PDFs from an external source, ensure:
- The server sends proper CORS headers
- The PDF endpoint is accessible
- Authentication is handled if required
