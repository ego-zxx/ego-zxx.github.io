import { useState } from "react";
import { Heart, Plus, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface Message {
  id: string;
  from: "Suraj" | "Sneha";
  content: string;
  timestamp: string;
}

const MessagesSection = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      from: "Suraj",
      content: "Just thinking about you and can't stop smiling 😊",
      timestamp: "2024-01-15T10:30:00Z"
    },
    {
      id: "2",
      from: "Sneha",
      content: "You make my heart flutter every single day ❤️",
      timestamp: "2024-01-15T09:15:00Z"
    },
    {
      id: "3",
      from: "Suraj",
      content: "Your laugh is my favorite sound in the world",
      timestamp: "2024-01-14T20:45:00Z"
    },
    {
      id: "4",
      from: "Sneha",
      content: "Thank you for always being my safe place 🏠",
      timestamp: "2024-01-14T18:20:00Z"
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  const handleSubmitMessage = () => {
    if (!newMessage.trim()) {
      toast.error("Please write a message");
      return;
    }

    const message: Message = {
      id: Date.now().toString(),
      from: "Sneha",
      content: newMessage,
      timestamp: new Date().toISOString()
    };

    setMessages([message, ...messages]);
    setNewMessage("");
    setShowForm(false);
    toast.success("Message added! 💕");
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-romantic text-5xl text-foreground mb-4">
            Sweet Messages
            <MessageCircle className="inline-block ml-4 h-10 w-10 text-sneha-lavender" />
          </h1>
          <p className="text-lg text-muted-foreground font-serif">
            Little thoughts that brighten our days
          </p>
        </div>

        {/* Add Message Button */}
        <div className="text-center mb-8">
          <Button 
            onClick={() => setShowForm(!showForm)}
            className="love-button"
          >
            <Plus className="h-4 w-4 mr-2" />
            Share a Thought
          </Button>
        </div>

        {/* New Message Form */}
        {showForm && (
          <div className="sneha-card mb-8">
            <h3 className="font-romantic text-2xl text-sneha-lavender mb-4">What's on your mind? 💭</h3>
            <div className="space-y-4">
              <Textarea
                placeholder="Share a sweet thought..."
                rows={3}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="border-sneha-lavender/30 focus:border-sneha-lavender resize-none"
              />
              <div className="flex gap-3">
                <Button onClick={handleSubmitMessage} className="love-button flex-1">
                  Send Message
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

        {/* Messages Grid */}
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`relative transform transition-all duration-300 hover:scale-105 ${
                message.from === "Suraj" 
                  ? "suraj-card ml-0 mr-12" 
                  : "sneha-card ml-12 mr-0"
              }`}
            >
              {/* Message Bubble Tail */}
              <div className={`absolute top-4 w-0 h-0 ${
                message.from === "Suraj"
                  ? "-left-2 border-r-[16px] border-r-suraj-pink/20 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent"
                  : "-right-2 border-l-[16px] border-l-sneha-lavender/20 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent"
              }`} />
              
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.from === "Suraj" ? "bg-suraj-pink" : "bg-sneha-lavender"
                }`}>
                  <Heart className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`font-semibold ${
                      message.from === "Suraj" ? "text-suraj-pink" : "text-sneha-lavender"
                    }`}>
                      {message.from}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                  <p className="text-foreground font-serif">
                    {message.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Your Turn Prompt */}
        <div className="text-center mt-12 p-6 bg-romantic-gold/20 rounded-2xl border border-romantic-gold/30">
          <h3 className="font-romantic text-2xl text-foreground mb-2">Your Turn! 💕</h3>
          <p className="text-muted-foreground">
            Suraj is waiting to hear from you. Share what's in your heart!
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessagesSection;