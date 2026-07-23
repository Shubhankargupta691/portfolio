// Portfolio content — architect voice, declarative, precise

export const personalInfo = {
    name: "Shubhankar Gupta",
    email: "work.guptashubhankar691@gmail.com",
    portfolio: "https://shubhankargupta.com",
    github: "https://github.com/Shubhankargupta691",
    linkedin: "https://www.linkedin.com/in/shubhankar-gupta1/",
    twitter: "https://x.com/Shubhankar35722",
    resume: "/resume",
    socials: "https://linktr.ee/HackWithLinux",
    hashNode: "https://shubhankargupta.hashnode.dev/",
};

// Hero
export const hero = {
    statement: "Teaching Cyber Security with Clarity.",
    subtext: "Aspiring Penetration Tester | Passionate About Offensive Security.",
};

// Section titles
export const sectionTitles = {
    projects: "PROJECTS",
    philosophy: "APPROACH",
    timeline: "RECORD",
    proof: "CREDENTIALS",
    close: "—",
};

// Projects
export const projects = [
    // CVE-2024-42009 project
    {
        name: "CVE-2024-42009",
        tagline: "Roundcube Webmail XSS detection & research lab",
        problem: "Validating client-side XSS vulnerabilities in webmail applications is difficult without a safe, reproducible environment and reliable verification methodology.",
        solution: "Developed a Docker-based security lab with custom Nuclei templates and Out-of-Band (OOB) validation using Interactsh to accurately detect CVE-2024-42009 in vulnerable Roundcube instances.",
        depth: [
            "Created custom Nuclei detection templates with and without Interactsh-based OOB validation",
            "Built a reproducible Docker lab integrating Roundcube, MailHog, and MariaDB for isolated security testing",
            "Implemented OOB HTTP/DNS callback verification to reduce false positives during vulnerability validation",
            "Documented vulnerability analysis, detection workflow, mitigation guidance, and responsible testing practices",
        ],
        metrics: {
            value: "CVSS 9.8",
            label: "critical vulnerability researched",
        },
        stack: [
            "Nuclei",
            "Interactsh",
            "Docker",
            "Docker Compose",
            "Roundcube",
            "MailHog",
            "MariaDB",
            "YAML",
        ],
        ownership: "Independently researched, developed detection templates, built the testing environment, and authored the project documentation.",
        github: "https://github.com/Shubhankargupta691/CVE-2024-42009",
    },

    // Active Directory Home Lab
    {
        name: "Active Directory Home Lab",
        tagline: "Enterprise Active Directory lab built on Windows Server 2022",
        problem: "Built this home lab to gain hands-on experience with Active Directory administration and common AD attack vectors in a safe, isolated environment.",
        solution: "Built an Active Directory home lab with a Windows Server 2022 Domain Controller and multiple Windows clients to simulate a realistic enterprise environment for administration, security testing, and attack simulation.",
        depth: [
            "Deployed a Windows Server 2022 Domain Controller with Active Directory Domain Services (AD DS)",
            "Configured two Windows 10 clients and one Windows 11 client joined to the domain with OUs, users, groups, DNS, and Group Policy",
            "Simulated common Active Directory attack techniques including Kerberoasting, AS-REP Roasting, and NTLM hash capture through SMB signing misconfiguration",
        ],
        metrics: {
            value: "4",
            label: "virtual machines",
        },
        stack: [
            "Windows Server 2022",
            "Active Directory",
            "AD DS",
            "DNS",
            "Group Policy",
            "Windows 10",
            "Windows 11",
            "VirtualBox"
        ],
        ownership: "Designed, built, and maintained the home lab for continuous Active Directory administration and security practice.",
        github: "https://github.com/Shubhankargupta691/Active-Directory",
    },

    // Linux Home Lab
    {
        name: "Linux Home Lab",
        tagline: "Linux attack simulation and post-exploitation lab",
        problem: "Built this home lab to practice the full attack lifecycle on a vulnerable Linux server using MITRE ATT&CK techniques in a controlled environment.",
        solution: "Compromised the Linux machine by exploiting a vulnerable public-facing WordPress application, established persistence, and performed privilege escalation to obtain root access.",
        depth: [
            "Exploited WordPress and MySQL vulnerabilities to gain initial access (MITRE ATT&CK: Exploit Public-Facing Application)",
            "Established persistence using SSH authorized keys, web shells, cron jobs, account manipulation, and shell configuration modifications",
            "Performed privilege escalation to obtain root privileges through Linux privilege escalation techniques and post-exploitation enumeration",
        ],
        metrics: {
            value: "3",
            label: "MITRE ATT&CK phases covered",
        },
        stack: [
            "VulnHub",
            "Kali Linux",
            "WordPress",
            "MySQL",
            "Linux",
            "SSH",
            "MITRE ATT&CK"
        ],
        ownership: "Built and documented the lab while performing the complete attack lifecycle in an isolated environment.",
        github: "https://shubhankar-gupta.vercel.app/writing/exploiting-linux-server",
    },

    // Snort with Docker project
    {
        name: "Snort In Docker",
        tagline: "Containerized Network Intrusion Detection System (NIDS)",
        problem: "Setting up Snort requires manual installation, configuration, and dependency management.",
        solution: "Dockerized Snort with automated build and run scripts for quick deployment and easy configuration.",
        depth: [
            "Containerized Snort using Docker for simplified deployment",
            "Configured custom Snort rules and HOME_NET settings",
            "Enabled real-time network traffic analysis and packet logging",
        ],
        metrics: {
            value: "Docker",
            label: "containerized deployment",
        },
        stack: ["Snort", "Docker", "Linux", "Shell"],
        ownership: "Built the Docker environment, configured Snort, and documented the setup process.",
        github: "https://github.com/Shubhankargupta691/SNORT",
    },

    // Security Assessment Report project
    {
        name: "Security Assessment Report",
        tagline: "Reconnaissance and web security assessment",
        problem: "Understanding the security posture of a target requires combining multiple reconnaissance and enumeration techniques.",
        solution: "Performed a black-box security assessment using industry-standard reconnaissance and scanning tools to identify exposed services, technologies, and potential security risks.",
        depth: [
            "Conducted DNS, WHOIS, subdomain enumeration, and live host validation",
            "Performed port scanning, service fingerprinting, SSL/TLS analysis, and WAF detection",
            "Mapped identified technologies to known CVEs and prioritized findings based on risk",
            "Discovered an HTTP 301 redirect via Httpx leading to an IIS server during enumeration",
        ],
        metrics: {
            value: "5+",
            label: "security assessment stages",
        },
        stack: [
            "Nmap",
            "Amass",
            "Fierce",
            "Nikto",
            "Gobuster",
            "Httpx",
            "Wafw00f",
        ],
        ownership: "Conducted the assessment and documented the complete methodology and findings.",
        github: "https://github.com/Shubhankargupta691/Pentest-Report",
    },

    // BreachLookup project
    {
        name: "BreachLookUp",
        tagline: "Security tool for breach and threat analysis",
        problem: "Checking files, IP addresses, and domains across multiple security services can be time-consuming.",
        solution: "Developed a tool to scan files, IP addresses, and domains, helping users identify potential security risks from a single interface.",
        depth: [
            "Scans files using MD5 and SHA256 hash verification",
            "Checks IP and domain reputation using VirusTotal",
            "Generates reports with scan results and security recommendations",
        ],
        metrics: {
            value: "Files, IP's",
            label: "supported scans",
        },
        stack: ["Python", "VirusTotal API", "MD5", "SHA256"],
        ownership: "Built and maintained the project.",
        github: "https://github.com/Shubhankargupta691/Breach-LookUP",
    },

];

