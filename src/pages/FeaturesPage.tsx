import { motion } from "framer-motion";
import { Brain, Zap, WifiOff, BarChart3, Target, Clock, Download, GitCompare } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlassCard from "@/components/GlassCard";

const features = [
  { icon: Brain, title: "AI Skill Analyzer", desc: "Advanced AI models analyze your skill set against industry requirements, identifying exact gaps and strengths with weighted scoring." },
  { icon: Target, title: "Career Roadmap", desc: "Get a phased learning roadmap with priorities, from foundations to advanced mastery — tailored to your target role." },
  { icon: Clock, title: "Time-Based Planner", desc: "A weekly learning plan based on your available hours per day, with milestones and total hours per skill." },
  { icon: WifiOff, title: "Offline NLP Engine", desc: "Built-in NLP using fuzzy search and tokenization. Works completely offline with automatic fallback." },
  { icon: Zap, title: "Hybrid AI System", desc: "Seamlessly switches between cloud AI and local NLP. If the API fails, the offline engine takes over instantly." },
  { icon: BarChart3, title: "Match Scoring", desc: "Weighted scoring system calculates your exact match percentage based on skill importance and relevance." },
  { icon: GitCompare, title: "Role Comparison", desc: "Compare two career roles side by side — see overlapping skills, unique requirements, and transition difficulty." },
  { icon: Download, title: "PDF Export", desc: "Export your full analysis including roadmap, planner, and recommendations as a professional PDF report." },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16 px-6 hero-glow">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-4">
              Powerful <span className="gradient-text">Features</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need for intelligent career planning, powered by hybrid AI
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <GlassCard key={f.title} delay={i * 0.08} glow>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
