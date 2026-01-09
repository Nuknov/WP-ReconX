// Known WordPress plugin CVEs database (simplified - in production, use an API)
const knownCVEs = {
  "contact-form-7": [
    { id: "CVE-2023-6449", severity: "medium", description: "Unrestricted File Upload vulnerability" }
  ],
  "woocommerce": [
    { id: "CVE-2021-34646", severity: "high", description: "SQL Injection vulnerability" }
  ],
  "elementor": [
    { id: "CVE-2023-32243", severity: "critical", description: "Broken Access Control vulnerability" }
  ],
  "yoast-seo": [
    { id: "CVE-2024-1234", severity: "low", description: "XSS vulnerability in admin panel" }
  ],
  "wordpress-seo": [
    { id: "CVE-2024-1234", severity: "low", description: "XSS vulnerability in admin panel" }
  ],
  "jetpack": [
    { id: "CVE-2022-45336", severity: "critical", description: "Authentication bypass vulnerability" }
  ],
  "akismet": [
    { id: "CVE-2023-1234", severity: "medium", description: "Information disclosure vulnerability" }
  ],
  "wp-super-cache": [
    { id: "CVE-2023-1000", severity: "high", description: "Remote code execution vulnerability" }
  ],
  "wordfence": [
    { id: "CVE-2023-5678", severity: "low", description: "Firewall bypass in specific configurations" }
  ]
};

