import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const MemoryGalaxy = () => {
  const [newMemory, setNewMemory] = useState("");
  const [memories, setMemories] = useState<string[]>([]);
  const { toast } = useToast();

  const galaxyMemories = [
    {
      title: "🐼 Panda Chronicles",
      description: "Adventures with our beloved Mum Panda (our elder sister)",
      details: "She's our emotional anchor - soft, caring, and round like a panda. From her protective hugs to being the heart of our family chaos, she makes every moment warmer."
    },
    {
      title: "❄️ Snow Universe Adventures",
      description: "Manali memories that changed everything",
      details: "Paragliding through clouds, ropeway rides above the valley, peaceful yak rides, and gliding on snowy slopes. From snowball fights to skiing adventures - each moment added pure adrenaline and brotherhood to your frozen wonderland."
    },
    {
      title: "🐛 Debugging Life Problems", 
      description: "When Python errors become life metaphors",
      details: "Those deep coding sessions where fixing bugs felt like solving life's mysteries. Your wisdom at 25 turning technical challenges into philosophical breakthroughs."
    },
    {
      title: "♟️ Checkmate Moments",
      description: "Our sacred chess bond",
      details: "Not serious tournaments or bragging rights. Just quiet moments where we laugh over misclicks, plot emotional checkmates, and build a bond beyond words. It's not about the pieces - it's about having a player who gets you."
    },
    {
      title: "😂 Inside Joke Repository",
      description: "Galaxies of laughter in our universe",
      details: "The legendary 'warm it' → 'vomit out' translation disaster, random 'take le' outbursts, and countless misheard phrases that became our secret language."
    },
    {
      title: "🎵 Moody Music Explorations",
      description: "Your emotional soundtrack journey", 
      details: "From Juice WRLD to XXXTENTACION, iann dior to Post Malone - the music that speaks what you sometimes hold inside. Each song a gateway to your deeper thoughts."
    },
    {
      title: "🎮 Logical Realms",
      description: "Mature adventures and mental challenges",
      details: "Not childish games, but intellectually rich experiences. Creating, solving, exploring things different from the usual world. Your curious mind always seeking something deeper."
    }
  ];

  const addMemory = () => {
    if (newMemory.trim()) {
      setMemories([...memories, newMemory.trim()]);
      setNewMemory("");
      toast({
        title: "🌟 Memory Added to Galaxy!",
        description: "Your memory is now part of the BURIVERSE!",
      });
    }
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-orbitron font-bold mb-4 neon-text">
            🌌 Your Memory Galaxy
          </h2>
          <p className="text-xl font-space text-muted-foreground">
            This is your memory galaxy - every moment that makes you, YOU
          </p>
        </div>

        {/* Memory Creation Star */}
        <Card className="cosmic-glow aurora-border mb-12 relative">
          <div className="absolute -top-4 -right-4 text-6xl animate-spin">⭐</div>
          <CardContent className="p-8">
            <h3 className="text-2xl font-orbitron font-bold mb-4 text-center text-accent">
              ✨ Create a New Memory Star
            </h3>
            <div className="flex flex-col md:flex-row gap-4">
              <Textarea
                value={newMemory}
                onChange={(e) => setNewMemory(e.target.value)}
                placeholder="Write a memory that you want to preserve in the cosmic void..."
                className="flex-1 cosmic-glow font-space min-h-[100px]"
              />
              <Button 
                onClick={addMemory}
                className="cosmic-glow font-orbitron px-8"
                size="lg"
              >
                🌟 Add to Galaxy
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Galaxy Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {galaxyMemories.map((memory, index) => (
            <Card key={index} className="cosmic-glow aurora-border transform hover:scale-105 transition-all duration-300">
              <CardContent className="p-6">
                <h3 className="text-xl font-orbitron font-bold mb-2 text-accent">
                  {memory.title}
                </h3>
                <p className="font-space text-sm mb-3 text-muted-foreground">
                  {memory.description}
                </p>
                <p className="font-space text-sm">
                  {memory.details}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* User Created Memories */}
        {memories.length > 0 && (
          <div>
            <h3 className="text-3xl font-orbitron font-bold mb-6 text-center neon-text">
              🌟 Your Personal Memory Stars
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {memories.map((memory, index) => (
                <Card key={index} className="cosmic-glow aurora-border">
                  <CardContent className="p-4">
                    <p className="font-space text-sm">
                      {memory}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div className="text-center mt-12">
          <p className="text-lg font-space text-muted-foreground">
            Every memory is a star in your personal galaxy 🌠
          </p>
        </div>
      </div>
    </section>
  );
};

export default MemoryGalaxy;