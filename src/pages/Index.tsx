import { useState } from "react";
import { Heart, MessageCircle, Calendar, Mail } from "lucide-react";
import Navigation from "@/components/Navigation";
import LettersSection from "@/components/LettersSection";
import MessagesSection from "@/components/MessagesSection";
import DatesSection from "@/components/DatesSection";
import WelcomeHero from "@/components/WelcomeHero";

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");

  const renderSection = () => {
    switch (activeSection) {
      case "letters":
        return <LettersSection />;
      case "messages":
        return <MessagesSection />;
      case "dates":
        return <DatesSection />;
      default:
        return <WelcomeHero setActiveSection={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-cream">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="pt-20">
        {renderSection()}
      </main>
    </div>
  );
};

export default Index;