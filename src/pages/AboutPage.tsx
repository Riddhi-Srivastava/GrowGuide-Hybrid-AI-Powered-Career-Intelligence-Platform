import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlassCard from "@/components/GlassCard";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16 px-6 hero-glow">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-4">
              About <span className="gradient-text">GrowGuide</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A universal career intelligence OS built with hybrid AI architecture
            </p>
          </motion.div>

          <div className="space-y-8">
            <GlassCard glow>
              <h2 className="font-display text-xl font-semibold text-foreground mb-3">The Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                GrowGuide was built to democratize career planning. Whether you're a student exploring tech careers or a professional pivoting roles, our AI-powered platform provides actionable insights — no expensive career coaches needed. And it works even without internet.
              </p>
            </GlassCard>

            <GlassCard delay={0.1}>
              <h2 className="font-display text-xl font-semibold text-foreground mb-3">System Architecture</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                GrowGuide uses a hybrid AI architecture with two analysis engines:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                  <h3 className="font-display font-semibold text-primary mb-2">🟢 Online AI Engine</h3>
                  <p className="text-sm text-muted-foreground">Cloud-based AI models provide deep analysis with contextual understanding, generating detailed roadmaps and recommendations.</p>
                </div>
                <div className="p-4 rounded-xl bg-accent/5 border border-accent/10">
                  <h3 className="font-display font-semibold text-accent mb-2">🔴 Offline NLP Engine</h3>
                  <p className="text-sm text-muted-foreground">Client-side NLP using Fuse.js fuzzy search, synonym mapping, and weighted scoring. Works completely without internet.</p>
                </div>
              </div>
            </GlassCard>

            <GlassCard delay={0.2}>
              <h2 className="font-display text-xl font-semibold text-foreground mb-3">Tech Stack</h2>
              <div className="flex flex-wrap gap-2">
                {["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Fuse.js", "Vite", "Recharts", "jsPDF"].map(t => (
                  <span key={t} className="px-3 py-1.5 rounded-lg bg-muted/60 text-sm font-medium text-foreground">{t}</span>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
