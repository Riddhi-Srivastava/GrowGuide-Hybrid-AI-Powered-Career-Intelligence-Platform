import { useNavigate } from "react-router-dom";
import { Users, Star, MapPin, IndianRupee } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import { generateMentorsForSkills, type Mentor } from "@/lib/mentorData";

interface MentorSectionProps {
  missingSkills: { name: string; weight: number; category: string; priority: string }[];
}

export default function MentorSection({ missingSkills }: MentorSectionProps) {
  const navigate = useNavigate();
  const mentors = generateMentorsForSkills(missingSkills);

  if (mentors.length === 0) {
    return (
      <GlassCard delay={0.35}>
        <h2 className="flex items-center gap-2 font-display font-semibold text-foreground mb-4">
          <Users className="w-5 h-5 text-primary" /> Top Mentors Near You
        </h2>
        <p className="text-sm text-muted-foreground">No mentors available — your skills are already complete! 🎉</p>
      </GlassCard>
    );
  }

  return (
    <GlassCard delay={0.35}>
      <h2 className="flex items-center gap-2 font-display font-semibold text-foreground mb-6">
        <Users className="w-5 h-5 text-primary" /> 🔥 Top Mentors Near You
      </h2>
      <div className="grid md:grid-cols-2 gap-4">
        {mentors.slice(0, 6).map((mentor) => (
          <MentorCard key={mentor.id} mentor={mentor} onBook={() => navigate(`/book/${mentor.id}`, { state: { mentor } })} />
        ))}
      </div>
    </GlassCard>
  );
}

function MentorCard({ mentor, onBook }: { mentor: Mentor; onBook: () => void }) {
  return (
    <div className="glass p-4 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{mentor.avatar}</span>
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-semibold text-foreground text-sm truncate">{mentor.name}</h3>
          <p className="text-xs text-muted-foreground">{mentor.role}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5">
        <span className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs">{mentor.subject}</span>
        <span className="flex items-center gap-1 px-2 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs">
          <Star className="w-3 h-3" /> {mentor.rating}
        </span>
        <span className="flex items-center gap-1 px-2 py-1 rounded-md bg-muted text-muted-foreground text-xs">
          <MapPin className="w-3 h-3" /> {mentor.location}
        </span>
      </div>
      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-1">
          <IndianRupee className="w-3.5 h-3.5 text-primary" />
          <span className="font-display font-bold text-foreground">₹{mentor.price}</span>
          <span className="text-xs text-muted-foreground">/session</span>
        </div>
        <span className="text-xs text-muted-foreground">{mentor.experience}</span>
      </div>
      <button
        onClick={onBook}
        className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-display font-semibold text-sm hover:bg-primary/90 transition-all"
      >
        Book Session
      </button>
    </div>
  );
}
