import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const EnhancedGames = () => {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [skiScore, setSkiScore] = useState(0);
  const [pythonAnswer, setPythonAnswer] = useState("");
  const [codeInput, setCodeInput] = useState("");
  const [codeHint, setCodeHint] = useState("");
  const [logicInput1, setLogicInput1] = useState("");
  const [logicInput2, setLogicInput2] = useState("");
  const [logicOutput, setLogicOutput] = useState("");
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
    },
    {
      id: "mind-palace",
      title: "🏛️ Mind Palace Games",
      description: "5 brain-bending challenges to test your cognitive abilities",
      type: "mind-palace"
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
      case "mind-palace":
        toast({
          title: "🏛️ Mind Palace Activated",
          description: "5 cognitive challenges await your brilliant mind...",
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

  const checkCode = () => {
    const secret = "483";
    if (codeInput.length !== 3 || isNaN(Number(codeInput))) {
      setCodeHint("Enter a valid 3-digit number.");
    } else {
      let hint = "";
      for (let i = 0; i < 3; i++) {
        if (codeInput[i] === secret[i]) hint += "🔴";
        else if (secret.includes(codeInput[i])) hint += "🟡";
      }
      setCodeHint("Hint: " + hint);
      if (hint === "🔴🔴🔴") {
        toast({
          title: "🎉 Code Cracked!",
          description: "You've unlocked the secret! Well done!",
        });
      }
    }
  };

  const runLogicFusion = () => {
    const a = logicInput1;
    const b = logicInput2;
    if ((a !== "0" && a !== "1") || (b !== "0" && b !== "1")) {
      setLogicOutput("Please enter 0 or 1 only.");
      return;
    }
    const aNum = parseInt(a);
    const bNum = parseInt(b);
    const fusion = (aNum && !bNum) || (!aNum && bNum); // XOR-like behavior
    setLogicOutput("Output: " + fusion);
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

        {/* Mind Palace Games */}
        {activeGame === "mind-palace" && (
          <div className="space-y-6 animate-fade-in">
            {/* Code Breaker */}
            <Card className="cosmic-glow aurora-border">
              <CardContent className="p-6">
                <h3 className="text-xl font-orbitron font-bold mb-3 text-accent">🧠 Code Breaker</h3>
                <p className="text-muted-foreground mb-4 font-space">
                  Guess the secret 3-digit code. After each try, get feedback: 🔴 = correct digit & place, 🟡 = correct digit wrong place.
                </p>
                <div className="flex gap-4">
                  <input
                    type="text"
                    value={codeInput}
                    onChange={(e) => setCodeInput(e.target.value)}
                    placeholder="Enter 3-digit code"
                    maxLength={3}
                    className="flex-1 p-3 rounded-lg bg-background/50 border border-accent/20 text-white"
                  />
                  <Button onClick={checkCode} className="cosmic-glow">Submit</Button>
                </div>
                {codeHint && <p className="mt-2 text-accent">{codeHint}</p>}
              </CardContent>
            </Card>

            {/* Carousel Mirror */}
            <Card className="cosmic-glow aurora-border">
              <CardContent className="p-6">
                <h3 className="text-xl font-orbitron font-bold mb-3 text-accent">🔄 Carousel Mirror</h3>
                <p className="text-muted-foreground mb-4 font-space">
                  A pattern rotates and flips. What comes next?
                </p>
                <p className="mb-4"><strong>Sequence:</strong> A → E → A → ?</p>
                <Button 
                  onClick={() => toast({
                    title: "🎉 Answer Revealed!",
                    description: "E (It mirrors every step)"
                  })}
                  className="cosmic-glow"
                >
                  Reveal Answer
                </Button>
              </CardContent>
            </Card>

            {/* Logic Function Fusion */}
            <Card className="cosmic-glow aurora-border">
              <CardContent className="p-6">
                <h3 className="text-xl font-orbitron font-bold mb-3 text-accent">🧮 Logic Function Fusion</h3>
                <p className="text-muted-foreground mb-4 font-space">
                  Fusion of AND, OR, NOT. Enter logic values (1 or 0) and see the result.
                </p>
                <div className="flex gap-4 mb-4">
                  <input
                    type="text"
                    value={logicInput1}
                    onChange={(e) => setLogicInput1(e.target.value)}
                    placeholder="1 or 0"
                    maxLength={1}
                    className="w-20 p-3 rounded-lg bg-background/50 border border-accent/20 text-white"
                  />
                  <input
                    type="text"
                    value={logicInput2}
                    onChange={(e) => setLogicInput2(e.target.value)}
                    placeholder="1 or 0"
                    maxLength={1}
                    className="w-20 p-3 rounded-lg bg-background/50 border border-accent/20 text-white"
                  />
                  <Button onClick={runLogicFusion} className="cosmic-glow">Run</Button>
                </div>
                {logicOutput && <p className="text-accent">{logicOutput}</p>}
              </CardContent>
            </Card>

            {/* Paradox Portal */}
            <Card className="cosmic-glow aurora-border">
              <CardContent className="p-6">
                <h3 className="text-xl font-orbitron font-bold mb-3 text-accent">⏳ Paradox Portal</h3>
                <p className="text-muted-foreground mb-4 font-space">
                  You enter a portal and meet your past self who says, "Don't enter." Did you enter?
                </p>
                <Button 
                  onClick={() => toast({
                    title: "🌀 Paradox Solved!",
                    description: "You did. Otherwise, you wouldn't hear the warning."
                  })}
                  className="cosmic-glow"
                >
                  Reveal Answer
                </Button>
              </CardContent>
            </Card>

            {/* The Imitator */}
            <Card className="cosmic-glow aurora-border">
              <CardContent className="p-6">
                <h3 className="text-xl font-orbitron font-bold mb-3 text-accent">🎭 The Imitator</h3>
                <p className="text-muted-foreground mb-4 font-space">
                  Every move you make, the imitator repeats. Can you find a move it can't copy?
                </p>
                <Button 
                  onClick={() => toast({
                    title: "🎭 Mystery Solved!",
                    description: "Do nothing. Inaction can't be mirrored."
                  })}
                  className="cosmic-glow"
                >
                  Reveal Answer
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
};

export default EnhancedGames;