// Philosophy — structured principles
export const philosophy = {
    intro: "Identify the target and uncover its weaknesses. Every system has flaws.",
    pillars: [
        {
            title: "Planning & Scoping",
            description: "Long running operations go to queues. Response times stay predictable.",
        },
        {
            title: "Reconnaissance",
            description: "Gather information about the target.",
        },
        {
            title: "Enumeration",
            description: "Identify software versions and potential misconfigurations.",
        },
        {
            title: "Vulnerability Assessment",
            description: "Analyze the target for security weaknesses and validate findings to reduce false positives.",
        },
        {
            title: "Exploitation",
            description: "Demonstrate the impact of confirmed vulnerabilities within the agreed scope.",
        },
        {
            title: "Reporting",
            description: "Describe impact, risk, and affected assets. Provide remediation recommendations and risk ratings.",
        },
    ],
    credo: "Building practical offensive security skills through labs, CTFs, and real-world security research.",
};

// CyberSecurity Platforms
export const platforms = {
    platforms: [
        {
            title: "Hash Node Blogs",
            link: "https://shubhankargupta.hashnode.dev/",
        },
        {
            title: "Hack THe Box",
            link: "https://app.hackthebox.com/public/users/1945320",
        },
        {
            title: "TryHackMe",
            link: "https://tryhackme.com/p/ShubhankarGupta",
        },
        {
            title: "Offensive Security Labs",
            link: "https://portal.offsec.com/labs/play-1",
        },
        {
            title: "Port Swigger Web Security Academy",
            link: "https://portswigger.net/",        
        },
    ]
}


export const Certifications = {
    certs: [
        // OSCP Certification
        // {
        //     title: "OSCP",
        //     link: "https://portal.offsec.com/labs/play-1",        
        // },
        {
            title: "THM Offensive Pentesting",
            link: "https://drive.google.com/file/d/1aaDLHgYieHJ-Gd0yTtnZlSIu5cK5_i3n/view",
        },
        {
            title: "THM Jr. Penetration Tester",
            link: "https://drive.google.com/file/d/1mJOtui0WCx2_l5F5019vSWjVHWin92g0/view",
        },
    ]
}



// Experience record
export const eras = [
    {
        name: "Open Source",
        link: "https://github.com/Shubhankargupta691/CVE-2024-42009",
        title: "Nuclei template for CVE-2024-42009",
        company: "Independent",
        period: "Sept 2025",
        narrative: "Created Nuclei template. Reflected XSS in Roundcube Webmail.",
        highlights: [
            "CVE-2024-42009: Reflected XSS in Roundcube Webmail",
            "Critical (CVSS 9.8) vulnerability discovery in Roundcube Webmail",
            "Nuclei template with Interactsh and Out-of-Band (OOB) detection",
            "Arbitrary JavaScript execution when a user views a malicious email",
            "Lab environment setup for Roundcube Webmail testing and vulnerability verification",
        ],
    },
    {
        name: "Application Security",
        title: "SQL Injection",
        company: "Independent",
        period: "23 Jul 2026",
        narrative: "Discovered a critical SQL Injection vulnerability in a web application's login page during an authorized security assessment. The vulnerability could allow authentication bypass, administrative access, and unauthorized access to sensitive user data if exploited.",
        highlights: [
            "Identified a SQL Injection vulnerability in the application's authentication mechanism.",
            "Demonstrated the potential exposure of Personally Identifiable Information (PII)",
            "Attacker can perform privileged database operations, including the ability to create, modify, or delete records, demonstrating the severity of the vulnerability.",
        ],
    },
    {
        name: "null",
        title: "Sensitive Data Exposure",
        company: "Independent",
        period: "Oct 2024",
        narrative: "Discovered a legacy subdomain 302 redirect leading to an unsecured Google Drive containing customer PII and call recordings, allowing a major Indian e-commerce platform to secure the data and avert a massive breach.",
        highlights: [
            "Identified a critical 302 redirect flaw on an overlooked legacy subdomain.",
            "Identified exposed customer PII and sensitive company call recordings.",
            "Highlighted that an unmitigated threat would allow malicious actors to completely exfiltrate customer records and compromise privacy."
        ],
    },
{
        name: null,
        title: "Infrastructure Misconfiguration",
        company: "Independent",
        period: "May 2024",
        narrative: "Discovered an outdated web stack running Microsoft-IIS/8.5 and ASP.NET 4.0.30319 that exposed a directory listing vulnerability. Further analysis revealed severe unpatched vulnerabilities susceptible to authentication bypass, compounded by the recovery of three valid enterprise credentials.",
        highlights: [
            "Identified an information disclosure flaw via web directory listing on an outdated web server stack.",
            "Exposed structural paths for CVE-2011-3416 (Forms Auth Bypass) and CVE-2014-4078 (IP Restriction Bypass).",
            "Discovered sensitive user PII exposed through an unrestricted directory listing, allowing unauthorized access to personal information and posing a serious data protection risk.",
            "Recovered three sets of valid infrastructure credentials including Admin access threatening a complete system takeover."
        ],
    },
    {
        
        name: null,
        title: "Credential Disclosure",
        company: "Independent",
        period: "Oct 2023",
        narrative: "Exploited an insecure admin.php endpoint using PHP wrappers to discover plaintext MySQL database administrative credentials on a production website. Responsibly reported the vulnerability to mitigate the risk of a full database compromise and unauthorized data exfiltration.",
        highlights: [
            "Extracted plaintext database admin credentials via PHP wrappers on a production website.",
            "Reported the vulnerability to mitigate the risk of a full database compromise.",
            "Highlighted that an unmitigated threat would allow malicious actors to completely exfiltrate sensitive backend data."
        ],
    },

{
        name: "YouTube",
        title: "Cybersecurity Content Creator",
        link: "https://www.youtube.com/@HackWithLinux",
        company: "HackWithLinux",
        period: "Aug 2025 - Present",
        narrative: "Create and publish practical cybersecurity content focused on red team techniques, penetration testing labs, and ethical hacking tutorials.",
        highlights: [
        "Published hands-on Linux command-line tutorials covering command chaining, pipes, and text processing with grep.",
        "Created educational content explaining Linux file permissions, ownership, and access control for security professionals.",
        "Produced practical demonstrations of the find command for system administration, security auditing, and file discovery."
    ],
},
    {
        name: "Community",
        title: "CyberSecurity Lead",
        company: "Elixir Tech Community",
        link: "https://x.com/TheElixirTech/status/2023422073570566170?s=20",
        period: "2023-2025",
        narrative: "200+ members. Technical workshops. Mentorship.",
        highlights: [
            "Technical community leadership, 200+ members",
            "GFG ABESEC CyberSecurity Lead",
            "Organized workshops on web application security, penetration testing, Google Dorking and OSINT methodologies for a large student audience",
        ],
    },
];