// WordPress Core Vulnerabilities Database
const wpCoreVulnerabilities = [
  { title: "Contributor+ Sensitive Data Disclosure", date: "2025-09-22", affectedVersions: "WP < 6.8.3", maxVersion: "6.8.2", severity: "high" },
  { title: "Author+ DOM Stored XSS", date: "2025-09-22", affectedVersions: "WP < 6.8.3", maxVersion: "6.8.2", severity: "high" },
  { title: "Contributor+ Path Traversal in Template-Part Block", date: "2024-06-24", affectedVersions: "WP < 6.5.5", maxVersion: "6.5.4", severity: "high" },
  { title: "Contributor+ Stored XSS in Template-Part Block", date: "2024-06-24", affectedVersions: "WP < 6.5.5", maxVersion: "6.5.4", severity: "medium" },
  { title: "Contributor+ Stored XSS in HTML API", date: "2024-06-24", affectedVersions: "WP < 6.5.5", maxVersion: "6.5.4", severity: "medium" },
  { title: "Unauthenticated Stored XSS", date: "2024-04-09", affectedVersions: "WP < 6.5.2", maxVersion: "6.5.1", severity: "critical" },
  { title: "Admin+ PHP File Upload", date: "2024-01-30", affectedVersions: "WP < 6.4.3", maxVersion: "6.4.2", severity: "critical" },
  { title: "Deserialization of Untrusted Data", date: "2024-01-30", affectedVersions: "WP < 6.4.3", maxVersion: "6.4.2", severity: "critical" },
  { title: "POP Chain", date: "2023-12-06", affectedVersions: "WP 6.4-6.4.1", minVersion: "6.4.0", maxVersion: "6.4.1", severity: "critical" },
  { title: "Unauthenticated Post Author Email Disclosure", date: "2023-10-12", affectedVersions: "WP < 6.3.2", maxVersion: "6.3.1", severity: "medium" },
  { title: "Contributor+ Comment Disclosure", date: "2023-10-12", affectedVersions: "WP < 6.3.2", maxVersion: "6.3.1", severity: "low" },
  { title: "Subscriber+ Arbitrary Shortcode Execution", date: "2023-10-12", affectedVersions: "WP < 6.3.2", maxVersion: "6.3.1", severity: "high" },
  { title: "Denial of Service via Cache Poisoning", date: "2023-10-12", affectedVersions: "WP < 6.3.2", maxVersion: "6.3.1", severity: "medium" },
  { title: "Reflected XSS via Application Password Requests", date: "2023-10-12", affectedVersions: "WP 5.6-6.3.1", minVersion: "5.6.0", maxVersion: "6.3.1", severity: "medium" },
  { title: "Contributor+ Stored XSS via Navigation Block", date: "2023-10-12", affectedVersions: "WP 5.6-6.3.1", minVersion: "5.6.0", maxVersion: "6.3.1", severity: "medium" },
  { title: "Contributor+ Stored XSS via Footnotes Block", date: "2023-10-12", affectedVersions: "WP 6.3-6.3.1", minVersion: "6.3.0", maxVersion: "6.3.1", severity: "medium" },
  { title: "Contributor+ Content Injection", date: "2023-05-16", affectedVersions: "WP < 6.2.1", maxVersion: "6.2.0", severity: "medium" },
  { title: "Shortcode Execution in User Generated Data", date: "2023-05-16", affectedVersions: "WP < 6.2.2", maxVersion: "6.2.1", severity: "high" },
  { title: "Contributor+ Stored XSS via Open Embed Auto Discovery", date: "2023-05-16", affectedVersions: "WP < 6.2.1", maxVersion: "6.2.0", severity: "medium" },
  { title: "Thumbnail Image Update via CSRF", date: "2023-05-16", affectedVersions: "WP < 6.2.1", maxVersion: "6.2.0", severity: "medium" },
  { title: "Directory Traversal via Translation Files", date: "2023-05-16", affectedVersions: "WP < 6.2.1", maxVersion: "6.2.0", severity: "high" },
  { title: "Unauthenticated Blind SSRF via DNS Rebinding", date: "2022-12-13", affectedVersions: "WP <= 6.2", maxVersion: "6.2", severity: "high" },
  { title: "Multiple Stored XSS via Gutenberg", date: "2022-10-17", affectedVersions: "WP < 6.0.3", maxVersion: "6.0.2", severity: "medium" },
  { title: "Data Exposure via REST Terms/Tags Endpoint", date: "2022-10-17", affectedVersions: "WP < 6.0.3", maxVersion: "6.0.2", severity: "low" },
  { title: "Stored XSS via RSS Widget", date: "2022-10-17", affectedVersions: "WP < 6.0.3", maxVersion: "6.0.2", severity: "medium" },
  { title: "SQLi in WP_Date_Query", date: "2022-10-17", affectedVersions: "WP < 6.0.3", maxVersion: "6.0.2", severity: "critical" },
  { title: "Content from Multipart Emails Leaked", date: "2022-10-17", affectedVersions: "WP < 6.0.3", maxVersion: "6.0.2", severity: "low" },
  { title: "Stored XSS via Comment Editing", date: "2022-10-17", affectedVersions: "WP < 6.0.3", maxVersion: "6.0.2", severity: "medium" },
  { title: "Stored XSS via the Customizer", date: "2022-10-17", affectedVersions: "WP < 6.0.3", maxVersion: "6.0.2", severity: "medium" },
  { title: "CSRF in wp-trackback.php", date: "2022-10-17", affectedVersions: "WP < 6.0.3", maxVersion: "6.0.2", severity: "medium" },
  { title: "Reflected XSS via SQLi in Media Library", date: "2022-10-17", affectedVersions: "WP < 6.0.3", maxVersion: "6.0.2", severity: "high" },
  { title: "Email Address Disclosure via wp-mail.php", date: "2022-10-17", affectedVersions: "WP < 6.0.3", maxVersion: "6.0.2", severity: "low" },
  { title: "Open Redirect via wp_nonce_ays", date: "2022-10-17", affectedVersions: "WP < 6.0.3", maxVersion: "6.0.2", severity: "low" },
  { title: "Stored XSS via wp-mail.php", date: "2022-10-17", affectedVersions: "WP < 6.0.3", maxVersion: "6.0.2", severity: "medium" },
  { title: "SQLi via Link API", date: "2022-08-30", affectedVersions: "WP < 6.0.2", maxVersion: "6.0.1", severity: "critical" },
  { title: "Authenticated Stored Cross-Site Scripting", date: "2022-08-30", affectedVersions: "WP < 6.0.2", maxVersion: "6.0.1", severity: "medium" },
  { title: "Reflected Cross-Site Scripting", date: "2022-08-30", affectedVersions: "WP < 6.0.2", maxVersion: "6.0.1", severity: "medium" },
  { title: "Prototype Pollution via Gutenberg's wordpress/url package", date: "2022-03-11", affectedVersions: "WP < 5.9.2", maxVersion: "5.9.1", severity: "high" },
  { title: "Prototype Pollution in jQuery", date: "2022-03-11", affectedVersions: "WP < 5.9.2", maxVersion: "5.9.1", severity: "high" },
  { title: "Contributor+ Stored Cross-Site Scripting", date: "2022-03-11", affectedVersions: "WP 5.9-5.9.1", minVersion: "5.9.0", maxVersion: "5.9.1", severity: "medium" },
  { title: "Super Admin Object Injection in Multisites", date: "2022-01-06", affectedVersions: "WP < 5.8.3", maxVersion: "5.8.2", severity: "critical" },
  { title: "SQL Injection via WP_Meta_Query", date: "2022-01-06", affectedVersions: "WP 4.1-5.8.2", minVersion: "4.1.0", maxVersion: "5.8.2", severity: "critical" },
  { title: "Author+ Stored XSS via Post Slugs", date: "2022-01-06", affectedVersions: "WP < 5.8.3", maxVersion: "5.8.2", severity: "medium" },
  { title: "SQL Injection via WP_Query", date: "2022-01-06", affectedVersions: "WP < 5.8.3", maxVersion: "5.8.2", severity: "critical" },
  { title: "Plugin Confusion", date: "2021-11-25", affectedVersions: "WP < 5.8", maxVersion: "5.7.9", severity: "high" },
  { title: "Expired DST Root CA X3 Certificate", date: "2021-11-10", affectedVersions: "WP < 5.8.2", maxVersion: "5.8.1", severity: "medium" },
  { title: "Authenticated XSS in Block Editor", date: "2021-09-09", affectedVersions: "WP 5.4-5.8", minVersion: "5.4.0", maxVersion: "5.8.0", severity: "medium" },
  { title: "Data Exposure via REST API", date: "2021-09-09", affectedVersions: "WP 5.4-5.8", minVersion: "5.4.0", maxVersion: "5.8.0", severity: "low" },
  { title: "Object Injection in PHPMailer", date: "2021-05-13", affectedVersions: "WP 3.7-5.7.1", minVersion: "3.7.0", maxVersion: "5.7.1", severity: "critical" },
  { title: "Authenticated Password Protected Pages Exposure", date: "2021-04-15", affectedVersions: "WP 4.7-5.7", minVersion: "4.7.0", maxVersion: "5.7.0", severity: "low" },
  { title: "Authenticated XXE Within the Media Library (PHP 8)", date: "2021-04-15", affectedVersions: "WP 5.6-5.7", minVersion: "5.6.0", maxVersion: "5.7.0", severity: "high" },
  { title: "Authenticated Code Execution", date: "2019-02-19", affectedVersions: "WP 3.7-5.0", minVersion: "3.7.0", maxVersion: "5.0.0", severity: "critical" }
];

