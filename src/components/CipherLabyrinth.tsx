import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const CipherLabyrinth = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [rotation, setRotation] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const { toast } = useToast();

  const levels = [
    {
      encrypted: "ORYY YBIR",
      shift: 13,
      hint: "Caesar's favorite number...",
      answer: "HELL LOVE"
    },
    {
      encrypted: "WKLV LV KDUG",
      shift: 3,
      hint: "Think Roman...",
      answer: "THIS IS HARD"
    },
    {
      encrypted: "BURIVERSE",
      shift: 0,
      hint: "Sometimes the answer is right in front of you...",
      answer: "BURIVERSE"
    }
  ];

  const caesarDecode = (text: string, shift: number) => {
    return text.split('').map(char => {
      if (char.match(/[A-Z]/)) {
        return String.fromCharCode(((char.charCodeAt(0) - 65 - shift + 26) % 26) + 65);
      }
      return char;
    }).join('');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = () => {
    const currentAnswer = levels[currentLevel]?.answer;
    if (userInput.toUpperCase().trim() === currentAnswer) {
      if (currentLevel === levels.length - 1) {
        setIsUnlocked(true);
        toast({
          title: "🎉 Cipher Labyrinth Conquered!",
          description: "You've mastered the ancient art of codebreaking!",
        });
      } else {
        setCurrentLevel(prev => prev + 1);
        setUserInput("");
        toast({
          title: "🔓 Level Unlocked!",
          description: `Moving to cipher level ${currentLevel + 2}...`,
        });
      }
    } else {
      toast({
        title: "🚫 Incorrect",
        description: "The cipher wheel whispers: try again...",
      });
    }
  };

  const resetGame = () => {
    setCurrentLevel(0);
    setUserInput("");
    setIsUnlocked(false);
  };

  if (isUnlocked) {
    return (
      <Card className="cosmic-glow aurora-border">
        <CardContent className="p-8 text-center">
          <div className="text-6xl mb-4">🏆</div>
          <h3 className="text-2xl font-orbitron font-bold mb-4 text-accent">
            Cipher Master Achieved!
          </h3>
          <p className="font-space text-muted-foreground mb-6">
            You've decoded the ancient cipher labyrinth. The secrets of BURIVERSE flow through you.
          </p>
          <Button onClick={resetGame} className="cosmic-glow font-orbitron">
            Restart the Labyrinth
          </Button>
        </CardContent>
      </Card>
    );
  }

  const currentCipher = levels[currentLevel];
  const decodedText = caesarDecode(currentCipher?.encrypted || "", rotation % 26);

  return (
    <Card className="cosmic-glow aurora-border">
      <CardContent className="p-8">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-orbitron font-bold mb-2 text-accent">
            🔐 Cipher Labyrinth
          </h3>
          <p className="font-space text-muted-foreground">
            Crack the rotating cipher wheel to uncover the final keyword
          </p>
          <div className="text-sm bg-accent/20 px-3 py-1 rounded-full inline-block mt-2">
            Level {currentLevel + 1} of {levels.length} • Difficulty: Genius
          </div>
        </div>

        <div className="space-y-6">
          {/* Rotating Cipher Wheel */}
          <div className="relative mx-auto w-48 h-48 border-4 border-accent/30 rounded-full bg-gradient-to-br from-purple-900/20 to-blue-900/20">
            <div 
              className="absolute inset-2 border-2 border-accent/50 rounded-full bg-black/30 flex items-center justify-center transition-transform duration-100"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              <div className="text-center">
                <div className="text-xl font-mono text-accent font-bold">
                  {currentCipher?.shift || 0}
                </div>
                <div className="text-xs text-muted-foreground">SHIFT</div>
              </div>
            </div>
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-2 h-6 bg-accent rounded-full"></div>
          </div>

          {/* Encrypted Text */}
          <div className="bg-black/50 p-4 rounded-lg border border-accent/20">
            <div className="text-center">
              <div className="text-lg font-mono text-green-400 mb-2">
                ENCRYPTED: {currentCipher?.encrypted}
              </div>
              <div className="text-sm text-muted-foreground">
                {currentCipher?.hint}
              </div>
            </div>
          </div>

          {/* Live Decode Preview */}
          <div className="bg-accent/10 p-4 rounded-lg border border-accent/20">
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">CURRENT ROTATION DECODE:</div>
              <div className="text-lg font-mono text-accent">
                {decodedText}
              </div>
            </div>
          </div>

          {/* Input Section */}
          <div className="space-y-4">
            <Input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Enter your decoded answer..."
              className="bg-background/50 border-accent/20 text-center font-mono text-lg"
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            />
            <Button 
              onClick={handleSubmit} 
              className="w-full cosmic-glow font-orbitron hover-scale"
              disabled={!userInput.trim()}
            >
              Decode the Cipher
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CipherLabyrinth;