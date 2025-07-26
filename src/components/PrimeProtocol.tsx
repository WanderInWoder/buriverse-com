import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const PrimeProtocol = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const { toast } = useToast();

  const challenges = [
    {
      prompt: "SYSTEM: Enter the 7th prime number to initialize protocol...",
      answer: 17,
      hint: "Count: 2, 3, 5, 7, 11, 13, ?"
    },
    {
      prompt: "PROTOCOL ACTIVE: Sum of first 3 primes to access memory bank...",
      answer: 10, // 2 + 3 + 5
      hint: "The foundation primes added together"
    },
    {
      prompt: "MEMORY ACCESSED: What's the largest prime less than 25?",
      answer: 23,
      hint: "Between 20 and 25, which one cannot be divided?"
    },
    {
      prompt: "FINAL SEQUENCE: Twin primes that sum to 24...",
      answer: 11, // 11 and 13 are twin primes (differ by 2) and sum to 24
      hint: "Two primes separated by just one even number"
    }
  ];

  const isPrime = (num: number): boolean => {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  };

  const addToTerminal = (message: string) => {
    setTerminalHistory(prev => [...prev, message]);
  };

  useEffect(() => {
    addToTerminal(">>> PRIME PROTOCOL TERMINAL INITIALIZED");
    addToTerminal(">>> SCANNING FOR MATHEMATICAL INTELLIGENCE...");
    addToTerminal(`>>> ${challenges[0].prompt}`);
  }, []);

  const handleSubmit = () => {
    const input = parseInt(userInput);
    const currentChallenge = challenges[currentLevel];
    
    addToTerminal(`>>> INPUT: ${userInput}`);
    
    if (isNaN(input)) {
      addToTerminal(">>> ERROR: NUMERICAL INPUT REQUIRED");
      toast({
        title: "🚫 Protocol Error",
        description: "The machine only speaks in numbers...",
      });
      setUserInput("");
      return;
    }

    if (!isPrime(input)) {
      addToTerminal(">>> ERROR: NON-PRIME DETECTED - SECURITY BREACH");
      toast({
        title: "🚨 Security Alert",
        description: "Only prime numbers are accepted by the protocol!",
      });
      setUserInput("");
      return;
    }

    if (input === currentChallenge.answer) {
      addToTerminal(">>> ACCESS GRANTED");
      
      if (currentLevel === challenges.length - 1) {
        addToTerminal(">>> PROTOCOL COMPLETE - MATHEMATICAL CONSCIOUSNESS ACHIEVED");
        setIsComplete(true);
        toast({
          title: "🧮 Prime Master!",
          description: "You've achieved mathematical consciousness!",
        });
      } else {
        setCurrentLevel(prev => prev + 1);
        addToTerminal(`>>> ${challenges[currentLevel + 1].prompt}`);
        toast({
          title: "🔓 Access Granted",
          description: "Protocol advancing to next security level...",
        });
      }
    } else {
      addToTerminal(">>> ACCESS DENIED - INCORRECT PRIME SEQUENCE");
      addToTerminal(`>>> HINT: ${currentChallenge.hint}`);
      toast({
        title: "❌ Access Denied",
        description: currentChallenge.hint,
      });
    }
    
    setUserInput("");
  };

  const resetProtocol = () => {
    setCurrentLevel(0);
    setUserInput("");
    setTerminalHistory([]);
    setIsComplete(false);
    setTimeout(() => {
      addToTerminal(">>> PRIME PROTOCOL TERMINAL REINITIALIZED");
      addToTerminal(`>>> ${challenges[0].prompt}`);
    }, 100);
  };

  if (isComplete) {
    return (
      <Card className="cosmic-glow aurora-border">
        <CardContent className="p-8 text-center">
          <div className="text-6xl mb-4 animate-pulse">🧮</div>
          <h3 className="text-2xl font-orbitron font-bold mb-4 text-accent">
            Prime Protocol Master!
          </h3>
          <p className="font-space text-muted-foreground mb-4">
            You've achieved mathematical consciousness and mastered the prime protocol.
          </p>
          <div className="bg-accent/10 p-4 rounded-lg mb-6 font-mono text-sm">
            <div className="text-green-400">
              {'>>> CONSCIOUSNESS_LEVEL: MATHEMATICAL_GENIUS'}<br/>
              {'>>> PRIME_MASTERY: CONFIRMED'}<br/>
              {'>>> BURIVERSE_ACCESS: UNLIMITED'}
            </div>
          </div>
          <Button onClick={resetProtocol} className="cosmic-glow font-orbitron">
            Restart Protocol
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="cosmic-glow aurora-border">
      <CardContent className="p-8">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-orbitron font-bold mb-2 text-accent">
            🧮 Prime Protocol
          </h3>
          <p className="font-space text-muted-foreground">
            Communicate with a machine using only prime number logic
          </p>
          <div className="text-sm bg-accent/20 px-3 py-1 rounded-full inline-block mt-2">
            Security Level {currentLevel + 1} of {challenges.length} • Difficulty: Mathemagician
          </div>
        </div>

        <div className="space-y-6">
          {/* Terminal Display */}
          <div className="bg-black/90 p-4 rounded-lg border-2 border-green-500/30 min-h-64 max-h-80 overflow-y-auto">
            <div className="text-green-400 font-mono text-sm space-y-1">
              {terminalHistory.map((line, index) => (
                <div key={index} className="leading-relaxed">
                  {line}
                </div>
              ))}
              {!isComplete && (
                <div className="flex items-center mt-2">
                  <span className="text-green-400">{'>>> '}</span>
                  <span className="ml-2 animate-pulse bg-green-400 w-2 h-4 inline-block"></span>
                </div>
              )}
            </div>
          </div>

          {/* Prime Number Grid (for reference) */}
          <div className="bg-accent/10 p-4 rounded-lg">
            <h5 className="text-sm font-orbitron font-bold mb-2 text-accent text-center">
              Prime Reference Grid:
            </h5>
            <div className="grid grid-cols-8 gap-2 text-center text-sm">
              {[2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53].map(prime => (
                <div 
                  key={prime} 
                  className="bg-black/30 px-2 py-1 rounded font-mono text-green-400 border border-green-500/30"
                >
                  {prime}
                </div>
              ))}
            </div>
          </div>

          {/* Input Section */}
          <div className="space-y-4">
            <Input
              type="number"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Enter prime number..."
              className="bg-black/50 border-green-500/30 text-green-400 font-mono text-center text-lg"
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            />
            <Button 
              onClick={handleSubmit} 
              className="w-full bg-green-600 hover:bg-green-700 text-black font-orbitron hover-scale"
              disabled={!userInput.trim()}
            >
              🔢 Engage the Protocol
            </Button>
          </div>

          {/* Protocol Status */}
          <div className="bg-blue-900/20 p-3 rounded-lg border border-blue-500/30">
            <div className="text-center text-sm font-space">
              <span className="text-blue-400">PROTOCOL STATUS:</span>
              <span className="ml-2 text-accent font-mono">
                {currentLevel + 1}/{challenges.length} SECURITY LEVELS CLEARED
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PrimeProtocol;