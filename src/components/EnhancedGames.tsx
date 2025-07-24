import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const EnhancedGames = () => {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [skiScore, setSkiScore] = useState(0);
  const [pythonAnswer, setPythonAnswer] = useState("");
  const { toast } = useToast();

  const games = [
    {
      id: "gate-of-mind",
      title: "🧠 BURIVERSE - The Gate of Mind",
      description: "A serious, intelligent logic challenge designed with love",
      type: "logic"
    },
    {
      id: "snow-trek",
      title: "❄️ Snow Trek: The Frozen Path",
      description: "Navigate through emotional snow memories",
      type: "adventure"
    },
    {
      id: "python-puzzle",
      title: "🐍 EchoMind: Python Puzzle Room",
      description: "Solve coding riddles to unlock memories",
      type: "puzzle"
    },
    {
      id: "music-vibe",
      title: "🎵 Guess the Song Vibe",
      description: "Match emotions to your favorite tracks",
      type: "music"
    }
  ];

  const handleGameStart = (gameId: string) => {
    setActiveGame(gameId);
    
    switch(gameId) {
      case "gate-of-mind":
        // This will open the full-screen game
        window.open('/gate-of-mind', '_blank');
        break;
      case "snow-trek":
        toast({
          title: "🎿 Starting Snow Trek",
          description: "Choose your path through the frozen memories...",
        });
        break;
      case "python-puzzle":
        toast({
          title: "🐍 Entering Python Realm",
          description: "Solve the riddle: print(emotion_that_ends_story)",
        });
        break;
      case "music-vibe":
        toast({
          title: "🎧 Music Vibe Challenge",
          description: "Feel the rhythm of your emotional soundtrack...",
        });
        break;
    }
  };

  const checkPythonAnswer = () => {
    if (pythonAnswer.toLowerCase().includes("love")) {
      toast({
        title: "🎉 Correct!",
        description: "Love is indeed the emotion that ends every story in BURIVERSE",
      });
      setPythonAnswer("");
    } else {
      toast({
        title: "🤔 Try again",
        description: "Think about what binds all our memories together...",
      });
    }
  };

  return (
    <section className="py-20 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/10 via-purple-900/10 to-pink-900/10" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-12 text-center neon-text">
          🎮 Interactive Adventures
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {games.map((game) => (
            <Card key={game.id} className="cosmic-glow aurora-border group hover:scale-105 transition-all duration-300">
              <CardContent className="p-6">
                <h3 className="text-xl font-orbitron font-bold mb-3 text-accent">
                  {game.title}
                </h3>
                <p className="text-muted-foreground mb-4 font-space">
                  {game.description}
                </p>
                <Button 
                  onClick={() => handleGameStart(game.id)}
                  className="w-full cosmic-glow font-orbitron hover-scale"
                  variant={activeGame === game.id ? "default" : "outline"}
                >
                  {activeGame === game.id ? "Playing..." : "Start Adventure"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Python Puzzle Interactive */}
        {activeGame === "python-puzzle" && (
          <Card className="cosmic-glow aurora-border animate-fade-in">
            <CardContent className="p-8">
              <h3 className="text-2xl font-orbitron font-bold mb-4 text-accent">
                🐍 Python Memory Unlock
              </h3>
              <div className="bg-black/80 p-4 rounded-lg font-mono text-green-400 mb-4">
                <div>{'>>> def unlock_memory():'}</div>
                <div>{'...     return print("The emotion that ends our story is: ____")'}</div>
                <div>{'>>> '}<span className="animate-pulse">|</span></div>
              </div>
              <div className="flex gap-4">
                <input
                  type="text"
                  value={pythonAnswer}
                  onChange={(e) => setPythonAnswer(e.target.value)}
                  placeholder="Type your answer..."
                  className="flex-1 p-3 rounded-lg bg-background/50 border border-accent/20 text-white"
                  onKeyPress={(e) => e.key === 'Enter' && checkPythonAnswer()}
                />
                <Button onClick={checkPythonAnswer} className="cosmic-glow">
                  Execute
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Snow Trek Story */}
        {activeGame === "snow-trek" && (
          <Card className="cosmic-glow aurora-border animate-fade-in">
            <CardContent className="p-8">
              <h3 className="text-2xl font-orbitron font-bold mb-4 text-accent">
                ❄️ The Frozen Path Awaits
              </h3>
              <div className="space-y-4">
                <p className="font-space">
                  You're standing at the edge of a snowy valley. The wind carries echoes of laughter and distant music...
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button 
                    onClick={() => setSkiScore(prev => prev + 10)}
                    className="cosmic-glow font-orbitron"
                  >
                    🎿 Take the skiing path
                  </Button>
                  <Button 
                    onClick={() => setSkiScore(prev => prev + 5)}
                    variant="outline" 
                    className="aurora-border font-orbitron"
                  >
                    🐐 Follow the yak trail
                  </Button>
                </div>
                {skiScore > 0 && (
                  <div className="mt-4 p-4 bg-blue-500/10 rounded-lg">
                    <p className="text-accent">Adventure Score: {skiScore}</p>
                    <p className="text-sm text-muted-foreground">Each choice shapes your snow memory...</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
};

export default EnhancedGames;