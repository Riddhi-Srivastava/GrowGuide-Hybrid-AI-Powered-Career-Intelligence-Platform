export interface RoleData {
    roleName: string;
    keywords: string[];
    requiredSkills: { name: string; weight: number; category: string }[];
  }

  export const rolesDatabase = [

  {
    roleName: "Frontend Developer",
    keywords: ["frontend", "ui developer", "react developer", "web"],
    requiredSkills: [
      { name: "React", weight: 10, category: "Frontend" },
      { name: "JavaScript", weight: 10, category: "Language" },
      { name: "HTML", weight: 9, category: "Frontend" },
      { name: "CSS", weight: 9, category: "Frontend" },
      { name: "TypeScript", weight: 8, category: "Language" },
      { name: "Responsive Design", weight: 8, category: "Frontend" },
      { name: "Git", weight: 7, category: "Tools" }
    ]
  },

  {
    roleName: "Backend Developer",
    keywords: ["backend", "api developer", "server", "node"],
    requiredSkills: [
      { name: "Node.js", weight: 10, category: "Backend" },
      { name: "Express.js", weight: 9, category: "Backend" },
      { name: "REST API", weight: 9, category: "Backend" },
      { name: "MongoDB", weight: 8, category: "Database" },
      { name: "SQL", weight: 8, category: "Database" },
      { name: "Authentication", weight: 7, category: "Security" },
      { name: "Git", weight: 7, category: "Tools" }
    ]
  },

  {
    roleName: "Full Stack Developer",
    keywords: ["full stack", "mern", "web developer", "fullstack"],
    requiredSkills: [
      { name: "React", weight: 10, category: "Frontend" },
      { name: "Node.js", weight: 9, category: "Backend" },
      { name: "MongoDB", weight: 8, category: "Database" },
      { name: "JavaScript", weight: 10, category: "Language" },
      { name: "REST API", weight: 8, category: "Backend" },
      { name: "Git", weight: 7, category: "Tools" }
    ]
  },

  {
    roleName: "Data Scientist",
    keywords: ["data science", "ml", "analytics", "ai"],
    requiredSkills: [
      { name: "Python", weight: 10, category: "Language" },
      { name: "Machine Learning", weight: 10, category: "AI/ML" },
      { name: "Statistics", weight: 9, category: "Math" },
      { name: "Pandas", weight: 9, category: "Data" },
      { name: "SQL", weight: 8, category: "Database" }
    ]
  },

  {
    roleName: "AI Engineer",
    keywords: ["ai", "ml engineer", "deep learning"],
    requiredSkills: [
      { name: "Python", weight: 10, category: "Language" },
      { name: "Deep Learning", weight: 10, category: "AI/ML" },
      { name: "TensorFlow", weight: 9, category: "AI/ML" },
      { name: "PyTorch", weight: 9, category: "AI/ML" },
      { name: "Maths", weight: 8, category: "Math" }
    ]
  },

  {
    roleName: "DevOps Engineer",
    keywords: ["devops", "ci cd", "cloud", "automation"],
    requiredSkills: [
      { name: "Docker", weight: 10, category: "DevOps" },
      { name: "Kubernetes", weight: 9, category: "DevOps" },
      { name: "AWS", weight: 9, category: "Cloud" },
      { name: "CI/CD", weight: 9, category: "DevOps" },
      { name: "Linux", weight: 9, category: "OS" }
    ]
  },

  {
    roleName: "Cybersecurity Analyst",
    keywords: ["security", "hacking", "infosec", "cyber"],
    requiredSkills: [
      { name: "Network Security", weight: 10, category: "Security" },
      { name: "Penetration Testing", weight: 9, category: "Security" },
      { name: "Linux", weight: 8, category: "OS" },
      { name: "Cryptography", weight: 8, category: "Security" },
      { name: "Incident Response", weight: 8, category: "Security" }
    ]
  },

  {
    roleName: "Cloud Engineer",
    keywords: ["cloud", "aws", "azure", "gcp"],
    requiredSkills: [
      { name: "AWS", weight: 10, category: "Cloud" },
      { name: "Azure", weight: 9, category: "Cloud" },
      { name: "Docker", weight: 8, category: "DevOps" },
      { name: "Kubernetes", weight: 8, category: "DevOps" },
      { name: "Linux", weight: 9, category: "OS" }
    ]
  },

  {
    roleName: "Mobile App Developer",
    keywords: ["mobile", "android", "ios", "flutter"],
    requiredSkills: [
      { name: "Flutter", weight: 9, category: "Mobile" },
      { name: "React Native", weight: 9, category: "Mobile" },
      { name: "JavaScript", weight: 8, category: "Language" },
      { name: "Kotlin", weight: 8, category: "Language" },
      { name: "Swift", weight: 8, category: "Language" }
    ]
  },

  {
    roleName: "UI/UX Designer",
    keywords: ["ui", "ux", "design", "figma"],
    requiredSkills: [
      { name: "Figma", weight: 10, category: "Design" },
      { name: "UI Design", weight: 10, category: "Design" },
      { name: "UX Research", weight: 9, category: "Research" },
      { name: "Wireframing", weight: 8, category: "Design" },
      { name: "Prototyping", weight: 8, category: "Design" }
    ]
  },

  {
    roleName: "Machine Learning Engineer",
    keywords: ["ml", "machine learning", "ai"],
    requiredSkills: [
      { name: "Python", weight: 10, category: "Language" },
      { name: "Scikit-learn", weight: 9, category: "AI/ML" },
      { name: "TensorFlow", weight: 9, category: "AI/ML" },
      { name: "Data Structures", weight: 8, category: "CS" }
    ]
  },

  {
    roleName: "Blockchain Developer",
    keywords: ["blockchain", "web3", "crypto"],
    requiredSkills: [
      { name: "Solidity", weight: 10, category: "Web3" },
      { name: "Ethereum", weight: 9, category: "Web3" },
      { name: "Smart Contracts", weight: 9, category: "Web3" },
      { name: "JavaScript", weight: 8, category: "Language" }
    ]
  },

  {
    roleName: "Data Analyst",
    keywords: ["data analyst", "excel", "analytics"],
    requiredSkills: [
      { name: "Excel", weight: 10, category: "Tools" },
      { name: "SQL", weight: 9, category: "Database" },
      { name: "Power BI", weight: 9, category: "Tools" },
      { name: "Data Visualization", weight: 8, category: "Data" }
    ]
  },

  {
    roleName: "Software Engineer",
    keywords: ["software", "developer", "programming"],
    requiredSkills: [
      { name: "Java", weight: 9, category: "Language" },
      { name: "Data Structures", weight: 10, category: "CS" },
      { name: "Algorithms", weight: 10, category: "CS" },
      { name: "OOP", weight: 9, category: "CS" }
    ]
  },

  {
    roleName: "Game Developer",
    keywords: ["game", "unity", "unreal"],
    requiredSkills: [
      { name: "Unity", weight: 10, category: "Game Dev" },
      { name: "C#", weight: 9, category: "Language" },
      { name: "Game Physics", weight: 8, category: "Game Dev" },
      { name: "3D Design", weight: 7, category: "Design" }
    ]
  },

  {
    roleName: "AR/VR Developer",
    keywords: ["ar", "vr", "xr", "metaverse"],
    requiredSkills: [
      { name: "Unity", weight: 9, category: "XR" },
      { name: "C#", weight: 8, category: "Language" },
      { name: "3D Modeling", weight: 8, category: "Design" },
      { name: "AR SDK", weight: 7, category: "XR" }
    ]
  },

  {
    roleName: "Prompt Engineer",
    keywords: ["prompt", "ai", "chatgpt", "llm"],
    requiredSkills: [
      { name: "Prompt Design", weight: 10, category: "AI" },
      { name: "LLM Knowledge", weight: 9, category: "AI" },
      { name: "Creativity", weight: 9, category: "Soft Skill" },
      { name: "Communication", weight: 8, category: "Soft Skill" }
    ]
  },

  {
    roleName: "Site Reliability Engineer",
    keywords: ["sre", "reliability", "infra"],
    requiredSkills: [
      { name: "Linux", weight: 10, category: "OS" },
      { name: "Monitoring", weight: 9, category: "DevOps" },
      { name: "Docker", weight: 9, category: "DevOps" },
      { name: "Networking", weight: 8, category: "Infrastructure" }
    ]
  },

  {
    roleName: "Big Data Engineer",
    keywords: ["big data", "hadoop", "spark"],
    requiredSkills: [
      { name: "Hadoop", weight: 10, category: "Data" },
      { name: "Spark", weight: 9, category: "Data" },
      { name: "Python", weight: 8, category: "Language" },
      { name: "SQL", weight: 8, category: "Database" }
    ]
  },

  {
    roleName: "QA Engineer",
    keywords: ["testing", "qa", "automation"],
    requiredSkills: [
      { name: "Testing", weight: 10, category: "QA" },
      { name: "Selenium", weight: 9, category: "QA" },
      { name: "Automation", weight: 9, category: "QA" },
      { name: "Bug Tracking", weight: 8, category: "Tools" }
    ]
  },
  {
    roleName: "Graphic Designer",
    keywords: ["graphic design", "photoshop", "branding", "design"],
    requiredSkills: [
      { name: "Photoshop", weight: 10, category: "Design" },
      { name: "Illustrator", weight: 9, category: "Design" },
      { name: "Typography", weight: 8, category: "Design" },
      { name: "Color Theory", weight: 8, category: "Design" },
      { name: "Creativity", weight: 9, category: "Soft Skill" }
    ]
  },

  {
    roleName: "Video Editor",
    keywords: ["video editing", "premiere pro", "editing", "film"],
    requiredSkills: [
      { name: "Premiere Pro", weight: 10, category: "Editing" },
      { name: "After Effects", weight: 9, category: "Editing" },
      { name: "Storytelling", weight: 9, category: "Creative" },
      { name: "Color Grading", weight: 8, category: "Editing" },
      { name: "Creativity", weight: 9, category: "Soft Skill" }
    ]
  },

  {
    roleName: "Animator",
    keywords: ["animation", "2d", "3d", "motion"],
    requiredSkills: [
      { name: "Animation Principles", weight: 10, category: "Animation" },
      { name: "Blender", weight: 9, category: "Tools" },
      { name: "After Effects", weight: 8, category: "Tools" },
      { name: "Storyboarding", weight: 8, category: "Creative" },
      { name: "Creativity", weight: 9, category: "Soft Skill" }
    ]
  },

  {
    roleName: "UI Designer",
    keywords: ["ui design", "app design", "figma", "interface"],
    requiredSkills: [
      { name: "Figma", weight: 10, category: "Design" },
      { name: "UI Design", weight: 10, category: "Design" },
      { name: "Typography", weight: 8, category: "Design" },
      { name: "Color Theory", weight: 8, category: "Design" },
      { name: "Creativity", weight: 9, category: "Soft Skill" }
    ]
  },

  {
    roleName: "UX Designer",
    keywords: ["ux design", "user research", "product design", "ux"],
    requiredSkills: [
      { name: "User Research", weight: 10, category: "Research" },
      { name: "Wireframing", weight: 9, category: "Design" },
      { name: "Prototyping", weight: 9, category: "Design" },
      { name: "Usability Testing", weight: 8, category: "Research" },
      { name: "Empathy", weight: 9, category: "Soft Skill" }
    ]
  },

  {
    roleName: "Photographer",
    keywords: ["photography", "camera", "photoshoot", "editing"],
    requiredSkills: [
      { name: "Camera Handling", weight: 10, category: "Technical" },
      { name: "Lighting", weight: 9, category: "Technical" },
      { name: "Photo Editing", weight: 9, category: "Editing" },
      { name: "Composition", weight: 8, category: "Creative" },
      { name: "Creativity", weight: 9, category: "Soft Skill" }
    ]
  },

  {
    roleName: "Fashion Designer",
    keywords: ["fashion", "clothing", "design", "styling"],
    requiredSkills: [
      { name: "Fashion Design", weight: 10, category: "Design" },
      { name: "Sketching", weight: 9, category: "Creative" },
      { name: "Textile Knowledge", weight: 8, category: "Domain" },
      { name: "Creativity", weight: 10, category: "Soft Skill" },
      { name: "Trend Analysis", weight: 8, category: "Skill" }
    ]
  },

  {
    roleName: "Content Creator",
    keywords: ["content", "youtube", "instagram", "creator"],
    requiredSkills: [
      { name: "Content Creation", weight: 10, category: "Creative" },
      { name: "Video Editing", weight: 9, category: "Editing" },
      { name: "Storytelling", weight: 9, category: "Creative" },
      { name: "Social Media", weight: 8, category: "Marketing" },
      { name: "Creativity", weight: 10, category: "Soft Skill" }
    ]
  },

  {
    roleName: "Illustrator",
    keywords: ["illustration", "drawing", "art", "digital art"],
    requiredSkills: [
      { name: "Drawing", weight: 10, category: "Art" },
      { name: "Digital Illustration", weight: 9, category: "Art" },
      { name: "Photoshop", weight: 8, category: "Tools" },
      { name: "Creativity", weight: 10, category: "Soft Skill" },
      { name: "Visual Storytelling", weight: 9, category: "Creative" }
    ]
  },

  {
    roleName: "Interior Designer",
    keywords: ["interior", "design", "home design", "architecture"],
    requiredSkills: [
      { name: "Space Planning", weight: 10, category: "Design" },
      { name: "AutoCAD", weight: 9, category: "Tools" },
      { name: "3D Visualization", weight: 9, category: "Design" },
      { name: "Creativity", weight: 9, category: "Soft Skill" },
      { name: "Material Knowledge", weight: 8, category: "Domain" }
    ]
  },
  {
    roleName: "Bank PO",
    keywords: ["bank", "po", "banking", "finance"],
    requiredSkills: [
      { name: "Quantitative Aptitude", weight: 10, category: "Aptitude" },
      { name: "Reasoning", weight: 9, category: "Aptitude" },
      { name: "Banking Knowledge", weight: 9, category: "Domain" },
      { name: "English", weight: 8, category: "Language" },
      { name: "Computer Knowledge", weight: 7, category: "Technical" }
    ]
  },

  {
    roleName: "SSC CGL Officer",
    keywords: ["ssc", "cgl", "government", "exam"],
    requiredSkills: [
      { name: "General Awareness", weight: 10, category: "Knowledge" },
      { name: "Reasoning", weight: 9, category: "Aptitude" },
      { name: "Quantitative Aptitude", weight: 9, category: "Aptitude" },
      { name: "English", weight: 8, category: "Language" },
      { name: "Time Management", weight: 8, category: "Soft Skill" }
    ]
  },

  {
    roleName: "Teacher",
    keywords: ["teacher", "teaching", "education", "school"],
    requiredSkills: [
      { name: "Subject Knowledge", weight: 10, category: "Knowledge" },
      { name: "Communication", weight: 10, category: "Soft Skill" },
      { name: "Teaching Skills", weight: 9, category: "Skill" },
      { name: "Patience", weight: 9, category: "Personality" },
      { name: "Classroom Management", weight: 8, category: "Skill" }
    ]
  },

  {
    roleName: "HR Manager",
    keywords: ["hr", "human resource", "recruitment", "management"],
    requiredSkills: [
      { name: "Communication", weight: 10, category: "Soft Skill" },
      { name: "Recruitment", weight: 9, category: "Domain" },
      { name: "People Management", weight: 9, category: "Skill" },
      { name: "Conflict Resolution", weight: 8, category: "Skill" },
      { name: "HR Policies", weight: 8, category: "Domain" }
    ]
  },

  {
    roleName: "Sales Manager",
    keywords: ["sales", "business", "marketing", "manager"],
    requiredSkills: [
      { name: "Sales Strategy", weight: 10, category: "Business" },
      { name: "Communication", weight: 10, category: "Soft Skill" },
      { name: "Negotiation", weight: 9, category: "Skill" },
      { name: "Customer Handling", weight: 9, category: "Skill" },
      { name: "Target Management", weight: 8, category: "Business" }
    ]
  },

  {
    roleName: "Entrepreneur",
    keywords: ["startup", "business", "founder", "entrepreneur"],
    requiredSkills: [
      { name: "Business Strategy", weight: 10, category: "Business" },
      { name: "Leadership", weight: 10, category: "Soft Skill" },
      { name: "Risk Management", weight: 9, category: "Skill" },
      { name: "Financial Knowledge", weight: 9, category: "Domain" },
      { name: "Decision Making", weight: 9, category: "Skill" }
    ]
  },

  {
    roleName: "Lawyer",
    keywords: ["lawyer", "law", "advocate", "legal"],
    requiredSkills: [
      { name: "Legal Knowledge", weight: 10, category: "Domain" },
      { name: "Argument Skills", weight: 10, category: "Skill" },
      { name: "Research", weight: 9, category: "Skill" },
      { name: "Communication", weight: 9, category: "Soft Skill" },
      { name: "Critical Thinking", weight: 9, category: "Skill" }
    ]
  },

  {
    roleName: "Journalist",
    keywords: ["journalism", "media", "news", "reporter"],
    requiredSkills: [
      { name: "Writing Skills", weight: 10, category: "Skill" },
      { name: "Research", weight: 9, category: "Skill" },
      { name: "Communication", weight: 9, category: "Soft Skill" },
      { name: "Current Affairs", weight: 9, category: "Knowledge" },
      { name: "Storytelling", weight: 8, category: "Creative" }
    ]
  },

  {
    roleName: "Police Officer",
    keywords: ["police", "law enforcement", "ips", "security"],
    requiredSkills: [
      { name: "Physical Fitness", weight: 10, category: "Physical" },
      { name: "Discipline", weight: 10, category: "Personality" },
      { name: "Law Knowledge", weight: 9, category: "Domain" },
      { name: "Decision Making", weight: 9, category: "Skill" },
      { name: "Leadership", weight: 9, category: "Soft Skill" }
    ]
  },

  {
    roleName: "Army Officer",
    keywords: ["army", "defense", "military", "nda"],
    requiredSkills: [
      { name: "Physical Fitness", weight: 10, category: "Physical" },
      { name: "Discipline", weight: 10, category: "Personality" },
      { name: "Leadership", weight: 9, category: "Soft Skill" },
      { name: "Strategy", weight: 9, category: "Skill" },
      { name: "Teamwork", weight: 9, category: "Soft Skill" }
    ]
  },

  {
    roleName: "Accountant",
    keywords: ["accounting", "finance", "tax", "accounts"],
    requiredSkills: [
      { name: "Accounting", weight: 10, category: "Domain" },
      { name: "Taxation", weight: 9, category: "Domain" },
      { name: "Excel", weight: 9, category: "Tools" },
      { name: "Financial Analysis", weight: 8, category: "Skill" },
      { name: "Attention to Detail", weight: 9, category: "Soft Skill" }
    ]
  },

  {
    roleName: "Hotel Manager",
    keywords: ["hotel", "hospitality", "management", "service"],
    requiredSkills: [
      { name: "Customer Service", weight: 10, category: "Soft Skill" },
      { name: "Management Skills", weight: 9, category: "Skill" },
      { name: "Communication", weight: 9, category: "Soft Skill" },
      { name: "Problem Solving", weight: 8, category: "Skill" },
      { name: "Operations Management", weight: 8, category: "Business" }
    ]
  },

  {
    roleName: "Air Hostess",
    keywords: ["air hostess", "cabin crew", "aviation", "flight"],
    requiredSkills: [
      { name: "Communication", weight: 10, category: "Soft Skill" },
      { name: "Customer Service", weight: 10, category: "Soft Skill" },
      { name: "Grooming", weight: 9, category: "Personality" },
      { name: "Problem Solving", weight: 8, category: "Skill" },
      { name: "Foreign Language", weight: 8, category: "Language" }
    ]
  },

  {
    roleName: "Social Worker",
    keywords: ["social work", "ngo", "community", "service"],
    requiredSkills: [
      { name: "Empathy", weight: 10, category: "Soft Skill" },
      { name: "Communication", weight: 9, category: "Soft Skill" },
      { name: "Problem Solving", weight: 8, category: "Skill" },
      { name: "Community Knowledge", weight: 8, category: "Domain" },
      { name: "Patience", weight: 9, category: "Personality" }
    ]
  },
  {
    roleName: "Environmental Scientist",
    keywords: ["environment", "climate", "sustainability", "research"],
    requiredSkills: [
      { name: "Environmental Science", weight: 10, category: "Domain" },
      { name: "Data Analysis", weight: 9, category: "Data" },
      { name: "Research Skills", weight: 9, category: "Skill" },
      { name: "Climate Knowledge", weight: 9, category: "Domain" },
      { name: "Problem Solving", weight: 8, category: "Skill" }
    ]
  },

  {
    roleName: "Renewable Energy Engineer",
    keywords: ["solar", "wind", "energy", "renewable"],
    requiredSkills: [
      { name: "Electrical Engineering", weight: 10, category: "Domain" },
      { name: "Solar Technology", weight: 9, category: "Domain" },
      { name: "Energy Systems", weight: 9, category: "Domain" },
      { name: "Problem Solving", weight: 8, category: "Skill" },
      { name: "Sustainability Knowledge", weight: 9, category: "Domain" }
    ]
  },

  {
    roleName: "Sustainability Consultant",
    keywords: ["sustainability", "esg", "green", "consulting"],
    requiredSkills: [
      { name: "Sustainability Strategy", weight: 10, category: "Domain" },
      { name: "ESG Knowledge", weight: 9, category: "Domain" },
      { name: "Data Analysis", weight: 8, category: "Data" },
      { name: "Communication", weight: 9, category: "Soft Skill" },
      { name: "Problem Solving", weight: 8, category: "Skill" }
    ]
  },

  {
    roleName: "Public Health Officer",
    keywords: ["health", "public health", "community", "sdg3"],
    requiredSkills: [
      { name: "Public Health Knowledge", weight: 10, category: "Domain" },
      { name: "Epidemiology", weight: 9, category: "Domain" },
      { name: "Data Analysis", weight: 8, category: "Data" },
      { name: "Communication", weight: 9, category: "Soft Skill" },
      { name: "Community Engagement", weight: 9, category: "Skill" }
    ]
  },

  {
    roleName: "NGO Program Manager",
    keywords: ["ngo", "social work", "program", "development"],
    requiredSkills: [
      { name: "Program Management", weight: 10, category: "Management" },
      { name: "Leadership", weight: 9, category: "Soft Skill" },
      { name: "Fundraising", weight: 8, category: "Skill" },
      { name: "Communication", weight: 9, category: "Soft Skill" },
      { name: "Community Knowledge", weight: 9, category: "Domain" }
    ]
  },

  {
    roleName: "Agricultural Scientist",
    keywords: ["agriculture", "farming", "food security", "sdg2"],
    requiredSkills: [
      { name: "Agriculture Science", weight: 10, category: "Domain" },
      { name: "Soil Science", weight: 9, category: "Domain" },
      { name: "Research Skills", weight: 9, category: "Skill" },
      { name: "Sustainability", weight: 8, category: "Domain" },
      { name: "Problem Solving", weight: 8, category: "Skill" }
    ]
  },

  {
    roleName: "Water Resource Engineer",
    keywords: ["water", "hydrology", "sdg6", "engineering"],
    requiredSkills: [
      { name: "Hydrology", weight: 10, category: "Domain" },
      { name: "Water Management", weight: 9, category: "Domain" },
      { name: "Civil Engineering", weight: 9, category: "Domain" },
      { name: "Problem Solving", weight: 8, category: "Skill" },
      { name: "Sustainability", weight: 8, category: "Domain" }
    ]
  },

  {
    roleName: "Urban Planner",
    keywords: ["urban", "city planning", "infrastructure", "sdg11"],
    requiredSkills: [
      { name: "Urban Planning", weight: 10, category: "Domain" },
      { name: "GIS", weight: 9, category: "Tools" },
      { name: "Data Analysis", weight: 8, category: "Data" },
      { name: "Policy Knowledge", weight: 9, category: "Domain" },
      { name: "Communication", weight: 8, category: "Soft Skill" }
    ]
  },

  {
    roleName: "Climate Change Analyst",
    keywords: ["climate", "global warming", "environment", "sdg13"],
    requiredSkills: [
      { name: "Climate Science", weight: 10, category: "Domain" },
      { name: "Data Analysis", weight: 9, category: "Data" },
      { name: "Research Skills", weight: 9, category: "Skill" },
      { name: "Modeling", weight: 8, category: "Technical" },
      { name: "Problem Solving", weight: 8, category: "Skill" }
    ]
  },

  {
    roleName: "Waste Management Specialist",
    keywords: ["waste", "recycling", "environment", "sdg12"],
    requiredSkills: [
      { name: "Waste Management", weight: 10, category: "Domain" },
      { name: "Recycling Systems", weight: 9, category: "Domain" },
      { name: "Environmental Laws", weight: 8, category: "Domain" },
      { name: "Operations Management", weight: 8, category: "Skill" },
      { name: "Problem Solving", weight: 8, category: "Skill" }
    ]
  },

  {
    roleName: "CSR Manager",
    keywords: ["csr", "corporate social responsibility", "sustainability"],
    requiredSkills: [
      { name: "CSR Strategy", weight: 10, category: "Domain" },
      { name: "Communication", weight: 9, category: "Soft Skill" },
      { name: "Project Management", weight: 9, category: "Management" },
      { name: "Stakeholder Management", weight: 9, category: "Skill" },
      { name: "Sustainability Knowledge", weight: 9, category: "Domain" }
    ]
  },

  {
    roleName: "Education Policy Analyst",
    keywords: ["education", "policy", "sdg4", "analysis"],
    requiredSkills: [
      { name: "Policy Analysis", weight: 10, category: "Domain" },
      { name: "Research Skills", weight: 9, category: "Skill" },
      { name: "Data Analysis", weight: 8, category: "Data" },
      { name: "Education Systems", weight: 9, category: "Domain" },
      { name: "Communication", weight: 8, category: "Soft Skill" }
    ]
  },

  {
    roleName: "Human Rights Advocate",
    keywords: ["human rights", "law", "justice", "sdg16"],
    requiredSkills: [
      { name: "Legal Knowledge", weight: 10, category: "Domain" },
      { name: "Advocacy", weight: 9, category: "Skill" },
      { name: "Communication", weight: 9, category: "Soft Skill" },
      { name: "Research", weight: 8, category: "Skill" },
      { name: "Ethics", weight: 9, category: "Personality" }
    ]
  },

  {
    roleName: "Gender Equality Specialist",
    keywords: ["gender", "equality", "sdg5", "social"],
    requiredSkills: [
      { name: "Gender Studies", weight: 10, category: "Domain" },
      { name: "Policy Knowledge", weight: 9, category: "Domain" },
      { name: "Communication", weight: 9, category: "Soft Skill" },
      { name: "Advocacy", weight: 8, category: "Skill" },
      { name: "Research", weight: 8, category: "Skill" }
    ]
  },

  {
    roleName: "Disaster Management Specialist",
    keywords: ["disaster", "emergency", "management", "sdg11"],
    requiredSkills: [
      { name: "Disaster Management", weight: 10, category: "Domain" },
      { name: "Risk Assessment", weight: 9, category: "Skill" },
      { name: "Crisis Handling", weight: 9, category: "Skill" },
      { name: "Leadership", weight: 9, category: "Soft Skill" },
      { name: "Communication", weight: 8, category: "Soft Skill" }
    ]
  },{
    roleName: "Environmental Scientist",
    keywords: ["environment", "climate", "sustainability", "research"],
    requiredSkills: [
      { name: "Environmental Science", weight: 10, category: "Domain" },
      { name: "Data Analysis", weight: 9, category: "Data" },
      { name: "Research Skills", weight: 9, category: "Skill" },
      { name: "Climate Knowledge", weight: 9, category: "Domain" },
      { name: "Problem Solving", weight: 8, category: "Skill" }
    ]
  },

  {
    roleName: "Renewable Energy Engineer",
    keywords: ["solar", "wind", "energy", "renewable"],
    requiredSkills: [
      { name: "Electrical Engineering", weight: 10, category: "Domain" },
      { name: "Solar Technology", weight: 9, category: "Domain" },
      { name: "Energy Systems", weight: 9, category: "Domain" },
      { name: "Problem Solving", weight: 8, category: "Skill" },
      { name: "Sustainability Knowledge", weight: 9, category: "Domain" }
    ]
  },

  {
    roleName: "Sustainability Consultant",
    keywords: ["sustainability", "esg", "green", "consulting"],
    requiredSkills: [
      { name: "Sustainability Strategy", weight: 10, category: "Domain" },
      { name: "ESG Knowledge", weight: 9, category: "Domain" },
      { name: "Data Analysis", weight: 8, category: "Data" },
      { name: "Communication", weight: 9, category: "Soft Skill" },
      { name: "Problem Solving", weight: 8, category: "Skill" }
    ]
  },

  {
    roleName: "Public Health Officer",
    keywords: ["health", "public health", "community", "sdg3"],
    requiredSkills: [
      { name: "Public Health Knowledge", weight: 10, category: "Domain" },
      { name: "Epidemiology", weight: 9, category: "Domain" },
      { name: "Data Analysis", weight: 8, category: "Data" },
      { name: "Communication", weight: 9, category: "Soft Skill" },
      { name: "Community Engagement", weight: 9, category: "Skill" }
    ]
  },

  {
    roleName: "NGO Program Manager",
    keywords: ["ngo", "social work", "program", "development"],
    requiredSkills: [
      { name: "Program Management", weight: 10, category: "Management" },
      { name: "Leadership", weight: 9, category: "Soft Skill" },
      { name: "Fundraising", weight: 8, category: "Skill" },
      { name: "Communication", weight: 9, category: "Soft Skill" },
      { name: "Community Knowledge", weight: 9, category: "Domain" }
    ]
  },

  {
    roleName: "Agricultural Scientist",
    keywords: ["agriculture", "farming", "food security", "sdg2"],
    requiredSkills: [
      { name: "Agriculture Science", weight: 10, category: "Domain" },
      { name: "Soil Science", weight: 9, category: "Domain" },
      { name: "Research Skills", weight: 9, category: "Skill" },
      { name: "Sustainability", weight: 8, category: "Domain" },
      { name: "Problem Solving", weight: 8, category: "Skill" }
    ]
  },

  {
    roleName: "Water Resource Engineer",
    keywords: ["water", "hydrology", "sdg6", "engineering"],
    requiredSkills: [
      { name: "Hydrology", weight: 10, category: "Domain" },
      { name: "Water Management", weight: 9, category: "Domain" },
      { name: "Civil Engineering", weight: 9, category: "Domain" },
      { name: "Problem Solving", weight: 8, category: "Skill" },
      { name: "Sustainability", weight: 8, category: "Domain" }
    ]
  },

  {
    roleName: "Urban Planner",
    keywords: ["urban", "city planning", "infrastructure", "sdg11"],
    requiredSkills: [
      { name: "Urban Planning", weight: 10, category: "Domain" },
      { name: "GIS", weight: 9, category: "Tools" },
      { name: "Data Analysis", weight: 8, category: "Data" },
      { name: "Policy Knowledge", weight: 9, category: "Domain" },
      { name: "Communication", weight: 8, category: "Soft Skill" }
    ]
  },

  {
    roleName: "Climate Change Analyst",
    keywords: ["climate", "global warming", "environment", "sdg13"],
    requiredSkills: [
      { name: "Climate Science", weight: 10, category: "Domain" },
      { name: "Data Analysis", weight: 9, category: "Data" },
      { name: "Research Skills", weight: 9, category: "Skill" },
      { name: "Modeling", weight: 8, category: "Technical" },
      { name: "Problem Solving", weight: 8, category: "Skill" }
    ]
  },

  {
    roleName: "Waste Management Specialist",
    keywords: ["waste", "recycling", "environment", "sdg12"],
    requiredSkills: [
      { name: "Waste Management", weight: 10, category: "Domain" },
      { name: "Recycling Systems", weight: 9, category: "Domain" },
      { name: "Environmental Laws", weight: 8, category: "Domain" },
      { name: "Operations Management", weight: 8, category: "Skill" },
      { name: "Problem Solving", weight: 8, category: "Skill" }
    ]
  },

  {
    roleName: "CSR Manager",
    keywords: ["csr", "corporate social responsibility", "sustainability"],
    requiredSkills: [
      { name: "CSR Strategy", weight: 10, category: "Domain" },
      { name: "Communication", weight: 9, category: "Soft Skill" },
      { name: "Project Management", weight: 9, category: "Management" },
      { name: "Stakeholder Management", weight: 9, category: "Skill" },
      { name: "Sustainability Knowledge", weight: 9, category: "Domain" }
    ]
  },

  {
    roleName: "Education Policy Analyst",
    keywords: ["education", "policy", "sdg4", "analysis"],
    requiredSkills: [
      { name: "Policy Analysis", weight: 10, category: "Domain" },
      { name: "Research Skills", weight: 9, category: "Skill" },
      { name: "Data Analysis", weight: 8, category: "Data" },
      { name: "Education Systems", weight: 9, category: "Domain" },
      { name: "Communication", weight: 8, category: "Soft Skill" }
    ]
  },

  {
    roleName: "Human Rights Advocate",
    keywords: ["human rights", "law", "justice", "sdg16"],
    requiredSkills: [
      { name: "Legal Knowledge", weight: 10, category: "Domain" },
      { name: "Advocacy", weight: 9, category: "Skill" },
      { name: "Communication", weight: 9, category: "Soft Skill" },
      { name: "Research", weight: 8, category: "Skill" },
      { name: "Ethics", weight: 9, category: "Personality" }
    ]
  },

  {
    roleName: "Gender Equality Specialist",
    keywords: ["gender", "equality", "sdg5", "social"],
    requiredSkills: [
      { name: "Gender Studies", weight: 10, category: "Domain" },
      { name: "Policy Knowledge", weight: 9, category: "Domain" },
      { name: "Communication", weight: 9, category: "Soft Skill" },
      { name: "Advocacy", weight: 8, category: "Skill" },
      { name: "Research", weight: 8, category: "Skill" }
    ]
  },

  {
    roleName: "Disaster Management Specialist",
    keywords: ["disaster", "emergency", "management", "sdg11"],
    requiredSkills: [
      { name: "Disaster Management", weight: 10, category: "Domain" },
      { name: "Risk Assessment", weight: 9, category: "Skill" },
      { name: "Crisis Handling", weight: 9, category: "Skill" },
      { name: "Leadership", weight: 9, category: "Soft Skill" },
      { name: "Communication", weight: 8, category: "Soft Skill" }
    ]
  },{
    roleName: "Doctor",
    keywords: ["doctor", "medical", "hospital", "healthcare"],
    requiredSkills: [
      { name: "Medical Knowledge", weight: 10, category: "Domain" },
      { name: "Diagnosis Skills", weight: 9, category: "Skill" },
      { name: "Patient Care", weight: 9, category: "Soft Skill" },
      { name: "Decision Making", weight: 9, category: "Skill" },
      { name: "Communication", weight: 8, category: "Soft Skill" }
    ]
  },

  {
    roleName: "Nurse",
    keywords: ["nurse", "patient care", "hospital", "health"],
    requiredSkills: [
      { name: "Patient Care", weight: 10, category: "Skill" },
      { name: "Medical Knowledge", weight: 9, category: "Domain" },
      { name: "Communication", weight: 9, category: "Soft Skill" },
      { name: "Empathy", weight: 9, category: "Soft Skill" },
      { name: "Attention to Detail", weight: 8, category: "Skill" }
    ]
  },

  {
    roleName: "Pharmacist",
    keywords: ["pharmacy", "medicine", "drugs", "healthcare"],
    requiredSkills: [
      { name: "Pharmacology", weight: 10, category: "Domain" },
      { name: "Medical Knowledge", weight: 9, category: "Domain" },
      { name: "Attention to Detail", weight: 9, category: "Skill" },
      { name: "Communication", weight: 8, category: "Soft Skill" },
      { name: "Inventory Management", weight: 8, category: "Skill" }
    ]
  },

  {
    roleName: "Physiotherapist",
    keywords: ["physio", "therapy", "rehabilitation", "health"],
    requiredSkills: [
      { name: "Physiotherapy Knowledge", weight: 10, category: "Domain" },
      { name: "Patient Care", weight: 9, category: "Skill" },
      { name: "Anatomy Knowledge", weight: 9, category: "Domain" },
      { name: "Communication", weight: 8, category: "Soft Skill" },
      { name: "Empathy", weight: 9, category: "Soft Skill" }
    ]
  },

  {
    roleName: "Medical Lab Technician",
    keywords: ["lab", "testing", "diagnostics", "healthcare"],
    requiredSkills: [
      { name: "Lab Testing", weight: 10, category: "Technical" },
      { name: "Medical Knowledge", weight: 9, category: "Domain" },
      { name: "Attention to Detail", weight: 9, category: "Skill" },
      { name: "Equipment Handling", weight: 8, category: "Technical" },
      { name: "Data Recording", weight: 8, category: "Skill" }
    ]
  },{
    roleName: "Project Manager",
    keywords: ["project management", "pm", "planning", "execution"],
    requiredSkills: [
      { name: "Project Planning", weight: 10, category: "Management" },
      { name: "Agile Methodology", weight: 9, category: "Management" },
      { name: "Risk Management", weight: 9, category: "Management" },
      { name: "Communication", weight: 9, category: "Soft Skill" },
      { name: "Leadership", weight: 10, category: "Soft Skill" }
    ]
  },

  {
    roleName: "Product Manager",
    keywords: ["product management", "product", "strategy", "pm"],
    requiredSkills: [
      { name: "Product Strategy", weight: 10, category: "Business" },
      { name: "Market Research", weight: 9, category: "Business" },
      { name: "User Experience", weight: 9, category: "Design" },
      { name: "Communication", weight: 9, category: "Soft Skill" },
      { name: "Leadership", weight: 9, category: "Soft Skill" }
    ]
  },

  {
    roleName: "Business Manager",
    keywords: ["business management", "operations", "strategy", "management"],
    requiredSkills: [
      { name: "Business Strategy", weight: 10, category: "Business" },
      { name: "Operations Management", weight: 9, category: "Management" },
      { name: "Financial Knowledge", weight: 9, category: "Finance" },
      { name: "Decision Making", weight: 9, category: "Skill" },
      { name: "Leadership", weight: 10, category: "Soft Skill" }
    ]
  }

  ];
  export const skillSynonyms: Record<string, string[]> = {
  "javascript": ["js", "ecmascript", "es6", "es2015"],
  "typescript": ["ts"],
  "react": ["reactjs", "react.js"],
  "node.js": ["nodejs", "node"],
  "express.js": ["express", "expressjs"],
  "mongodb": ["mongo"],
  "postgresql": ["postgres", "psql"],
  "tailwind css": ["tailwind", "tailwindcss"],
  "next.js": ["nextjs", "next"],
  "vue.js": ["vue", "vuejs"],
  "docker": ["containerization"],
  "kubernetes": ["k8s"],
  "machine learning": ["ml"],
  "deep learning": ["dl"],
  "html": ["html5"],
  "css": ["css3", "stylesheets"],
  "git": ["github", "gitlab", "version control"],
  "rest api": ["rest", "restful", "api"],
  "ci/cd": ["cicd", "continuous integration", "continuous deployment"],
  "amazon web services": ["aws"],
};