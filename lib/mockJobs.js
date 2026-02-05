// lib/mockJobs.js
// Mock job listings for testing Job Matcher

export const mockJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechCorp India",
    location: "Hyderabad",
    salary_min: 800000,
    salary_max: 1200000,
    job_type: "full-time",
    work_type: "remote",
    description: "We're looking for a talented Frontend Developer to join our team. You'll work on building responsive web applications using React and Next.js.",
    requirements: [
      "3+ years experience with React",
      "Strong JavaScript/TypeScript skills",
      "Experience with Next.js",
      "Knowledge of responsive design",
      "Git proficiency"
    ],
    url: "https://example.com/jobs/1",
    source: "mock"
  },
  {
    id: 2,
    title: "Full Stack Engineer",
    company: "FinTech Solutions",
    location: "Remote",
    salary_min: 1000000,
    salary_max: 1500000,
    job_type: "full-time",
    work_type: "remote",
    description: "Join our fintech startup building the future of digital payments. Work with React, Node.js, and PostgreSQL.",
    requirements: [
      "React and Node.js experience",
      "Database design skills (PostgreSQL)",
      "RESTful API development",
      "Understanding of fintech domain",
      "Agile methodology"
    ],
    url: "https://example.com/jobs/2",
    source: "mock"
  },
  {
    id: 3,
    title: "Senior Frontend Developer",
    company: "E-commerce Giant",
    location: "Bangalore",
    salary_min: 1200000,
    salary_max: 1800000,
    job_type: "full-time",
    work_type: "hybrid",
    description: "Looking for a senior frontend developer to lead our e-commerce platform development using React and modern web technologies.",
    requirements: [
      "5+ years frontend development",
      "Expert in React ecosystem",
      "Leadership experience",
      "Performance optimization",
      "E-commerce experience preferred"
    ],
    url: "https://example.com/jobs/3",
    source: "mock"
  },
  {
    id: 4,
    title: "React Developer",
    company: "Startup Labs",
    location: "Hyderabad",
    salary_min: 700000,
    salary_max: 1000000,
    job_type: "full-time",
    work_type: "remote",
    description: "Fast-growing startup looking for React developers to build innovative SaaS products.",
    requirements: [
      "2+ years React experience",
      "JavaScript ES6+",
      "Redux or similar state management",
      "RESTful API integration",
      "Startup mindset"
    ],
    url: "https://example.com/jobs/4",
    source: "mock"
  },
  {
    id: 5,
    title: "Backend Developer",
    company: "Cloud Systems Inc",
    location: "Pune",
    salary_min: 900000,
    salary_max: 1300000,
    job_type: "full-time",
    work_type: "onsite",
    description: "Backend developer needed for building scalable microservices with Node.js and AWS.",
    requirements: [
      "Node.js and Express",
      "Microservices architecture",
      "AWS or Azure cloud",
      "Database design",
      "Docker and Kubernetes"
    ],
    url: "https://example.com/jobs/5",
    source: "mock"
  },
  {
    id: 6,
    title: "Frontend Engineer",
    company: "Healthcare Tech",
    location: "Remote",
    salary_min: 850000,
    salary_max: 1250000,
    job_type: "full-time",
    work_type: "remote",
    description: "Build healthcare applications that improve patient care using React and modern frontend technologies.",
    requirements: [
      "React and TypeScript",
      "Healthcare domain knowledge a plus",
      "HIPAA compliance awareness",
      "Accessibility standards",
      "Testing with Jest"
    ],
    url: "https://example.com/jobs/6",
    source: "mock"
  },
  {
    id: 7,
    title: "UI/UX Developer",
    company: "Design Studio",
    location: "Mumbai",
    salary_min: 750000,
    salary_max: 1100000,
    job_type: "full-time",
    work_type: "hybrid",
    description: "Creative UI/UX developer to bring designs to life with React and modern CSS.",
    requirements: [
      "Strong CSS skills",
      "React development",
      "Figma to code",
      "Animation libraries",
      "Design systems"
    ],
    url: "https://example.com/jobs/7",
    source: "mock"
  },
  {
    id: 8,
    title: "JavaScript Developer",
    company: "Media Tech",
    location: "Hyderabad",
    salary_min: 650000,
    salary_max: 950000,
    job_type: "full-time",
    work_type: "remote",
    description: "Work on media streaming platforms using JavaScript, React, and video technologies.",
    requirements: [
      "Strong JavaScript fundamentals",
      "React experience",
      "Video/audio APIs knowledge",
      "Performance optimization",
      "Cross-browser compatibility"
    ],
    url: "https://example.com/jobs/8",
    source: "mock"
  },
  {
    id: 9,
    title: "Full Stack Developer",
    company: "EdTech Innovations",
    location: "Remote",
    salary_min: 900000,
    salary_max: 1400000,
    job_type: "full-time",
    work_type: "remote",
    description: "Build educational platforms that transform learning using full-stack JavaScript technologies.",
    requirements: [
      "MERN stack proficiency",
      "Educational technology interest",
      "Real-time features (WebSockets)",
      "Payment integration",
      "Content management systems"
    ],
    url: "https://example.com/jobs/9",
    source: "mock"
  },
  {
    id: 10,
    title: "Lead Frontend Developer",
    company: "Enterprise Solutions",
    location: "Bangalore",
    salary_min: 1500000,
    salary_max: 2200000,
    job_type: "full-time",
    work_type: "hybrid",
    description: "Lead a team of frontend developers building enterprise-grade applications with React.",
    requirements: [
      "7+ years frontend experience",
      "Team leadership",
      "React and TypeScript expert",
      "Architecture design",
      "Mentoring experience"
    ],
    url: "https://example.com/jobs/10",
    source: "mock"
  },
  {
    id: 11,
    title: "Frontend Developer",
    company: "Gaming Studio",
    location: "Pune",
    salary_min: 800000,
    salary_max: 1200000,
    job_type: "full-time",
    work_type: "onsite",
    description: "Create immersive gaming experiences for web platforms using React and WebGL.",
    requirements: [
      "React development",
      "Canvas/WebGL experience",
      "Game development interest",
      "Animation skills",
      "Performance optimization"
    ],
    url: "https://example.com/jobs/11",
    source: "mock"
  },
  {
    id: 12,
    title: "Software Engineer - Frontend",
    company: "AI Research Lab",
    location: "Remote",
    salary_min: 1100000,
    salary_max: 1600000,
    job_type: "full-time",
    work_type: "remote",
    description: "Build interfaces for AI/ML tools and applications using React and data visualization libraries.",
    requirements: [
      "React and TypeScript",
      "Data visualization (D3.js, Charts)",
      "AI/ML interest",
      "Complex state management",
      "API integration"
    ],
    url: "https://example.com/jobs/12",
    source: "mock"
  }
]