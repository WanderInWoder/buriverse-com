import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface EmojiVariable {
  emoji: string;
  value: number;
  name: string;
}

interface Equation {
  expression: string;
  result: number;
  level: number;
}

const OperationInversion = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: string }>({});
  const [gameCompleted, setGameCompleted] = useState(false);
  const [equations, setEquations] = useState<Equation[]>([]);
  const [variables] = useState<EmojiVariable[]>([
    { emoji: "🐼", value: 8, name: "Panda" },
    { emoji: "❄️", value: 3, name: "Snow" },
    { emoji: "💻", value: 5, name: "Code" },
    { emoji: "🎮", value: 7, name: "Game" },
    { emoji: "🧠", value: 9, name: "Mind" }
  ]);
  const { toast } = useToast();

  useEffect(() => {
    generateEquations();
  }, [currentLevel]);

  const generateEquations = () => {
    const newEquations: Equation[] = [];
    
    if (currentLevel === 1) {
      // Level 1: Simple operations
      newEquations.push(
        { expression: "🐼 + ❄️", result: 11, level: 1 },
        { expression: "💻 × 🎮", result: 35, level: 1 },
        { expression: "🧠 - ❄️", result: 6, level: 1 }
      );
    } else if (currentLevel === 2) {
      // Level 2: Complex operations
      newEquations.push(
        { expression: "(🐼 + ❄️) × 💻", result: 55, level: 2 },
        { expression: "🧠² - 🎮", result: 74, level: 2 },
        { expression: "(💻 + 🎮) ÷ ❄️", result: 4, level: 2 }
      );
    } else if (currentLevel === 3) {
      // Level 3: Advanced patterns
      newEquations.push(
        { expression: "🐼 × ❄️ + 💻 × 🎮", result: 59, level: 3 },
        { expression: "(🧠 + 🐼) ÷ (❄️ + 💻)", result: 2.125, level: 3 },
        { expression: "🎮² - (🐼 + ❄️ + 💻)", result: 33, level: 3 }
      );
    }
    
    setEquations(newEquations);
  };

  const checkAnswers = () => {
    const correctAnswers: { [key: string]: number } = {};
    variables.forEach(variable => {
      correctAnswers[variable.emoji] = variable.value;
    });

    let allCorrect = true;
    for (const variable of variables) {
      const userValue = parseInt(userAnswers[variable.emoji] || "0");
      if (userValue !== variable.value) {
        allCorrect = false;
        break;
      }
    }

    if (allCorrect) {
      if (currentLevel < 3) {
        setCurrentLevel(currentLevel + 1);
        toast({
          title: `🎉 Level ${currentLevel} Complete!`,
          description: "Your reverse-engineering skills are impressive! Moving to next level...",
        });
        setUserAnswers({});
      } else {
        setGameCompleted(true);
        toast({
          title: "🏆 Operation Inversion Mastered!",
          description: "You've cracked the ultimate emoji mathematics puzzle!",
        });
      }
    } else {
      toast({
        title: "❌ Not Quite Right",
        description: "Check your logic and try again. The patterns are all connected!",
        variant: "destructive"
      });
    }
  };

  const evaluateExpression = (expression: string, values: { [key: string]: number }): number => {
    let expr = expression;
    
    // Replace emojis with values
    Object.entries(values).forEach(([emoji, value]) => {
      expr = expr.replace(new RegExp(emoji, 'g'), value.toString());
    });

    // Handle special operations
    expr = expr.replace(/(\d+)²/g, '($1 * $1)');
    expr = expr.replace(/×/g, '*');
    expr = expr.replace(/÷/g, '/');

    try {
      return eval(expr);
    } catch {
      return 0;
    }
  };

  const resetGame = () => {
    setCurrentLevel(1);
    setUserAnswers({});
    setGameCompleted(false);
    generateEquations();
  };

  const getHint = () => {
    const hints = [
      "💡 Start with the simplest equations first",
      "💡 Use the results to work backwards - what values make sense?",
      "💡 Each emoji has a consistent value across all equations",
      "💡 Try substitution - if 🐼 + ❄️ = 11, what are the possibilities?",
      "💡 Look for patterns in the mathematical relationships"
    ];
    
    toast({
      title: "🧠 Logic Hint",
      description: hints[Math.floor(Math.random() * hints.length)],
    });
  };

  return (
    <section className="py-20 px-6 min-h-screen bg-gradient-to-br from-background via-accent/5 to-primary/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-orbitron font-bold mb-4 neon-text">
            🔢 Operation Inversion: Emoji Math Puzzle
          </h2>
          <p className="text-xl font-space text-muted-foreground">
            Reverse-engineer the values behind the BURIVERSE symbols
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Equations Panel */}
          <Card className="cosmic-glow aurora-border">
            <CardHeader>
              <CardTitle className="font-orbitron text-center">
                Level {currentLevel} - Mathematical Cipher
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-space font-bold text-accent">Given Results:</h3>
                {equations.map((equation, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg bg-accent/5">
                    <span className="font-space text-lg">{equation.expression}</span>
                    <span className="font-orbitron font-bold text-primary text-xl">
                      = {equation.result}
                    </span>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <p className="font-space text-sm text-muted-foreground mb-4">
                  Deduce what each emoji equals using pure logic and mathematical reasoning
                </p>
                <Button onClick={getHint} variant="outline" size="sm">
                  💡 Get Logic Hint
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Input Panel */}
          <Card className="cosmic-glow aurora-border">
            <CardHeader>
              <CardTitle className="font-orbitron">Your Deductions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-space font-bold text-accent">Enter Values:</h3>
                {variables.map((variable) => (
                  <div key={variable.emoji} className="flex items-center space-x-4">
                    <span className="text-3xl">{variable.emoji}</span>
                    <span className="font-space text-lg flex-1">{variable.name}</span>
                    <span className="font-space">=</span>
                    <Input
                      type="number"
                      placeholder="?"
                      value={userAnswers[variable.emoji] || ""}
                      onChange={(e) => setUserAnswers(prev => ({
                        ...prev,
                        [variable.emoji]: e.target.value
                      }))}
                      className="w-20 text-center"
                    />
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <Button 
                  onClick={checkAnswers}
                  className="w-full cosmic-glow font-orbitron"
                  size="lg"
                  disabled={Object.keys(userAnswers).length < variables.length}
                >
                  🧮 Verify Solution
                </Button>
                
                <Button 
                  onClick={resetGame}
                  variant="outline"
                  className="w-full"
                  size="sm"
                >
                  🔄 Reset Challenge
                </Button>
              </div>

              {gameCompleted && (
                <div className="text-center p-6 bg-green-600/20 rounded-lg border border-green-600">
                  <h3 className="font-orbitron font-bold text-green-400 text-xl mb-2">
                    🎉 CIPHER CRACKED!
                  </h3>
                  <p className="font-space text-sm">
                    You've mastered the art of mathematical reverse-engineering!
                  </p>
                  <div className="mt-4 grid grid-cols-5 gap-2">
                    {variables.map((variable) => (
                      <div key={variable.emoji} className="text-center">
                        <div className="text-2xl">{variable.emoji}</div>
                        <div className="font-orbitron font-bold text-green-400">
                          {variable.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="text-center">
                <p className="font-space text-xs text-muted-foreground">
                  Think logically • Use mathematical reasoning • Every symbol has purpose
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default OperationInversion;