import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const SongGenerator = () => {
  const [birthday, setBirthday] = useState("");
  const [currentSong, setCurrentSong] = useState<string | null>(null);
  const { toast } = useToast();

  const songs = [
    {
      title: "🖤 Falling Down – Lil Peep & XXXTENTACION",
      url: "https://www.youtube.com/embed/GX8Hg6kWQYI",
    },
    {
      title: "💔 Lucid Dreams – Juice WRLD",
      url: "https://www.youtube.com/embed/mzB1VGEGcSU",
    },
    {
      title: "🔥 Star Shopping – Lil Peep",
      url: "https://www.youtube.com/embed/6TsnAZLYu0A",
    },
    {
      title: "🌅 Moonlight – XXXTENTACION",
      url: "https://www.youtube.com/embed/nqfVoTMEosw",
    },
    {
      title: "🌧 Changes – XXXTENTACION",
      url: "https://www.youtube.com/embed/U3BVFY9wnTw",
    },
  ];

  const revealSong = () => {
    if (!birthday) {
      toast({
        title: "📅 Hold up!",
        description: "Please enter your birthday first!",
        variant: "destructive",
      });
      return;
    }

    const date = new Date(birthday);
    const index = date.getDate() % songs.length;
    const selectedSong = songs[index];
    
    setCurrentSong(selectedSong.url);
    
    toast({
      title: "🎵 Your Birthday Song is Ready!",
      description: selectedSong.title,
    });
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <Card className="cosmic-glow aurora-border">
          <CardContent className="p-8">
            <h2 className="text-4xl font-orbitron font-bold mb-8 text-center neon-text">
              🎂 Enter Your Birthday
            </h2>
            
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-8">
              <Input
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                className="cosmic-glow text-center font-space text-lg"
              />
              <Button 
                onClick={revealSong}
                className="cosmic-glow font-orbitron px-8"
                size="lg"
              >
                🎵 Reveal Your Song
              </Button>
            </div>

            {currentSong && (
              <div className="mt-8 text-center">
                <div className="cosmic-glow rounded-lg overflow-hidden">
                  <iframe
                    width="100%"
                    height="315"
                    src={currentSong}
                    title="Your Birthday Song"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full"
                  />
                </div>
              </div>
            )}

            <div className="mt-8 text-center">
              <p className="text-lg font-space text-muted-foreground">
                Your birthday determines your cosmic soundtrack! 🌌
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SongGenerator;