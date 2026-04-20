import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, GitCompare } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlassCard from "@/components/GlassCard";
import { getAvailableRoles, analyzeOffline } from "@/lib/analysisEngine";
import type { AnalysisResult } from "@/lib/analysisEngine";

export default function ComparePage() {
  const [role1, setRole1] = useState("");
  const [role2, setRole2] = useState("");
  const [result1, setResult1] = useState<AnalysisResult | null>(null);
  const [result2, setResult2] = useState<AnalysisResult | null>(null);
  const navigate = useNavigate();
  const roles = getAvailableRoles();

  const handleCompare = () => {
    if (!role1 || !role2) return;
    const r1 = analyzeOffline(role1, [], 2, 12);
    const r2 = analyzeOffline(role2, [], 2, 12);
    setResult1(r1);
    setResult2(r2);
  };

  const overlapping = result1 && result2
    ? result1.missingSkills.filter(s => result2.missingSkills.some(s2 => s2.name === s.name)).map(s => s.name)
    : [];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16 px-6 hero-glow">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4 mb-8">
            <button onClick={() => navigate("/app")} className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Compare <span className="gradient-text">Roles</span>
            </h1>
          </motion.div>

          <GlassCard glow className="mb-8">
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Role 1</label>
                <select
                  value={role1}
                  onChange={e => setRole1(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-muted/40 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="">Select a role</option>
                  {roles.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Role 2</label>
                <select
                  value={role2}
                  onChange={e => setRole2(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-muted/40 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="">Select a role</option>
                  {roles.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
            </div>
            <button
              onClick={handleCompare}
              disabled={!role1 || !role2}
              className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-display font-semibold hover:bg-primary/90 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              <GitCompare className="w-4 h-4" /> Compare Roles
            </button>
          </GlassCard>

          {result1 && result2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <GlassCard>
                  <h3 className="font-display font-semibold text-primary mb-1">{result1.role}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{result1.missingSkills.length + result1.matchedSkills.length} skills required</p>
                  <div className="space-y-1.5">
                    {[...result1.matchedSkills, ...result1.missingSkills].sort((a, b) => b.weight - a.weight).map(s => (
                      <div key={s.name} className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-muted/30 text-sm">
                        <span className="text-foreground">{s.name}</span>
                        <span className="text-xs text-muted-foreground">w:{s.weight}</span>
                      </div>
                    ))}
                  </div>
                </GlassCard>
                <GlassCard>
                  <h3 className="font-display font-semibold text-accent mb-1">{result2.role}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{result2.missingSkills.length + result2.matchedSkills.length} skills required</p>
                  <div className="space-y-1.5">
                    {[...result2.matchedSkills, ...result2.missingSkills].sort((a, b) => b.weight - a.weight).map(s => (
                      <div key={s.name} className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-muted/30 text-sm">
                        <span className="text-foreground">{s.name}</span>
                        <span className="text-xs text-muted-foreground">w:{s.weight}</span>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </div>

              {overlapping.length > 0 && (
                <GlassCard glow>
                  <h3 className="font-display font-semibold text-foreground mb-3">Overlapping Skills ({overlapping.length})</h3>
                  <div className="flex flex-wrap gap-2">
                    {overlapping.map(s => (
                      <span key={s} className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm">{s}</span>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-3">
                    These skills transfer between both roles, making a career transition easier.
                  </p>
                </GlassCard>
              )}
            </motion.div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