// Credentials
export const proof = {
    report1: {
        title: "Critical SQL Injection in Login Page",
        date: "Jul 23 2026",
        status: "Reported",
        data: "Identified a critical SQL Injection vulnerability in a web application's login page during an authorized security assessment. The issue could allow authentication bypass, administrative access, exposure of sensitive Personally Identifiable Information (PII), and privileged database operations."
    },
    report2: {
        title: "Sensitive Data Exposure: 302 Redirect to Unsecured Google Drive",
        date: "Apr 27 2024",
        // status: "Reported",
        data: "Discovered a 302 Redirect on a legacy subdomain that led to an unsecured Google Drive instance belonging to a major Indian e-commerce platform containing customer call recordings and PII, mitigating a significant data privacy risk."
    },
    
    report3: {
        title: "Infrastructure Misconfiguration",
        date: "Dec 2023",
        status: "Reported",
        data: "Discovered an outdated web stack running Microsoft-IIS/8.5 and ASP.NET 4.0.30319 that exposed a directory listing vulnerability. Further analysis revealed severe unpatched vulnerabilities susceptible to authentication bypass, compounded by the recovery of three valid credentials from a text file.",
    },

        report4: {
        title: "Credential Disclosure: Hardcoded Credential Leak via Raw PHP Exposure",
        date: "Oct 2023",
        status: "Reported",
        data: "Extracted plaintext database admin credentials via PHP wrappers on a production website. Reported the vulnerability to mitigate the risk of a full database compromise and unauthorized data exfiltration."
    },


    stack: {
        "programming": ["Python", "Go", "SQL", "MySQL", "MSSQL"],
        "security": ["Web Application Security", "Active Directory Penetration Testing", "Container Security"],
        "tools": ["Burp Suite", "Caido", "Nmap", "Wireshark", "Metasploit", "Amass", "Subfinder", "Gobuster", "httpx", "Mimikatz", "Nuclei"],
        "operations": ["Docker", "Docker-Compose", "Docker Security", "Linux", "Git", "AWS"],
        "concepts": ["OWASP Top 10", "TCP/IP", "DNS", "HTTP/S", "Active Directory Fundamentals"]
    },
};


// Contact
export const closing = {
    statement: "Open to backend engineering roles where reliability matters.",
    links: [
        { label: "GitHub", href: "https://github.com/Shubhankargupta691", icon: "github" },
        { label: "LinkedIn", href: "https://linkedin.com/in/shubhankar-gupta1/", icon: "linkedin" },
        { label: "Email", href: "mailto:work.guptashubhankar691@gmail.com", icon: "email" },
    ],
};

// Navigation
export const navLinks = [
    { name: "Projects", type: "route", path: "/projects" },
    { name: "Approach", type: "section", hash: "approach" },
    { name: "Record", type: "section", hash: "record" },
    { name: "Credentials", type: "section", hash: "credentials" },
    { name: "Contact", type: "section", hash: "contact" },
    { name: "Blogs", type: "route", path: "/blog", aliases: ["/blog"] },
];

export const footerLinks = [
    ...navLinks,
    { name: "Resume", type: "route", path: "/resume" },
];
