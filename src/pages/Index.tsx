import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CursorTrail from "@/components/CursorTrail";
import CosmicParticles from "@/components/CosmicParticles";
import FloatingElements from "@/components/FloatingElements";
import BirthdayAnimations from "@/components/BirthdayAnimations";
import PythonSimulator from "@/components/PythonSimulator";
import MemoryGalaxy from "@/components/MemoryGalaxy";
import CheckmateMoments from "@/components/CheckmateMoments";
import GameNavigation from "@/components/GameNavigation";
import SongGenerator from "@/components/SongGenerator";
import LogicVault from "@/components/LogicVault";
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
      <BirthdayAnimations />
      
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
            <Button 
              onClick={() => {
                document.getElementById('memory-galaxy')?.scrollIntoView({ behavior: 'smooth' });
                // Show scroll instruction temporarily
                const instruction = document.createElement('div');
                instruction.textContent = 'scroll to see';
                instruction.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 bg-accent/90 text-black px-4 py-2 rounded-lg font-orbitron text-sm z-50 animate-fade-in';
                document.body.appendChild(instruction);
                setTimeout(() => instruction.remove(), 3000);
              }}
              className="cosmic-glow font-orbitron hover-scale transition-all duration-300 hover:shadow-glow" 
              size="lg"
            >
              🚀 Explore BURIVERSE
            </Button>
            <Button 
              onClick={() => window.open('https://youtube.com/shorts/S8z57UyxQOQ?si=pAJILrjtXwNWuK8N', '_blank')}
              variant="outline" 
              className="aurora-border font-orbitron hover-scale transition-all duration-300" 
              size="lg"
            >
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
                  From ordinary days that turned magical with you, to the chaos we somehow made our language — like mishearing "warm it" as "vomit out" and randomly blurting "take le" — every little thing with you became a memory I never want to forget.
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
                  — Disha
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
      <GameNavigation />

      {/* Logic Vault */}
      <LogicVault />

      {/* Footer */}
      <footer className="py-12 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-xl font-space neon-text">
            From mum-panda and Disha 🐼 – "Take le... not vomit out!" 💖
          </p>
          <div className="mt-6 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 rounded-lg animate-pulse"></div>
            <iframe 
              width="560" 
              height="315" 
              src="https://www.youtube.com/embed/S8z57UyxQOQ?si=pAJILrjtXwNWuK8N&autoplay=1&mute=0&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&cc_load_policy=0&disablekb=1&fs=0" 
              title="Birthday Song" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className="mx-auto rounded-lg cosmic-glow max-w-full h-48 md:h-80 relative z-10 border-2 border-accent/30"
            ></iframe>
            <div className="absolute -top-2 -right-2 text-2xl animate-bounce">🎉</div>
            <div className="absolute -bottom-2 -left-2 text-2xl animate-bounce" style={{animationDelay: '0.5s'}}>🎂</div>
            <div className="absolute -top-2 -left-2 text-2xl animate-bounce" style={{animationDelay: '1s'}}>🎈</div>
            <div className="absolute -bottom-2 -right-2 text-2xl animate-bounce" style={{animationDelay: '1.5s'}}>✨</div>
          </div>
          <p className="text-sm mt-4 text-muted-foreground">
            Made with ∞ love in the cosmic void of code
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
