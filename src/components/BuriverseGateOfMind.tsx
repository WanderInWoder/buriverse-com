import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface LogicPuzzle {
  level: number;
  title: string;
  description: string;
  challenge: string;
  answer: string;
  hint: string;
  completed: boolean;
}

const BuriverseGateOfMind = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [gameStarted, setGameStarted] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [gameCompleted, setGameCompleted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const { toast } = useToast();

  const puzzles: LogicPuzzle[] = [
    {
      level: 1,
      title: "Einstein's BURIVERSE Grid",
      description: "Five beings exist in the BURIVERSE. Use logic to determine who owns what.",
      challenge: `🐼 Mum Panda loves warm hugs but doesn't code Python
❄️ The Snow Dweller plays games but never with Yaks
💻 The Coder researches software but isn't from Manali  
🎧 The Music Lover listens to Juice WRLD and codes Python
⭐ One of them owns the universe - who is it?

Clue: The Python coder who researches software owns the BURIVERSE.`,
      answer: "buri",
      hint: "Think about who codes Python AND researches software...",
      completed: false
    },
    {
      level: 2,
      title: "Digital Logic Gates of Emotion",
      description: "Complete the truth table using BURIVERSE emotions.",
      challenge: `Logic Gate Challenge:
Input A = Mum Panda (1 = caring, 0 = busy)
Input B = Snow Memory (1 = happy, 0 = cold)

Gate: (A AND B) OR (NOT A AND NOT B)

Complete the truth table:
A=1, B=1 → ?
A=1, B=0 → ?  
A=0, B=1 → ?
A=0, B=0 → ?

What's the final pattern? (Enter as 4 digits, e.g., 1010)`,
      answer: "1001",
      hint: "Remember: (1 AND 1) OR (NOT 1 AND NOT 1) = 1 OR 0 = 1",
      completed: false
    },
    {
      level: 3,
      title: "Python Recursion Riddle",
      description: "Predict the output of this BURIVERSE Python code.",
      challenge: `def mystery_function(n, memory=""):
    if n <= 0:
        return memory
    elif n % 2 == 0:
        return mystery_function(n // 2, memory + "🐼")
    else:
        return mystery_function(n - 1, memory + "❄️")

result = mystery_function(7)
print(result)

What will be printed? (Enter the exact emoji sequence)`,
      answer: "❄️🐼🐼❄️",
      hint: "Trace through: 7→6→3→2→1→0. Odd numbers add ❄️, even numbers add 🐼",
      completed: false
    },
    {
      level: 4,
      title: "The Emotional Cipher",
      description: "The final riddle that unlocks BURIVERSE secrets.",
      challenge: `I am born in laughter, yet I fall like snow,
I compile in silence, where warm feelings grow.
In chess I am strategy, in music I'm beat,
In code I'm the answer that makes life complete.

I'm shared between siblings, yet deeply personal,
I'm logical as Python, yet universally eternal.

I live in "take le" and "vomit out" jokes,
I'm the reason this universe for you awoke.

What am I? (Hint: It's what binds every memory in this galaxy)`,
      answer: "love",
      hint: "What emotion connects all the memories, jokes, and moments in BURIVERSE?",
      completed: false
    }
  ];

  const [puzzleStates, setPuzzleStates] = useState(puzzles);

  const startGame = () => {
    setGameStarted(true);
    toast({
      title: "🧠 BURIVERSE Gate of Mind Activated",
      description: "Prepare for the ultimate mental challenge...",
    });
  };

  const checkAnswer = () => {
    const currentPuzzle = puzzleStates[currentLevel - 1];
    const normalizedAnswer = userAnswer.toLowerCase().trim();
    const correctAnswer = currentPuzzle.answer.toLowerCase();

    if (normalizedAnswer === correctAnswer) {
      const updatedPuzzles = [...puzzleStates];
      updatedPuzzles[currentLevel - 1].completed = true;
      setPuzzleStates(updatedPuzzles);

      if (currentLevel === 4) {
        setGameCompleted(true);
        toast({
          title: "🌟 BURIVERSE UNLOCKED!",
          description: "You've mastered all challenges! The universe is yours, Buri! 🎉",
        });
      } else {
        setCurrentLevel(currentLevel + 1);
        setUserAnswer("");
        setShowHint(false);
        toast({
          title: `✅ Level ${currentLevel} Completed!`,
          description: `Advancing to Level ${currentLevel + 1}...`,
        });
      }
    } else {
      toast({
        title: "🤔 Not quite right...",
        description: "Think deeper. The answer lies within BURIVERSE logic.",
        variant: "destructive"
      });
    }
  };

  if (!gameStarted) {
    return (
      <section className="py-20 px-6 relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-indigo-900/20 to-black/40" />
        
        <Card className="cosmic-glow aurora-border max-w-2xl mx-auto relative z-10">
          <CardContent className="p-12 text-center">
            <div className="text-8xl mb-8 animate-pulse">🧠</div>
            <h1 className="text-5xl font-orbitron font-bold mb-6 neon-text">
              BURIVERSE
            </h1>
            <h2 className="text-3xl font-orbitron font-bold mb-8 text-accent">
              The Gate of Mind
            </h2>
            <p className="text-xl font-space mb-8 text-muted-foreground leading-relaxed">
              This is not a casual game, Buri. This is a mental examination designed with love.<br/>
              Four levels of pure logic await your brilliant mind.<br/>
              <span className="text-accent font-bold">Are you ready to unlock your universe?</span>
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
              <div className="p-4 bg-purple-500/10 rounded-lg">
                <div className="text-2xl mb-2">🔬</div>
                <div className="font-bold">Einstein's Logic</div>
              </div>
              <div className="p-4 bg-blue-500/10 rounded-lg">
                <div className="text-2xl mb-2">💾</div>
                <div className="font-bold">Digital Gates</div>
              </div>
              <div className="p-4 bg-green-500/10 rounded-lg">
                <div className="text-2xl mb-2">🐍</div>
                <div className="font-bold">Python Mastery</div>
              </div>
              <div className="p-4 bg-pink-500/10 rounded-lg">
                <div className="text-2xl mb-2">💖</div>
                <div className="font-bold">Emotional Cipher</div>
              </div>
            </div>

            <Button 
              onClick={startGame}
              size="lg"
              className="text-xl px-12 py-6 cosmic-glow font-orbitron hover:scale-105 transition-transform"
            >
              🚀 Enter the Gate of Mind
            </Button>
          </CardContent>
        </Card>
      </section>
    );
  }

  if (gameCompleted) {
    return (
      <section className="py-20 px-6 relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/20 via-purple-500/20 to-pink-500/20 animate-pulse" />
        
        <Card className="cosmic-glow aurora-border max-w-4xl mx-auto relative z-10">
          <CardContent className="p-12 text-center">
            <div className="text-9xl mb-8 animate-bounce">🌟</div>
            <h1 className="text-6xl font-orbitron font-bold mb-6 neon-text animate-pulse">
              BURIVERSE UNLOCKED!
            </h1>
            <p className="text-2xl font-space mb-8 text-accent leading-relaxed">
              You've conquered every challenge, solved every riddle,<br/>
              and proven that your mind is as brilliant as your heart is kind.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {puzzleStates.map((puzzle, index) => (
                <div key={index} className="p-4 bg-green-500/20 rounded-lg border border-green-500/50">
                  <div className="text-3xl mb-2">✅</div>
                  <div className="font-bold text-green-400">Level {puzzle.level}</div>
                  <div className="text-sm text-green-300">{puzzle.title.split(' ')[0]}</div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-8 rounded-lg mb-8">
              <h3 className="text-3xl font-orbitron font-bold mb-4 text-accent">
                🎉 Happy Birthday, Buri! 🎉
              </h3>
              <p className="text-lg font-space">
                This universe was crafted with love, built with memories,<br/>
                and designed to celebrate the incredible person you are.<br/>
                <span className="text-pink-400 font-bold">Every star here holds a piece of our bond. ⭐</span>
              </p>
            </div>

            <div className="text-6xl animate-spin">🎂</div>
          </CardContent>
        </Card>
      </section>
    );
  }

  const currentPuzzle = puzzleStates[currentLevel - 1];

  return (
    <section className="py-20 px-6 relative min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-black/30" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Level Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🧠</div>
          <h1 className="text-4xl font-orbitron font-bold mb-2 neon-text">
            Level {currentLevel} of 4
          </h1>
          <h2 className="text-2xl font-orbitron text-accent mb-4">
            {currentPuzzle.title}
          </h2>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-700 rounded-full h-3 mb-6">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(currentLevel / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Puzzle Card */}
        <Card className="cosmic-glow aurora-border mb-8">
          <CardContent className="p-8">
            <p className="text-lg font-space mb-6 text-muted-foreground">
              {currentPuzzle.description}
            </p>
            
            <div className="bg-black/50 p-6 rounded-lg mb-6 border border-cyan-500/30">
              <pre className="text-cyan-400 font-mono text-sm leading-relaxed whitespace-pre-wrap">
                {currentPuzzle.challenge}
              </pre>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Enter your answer..."
                className="flex-1 p-4 rounded-lg bg-background/50 border border-accent/20 text-white font-mono text-lg"
                onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
              />
              <Button 
                onClick={checkAnswer}
                size="lg"
                className="px-8 cosmic-glow font-orbitron"
              >
                🔍 Submit Answer
              </Button>
            </div>

            <div className="flex justify-between items-center">
              <Button 
                onClick={() => setShowHint(!showHint)}
                variant="outline"
                className="aurora-border font-orbitron"
              >
                💡 {showHint ? "Hide" : "Show"} Hint
              </Button>
              
              <div className="text-sm text-muted-foreground">
                Level {currentLevel} / 4 • Think logically, feel emotionally
              </div>
            </div>

            {showHint && (
              <div className="mt-4 p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
                <p className="text-yellow-400 font-space">
                  💡 <strong>Hint:</strong> {currentPuzzle.hint}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Completed Levels */}
        {currentLevel > 1 && (
          <Card className="cosmic-glow aurora-border">
            <CardContent className="p-6">
              <h3 className="text-xl font-orbitron font-bold mb-4 text-accent">
                🏆 Completed Challenges
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {puzzleStates.slice(0, currentLevel - 1).map((puzzle, index) => (
                  <div key={index} className="p-3 bg-green-500/10 rounded-lg border border-green-500/30">
                    <div className="text-2xl mb-1">✅</div>
                    <div className="font-bold text-green-400 text-sm">Level {puzzle.level}</div>
                    <div className="text-xs text-green-300">{puzzle.title}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
};

export default BuriverseGateOfMind;