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
      description: "Adventures of the legendary Mum Panda",
      details: "From random 'take le' moments to becoming the most iconic inside joke in the universe"
    },
    {
      title: "❄️ Snow Universe",
      description: "Epic snowball battles and winter magic",
      details: "Those legendary snow fights that turned into memory-making sessions"
    },
    {
      title: "🐛 Debugging Life Problems",
      description: "Late night debugging sessions",
      details: "When Python errors became life metaphors and every bug fix was a breakthrough moment"
    },
    {
      title: "♟️ Late Night Chess Matches",
      description: "Strategic battles at 2 AM",
      details: "Chess games that lasted until sunrise, with strategies as complex as your code"
    },
    {
      title: "😂 Inside Joke Repository",
      description: "Collection of legendary moments",
      details: "From 'vomit out' instead of 'warm it' to countless moments that only we understand"
    },
    {
      title: "💡 Breakthrough Moments",
      description: "Eureka instances in coding and life",
      details: "Those 3 AM moments when everything finally clicked"
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