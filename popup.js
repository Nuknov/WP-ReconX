// Dark mode toggle
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

themeToggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
});

let currentTabId;

// Initialize popup
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  currentTabId = tabs[0].id;
  chrome.tabs.sendMessage(tabs[0].id, { action: "checkWP" }, (response) => {
    const status = document.getElementById("status");
    const scanButton = document.getElementById("scanUsers");

    if (response?.isWP) {
      status.innerHTML = '<span>✅</span><span>WordPress Detected</span>';
      status.className = "yes";
      scanButton.disabled = false;
      
      // Update site info
      document.getElementById("siteTitle").textContent = response.siteTitle || "Unknown";
      document.getElementById("wpVersion").textContent = response.wpVersion || "Unknown";
      document.getElementById("theme").textContent = response.theme || "Unknown";
      document.getElementById("restApi").textContent = response.restApi || "Not available";
      
      // Display plugins if detected
      if (response.plugins && response.plugins.length > 0) {
        displayPlugins(response.plugins);
      }
      
      // Display WordPress vulnerabilities if detected
      if (response.wpVulnerabilities && response.wpVulnerabilities.length > 0) {
        displayWPVulnerabilities(response.wpVulnerabilities);
      }
    } else {
      status.innerHTML = '<span>❌</span><span>Not WordPress</span>';
      status.className = "no";
      document.getElementById("siteTitle").textContent = "N/A";
      document.getElementById("wpVersion").textContent = "N/A";
      document.getElementById("theme").textContent = "N/A";
      document.getElementById("restApi").textContent = "N/A";
    }
  });
});

// Display detected plugins
function displayPlugins(plugins) {
  const pluginsSection = document.getElementById("pluginsSection");
  const pluginsDiv = document.getElementById("plugins");
  
  pluginsSection.style.display = "block";
  pluginsDiv.innerHTML = "";
  
  if (plugins.length === 0) {
    pluginsDiv.innerHTML = '<div class="empty-state">No plugins detected</div>';
    return;
  }
  
  plugins.forEach(plugin => {
    const pluginItem = document.createElement("div");
    pluginItem.className = "plugin-item";
    
    let cveHTML = "";
    if (plugin.cves && plugin.cves.length > 0) {
      cveHTML = plugin.cves.map(cve => {
        const severity = cve.severity || "medium";
        return `<span class="cve-badge cve-${severity}" title="${cve.description || ''}">${cve.id}</span>`;
      }).join(" ");
    }
    
    pluginItem.innerHTML = `
      <div class="plugin-name">${plugin.name}</div>
      <div class="plugin-version">Version: ${plugin.version || "Unknown"}</div>
      ${cveHTML}
    `;
    
    pluginsDiv.appendChild(pluginItem);
  });
}

// Display WordPress core vulnerabilities
function displayWPVulnerabilities(vulns) {
  if (!vulns || vulns.length === 0) return;
  
  const vulnSection = document.getElementById("wpVulnSection");
  const vulnDiv = document.getElementById("wpVulnerabilities");
  
  vulnSection.style.display = "block";
  vulnDiv.innerHTML = "";
  
  vulns.forEach(vuln => {
    const vulnItem = document.createElement("div");
    vulnItem.className = "plugin-item";
    
    const severity = vuln.severity || "medium";
    
    vulnItem.innerHTML = `
      <div class="plugin-name">${vuln.title}</div>
      <div class="plugin-version">${vuln.date}</div>
      <span class="cve-badge cve-${severity}">${vuln.affectedVersions}</span>
    `;
    
    vulnDiv.appendChild(vulnItem);
  });
}

// Copy to clipboard function
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showNotification('Copied: ' + text);
  }).catch(err => {
    console.error('Failed to copy:', err);
  });
}

// Show notification
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 2000);
}

// Handle username scan
document.getElementById("scanUsers").addEventListener("click", () => {
  const button = document.getElementById("scanUsers");
  const resultsDiv = document.getElementById("userResults");
  
  button.disabled = true;
  button.innerHTML = '<span class="loading"></span><span>Scanning...</span>';
  resultsDiv.style.display = "block";
  resultsDiv.innerHTML = '<div class="empty-state">Searching for usernames...</div>';

  chrome.runtime.sendMessage({ action: "scanUsers" }, (response) => {
    button.disabled = false;
    button.innerHTML = '<span>🔍</span><span>Scan for Usernames</span>';
    
    if (response?.usernames?.length) {
      const chips = response.usernames.map(username => 
        `<span class="username-chip" onclick="copyToClipboard('${username}')" title="Click to copy">${username}</span>`
      ).join("");
      resultsDiv.innerHTML = `<strong>Found ${response.usernames.length} username(s):</strong><br><div style="margin-top:8px;font-size:11px;color:var(--text-secondary);">💡 Click username to copy</div>${chips}`;
    } else {
      resultsDiv.innerHTML = '<div class="empty-state">No usernames found or site is protected</div>';
    }
    
    // Add event listeners for click-to-copy (for dynamically created elements)
    document.querySelectorAll('.username-chip').forEach(chip => {
      chip.addEventListener('click', function() {
        copyToClipboard(this.textContent);
      });
    });
  });
});
