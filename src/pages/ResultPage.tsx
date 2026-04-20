import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Download, CheckCircle2, XCircle, Map, Clock, Lightbulb, CalendarDays } from "lucide-react";
import MentorSection from "@/components/MentorSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlassCard from "@/components/GlassCard";
import type { AnalysisResult } from "@/lib/analysisEngine";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function ResultPage() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = sessionStorage.getItem("growguide_result");
    if (stored) {
      setResult(JSON.parse(stored));
    } else {
      navigate("/app");
    }
  }, [navigate]);

  const handleExportPDF = async () => {
    const { default: jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    if (!result) return;

    doc.setFontSize(20);
    doc.text("GrowGuide Career Analysis", 20, 20);
    doc.setFontSize(14);
    doc.text(`Role: ${result.role}`, 20, 35);
    doc.text(`Match Score: ${result.matchScore}%`, 20, 45);
    doc.text(`Source: ${result.source}`, 20, 55);

    doc.setFontSize(12);
    doc.text("Matched Skills:", 20, 70);
    result.matchedSkills.forEach((s, i) => doc.text(`  • ${s.name} (${s.category})`, 25, 80 + i * 8));

    const y1 = 85 + result.matchedSkills.length * 8;
    doc.text("Missing Skills:", 20, y1);
    result.missingSkills.forEach((s, i) => doc.text(`  • ${s.name} [${s.priority}]`, 25, y1 + 10 + i * 8));

    const y2 = y1 + 15 + result.missingSkills.length * 8;
    if (y2 < 250) {
      doc.text("Recommendations:", 20, y2);
      result.recommendations.forEach((r, i) => {
        if (y2 + 10 + i * 8 < 280) doc.text(`  ${i + 1}. ${r}`, 25, y2 + 10 + i * 8);
      });
    }

    doc.save(`growguide-${result.role.replace(/\s+/g, "-").toLowerCase()}.pdf`);
  };

  if (!result) return null;

  const pieData = [
    { name: "Matched", value: result.matchScore },
    { name: "Gap", value: 100 - result.matchScore },
  ];
  const COLORS = ["hsl(190, 95%, 55%)", "hsl(217, 33%, 15%)"];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-16 px-6 hero-glow">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <button onClick={() => navigate("/app")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                result.source === "AI" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
              }`}>
                {result.source}
              </span>
              <button
                onClick={handleExportPDF}
                className="flex items-center gap-2 px-4 py-2 rounded-xl glass text-sm font-medium text-foreground hover:bg-muted/60 transition-colors"
              >
                <Download className="w-4 h-4" /> Export PDF
              </button>
            </div>
          </motion.div>

          {/* Score + Role */}
          <GlassCard glow className="mb-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-40 h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={4} dataKey="value" strokeWidth={0}>
                      {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="text-center -mt-24">
                  <span className="font-display text-3xl font-bold text-foreground">{result.matchScore}%</span>
                </div>
              </div>
              <div>
                <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">{result.role}</h1>
                <p className="text-muted-foreground">
                  You match {result.matchedSkills.length} of {result.matchedSkills.length + result.missingSkills.length} required skills
                </p>
              </div>
            </div>
          </GlassCard>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Matched Skills */}
            <GlassCard delay={0.1}>
              <h2 className="flex items-center gap-2 font-display font-semibold text-foreground mb-4">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Matched Skills
              </h2>
              <div className="space-y-2">
                {result.matchedSkills.map(s => (
                  <div key={s.name} className="flex items-center justify-between px-3 py-2 rounded-lg bg-emerald-500/5">
                    <span className="text-sm text-foreground">{s.name}</span>
                    <span className="text-xs text-muted-foreground">{s.category}</span>
                  </div>
                ))}
                {result.matchedSkills.length === 0 && <p className="text-sm text-muted-foreground">No matched skills found</p>}
              </div>
            </GlassCard>

            {/* Missing Skills */}
            <GlassCard delay={0.15}>
              <h2 className="flex items-center gap-2 font-display font-semibold text-foreground mb-4">
                <XCircle className="w-5 h-5 text-red-400" /> Missing Skills
              </h2>
              <div className="space-y-2">
                {result.missingSkills.map(s => (
                  <div key={s.name} className="flex items-center justify-between px-3 py-2 rounded-lg bg-red-500/5">
                    <span className="text-sm text-foreground">{s.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      s.priority === "High" ? "bg-red-500/10 text-red-400" : s.priority === "Medium" ? "bg-amber-500/10 text-amber-400" : "bg-muted text-muted-foreground"
                    }`}>{s.priority}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Mentors */}
          <div className="mb-8">
            <MentorSection missingSkills={result.missingSkills} />
          </div>

          {/* Sessions Link */}
          <div className="mb-8">
            <button
              onClick={() => navigate("/app/sessions")}
              className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
            >
              <CalendarDays className="w-4 h-4" /> View Upcoming Sessions →
            </button>
          </div>

          {/* Roadmap */}
          <GlassCard delay={0.2} className="mb-8">
            <h2 className="flex items-center gap-2 font-display font-semibold text-foreground mb-6">
              <Map className="w-5 h-5 text-primary" /> Career Roadmap
            </h2>
            <div className="space-y-4">
              {result.roadmap.map(phase => (
                <div key={phase.phase} className="relative pl-8 pb-4 border-l-2 border-primary/20 last:border-0">
                  <div className="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] rounded-full bg-primary" />
                  <div className="glass p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-display font-semibold text-primary text-sm">Phase {phase.phase}</span>
                      <span className="text-xs text-muted-foreground">• {phase.duration}</span>
                    </div>
                    <h3 className="font-display font-semibold text-foreground mb-1">{phase.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{phase.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {phase.skills.map(s => (
                        <span key={s} className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Planner */}
          <GlassCard delay={0.25} className="mb-8">
            <h2 className="flex items-center gap-2 font-display font-semibold text-foreground mb-4">
              <Clock className="w-5 h-5 text-accent" /> Learning Planner
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/50 text-muted-foreground">
                    <th className="text-left py-2 px-3">Week</th>
                    <th className="text-left py-2 px-3">Skill</th>
                    <th className="text-left py-2 px-3">Hrs/Day</th>
                    <th className="text-left py-2 px-3">Total</th>
                    <th className="text-left py-2 px-3">Milestone</th>
                  </tr>
                </thead>
                <tbody>
                  {result.planner.map((p, i) => (
                    <tr key={i} className="border-b border-border/30">
                      <td className="py-2 px-3 text-primary font-medium">W{p.week}</td>
                      <td className="py-2 px-3 text-foreground">{p.skill}</td>
                      <td className="py-2 px-3 text-muted-foreground">{p.hoursPerDay}h</td>
                      <td className="py-2 px-3 text-muted-foreground">{p.totalHours}h</td>
                      <td className="py-2 px-3 text-muted-foreground text-xs">{p.milestone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>

          {/* Recommendations */}
          <GlassCard delay={0.3}>
            <h2 className="flex items-center gap-2 font-display font-semibold text-foreground mb-4">
              <Lightbulb className="w-5 h-5 text-amber-400" /> Smart Recommendations
            </h2>
            <div className="space-y-3">
              {result.recommendations.map((r, i) => (
                <div key={i} className="flex gap-3 px-3 py-2 rounded-lg bg-amber-500/5">
                  <span className="text-amber-400 font-display font-bold text-sm mt-0.5">{i + 1}.</span>
                  <p className="text-sm text-muted-foreground">{r}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>

      <Footer />
    </div>
  );
}
