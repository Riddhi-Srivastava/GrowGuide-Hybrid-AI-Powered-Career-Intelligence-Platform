import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Plus, X, Clock, Briefcase } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";
import { analyzeOffline, getAvailableRoles } from "@/lib/analysisEngine";
import { useAnalysisHistory } from "@/hooks/useAnalysisHistory";
import { toast } from "sonner";

export default function AppPage() {
  const [role, setRole] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [hoursPerDay, setHoursPerDay] = useState(2);
  const [targetWeeks, setTargetWeeks] = useState(12);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const isOnline = useNetworkStatus();
  const { addEntry } = useAnalysisHistory();

  const addSkill = () => {
    const s = skillInput.trim();
    if (s && !skills.includes(s)) {
      setSkills(prev => [...prev, s]);
      setSkillInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") { e.preventDefault(); addSkill(); }
  };

  const handleAnalyze = async () => {
    if (!role.trim()) { toast.error("Please enter a target role"); return; }
    if (skills.length === 0) { toast.error("Please add at least one skill"); return; }

    setLoading(true);
    try {
      // Use offline engine (hybrid: always available)
      const result = analyzeOffline(role, skills, hoursPerDay, targetWeeks);
      if (!result) {
        toast.error("Role not found. Try: " + getAvailableRoles().slice(0, 3).join(", "));
        setLoading(false);
        return;
      }

      const query = { role, skills, hoursPerDay, targetWeeks };
      addEntry(query, result);

      // Store result for result page
      sessionStorage.setItem("growguide_result", JSON.stringify(result));
      navigate("/app/result");
    } catch (err) {
      toast.error("Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const availableRoles = getAvailableRoles();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative min-h-screen flex items-center justify-center hero-glow pt-16">
        <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-primary/8 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-accent/8 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />

        <div className="relative z-10 w-full max-w-2xl px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="text-center mb-10">
              <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-4">
                Analyze Your <span className="gradient-text">Skills</span>
              </h1>
              <p className="text-muted-foreground">
                Enter your target role and current skills to get a personalized roadmap
              </p>
            </div>

            <div className="glass-strong p-8 glow-box space-y-6">
              {/* Role Input */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                  <Briefcase className="w-4 h-4 text-primary" /> Target Role
                </label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={role}
                    onChange={e => setRole(e.target.value)}
                    placeholder="e.g., MERN Stack Developer"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-muted/40 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {availableRoles.slice(0, 4).map(r => (
                    <button
                      key={r}
                      onClick={() => setRole(r)}
                      className="px-2.5 py-1 rounded-lg bg-muted/40 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Skills Input */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                  <Search className="w-4 h-4 text-primary" /> Your Skills
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={e => setSkillInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Add a skill and press Enter"
                    className="flex-1 px-4 py-3 rounded-xl bg-muted/40 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                  <button
                    onClick={addSkill}
                    className="px-4 py-3 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                {skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {skills.map(s => (
                      <span key={s} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm">
                        {s}
                        <button onClick={() => setSkills(prev => prev.filter(x => x !== s))}>
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Time inputs */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                    <Clock className="w-4 h-4 text-primary" /> Hours/Day
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={12}
                    value={hoursPerDay}
                    onChange={e => setHoursPerDay(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl bg-muted/40 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                    <Clock className="w-4 h-4 text-primary" /> Target Weeks
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={52}
                    value={targetWeeks}
                    onChange={e => setTargetWeeks(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl bg-muted/40 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
              </div>

              {/* Analyze Button */}
              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-display font-semibold text-lg hover:bg-primary/90 disabled:opacity-50 transition-all glow-box"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Analyzing...
                  </span>
                ) : (
                  `Analyze with ${isOnline ? "AI" : "Offline NLP"}`
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
