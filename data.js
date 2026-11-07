/**
 * SITE_DATA — single source of truth for Rijan's portfolio.
 * Edit this file to update content. Do not hardcode personal info elsewhere.
 * Leave a field as an empty string "" if you don't have it yet — components
 * are built to hide empty fields gracefully rather than show "undefined".
 */
var SITE_DATA = {
  identity: {
    name: "Rijan Adhikari",
    handle: "rijan-adhikari",
    title: "Software Developer & Cybersecurity Enthusiast",
    location: "Nepal",
    statement:
      "I build things, break things, and figure out how they work in between. Currently leveling up in software development and cybersecurity, one project, one lab, one late night at a time.",
    heroLines: [
      "> initializing rijan.dev",
      "> loading creativity...",
      "> loading curiosity...",
      "> loading cybersecurity...",
      "> system status: BUILDING"
    ]
  },

  about: {
    paragraphs: [
      "I'm a young technology enthusiast who enjoys designing, building, and experimenting with technology. Right now I'm developing my skills in software development and cybersecurity, jumping between projects, operating systems, networking labs, web development, and whatever new tool catches my attention that week.",
      "I'm curious about how things work. I like breaking problems down until they make sense, and I want to eventually use that knowledge to build and protect real systems.",
      "This site is not a finished résumé, it's a snapshot of someone actively becoming dangerous at this stuff. Long-term, I want to become a cybersecurity expert and build something meaningful in Nepal."
    ],
    traits: [
      "Independent",
      "Curious",
      "Experimental",
      "Ambitious",
      "Creative",
      "Adaptable"
    ],
    currentFocus: ["Programming", "Vibecoding / AI-assisted creative coding", "Enjoying life"]
  },

  education: [
    {
      level: "Grade 10",
      institution: "Jana Jyoti Model Secondary School",
      institutionUrl: "https://jjmc.edu.np/",
      location: "Lalbandi-09, Sarlahi, Nepal"
    },
    {
      level: "+2",
      institution: "The Times International College",
      institutionUrl: "https://timescollege.edu.np/",
      location: "Nepal"
    }
  ],

  certifications: [
    {
      name: "Cisco Networking Academy",
      issuer: "Cisco",
      detail: "Certificate / badge details to be added",
      credentialId: "",
      credentialUrl: "",
      date: ""
    },
    {
      name: "Ethical Hacking Course",
      issuer: "",
      detail: "Course/provider details to be added",
      credentialId: "",
      credentialUrl: "",
      date: ""
    }
  ],

  skillGroups: [
    {
      group: "Web Development",
      skills: [
        { name: "Web Development", stage: "Building" },
        { name: "Responsive UI", stage: "Practicing" },
        { name: "Interaction Design", stage: "Exploring" }
      ]
    },
    {
      group: "Languages",
      skills: [
        { name: "HTML", stage: "Building" },
        { name: "CSS", stage: "Building" },
        { name: "JavaScript", stage: "Practicing" },
        { name: "Python", stage: "Practicing" }
      ]
    },
    {
      group: "Backend & Data",
      skills: [
        { name: "FastAPI", stage: "Practicing" },
        { name: "Databases", stage: "Learning" },
        { name: "APIs", stage: "Practicing" }
      ]
    },
    {
      group: "Tools & Systems",
      skills: [
        { name: "Git", stage: "Practicing" },
        { name: "GitHub", stage: "Building" },
        { name: "Linux", stage: "Exploring" },
        { name: "Windows", stage: "Building" },
        { name: "ChromeOS", stage: "Exploring" },
        { name: "Virtual Machines", stage: "Exploring" }
      ]
    },
    {
      group: "Cybersecurity",
      skills: [
        { name: "Networking", stage: "Learning" },
        { name: "Ethical Hacking", stage: "Learning" },
        { name: "Nmap", stage: "Practicing" },
        { name: "Wireshark", stage: "Practicing" },
        { name: "Burp Suite", stage: "Learning" },
        { name: "Metasploit", stage: "Learning" },
        { name: "Kali Linux", stage: "Exploring" },
        { name: "Aircrack-ng", stage: "Exploring" }
      ]
    },
    {
      group: "Systems Experimentation",
      skills: [
        { name: "Android Customization", stage: "Practicing" },
        { name: "Custom ROMs", stage: "Exploring" },
        { name: "AI-Assisted Development", stage: "Building" }
      ]
    }
  ],

  stageOrder: ["Learning", "Practicing", "Building", "Exploring"],

  cyberLab: {
    intro:
      "Networking and security are where curiosity turns into practice. This is the toolkit I actually use in labs and the one competition I've been part of, not a claim to professional pentesting experience.",
    tools: [
      { name: "Nmap", use: "Network discovery & port scanning", link: "https://nmap.org/download.html", videoLabel: "How Nmap really works | David Bombal", videoEmbedUrl: "https://www.youtube.com/embed/F2PXe_o7KqM" },
      { name: "Wireshark", use: "Packet capture & traffic analysis", link: "https://www.wireshark.org/download.html", videoLabel: "Wireshark Tutorial: Installation and Password Sniffing | David Bombal", videoEmbedUrl: "https://www.youtube.com/embed/4_7A8Ikp5Cc" },
      { name: "Burp Suite", use: "Web application testing", link: "https://portswigger.net/burp/professional", videoLabel: "Burp Suite Tutorial | David Bombal", videoEmbedUrl: "https://www.youtube.com/embed/IWWYNDiwYOA" },
      { name: "Metasploit", use: "Exploitation framework, lab use", link: "https://www.metasploit.com/download", videoLabel: "David Bombal Metasploit tutorial", videoEmbedUrl: "https://www.youtube.com/embed/bBut8D7usKA" },
      { name: "Kali Linux", use: "Primary security testing OS", link: "https://www.kali.org/get-kali/", videoLabel: "David Bombal Kali Linux tutorial", videoEmbedUrl: "https://www.youtube.com/embed/MPkni85O9JA" },
      { name: "Aircrack-ng", use: "Wireless network auditing", link: "https://www.aircrack-ng.org/downloads.html", videoLabel: "David Bombal Wi-Fi lab demo", videoEmbedUrl: "https://www.youtube.com/embed/X49lIPHcurE" }
    ],
    experience: {
      title: "Cybersecurity Competition",
      description:
        "Took part in a cybersecurity competition involving authorized attempts to access Wi-Fi and CCTV systems in a controlled, competitive environment. It's the kind of hands-on exposure that made networking and security click for me, not a claim of professional security work."
    },
    disclaimer:
      "Everything above reflects learning, labs, and authorized practice, not professional penetration testing or security consulting."
  },

  projectCategories: ["Featured", "Web Development", "Cybersecurity / Labs", "Experiments", "Learning Projects"],

  projects: [
    {
      title: "NEPSE Paper Trading Backend",
      categories: ["Featured", "Web Development"],
      summary:
        "A backend for simulated (paper) trading on Nepal's stock exchange, built to learn real backend architecture, not to generate real financial results.",
      problem:
        "I wanted to understand how a real trading system is structured end-to-end, data models, API design, and persistence, using something I actually care about: NEPSE.",
      built:
        "A FastAPI backend with structured models and schemas for simulated trades, separated cleanly into main application, database layer, models, and schemas.",
      stack: ["Python", "FastAPI", "SQL Database", "Pydantic schemas"],
      challenges: [
        "Designing data models that actually reflect how trades and holdings relate to each other",
        "Structuring the project so backend logic stays separate from data schemas"
      ],
      status: "In development, learning project, not production-grade",
      links: { github: "", live: "" },
      files: ["main.py", "database.py", "models.py", "schemas.py", "requirements.txt"]
    },
    {
      title: "Restaurant Billing System",
      categories: ["Featured", "Web Development"],
      summary:
        "A fully developed and optimized restaurant billing system with a clean workflow for generating bills, tracking items, and managing sales efficiently.",
      problem:
        "I wanted to build a practical real-world business system that felt useful beyond a demo, focusing on speed, clarity, and daily usability for restaurant operations.",
      built:
        "A polished billing interface and logic flow designed for quick order entry, itemized totals, and efficient checkout experience with optimized front-end behavior.",
      stack: ["HTML", "CSS", "JavaScript", "Modern UI", "Billing Logic"],
      challenges: [
        "Designing a smoother billing workflow with accurate calculations and fast interactions",
        "Keeping the UI clean while supporting real-time order and totals management"
      ],
      status: "Fully developed and optimized",
      links: { github: "", live: "" },
      files: ["index.html", "style.css", "script.js", "billing.js", "assets"]
    },
    {
      title: "Proposal Website",
      categories: ["Featured", "Web Development", "Experiments"],
      summary:
        "An interactive, animated proposal-style website, used as a playground for custom UI/UX, motion, and sound.",
      problem:
        "I wanted to push my frontend skills past static layouts, real interaction design, animated interfaces, and a personalized experience.",
      built:
        "A fully custom animated interface with interactive buttons, music integration, and a personalized flow from start to finish.",
      stack: ["HTML", "CSS", "JavaScript"],
      challenges: [
        "Choreographing animation timing so interactions felt intentional, not random",
        "Getting audio and UI state to stay in sync"
      ],
      status: "Complete",
      links: { github: "https://github.com/rijan-adhikari/proposal-website", live: "https://proposal-website-g4n8.onrender.com" }
    },
    {
      title: "Proposal Website With Backend",
      categories: ["Web Development"],
      summary:
        "A follow-up version of the proposal website concept, extended with backend functionality connecting frontend interactions to server-side logic.",
      problem: "Take the original frontend experiment further by wiring it up to a real backend.",
      built: "Frontend and backend communicating over an API, extending the original interactive concept.",
      stack: ["JavaScript", "Backend API"],
      challenges: ["Connecting frontend interaction states to backend logic cleanly"],
      status: "Details to be finalized from the repository",
      links: { github: "", live: "" }
    },
    {
      title: "Calculator First Project",
      categories: ["Learning Projects"],
      summary: "My first programming/web project. Not revolutionary, the actual starting point.",
      problem: "Learn the fundamentals of building and shipping something that runs in a browser.",
      built: "A working calculator interface using core HTML, CSS, and JavaScript.",
      stack: ["HTML", "CSS", "JavaScript"],
      challenges: ["Handling input logic and edge cases for the first time"],
      status: "Complete, kept as a milestone, not a flagship",
      links: { github: "", live: "" }
    },
    {
      title: "Custom ROM / Android Experimentation",
      categories: ["Experiments"],
      summary: "Hands-on experimentation with Android customization, custom ROM environments, and flashing.",
      problem: "Understand how Android actually works under the hood, beyond using it as a consumer.",
      built: "Custom ROM installs and system-level configuration across test devices.",
      stack: ["Android", "Custom ROM tooling"],
      challenges: ["Debugging failed flashes", "Understanding partition and bootloader behavior"],
      status: "Ongoing experimentation",
      links: { github: "", live: "" }
    },
    {
      title: "Linux / ChromeOS Experiments",
      categories: ["Experiments", "Cybersecurity / Labs"],
      summary: "Extensive experimentation across Linux distros, ChromeOS, containers, and virtualization.",
      problem: "Build real comfort with different operating systems and infrastructure, not just one.",
      built: "Multiple VM and container setups across distros, used as a home lab for testing and learning.",
      stack: ["Linux", "ChromeOS", "Debian containers", "Virtual Machines"],
      challenges: ["Getting networking to behave correctly across VM configurations"],
      status: "Ongoing",
      links: { github: "", live: "" }
    },
    {
      title: "macOS / OpenCore Experiment",
      categories: ["Experiments"],
      summary: "Experimentation with macOS/OpenCore-style installation and configuration.",
      problem: "Understand bootloader and hardware-compatibility layers outside the OSes I use daily.",
      built: "A working OpenCore-based configuration and install process.",
      stack: ["OpenCore", "macOS"],
      challenges: ["Matching configuration to hardware quirks"],
      status: "Experimental, not an official Apple development project",
      links: { github: "", live: "" }
    },
    {
      title: "Networking & Cybersecurity Labs",
      categories: ["Cybersecurity / Labs"],
      summary: "Home-lab networking and security practice using industry-standard tools.",
      problem: "Get hands-on with the tools real security work actually uses.",
      built: "Lab environments for scanning, packet analysis, and web application testing.",
      stack: ["Nmap", "Wireshark", "Burp Suite", "Metasploit", "Kali Linux", "Aircrack-ng"],
      challenges: ["Setting up isolated lab networks safely"],
      status: "Ongoing learning",
      links: { github: "", live: "" }
    }
  ],

  timeline: [
    { stage: "Learn", description: "Fundamentals of programming, networking, and security concepts." },
    { stage: "Build", description: "Shipping real projects, web apps, backends, experiments." },
    { stage: "Secure", description: "Hands-on practice with security tools and lab environments." },
    { stage: "Master", description: "Deepening cybersecurity expertise through consistent practice." },
    { stage: "Build the Business", description: "Long-term goal: a cybersecurity business in Nepal, about 10 years out." }
  ],

  interests: [
    { name: "Gaming", note: "Competitive and exploratory, a good way to reset the brain." },
    { name: "Trading / NEPSE", note: "Following Nepal's stock market, currently through paper trading." },
    { name: "Vibecoding", note: "AI-assisted, exploratory creative coding sessions." },
    { name: "Enjoying Life", note: "Not everything has to be a project." }
  ],

  social: {
    email: "business.rijan.np@gmail.com",
    whatsapp: "9779708741190",
    github: "https://github.com/rijan-adhikari/MY_Portfolio",
    githubUsername: "rijan-adhikari",
    facebook: "https://www.facebook.com/profile.php?id=61585298038728",
    instagram: "https://www.instagram.com/rizan.js/"
  },

  seo: {
    title: "Rijan Adhikari, Software Developer & Cybersecurity Enthusiast",
    description:
      "Portfolio of Rijan Adhikari, a self-taught software developer and cybersecurity enthusiast from Nepal, building projects and learning security one lab at a time.",
    url: "https://rijan-adhikari.onrender.com/"
  }
};
