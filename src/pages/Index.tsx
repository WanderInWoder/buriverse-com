import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CursorTrail from "@/components/CursorTrail";
import CosmicParticles from "@/components/CosmicParticles";
import FloatingElements from "@/components/FloatingElements";
import PythonSimulator from "@/components/PythonSimulator";
import MemoryGalaxy from "@/components/MemoryGalaxy";
import CheckmateMoments from "@/components/CheckmateMoments";
import EnhancedGames from "@/components/EnhancedGames";
import SongGenerator from "@/components/SongGenerator";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [mounted, setMounted] = useState(false);
  const { toast } = useToast();
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setMounted(true);
    
    // Play welcome audio when page loads
    const playWelcomeAudio = async () => {
      try {
        if (audioRef.current) {
          await audioRef.current.play();
          setTimeout(() => {
            if (audioRef.current) {
              audioRef.current.pause();
            }
          }, 10000); // Stop after 10 seconds
        }
      } catch (error) {
        console.log("Audio autoplay prevented");
      }
    };

    playWelcomeAudio();

    // Show welcome toast
    toast({
      title: "🌌 Welcome to BURIVERSE!",
      description: "Your cosmic adventure begins now...",
    });
  }, [toast]);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-orbitron neon-text animate-pulse">
          Loading BURIVERSE...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <CosmicParticles />
      <FloatingElements />
      <CursorTrail />
      
      {/* Welcome Audio */}
      <audio ref={audioRef} preload="auto">
        <source src="https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" type="audio/wav" />
      </audio>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <img 
            src="/lovable-uploads/08820777-38f2-4e80-966c-9436344ff9b5.png" 
            alt="BURIVERSE Hero" 
            className="w-80 h-80 mx-auto mb-8 rounded-3xl cosmic-glow animate-float object-cover"
          />
          
          <h1 className="text-6xl md:text-8xl font-orbitron font-black mb-6 neon-text typing-animation">
            BURIVERSE
          </h1>
          
          <p className="text-xl md:text-2xl font-space mb-8 text-accent animate-fade-in">
            Where snowflakes carry emotions, and stars hold our jokes.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Button className="cosmic-glow font-orbitron hover-scale transition-all duration-300 hover:shadow-glow" size="lg">
              🚀 Explore BURIVERSE
            </Button>
            <Button variant="outline" className="aurora-border font-orbitron hover-scale transition-all duration-300" size="lg">
              🎵 Play the Mashup
            </Button>
          </div>
        </div>
      </section>

      {/* Birthday Song Generator */}
      <SongGenerator />

      {/* Letter Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Card className="cosmic-glow aurora-border">
            <CardContent className="p-8">
              <h2 className="text-4xl font-orbitron font-bold mb-8 text-center neon-text">
                💌 A Letter From Panda to Python
              </h2>
              
              <div className="text-lg font-space leading-relaxed space-y-4">
                <p>Dear Buri,</p>
                
                <p>
                  I don't even know how to start this, because honestly, no words are big enough for you. But I'll try.
                </p>
                
                <p>
                  You've been more than just my brother. You're the glitch in my code, the snow in my summer, the unexpected laugh in the middle of a breakdown.
                </p>
                
                <p>
                  From Python scripts to snowball fights, from teasing didi as 'mum panda' to turning ordinary phrases into iconic inside jokes — like mishearing "warm it" as "vomit out" and randomly blurting "take le" — every little thing with you became a memory I never want to forget.
                </p>
                
                <p>
                  You don't show it often, but I see it — your kind heart, your depth, the way you understand people without them saying anything. I admire how deeply you feel, how smart you are, and how real you've always been.
                </p>
                
                <p>
                  I built BURIVERSE not just as a birthday surprise, but as a mirror of everything you are. It's got Shin Chan because he's your soul twin. A terminal because Python is your superpower. Moody music because it speaks what you sometimes hold in.
                </p>
                
                <p>
                  Your jokes, your snow moments, your light — they live here. Just like they live in my heart. This world isn't just made of stars — it's made of you.
                </p>
                
                <p>
                  Thank you for making my world so full of laughter, teaching me life lessons in the simplest ways, and showing the kind of love that never needs explaining.
                </p>
                
                <p className="font-bold text-xl text-accent">
                  Happy Birthday! 💙<br />
                  With all my infinite heart,<br />
                  — Panda
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Python Terminal */}
      <PythonSimulator />

      {/* Memory Galaxy */}
      <MemoryGalaxy />

      {/* Checkmate Moments */}
      <CheckmateMoments />

      {/* Enhanced Interactive Games */}
      <EnhancedGames />

      {/* Footer */}
      <footer className="py-12 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-xl font-space neon-text">
            From Mum Panda & Aradhya 🐼 – "Take le... not vomit out!" 💖
          </p>
          <p className="text-sm mt-4 text-muted-foreground">
            Made with ∞ love in the cosmic void of code
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
