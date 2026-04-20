import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Brain, Zap, WifiOff, BarChart3 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlassCard from "@/components/GlassCard";

const features = [
  { icon: Brain, title: "AI Career Analysis", desc: "Get intelligent skill gap analysis powered by advanced AI models" },
  { icon: Zap, title: "Instant Roadmap", desc: "Receive a personalized learning roadmap in seconds" },
  { icon: WifiOff, title: "Works Offline", desc: "Hybrid NLP engine works even without internet" },
  { icon: BarChart3, title: "Smart Planner", desc: "Time-based learning plan tailored to your schedule" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center hero-glow pt-16">
        {/* Decorative blurs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-medium text-muted-foreground mb-8">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Hybrid AI-Powered Career Intelligence
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-6">
              <span className="text-foreground">Navigate Your</span>
              <br />
              <span className="gradient-text">Career Path</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              AI-powered skill analysis, personalized roadmaps, and smart learning plans.
              Works online with AI or offline with built-in NLP.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/app"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-display font-semibold text-lg hover:bg-primary/90 transition-all glow-box"
              >
                Start Analysis
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/features"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl glass text-foreground font-medium hover:bg-muted/60 transition-colors"
              >
                Explore Features
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything you need to <span className="gradient-text">grow</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A complete career intelligence platform that adapts to your connectivity
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <GlassCard key={f.title} delay={i * 0.1}>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6 hero-glow">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-16">
            How it <span className="gradient-text">works</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Enter Your Role", desc: "Tell us the career you're targeting" },
              { step: "02", title: "List Your Skills", desc: "Add the skills you already have" },
              { step: "03", title: "Get Your Roadmap", desc: "Receive an AI-powered learning plan" },
            ].map((s, i) => (
              <GlassCard key={s.step} delay={i * 0.15} glow>
                <span className="font-display text-4xl font-bold gradient-text">{s.step}</span>
                <h3 className="font-display font-semibold text-foreground mt-4 mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <GlassCard glow className="py-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to accelerate your career?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Get personalized skill analysis and a roadmap to your dream role — free, no signup required.
            </p>
            <Link
              to="/app"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-display font-semibold hover:bg-primary/90 transition-all"
            >
              Launch GrowGuide <ArrowRight className="w-5 h-5" />
            </Link>
          </GlassCard>
        </div>
      </section>

      <Footer />
    </div>
  );
}
