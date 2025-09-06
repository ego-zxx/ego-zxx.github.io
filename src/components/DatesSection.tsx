import { useState } from "react";
import { Calendar, Clock, MapPin, Heart, Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface DateInvite {
  id: string;
  from: "Suraj" | "Sneha";
  title: string;
  date: string;
  time: string;
  location: string;
  note: string;
  rsvp?: "yes" | "no" | null;
  status: "upcoming" | "confirmed" | "past";
}

const DatesSection = () => {
  const [dates, setDates] = useState<DateInvite[]>([
    {
      id: "1",
      from: "Suraj",
      title: "Sunset Picnic at the Park",
      date: "2024-01-20",
      time: "17:30",
      location: "Riverside Park",
      note: "Let's watch the sunset together with some homemade sandwiches and your favorite snacks ❤️",
      rsvp: null,
      status: "upcoming"
    },
    {
      id: "2",
      from: "Suraj",
      title: "Movie Night at Home",
      date: "2024-01-18",
      time: "19:00",
      location: "Our cozy living room",
      note: "Your pick tonight! I'll make the popcorn 🍿",
      rsvp: "yes",
      status: "confirmed"
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newDate, setNewDate] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    note: ""
  });

  const handleSubmitDate = () => {
    if (!newDate.title.trim() || !newDate.date || !newDate.time) {
      toast.error("Please fill in the required fields");
      return;
    }

    const dateInvite: DateInvite = {
      id: Date.now().toString(),
      from: "Sneha",
      title: newDate.title,
      date: newDate.date,
      time: newDate.time,
      location: newDate.location,
      note: newDate.note,
      rsvp: null,
      status: "upcoming"
    };

    setDates([dateInvite, ...dates]);
    setNewDate({ title: "", date: "", time: "", location: "", note: "" });
    setShowForm(false);
    toast.success("Date invitation sent! 💕");
  };

  const handleRSVP = (dateId: string, response: "yes" | "no") => {
    setDates(dates.map(date => 
      date.id === dateId 
        ? { ...date, rsvp: response, status: response === "yes" ? "confirmed" : "upcoming" }
        : date
    ));
    toast.success(response === "yes" ? "Date confirmed! Can't wait! 🎉" : "RSVP updated");
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-romantic text-5xl text-foreground mb-4">
            Our Beautiful Dates
            <Calendar className="inline-block ml-4 h-10 w-10 text-love-red" />
          </h1>
          <p className="text-lg text-muted-foreground font-serif">
            Moments to cherish, memories to make
          </p>
        </div>

        {/* Add Date Button */}
        <div className="text-center mb-8">
          <Button 
            onClick={() => setShowForm(!showForm)}
            className="love-button"
          >
            <Plus className="h-4 w-4 mr-2" />
            Plan a Date
          </Button>
        </div>

        {/* New Date Form */}
        {showForm && (
          <div className="sneha-card mb-8">
            <h3 className="font-romantic text-2xl text-sneha-lavender mb-4">Plan Something Special 💕</h3>
            <div className="space-y-4">
              <Input
                placeholder="Date title (e.g., Romantic Dinner)"
                value={newDate.title}
                onChange={(e) => setNewDate({ ...newDate, title: e.target.value })}
                className="border-sneha-lavender/30 focus:border-sneha-lavender"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="date"
                  value={newDate.date}
                  onChange={(e) => setNewDate({ ...newDate, date: e.target.value })}
                  className="border-sneha-lavender/30 focus:border-sneha-lavender"
                />
                <Input
                  type="time"
                  value={newDate.time}
                  onChange={(e) => setNewDate({ ...newDate, time: e.target.value })}
                  className="border-sneha-lavender/30 focus:border-sneha-lavender"
                />
              </div>
              <Input
                placeholder="Location (optional)"
                value={newDate.location}
                onChange={(e) => setNewDate({ ...newDate, location: e.target.value })}
                className="border-sneha-lavender/30 focus:border-sneha-lavender"
              />
              <Textarea
                placeholder="Add a sweet note (optional)"
                rows={3}
                value={newDate.note}
                onChange={(e) => setNewDate({ ...newDate, note: e.target.value })}
                className="border-sneha-lavender/30 focus:border-sneha-lavender resize-none"
              />
              <div className="flex gap-3">
                <Button onClick={handleSubmitDate} className="love-button flex-1">
                  Send Invitation
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

        {/* Dates List */}
        <div className="space-y-6">
          {dates.map((dateInvite) => (
            <div
              key={dateInvite.id}
              className={`transition-all duration-300 hover:scale-105 ${
                dateInvite.from === "Suraj" ? "suraj-card" : "sneha-card"
              } ${dateInvite.status === "confirmed" ? "ring-2 ring-romantic-gold/50" : ""}`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                  dateInvite.from === "Suraj" ? "bg-suraj-pink" : "bg-sneha-lavender"
                }`}>
                  {dateInvite.status === "confirmed" ? (
                    <Check className="h-6 w-6 text-white" />
                  ) : (
                    <Heart className="h-6 w-6 text-white" />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-romantic text-2xl text-foreground">{dateInvite.title}</h3>
                    {dateInvite.status === "confirmed" && (
                      <span className="px-2 py-1 bg-romantic-gold text-foreground text-xs rounded-full font-medium">
                        Confirmed ✨
                      </span>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 mb-3 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(dateInvite.date)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{formatTime(dateInvite.time)}</span>
                    </div>
                    {dateInvite.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{dateInvite.location}</span>
                      </div>
                    )}
                  </div>
                  
                  {dateInvite.note && (
                    <p className="text-foreground font-serif italic mb-4">
                      "{dateInvite.note}"
                    </p>
                  )}
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">From {dateInvite.from}</span>
                    {dateInvite.from === "Suraj" && dateInvite.rsvp === null && (
                      <div className="flex gap-2 ml-auto">
                        <Button
                          size="sm"
                          onClick={() => handleRSVP(dateInvite.id, "yes")}
                          className="bg-romantic-gold hover:bg-romantic-gold/80 text-foreground"
                        >
                          Yes! 💕
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRSVP(dateInvite.id, "no")}
                        >
                          Can't make it
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Collaboration Note */}
        <div className="text-center mt-12 p-6 bg-gradient-to-r from-suraj-pink/10 to-sneha-lavender/10 rounded-2xl border border-romantic-gold/30">
          <h3 className="font-romantic text-2xl text-foreground mb-2">Let's Plan Together! 🤝</h3>
          <p className="text-muted-foreground">
            Both of us can suggest dates and create beautiful memories. What would you like to do next?
          </p>
        </div>
      </div>
    </div>
  );
};

export default DatesSection;