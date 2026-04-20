import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CalendarDays, Clock, BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlassCard from "@/components/GlassCard";
import { getBookings, type Booking } from "@/lib/mentorData";

export default function SessionsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setBookings(getBookings());
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16 px-6 hero-glow">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>

            <h1 className="font-display text-3xl font-bold text-foreground mb-8">
              <CalendarDays className="inline w-7 h-7 text-primary mr-2 -mt-1" />
              Upcoming Sessions
            </h1>

            {bookings.length === 0 ? (
              <GlassCard>
                <p className="text-center text-muted-foreground py-8">No upcoming sessions. Book a mentor from your analysis results!</p>
              </GlassCard>
            ) : (
              <div className="space-y-4">
                {bookings.map((b) => (
                  <GlassCard key={b.id}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <h3 className="font-display font-semibold text-foreground">{b.mentorName}</h3>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> {b.subject}</span>
                          <span className="flex items-center gap-1"><CalendarDays className="w-3.5 h-3.5" /> {b.date}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {b.time}</span>
                        </div>
                      </div>
                      <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                        b.status === "confirmed" ? "bg-emerald-500/10 text-emerald-400" :
                        b.status === "completed" ? "bg-primary/10 text-primary" :
                        "bg-amber-500/10 text-amber-400"
                      }`}>
                        {b.status}
                      </span>
                    </div>
                  </GlassCard>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
