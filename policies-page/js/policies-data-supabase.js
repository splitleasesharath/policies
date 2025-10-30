/**
 * Policy Documents Database - Supabase Integration
 * Fetches policy documents from Supabase zat_policiesdocuments table
 */

// Cache for policies data
let cachedPolicies = null;

/**
 * Fetch all policies from Supabase
 * @returns {Promise<Array>} Array of policy documents
 */
async function fetchPoliciesFromSupabase() {
  try {
    console.log('📡 Fetching policies from Supabase...');

    const { data, error } = await window.supabaseClient
      .from('zat_policiesdocuments')
      .select('*')
      .eq('Active', true)
      .order('Name', { ascending: true });

    if (error) {
      console.error('❌ Supabase error:', error);
      throw error;
    }

    console.log('✅ Fetched policies:', data);
    return data;
  } catch (error) {
    console.error('❌ Error fetching policies:', error);
    return [];
  }
}

/**
 * Transform Supabase data to match expected format
 * @param {Object} supabaseDoc - Document from Supabase
 * @returns {Object} Transformed document
 */
function transformSupabaseDocument(supabaseDoc) {
  return {
    id: supabaseDoc._id,
    name: supabaseDoc.Name,
    slug: supabaseDoc.Slug || generateSlug(supabaseDoc.Name),
    type: supabaseDoc.Type || 'policy',
    pdfUrl: supabaseDoc['PDF Version'], // The PDF URL from Supabase
    visible_on_policies_page: supabaseDoc.Active,
    visible_on_logged_out: supabaseDoc['visible on logged out?'],
    createdDate: supabaseDoc['Created Date'],
    modifiedDate: supabaseDoc['Modified Date'],
    createdBy: supabaseDoc['Created By']
  };
}

/**
 * Generate slug from name
 * @param {String} name - Policy name
 * @returns {String} URL-friendly slug
 */
function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Get all visible policies (async version)
 * @returns {Promise<Array>} Filtered and sorted policies
 */
async function getAllPolicies() {
  try {
    // Use cache if available
    if (cachedPolicies) {
      return cachedPolicies
        .filter(policy => policy.visible_on_policies_page)
        .sort((a, b) => a.name.localeCompare(b.name));
    }

    // Fetch from Supabase
    const data = await fetchPoliciesFromSupabase();

    // Transform data
    cachedPolicies = data.map(transformSupabaseDocument);

    return cachedPolicies
      .filter(policy => policy.visible_on_policies_page)
      .sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error('Error getting all policies:', error);
    return [];
  }
}

/**
 * Get policy by slug (async version)
 * @param {String} slug - Policy slug
 * @returns {Promise<Object|null>} Policy document or null
 */
async function getPolicyBySlug(slug) {
  try {
    const policies = await getAllPolicies();
    return policies.find(policy => policy.slug === slug) || null;
  } catch (error) {
    console.error('Error getting policy by slug:', error);
    return null;
  }
}

/**
 * Get policy by ID (async version)
 * @param {String} id - Policy ID
 * @returns {Promise<Object|null>} Policy document or null
 */
async function getPolicyById(id) {
  try {
    const policies = await getAllPolicies();
    return policies.find(policy => policy.id === id) || null;
  } catch (error) {
    console.error('Error getting policy by ID:', error);
    return null;
  }
}

/**
 * Refresh policies cache
 * Call this to force reload from Supabase
 */
async function refreshPolicies() {
  cachedPolicies = null;
  return await getAllPolicies();
}

// Export functions for use in main.js
window.PoliciesDB = {
  getAllPolicies,
  getPolicyBySlug,
  getPolicyById,
  refreshPolicies,
  // Expose cache for debugging
  get policies() {
    return cachedPolicies || [];
  }
};

console.log('✅ Policies DB (Supabase) initialized');
