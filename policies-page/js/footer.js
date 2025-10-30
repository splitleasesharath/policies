/**
 * Split Lease Footer Component JavaScript
 * Handles referral and import listing functionality
 */

// Footer functionality
function initSplitLeaseFooter() {
  const referralRadios = document.querySelectorAll('input[name="referral-method"]');
  const referralInput = document.querySelector('.referral-input');
  const shareBtn = document.querySelector('.share-btn');
  const importBtn = document.querySelector('.import-btn');
  const importUrlInput = document.querySelector('.import-url-input');
  const importEmailInput = document.querySelector('.import-email-input');

  // Update referral input placeholder based on selected method
  if (referralRadios && referralInput) {
    referralRadios.forEach(radio => {
      radio.addEventListener('change', function() {
        if (this.value === 'text') {
          referralInput.placeholder = "Your friend's phone number";
          referralInput.type = 'tel';
        } else {
          referralInput.placeholder = "Your friend's email";
          referralInput.type = 'email';
        }
        referralInput.value = '';
      });
    });
  }

  // Handle referral submission
  if (shareBtn && referralInput) {
    shareBtn.addEventListener('click', function() {
      const contact = referralInput.value.trim();
      const method = document.querySelector('input[name="referral-method"]:checked')?.value || 'email';

      if (!contact) {
        alert('Please enter a contact');
        return;
      }

      // Validate based on method
      if (method === 'email') {
        if (!contact.includes('@') || !contact.includes('.')) {
          alert('Please enter a valid email address');
          return;
        }
      } else if (method === 'text') {
        // Basic phone validation
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(contact)) {
          alert('Please enter a valid phone number');
          return;
        }
      }

      // Here you would typically send this to your backend API
      console.log('Referral submitted:', { method, contact });

      // Show success message
      const originalText = shareBtn.textContent;
      shareBtn.textContent = 'Sent!';
      shareBtn.disabled = true;

      setTimeout(() => {
        shareBtn.textContent = originalText;
        shareBtn.disabled = false;
        referralInput.value = '';
      }, 2000);
    });
  }

  // Handle import listing submission
  if (importBtn && importUrlInput && importEmailInput) {
    importBtn.addEventListener('click', function() {
      const url = importUrlInput.value.trim();
      const email = importEmailInput.value.trim();

      if (!url || !email) {
        alert('Please fill in both fields');
        return;
      }

      // Validate URL
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        alert('Please enter a valid URL starting with http:// or https://');
        return;
      }

      // Validate email
      if (!email.includes('@') || !email.includes('.')) {
        alert('Please enter a valid email address');
        return;
      }

      // Here you would typically send this to your backend API
      console.log('Import listing submitted:', { url, email });

      // Show loading state
      const originalText = importBtn.textContent;
      importBtn.textContent = 'Importing...';
      importBtn.disabled = true;

      setTimeout(() => {
        importBtn.textContent = 'Submitted!';

        setTimeout(() => {
          importBtn.textContent = originalText;
          importBtn.disabled = false;
          importUrlInput.value = '';
          importEmailInput.value = '';
        }, 2000);
      }, 1000);
    });
  }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSplitLeaseFooter);
} else {
  initSplitLeaseFooter();
}

// Export function for external use
if (typeof window !== 'undefined') {
  window.initSplitLeaseFooter = initSplitLeaseFooter;
}
