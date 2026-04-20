import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Trash2, ArrowLeft, Clock, Target } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlassCard from "@/components/GlassCard";
import { useAnalysisHistory } from "@/hooks/useAnalysisHistory";

export default function HistoryPage() {
  const { history, clearHistory } = useAnalysisHistory();
  const navigate = useNavigate();

  const viewResult = (entry: (typeof history)[0]) => {
    sessionStorage.setItem("growguide_result", JSON.stringify(entry.result));
    navigate("/app/result");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16 px-6 hero-glow">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate("/app")} className="text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="font-display text-3xl font-bold text-foreground">
                Analysis <span className="gradient-text">History</span>
              </h1>
            </div>
            {history.length > 0 && (
              <button onClick={clearHistory} className="flex items-center gap-2 px-4 py-2 rounded-xl glass text-sm text-red-400 hover:bg-red-500/10 transition-colors">
                <Trash2 className="w-4 h-4" /> Clear
              </button>
            )}
          </motion.div>

          {history.length === 0 ? (
            <GlassCard className="text-center py-16">
              <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="font-display text-xl font-semibold text-foreground mb-2">No history yet</h2>
              <p className="text-muted-foreground mb-6">Run your first analysis to see it here</p>
              <button onClick={() => navigate("/app")} className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium">
                Start Analysis
              </button>
            </GlassCard>
          ) : (
            <div className="space-y-4">
              {history.map((entry, i) => (
                <GlassCard key={entry.id} delay={i * 0.05}>
                  <button onClick={() => viewResult(entry)} className="w-full text-left">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Target className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-display font-semibold text-foreground">{entry.result.role}</h3>
                          <p className="text-xs text-muted-foreground">
                            {new Date(entry.timestamp).toLocaleDateString()} • {entry.query.skills.length} skills • {entry.result.source}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-display text-2xl font-bold text-primary">{entry.result.matchScore}%</span>
                        <p className="text-xs text-muted-foreground">match</p>
                      </div>
                    </div>
                  </button>
                </GlassCard>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