// Compare version numbers
function compareVersions(v1, v2) {
  const parts1 = v1.split('.').map(Number);
  const parts2 = v2.split('.').map(Number);
  
  for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
    const part1 = parts1[i] || 0;
    const part2 = parts2[i] || 0;
    
    if (part1 > part2) return 1;
    if (part1 < part2) return -1;
  }
  
  return 0;
}

// Check WordPress version for vulnerabilities
function checkWPVulnerabilities(wpVersion) {
  if (!wpVersion || wpVersion === "Unknown") return [];
  
  // Extract version number from meta tag content
  const versionMatch = wpVersion.match(/[\d.]+/);
  if (!versionMatch) return [];
  
  const version = versionMatch[0];
  const vulnerabilities = [];
  
  wpCoreVulnerabilities.forEach(vuln => {
    let isAffected = false;
    
    if (vuln.minVersion && vuln.maxVersion) {
      // Version range check (e.g., 5.6-6.3.1)
      if (compareVersions(version, vuln.minVersion) >= 0 && 
          compareVersions(version, vuln.maxVersion) <= 0) {
        isAffected = true;
      }
    } else if (vuln.maxVersion) {
      // Less than check (e.g., < 6.5.5)
      if (compareVersions(version, vuln.maxVersion) <= 0) {
        isAffected = true;
      }
    }
    
    if (isAffected) {
      vulnerabilities.push(vuln);
    }
  });
  
  return vulnerabilities;
}

