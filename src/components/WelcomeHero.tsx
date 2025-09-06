import { Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WelcomeHeroProps {
  setActiveSection: (section: string) => void;
}

const WelcomeHero = ({ setActiveSection }: WelcomeHeroProps) => {
  const latestMessage = {
    from: "Suraj",
    content: "Good morning beautiful! Can't wait to see you later today ❤️",
    time: "2 hours ago"
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto text-center">
        {/* Hero Welcome */}
        <div className="floating-hearts mb-8">
          <h1 className="font-romantic text-6xl md:text-8xl text-foreground mb-4">
            Welcome, Sneha
            <Heart className="inline-block ml-4 h-12 w-12 text-love-red animate-gentle-pulse" />
          </h1>
          <p className="text-xl text-muted-foreground font-serif">
            Our little love space where hearts connect and memories are made
          </p>
        </div>

        {/* Latest Message */}
        <div className="suraj-card max-w-2xl mx-auto mb-12">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-suraj-pink flex items-center justify-center">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1 text-left">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold text-suraj-pink">Latest from Suraj</span>
                <Sparkles className="h-4 w-4 text-romantic-gold animate-sparkle" />
                <span className="text-sm text-muted-foreground">{latestMessage.time}</span>
              </div>
              <p className="text-foreground font-serif italic">"{latestMessage.content}"</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="text-center">
            <Button 
              onClick={() => setActiveSection("letters")}
              className="love-button w-full mb-4"
            >
              Read Our Letters
            </Button>
            <p className="text-sm text-muted-foreground">
              Beautiful letters from both of us
            </p>
          </div>
          
          <div className="text-center">
            <Button 
              onClick={() => setActiveSection("messages")}
              className="love-button w-full mb-4"
            >
              Share Thoughts
            </Button>
            <p className="text-sm text-muted-foreground">
              Quick messages and sweet notes
            </p>
          </div>
          
          <div className="text-center">
            <Button 
              onClick={() => setActiveSection("dates")}
              className="love-button w-full mb-4"
            >
              Plan Our Dates
            </Button>
            <p className="text-sm text-muted-foreground">
              Romantic moments to look forward to
            </p>
          </div>
        </div>

        {/* Love Quote */}
        <div className="sparkle">
          <blockquote className="font-romantic text-2xl text-suraj-pink italic">
            "In all the world, there is no heart for me like yours. 
            In all the world, there is no love for you like mine."
          </blockquote>
          <cite className="block mt-4 text-muted-foreground">- Maya Angelou</cite>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHero;