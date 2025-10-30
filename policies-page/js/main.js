// Main JavaScript for Policies Page

class PoliciesPage {
  constructor() {
    this.policies = [];
    this.currentPolicy = null;
    this.windowWidth = window.innerWidth;

    // DOM Elements
    this.policyNav = document.getElementById('policyNav');
    this.policyTitle = document.getElementById('policyTitle');
    this.pdfViewer = document.getElementById('pdfViewer');
    this.downloadLink = document.getElementById('downloadLink');
    this.backToTopBtn = document.getElementById('backToTop');

    this.init();
  }

  async init() {
    try {
      // Show loading state
      if (this.policyTitle) {
        this.policyTitle.textContent = 'Loading policies...';
      }

      // Load policies from Supabase (async)
      this.policies = await window.PoliciesDB.getAllPolicies();

      console.log('📋 Loaded policies:', this.policies);

      // Render sidebar navigation
      this.renderSidebar();

      // Setup event listeners
      this.setupEventListeners();

      // Check URL and load appropriate policy
      await this.checkURLAndLoadPolicy();

      // Setup responsive behavior
      this.setupResponsive();

    } catch (error) {
      console.error('Error initializing policies page:', error);
      this.showError('Failed to load policies. Please refresh the page.');
    }
  }

  renderSidebar() {
    if (!this.policyNav) return;

    this.policyNav.innerHTML = this.policies.map(policy => `
      <a href="#${policy.slug}"
         class="nav-item"
         data-slug="${policy.slug}"
         data-id="${policy.id}">
        ${policy.name}
      </a>
    `).join('');
  }

  setupEventListeners() {
    // Sidebar navigation clicks
    if (this.policyNav) {
      this.policyNav.addEventListener('click', (e) => {
        if (e.target.classList.contains('nav-item')) {
          e.preventDefault();
          const slug = e.target.dataset.slug;
          this.loadPolicy(slug);
        }
      });
    }

    // Back to top button
    if (this.backToTopBtn) {
      this.backToTopBtn.addEventListener('click', () => {
        this.scrollToTop();
      });
    }

    // Handle browser back/forward buttons
    window.addEventListener('popstate', async () => {
      await this.checkURLAndLoadPolicy();
    });

    // Handle hash changes
    window.addEventListener('hashchange', async () => {
      await this.checkURLAndLoadPolicy();
    });
  }

  async checkURLAndLoadPolicy() {
    // Get slug from URL hash
    const hash = window.location.hash.substring(1); // Remove #

    if (hash) {
      const policy = await window.PoliciesDB.getPolicyBySlug(hash);
      if (policy) {
        await this.loadPolicy(hash, false); // false = don't update URL
        return;
      }
    }

    // No valid hash - load first policy
    if (this.policies.length > 0) {
      await this.loadPolicy(this.policies[0].slug);
    } else {
      this.showError('No policies available.');
    }
  }

  async loadPolicy(slug, updateURL = true) {
    const policy = await window.PoliciesDB.getPolicyBySlug(slug);

    if (!policy) {
      console.error('Policy not found:', slug);
      this.showError('Policy not found.');
      return;
    }

    this.currentPolicy = policy;

    // Update page title
    if (this.policyTitle) {
      this.policyTitle.textContent = policy.name;
    }

    // Update document title
    document.title = `${policy.name} | Split Lease`;

    // Update PDF viewer
    if (this.pdfViewer) {
      this.pdfViewer.src = policy.pdfUrl;
    }

    // Update download link
    if (this.downloadLink) {
      this.downloadLink.href = policy.pdfUrl;
    }

    // Update active state in sidebar
    this.updateActiveNavItem(slug);

    // Update URL if needed
    if (updateURL) {
      window.history.pushState({ slug }, '', `#${slug}`);
    }

    // Scroll to PDF on desktop
    if (this.windowWidth >= 900 && this.pdfViewer) {
      setTimeout(() => {
        this.pdfViewer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  }

  updateActiveNavItem(slug) {
    // Remove active class from all items
    const navItems = this.policyNav.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));

    // Add active class to current item
    const activeItem = this.policyNav.querySelector(`[data-slug="${slug}"]`);
    if (activeItem) {
      activeItem.classList.add('active');
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  setupResponsive() {
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth;
    });
  }

  showError(message) {
    if (this.policyTitle) {
      this.policyTitle.textContent = 'Error';
    }

    if (this.pdfViewer && this.pdfViewer.parentElement) {
      this.pdfViewer.parentElement.innerHTML = `
        <div class="error">
          <p>${message}</p>
        </div>
      `;
    }
  }
}

// Initialize the page when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new PoliciesPage();
});

// Add smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && href.length > 1) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// Show/hide back to top button based on scroll position
window.addEventListener('scroll', () => {
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    if (window.pageYOffset > 300) {
      backToTopBtn.style.opacity = '1';
      backToTopBtn.style.visibility = 'visible';
    } else {
      backToTopBtn.style.opacity = '0';
      backToTopBtn.style.visibility = 'hidden';
    }
  }
});