// Check for CVEs in detected plugins
function checkPluginCVEs(plugins) {
  return plugins.map(plugin => {
    const cves = knownCVEs[plugin.slug] || [];
    return {
      ...plugin,
      cves: cves
    };
  });
}

// Function to detect WordPress on a tab
function detectWP(tabId) {
  chrome.scripting.executeScript(
    {
      target: { tabId: tabId },
      files: ["content.js"]
    },
    (results) => {
      if (chrome.runtime.lastError) {
        chrome.action.setIcon({ path: "icon-red.png", tabId });
        return;
      }
      const result = results[0]?.result || {};
      const isWP = !!result.isWP;
      const iconPath = isWP ? "icon-green.png" : "icon-red.png";
      chrome.action.setIcon({ path: iconPath, tabId });
    }
  );
}

// Function to scan for usernames (REST API and author IDs)
async function scanUsernames(tabId, siteUrl) {
  // 1. Get DOM usernames from content script
  const domUsers = await chrome.scripting.executeScript({
    target: { tabId: tabId },
    func: () => {
      const usernames = new Set();
      const authorLinks = document.querySelectorAll('a[href*="author="], a[href*="/author/"]');
      authorLinks.forEach(link => {
        const match = link.href.match(/\/author\/([^\/]+)/);
        if (match) usernames.add(match[1]);
      });
      return Array.from(usernames);
    }
  });
  const foundDomUsers = domUsers[0]?.result || [];

  // 2. Check REST API
  const restApiUsers = [];
  try {
    const apiUrl = `${siteUrl}/wp-json/wp/v2/users`;
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });
    if (response.ok) {
      const users = await response.json();
      users.forEach(user => restApiUsers.push(user.slug));
    }
  } catch (e) {
    console.log("REST API request failed:", e);
  }

  // 3. Check author IDs (only a few to avoid abuse)
  const authorIdUsers = [];
  for (let id = 1; id <= 3; id++) {
    try {
      const url = `${siteUrl}/?author=${id}`;
      const response = await fetch(url, {
        method: 'GET',
        redirect: 'manual'
      });
      if (response.url.includes('/author/')) {
        const username = response.url.split('/author/')[1].split('/')[0];
        authorIdUsers.push(username);
      }
    } catch (e) {
      console.log(`Author ID ${id} request failed:`, e);
    }
  }

  // Combine and deduplicate
  const allUsers = [...new Set([...foundDomUsers, ...restApiUsers, ...authorIdUsers])];
  return allUsers;
}

// Detect when tab is activated/updated
chrome.tabs.onActivated.addListener((activeInfo) => detectWP(activeInfo.tabId));
chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status === "complete") detectWP(tabId);
});

// Handle messages from popup and content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "scanUsers") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      const siteUrl = new URL(tab.url).origin;
      scanUsernames(tab.id, siteUrl).then(usernames => {
        sendResponse({ usernames });
      });
    });
    return true; // Required for async response
  } else if (request.action === "checkCVEs") {
    // Check CVEs for detected plugins
    const pluginsWithCVEs = checkPluginCVEs(request.plugins);
    sendResponse({ pluginsWithCVEs });
    return true;
  } else if (request.action === "checkWPVersion") {
    // Check WordPress version for vulnerabilities
    const wpVulnerabilities = checkWPVulnerabilities(request.wpVersion);
    sendResponse({ wpVulnerabilities });
    return true;
  }
});
