# **WP-ReconX -- WordPress Reconnaissance & Vulnerability Mapper**

[![Version](https://img.shields.io/badge/version-2.0-blue.svg)]() [![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

**WP-ReconX** is a powerful WordPress reconnaissance extension designed to
**enumerate usernames**, **fingerprint plugins**, and **map known vulnerabilities**
with associated **CVE references** all in one clean, automated workflow.

Fast. Precise. Insightful.  
Built for **security researchers, penetration testers, and blue/red teams**.

---
## 📸 **Screenshot**

<img src="https://i.ibb.co/G4sZqF38/Picsart-26-01-09-23-27-53-159.jpg"/>

---
## 🧩 **What WP-ReconX Does**

- Enumerates **WordPress usernames**
- Detects **installed & exposed plugins**
- Maps **known plugin vulnerabilities**
- Displays **CVE IDs & vulnerability references**
- Highlights **potential attack surfaces**
- Works on **live WordPress sites**
- Clean UI inside the browser
- No intrusive scanning and recon only

Designed for **maximum intelligence, minimal noise**.

---

## 🛰️ **Tech Stack**

- **Manifest V3** - Latest Chrome Extension API
- **JavaScript** - Core extension logic
- **Chrome Extensions API** - Tab management, content scripts, background service worker
- **WordPress REST API** - User enumeration
- **CVE Database** - Vulnerability intelligence
- **Passive Reconnaissance** - No active exploitation

---

## ⚡ **Features**

| Feature                     | Details                                                     |
|-----------------------------|-------------------------------------------------------------|
|  Username Enumeration     | Identifies WordPress user accounts                          |
|  Plugin Discovery         | Detects installed & exposed plugins                         |
|  Vulnerability Mapping    | Matches plugins against known vulnerabilities               |
|  CVE Intelligence         | Displays CVE IDs with vulnerability details                 |
|  Target Fingerprinting    | WordPress version & structure hints                         |
|  Passive Recon            | No brute-force or exploit execution                          |
|  Research Focused         | Ideal for audits, bug bounty & assessments                  |
|  Lightweight Extension    | Fast, clean & efficient UI                                  |

---

## 🔥 **Extension Preview (Recon Output)**

```json
{
  "target": "example.com",
  "wordpress_detected": true,
  "users_found": [
    "admin",
    "editor",
    "author1"
  ],
  "plugins_detected": [
    {
      "name": "Contact Form 7",
      "version": "5.7.6",
      "vulnerabilities": [
        {
          "cve": "CVE-2023-12345",
          "severity": "Medium",
          "description": "Unrestricted file upload under specific conditions"
        }
      ]
    }
  ]
}
```
---

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Nuknov/WP-ReconX.git
   cd WP-ReconX
   ```

2. **Open your browser's extension page**
   - Chrome: Navigate to `chrome://extensions/`
   - Edge: Navigate to `edge://extensions/`

3. **Enable Developer Mode**
   - Toggle the switch in the top-right corner

4. **Load the extension**
   - Click "Load unpacked"
   - Select the `WP-ReconX` directory

5. **Pin the extension** (optional)
   - Click the puzzle icon in the toolbar
   - Pin "WP Security Scanner" for easy access

### Method 2: Firefox (Temporary)

1. Navigate to `about:debugging#/runtime/this-firefox`
2. Click "Load Temporary Add-on"
3. Select any file in the WP-ReconX directory (e.g., `manifest.json`)


## ⚙️ How It Works

### WordPress Detection
WP-ReconX uses multiple detection methods:
- Meta generator tags (`<meta name="generator" content="WordPress X.X">`)
- `/wp-content/` and `/wp-includes/` directory references
- `/wp-json/` REST API endpoints
- WordPress-specific HTML patterns

### Plugin Detection
Plugins are identified through:
- Script tags with `/wp-content/plugins/` paths
- Stylesheet links to plugin directories
- Version parameters in query strings (`?ver=X.X.X`)
- Inline HTML references to plugin assets

### Vulnerability Checking
The extension maintains:
- **Known Plugin CVE Database**: Maps plugin slugs to CVE records
- **WordPress Core Vulnerability Database**: 50+ core vulnerabilities with version ranges
- **Version Comparison Logic**: Accurately matches site version against vulnerable ranges

### Username Enumeration
Three enumeration techniques:
1. **DOM Parsing**: Scans for author links in page HTML
2. **REST API**: Queries `/wp-json/wp/v2/users` endpoint
3. **Author Archives**: Tests author ID parameters (`/?author=1`)

---

## ⚠️ Disclaimer

> This tool is intended solely for **educational, research, and authorized security testing purposes only**.
>
> You must have **explicit permission** to analyze any website you do not own.
>
> WP-ReconX does **not exploit vulnerabilities** it only identifies publicly available information.
>
> The author and contributors are **not responsible** for misuse or legal consequences resulting from unauthorized usage.
>
> Always follow ethical hacking standards and applicable laws.

---

## 🧠 Use Cases

- WordPress Security Audits
- Bug Bounty Reconnaissance
- Red Team & Blue Team Assessments
- Plugin Exposure Analysis
- Vulnerability Research
- Cybersecurity Education & Training

WP-ReconX is ideal for the **recon phase** before deeper testing begins.

---

## **Team Working and Collaboration:**

* [AnonKryptiQuz](https://github.com/AnonKryptiQuz)
* [0nsec](https://github.com/0nsec)

---

## **Author**

**Created by:** [Nuknov](https://github.com/Nuknov) 
