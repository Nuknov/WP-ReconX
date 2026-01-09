# 🔥 **WP-ReconX -- WordPress Reconnaissance & Vulnerability Mapper**

**WP-ReconX** is a powerful WordPress reconnaissance extension designed to
**enumerate usernames**, **fingerprint plugins**, and **map known vulnerabilities**
with associated **CVE references** all in one clean, automated workflow.

Fast. Precise. Insightful.  
Built for **security researchers, penetration testers, and blue/red teams**.

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

- JavaScript (Browser Extension)
- WordPress Enumeration Techniques
- Public Vulnerability Databases (CVE / WPScan references)
- REST & Passive Recon Methods

Built to integrate **directly inside your browser**.

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


# 🧠 WP-ReconX -- WordPress Reconnaissance Extension

WP-ReconX is a browser-based WordPress reconnaissance extension built to
**enumerate usernames**, **detect plugins**, and **map known vulnerabilities**
along with their **CVE references** all through passive analysis.

Designed for **security researchers, penetration testers, and defenders** who
need fast, reliable WordPress intelligence.

---

## 🛠️ Installation

### Load as a Browser Extension (Developer Mode)

1. Clone or download the **WP-ReconX** repository
2. Open your browser and navigate to **Extensions**
3. Enable **Developer Mode**
4. Click **Load Unpacked**
5. Select the `WP-ReconX` directory

The extension will now appear in your toolbar and is ready for use.

---

## ⚙️ How It Works

WP-ReconX performs **passive reconnaissance** against WordPress-powered websites:

- Detects WordPress presence using known fingerprints
- Enumerates publicly accessible **usernames**
- Identifies **installed or exposed plugins**
- Cross-references detected plugins with **known vulnerabilities**
- Displays **CVE IDs, severity levels, and descriptions**
- Presents findings in a clean, readable interface

🚫 No brute-force  
🚫 No exploitation  
✅ Recon only

---

## ⚠️ Disclaimer

> This tool is intended for **educational, research, and authorized security testing purposes only**.
>
> You must have **explicit permission** to analyze any website you do not own.
>
> WP-ReconX does **not exploit vulnerabilities** it only identifies publicly available information.
>
> The author and contributors are **not responsible** for misuse or legal consequences resulting from unauthorized usage.
>
> ⚖️ Always follow ethical hacking standards and applicable laws.

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
