import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlassCard from "@/components/GlassCard";
import { addBooking, type Mentor } from "@/lib/mentorData";
import { toast } from "sonner";

export default function BookingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const mentor = (location.state as { mentor?: Mentor })?.mentor;

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  if (!mentor) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">No mentor selected.</p>
          <button onClick={() => navigate(-1)} className="text-primary hover:underline">Go back</button>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time) { toast.error("Please select date and time"); return; }

    addBooking({
      id: `booking-${Date.now()}`,
      mentorId: mentor.id,
      mentorName: mentor.name,
      subject: mentor.subject,
      date,
      time,
      status: "pending",
    });

    toast.success(`Session booked with ${mentor.name}!`);
    navigate("/app/sessions");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16 px-6 hero-glow">
        <div className="max-w-xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>

            <GlassCard glow>
              <h1 className="font-display text-2xl font-bold text-foreground mb-2">Book a Session</h1>
              <p className="text-muted-foreground text-sm mb-6">with <span className="text-primary font-semibold">{mentor.name}</span> — {mentor.role}</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                    <BookOpen className="w-4 h-4 text-primary" /> Subject
                  </label>
                  <input
                    type="text"
                    value={mentor.subject}
                    readOnly
                    className="w-full px-4 py-3 rounded-xl bg-muted/40 border border-border text-foreground focus:outline-none"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                    <Calendar className="w-4 h-4 text-primary" /> Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-3 rounded-xl bg-muted/40 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                    <Clock className="w-4 h-4 text-primary" /> Time
                  </label>
                  <input
                    type="time"
                    value={time}
                    onChange={e => setTime(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-muted/40 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>

                <div className="glass p-4 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Session Fee</span>
                  <span className="font-display font-bold text-foreground text-lg">₹{mentor.price}</span>
                </div>

                <button type="submit" className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-display font-semibold text-lg hover:bg-primary/90 transition-all glow-box">
                  Confirm Booking
                </button>
              </form>
            </GlassCard>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
