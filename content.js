(() => {
  // Check if the site is WordPress
  const isWP =
    document.querySelector('meta[name="generator"][content*="WordPress"]') ||
    document.documentElement.innerHTML.includes("/wp-content/") ||
    document.documentElement.innerHTML.includes("/wp-includes/") ||
    document.documentElement.innerHTML.includes("wp-json");

  // Gather site info
  const siteTitle = document.title || "Unknown";
  const generatorMeta = document.querySelector('meta[name="generator"]')?.content || "Unknown";
  const themeMatch = document.documentElement.innerHTML.match(/wp-content\/themes\/([a-zA-Z0-9\-_]+)/);
  const theme = themeMatch ? themeMatch[1] : "Unknown";
  const restApi = document.documentElement.innerHTML.includes("/wp-json/") ? "Available" : "Not available";

  // Detect WordPress plugins
  function detectPlugins() {
    const plugins = new Map();
    const html = document.documentElement.innerHTML;
    
    // Detect plugins from script and link tags
    const scriptLinks = document.querySelectorAll('script[src*="/wp-content/plugins/"], link[href*="/wp-content/plugins/"]');
    scriptLinks.forEach(element => {
      const url = element.src || element.href;
      const match = url.match(/\/wp-content\/plugins\/([^\/]+)/);
      if (match) {
        const pluginSlug = match[1];
        if (!plugins.has(pluginSlug)) {
          plugins.set(pluginSlug, {
            name: formatPluginName(pluginSlug),
            slug: pluginSlug,
            version: extractVersion(url) || "Unknown"
          });
        }
      }
    });
    
    // Additional detection from inline HTML
    const pluginRegex = /\/wp-content\/plugins\/([a-zA-Z0-9\-_]+)(?:\/[^'"]*)?(?:\?ver=([0-9.]+))?/g;
    let match;
    while ((match = pluginRegex.exec(html)) !== null) {
      const pluginSlug = match[1];
      const version = match[2] || "Unknown";
      if (!plugins.has(pluginSlug)) {
        plugins.set(pluginSlug, {
          name: formatPluginName(pluginSlug),
          slug: pluginSlug,
          version: version
        });
      } else if (version !== "Unknown" && plugins.get(pluginSlug).version === "Unknown") {
        plugins.get(pluginSlug).version = version;
      }
    }
    
    return Array.from(plugins.values());
  }
  
  // Format plugin slug to readable name
  function formatPluginName(slug) {
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  
  // Extract version from URL
  function extractVersion(url) {
    const versionMatch = url.match(/[?&]ver=([0-9.]+)/);
    return versionMatch ? versionMatch[1] : null;
  }

  // Check for usernames in author links (DOM only)
  function scanDomForUsernames() {
    const usernames = new Set();
    const authorLinks = document.querySelectorAll('a[href*="author="], a[href*="/author/"]');
    authorLinks.forEach(link => {
      const match = link.href.match(/\/author\/([^\/]+)/);
      if (match) usernames.add(match[1]);
    });
    return Array.from(usernames);
  }

  // Check if XML-RPC is enabled
  async function checkXmlrpc() {
    try {
      const baseUrl = window.location.origin;
      const xmlrpcUrl = `${baseUrl}/xmlrpc.php`;
      
      const response = await fetch(xmlrpcUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/xml'
        },
        body: '<?xml version="1.0"?><methodCall><methodName>system.listMethods</methodName><params></params></methodCall>'
      });
      
      if (response.ok) {
        const text = await response.text();
        if (text.includes('methodResponse') || text.includes('XML-RPC')) {
          return 'Enabled';
        }
      }
      return 'Disabled';
    } catch (error) {
      return 'Unknown';
    }
  }

  // Listen for messages from the popup
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "checkWP") {
      const detectedPlugins = isWP ? detectPlugins() : [];
      
      // Check XML-RPC status first
      checkXmlrpc().then(xmlrpcStatus => {
        // Request CVE information for detected plugins
        if (detectedPlugins.length > 0) {
          chrome.runtime.sendMessage({
            action: "checkCVEs",
            plugins: detectedPlugins
          }, (cveResponse) => {
            // Also check WordPress core vulnerabilities
            chrome.runtime.sendMessage({
              action: "checkWPVersion",
              wpVersion: generatorMeta
            }, (wpVulnResponse) => {
              sendResponse({
                isWP: !!isWP,
                siteTitle,
                wpVersion: generatorMeta,
                theme,
                restApi,
                xmlrpc: xmlrpcStatus,
                domUsers: scanDomForUsernames(),
                plugins: cveResponse?.pluginsWithCVEs || detectedPlugins,
                wpVulnerabilities: wpVulnResponse?.wpVulnerabilities || []
              });
            });
          });
        } else {
          // No plugins, but still check WP core vulnerabilities
          chrome.runtime.sendMessage({
            action: "checkWPVersion",
            wpVersion: generatorMeta
          }, (wpVulnResponse) => {
            sendResponse({
              isWP: !!isWP,
              siteTitle,
              wpVersion: generatorMeta,
              theme,
              restApi,
              xmlrpc: xmlrpcStatus,
              domUsers: scanDomForUsernames(),
              plugins: [],
              wpVulnerabilities: wpVulnResponse?.wpVulnerabilities || []
            });
          });
        }
      });
      return true; // Keep message channel open for async response
    } else if (request.action === "scanDomUsers") {
      sendResponse({ usernames: scanDomForUsernames() });
    }
  });

  // Return info for background script (if needed)
  return {
    isWP: !!isWP,
    siteTitle,
    wpVersion: generatorMeta,
    theme,
    restApi,
    domUsers: scanDomForUsernames(),
    plugins: isWP ? detectPlugins() : []
  };
})();
