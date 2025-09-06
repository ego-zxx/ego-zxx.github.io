import { useState } from "react";
import { Heart, Plus, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface Letter {
  id: string;
  from: "Suraj" | "Sneha";
  title: string;
  content: string;
  date: string;
}

const LettersSection = () => {
  const [letters, setLetters] = useState<Letter[]>([
    {
      id: "1",
      from: "Suraj",
      title: "My Dearest Sneha",
      content: "Every morning I wake up grateful for having you in my life. Your smile lights up my world, and your laugh is the sweetest melody I've ever heard. I love how you make even the simplest moments feel magical. You are my everything, and I can't wait to create more beautiful memories with you.",
      date: "2024-01-15"
    },
    {
      id: "2",
      from: "Sneha",
      title: "To My Love",
      content: "Thank you for being the most amazing person in my life. Your kindness, your humor, and the way you care for me never cease to amaze me. I love our late-night conversations and how you always know how to make me smile. You are my safe place, my home.",
      date: "2024-01-10"
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newLetter, setNewLetter] = useState({ title: "", content: "" });
  const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null);

  const handleSubmitLetter = () => {
    if (!newLetter.title.trim() || !newLetter.content.trim()) {
      toast.error("Please fill in both title and content");
      return;
    }

    const letter: Letter = {
      id: Date.now().toString(),
      from: "Sneha",
      title: newLetter.title,
      content: newLetter.content,
      date: new Date().toISOString().split('T')[0]
    };

    setLetters([letter, ...letters]);
    setNewLetter({ title: "", content: "" });
    setShowForm(false);
    toast.success("Your letter has been added! ❤️");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-romantic text-5xl text-foreground mb-4">
            Our Love Letters
            <Mail className="inline-block ml-4 h-10 w-10 text-suraj-pink" />
          </h1>
          <p className="text-lg text-muted-foreground font-serif">
            Words from the heart, written with love
          </p>
        </div>

        {/* Add Letter Button */}
        <div className="text-center mb-8">
          <Button 
            onClick={() => setShowForm(!showForm)}
            className="love-button"
          >
            <Plus className="h-4 w-4 mr-2" />
            Write a New Letter
          </Button>
        </div>

        {/* New Letter Form */}
        {showForm && (
          <div className="sneha-card mb-8 max-w-2xl mx-auto">
            <h3 className="font-romantic text-2xl text-sneha-lavender mb-4">Write Your Heart Out</h3>
            <div className="space-y-4">
              <Input
                placeholder="Letter title..."
                value={newLetter.title}
                onChange={(e) => setNewLetter({ ...newLetter, title: e.target.value })}
                className="border-sneha-lavender/30 focus:border-sneha-lavender"
              />
              <Textarea
                placeholder="Pour your heart out here..."
                rows={6}
                value={newLetter.content}
                onChange={(e) => setNewLetter({ ...newLetter, content: e.target.value })}
                className="border-sneha-lavender/30 focus:border-sneha-lavender resize-none"
              />
              <div className="flex gap-3">
                <Button onClick={handleSubmitLetter} className="love-button flex-1">
                  Send Letter
                </Button>
                <Button 
                  onClick={() => setShowForm(false)} 
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Letters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {letters.map((letter) => (
            <div
              key={letter.id}
              onClick={() => setSelectedLetter(letter)}
              className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                letter.from === "Suraj" ? "suraj-card" : "sneha-card"
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  letter.from === "Suraj" ? "bg-suraj-pink" : "bg-sneha-lavender"
                }`}>
                  <Heart className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{letter.title}</h3>
                  <p className="text-sm text-muted-foreground">From {letter.from} • {letter.date}</p>
                </div>
              </div>
              <p className="text-foreground font-serif line-clamp-3">
                {letter.content}
              </p>
              <div className="mt-4 text-sm font-medium text-muted-foreground">
                Click to read full letter →
              </div>
            </div>
          ))}
        </div>

        {/* Letter Modal */}
        {selectedLetter && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedLetter(null)}>
            <div 
              className={`max-w-2xl w-full max-h-[80vh] overflow-y-auto ${
                selectedLetter.from === "Suraj" ? "suraj-card" : "sneha-card"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  selectedLetter.from === "Suraj" ? "bg-suraj-pink" : "bg-sneha-lavender"
                }`}>
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="font-romantic text-3xl text-foreground">{selectedLetter.title}</h2>
                  <p className="text-muted-foreground">From {selectedLetter.from} • {selectedLetter.date}</p>
                </div>
              </div>
              <div className="prose prose-lg">
                <p className="text-foreground font-serif leading-relaxed whitespace-pre-wrap">
                  {selectedLetter.content}
                </p>
              </div>
              <div className="mt-6 text-center">
                <Button onClick={() => setSelectedLetter(null)} variant="outline">
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LettersSection;