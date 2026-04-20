type SeedTool = {
  name: string;
  category: string;
  description: string;
  summary: string;
  features: string[];
  developer: string;
  launchDate: string;
  tags: string[];
  website: string;
  popularityScore: number;
  isTrending: boolean;
};

export const seedTools: SeedTool[] = [
  {
    name: "ChatGPT",
    category: "AI Assistants",
    description: "OpenAI's conversational AI assistant for writing, coding, brainstorming, and multimodal tasks.",
    summary: "General-purpose AI assistant for text, code, and reasoning workflows.",
    features: ["Natural language conversations", "Code generation", "Document analysis", "Multimodal interactions"],
    developer: "OpenAI",
    launchDate: "2022-11-30",
    tags: ["assistant", "chatbot", "productivity"],
    website: "https://chatgpt.com",
    popularityScore: 98,
    isTrending: true
  },
  {
    name: "Claude",
    category: "AI Assistants",
    description: "Anthropic's assistant focused on long-context reasoning, writing, and research support.",
    summary: "Strong long-context assistant for analysis, writing, and enterprise workflows.",
    features: ["Long context window", "Reasoning support", "Writing assistance", "Document understanding"],
    developer: "Anthropic",
    launchDate: "2023-03-14",
    tags: ["assistant", "research", "writing"],
    website: "https://claude.ai",
    popularityScore: 94,
    isTrending: true
  },
  {
    name: "Gemini",
    category: "AI Assistants",
    description: "Google's multimodal AI assistant integrated across Search, Workspace, and developer tools.",
    summary: "Multimodal assistant with strong Google ecosystem integration.",
    features: ["Multimodal understanding", "Workspace integration", "Search support", "Coding help"],
    developer: "Google",
    launchDate: "2023-12-06",
    tags: ["assistant", "multimodal", "workspace"],
    website: "https://gemini.google.com",
    popularityScore: 92,
    isTrending: true
  },
  {
    name: "Perplexity",
    category: "Search & Research",
    description: "Answer engine that combines web search and AI-generated responses with citations.",
    summary: "Research-first AI search assistant with cited answers.",
    features: ["Web search", "Citations", "Research mode", "Follow-up questions"],
    developer: "Perplexity",
    launchDate: "2022-08-01",
    tags: ["search", "research", "citations"],
    website: "https://www.perplexity.ai",
    popularityScore: 90,
    isTrending: true
  },
  {
    name: "Midjourney",
    category: "Image Generation",
    description: "AI image generation platform known for artistic and highly stylized results.",
    summary: "Popular image tool for artistic visual generation.",
    features: ["Text-to-image", "Stylized outputs", "High-quality renders", "Prompt exploration"],
    developer: "Midjourney",
    launchDate: "2022-07-12",
    tags: ["image", "design", "creative"],
    website: "https://www.midjourney.com",
    popularityScore: 91,
    isTrending: true
  },
  {
    name: "Runway",
    category: "Image & Video Generation",
    description: "Creative AI platform for video editing, generation, and media workflows.",
    summary: "AI-first video generation and editing suite for creators.",
    features: ["Video generation", "Video editing", "Motion tools", "Creative workflows"],
    developer: "Runway",
    launchDate: "2022-02-01",
    tags: ["video", "creative", "editing"],
    website: "https://runwayml.com",
    popularityScore: 88,
    isTrending: true
  }
];
