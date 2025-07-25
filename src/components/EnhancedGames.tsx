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
      id: "python-puzzle",
      title: "🐍 EchoMind: Python Puzzle Room",
      description: "Solve coding riddles to unlock memories",
      type: "puzzle"
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

        {/* Additional Challenge Games */}
        <div className="mb-12">
          <h3 className="text-3xl font-orbitron font-bold mb-8 text-center neon-text">
            🧠 Elite Mind Challenges
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "🎯",
                title: "Codebreaker Carousel",
                subtitle: "Logic Deduction Puzzle",
                description: "Decrypt a sequence of rotating symbols using limited clues. Every move counts, and every pattern hides a logic key.",
                difficulty: "Mastermind",
                color: "from-red-600 to-orange-600"
              },
              {
                icon: "🔄",
                title: "Mirror Logic",
                subtitle: "Reflex Pattern Game",
                description: "Trace mirrored paths, reflect sequences, and outsmart symmetry using your logic instincts.",
                difficulty: "Advanced",
                color: "from-cyan-600 to-blue-600"
              },
              {
                icon: "🧮",
                title: "Function Fusion",
                subtitle: "Mathematical Logic Puzzle",
                description: "Each level gives you strange equations. Fuse functions, discover hidden operations, and crack the logic behind each fusion.",
                difficulty: "Prodigy",
                color: "from-emerald-600 to-teal-600"
              },
              {
                icon: "🌀",
                title: "Paradox Portal",
                subtitle: "Time Loop Logic Game",
                description: "Solve recursive puzzles in a paradoxical timeline. Your past moves affect your future, and your future rewrites your past.",
                difficulty: "Genius",
                color: "from-violet-600 to-purple-600"
              },
              {
                icon: "🎭",
                title: "The Imitator",
                subtitle: "Truth vs Lie Challenge",
                description: "Five characters. One truth-teller. Four imitators. Can you ask the right questions and use pure reasoning to spot the real one?",
                difficulty: "Elite Thinker",
                color: "from-pink-600 to-rose-600"
              }
            ].map((challenge) => (
              <Card key={challenge.title} className="cosmic-glow aurora-border group hover:scale-105 transition-all duration-300">
                <CardContent className="p-6">
                  <div className={`bg-gradient-to-r ${challenge.color} text-white p-4 rounded-lg mb-4`}>
                    <div className="text-2xl mb-2">{challenge.icon}</div>
                    <h4 className="font-orbitron font-bold text-lg">{challenge.title}</h4>
                    <p className="font-space text-sm opacity-90">{challenge.subtitle}</p>
                  </div>
                  
                  <p className="text-muted-foreground mb-4 font-space text-sm">
                    {challenge.description}
                  </p>
                  
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-space text-xs bg-accent/20 px-2 py-1 rounded-full">
                      Difficulty: {challenge.difficulty}
                    </span>
                  </div>
                  
                  <Button 
                    onClick={() => toast({
                      title: `🎮 ${challenge.title}`,
                      description: "This epic challenge is coming soon to BURIVERSE!",
                    })}
                    className="w-full cosmic-glow font-orbitron hover-scale"
                    variant="outline"
                  >
                    Enter Game
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
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