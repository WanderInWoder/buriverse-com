import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const ParadoxBox = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [choices, setChoices] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const { toast } = useToast();

  const paradoxSteps = [
    {
      question: "A man claims 'This statement is false.' If he's telling the truth...",
      options: [
        "Then the statement is true",
        "Then the statement is false", 
        "It creates a logical paradox",
        "Truth becomes undefined"
      ],
      correctIndex: 2,
      explanation: "A classic self-referential paradox - if true, it must be false, and if false, it must be true."
    },
    {
      question: "Based on the paradox nature, what happens to logical rules?",
      options: [
        "Rules become stricter",
        "Rules bend and adapt",
        "Rules break down completely", 
        "New meta-rules emerge"
      ],
      correctIndex: 3,
      explanation: "In paradoxes, we need meta-logical frameworks to handle the contradictions."
    },
    {
      question: "In BURIVERSE, paradoxes represent...",
      options: [
        "Coding bugs to be fixed",
        "The beauty of infinite possibility",
        "Logical errors in thinking",
        "Unsolvable mysteries"
      ],
      correctIndex: 1,
      explanation: "In our universe, contradictions create space for wonder and infinite love."
    }
  ];

  const handleChoice = (choiceIndex: number) => {
    const newChoices = [...choices, choiceIndex.toString()];
    setChoices(newChoices);

    const currentParadox = paradoxSteps[currentStep];
    
    if (choiceIndex === currentParadox.correctIndex) {
      if (currentStep === paradoxSteps.length - 1) {
        setIsComplete(true);
        toast({
          title: "🌀 Paradox Mastered!",
          description: "You've navigated the recursive labyrinth of logic!",
        });
      } else {
        setCurrentStep(prev => prev + 1);
        toast({
          title: "✨ Logic Layer Unlocked",
          description: currentParadox.explanation,
        });
      }
    } else {
      toast({
        title: "🌀 Paradox Feedback Loop",
        description: "The logic shifts... try thinking recursively...",
      });
    }
  };

  const resetParadox = () => {
    setCurrentStep(0);
    setChoices([]);
    setIsComplete(false);
  };

  if (isComplete) {
    return (
      <Card className="cosmic-glow aurora-border">
        <CardContent className="p-8 text-center">
          <div className="text-6xl mb-4 animate-pulse">🌀</div>
          <h3 className="text-2xl font-orbitron font-bold mb-4 text-accent">
            Paradox Navigator Achieved!
          </h3>
          <p className="font-space text-muted-foreground mb-4">
            You've mastered recursive thinking and emerged from the logical maze.
          </p>
          <div className="bg-accent/10 p-4 rounded-lg mb-6">
            <p className="text-sm font-space italic">
              "In BURIVERSE, every paradox is a doorway to deeper understanding. 
              Love itself is the greatest paradox - finite beings experiencing infinite emotion."
            </p>
          </div>
          <Button onClick={resetParadox} className="cosmic-glow font-orbitron">
            Enter Another Paradox
          </Button>
        </CardContent>
      </Card>
    );
  }

  const currentParadox = paradoxSteps[currentStep];

  return (
    <Card className="cosmic-glow aurora-border">
      <CardContent className="p-8">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-orbitron font-bold mb-2 text-accent">
            ⌛ The Paradox Box
          </h3>
          <p className="font-space text-muted-foreground">
            Solve a recursive logic puzzle where each answer changes the rules
          </p>
          <div className="text-sm bg-accent/20 px-3 py-1 rounded-full inline-block mt-2">
            Paradox {currentStep + 1} of {paradoxSteps.length} • Difficulty: Mastermind
          </div>
        </div>

        <div className="space-y-6">
          {/* Paradox Visualization */}
          <div className="relative mx-auto w-32 h-32 border-4 border-accent/30 rounded-lg bg-gradient-to-br from-purple-900/20 to-blue-900/20">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-4xl animate-spin" style={{ animationDuration: '3s' }}>
                ⌛
              </div>
            </div>
            <div className="absolute -top-2 -right-2 text-xl animate-bounce">
              {currentStep + 1}
            </div>
          </div>

          {/* Current Question */}
          <div className="bg-black/50 p-6 rounded-lg border border-accent/20">
            <h4 className="text-lg font-orbitron font-bold mb-4 text-center text-accent">
              Recursive Logic Challenge:
            </h4>
            <p className="font-space text-center text-lg">
              {currentParadox.question}
            </p>
          </div>

          {/* Choice Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentParadox.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleChoice(index)}
                variant="outline"
                className="h-auto p-4 text-left aurora-border hover:bg-accent/10 transition-all duration-300 hover-scale"
              >
                <span className="font-orbitron font-bold text-accent mr-2">
                  {String.fromCharCode(65 + index)}.
                </span>
                <span className="font-space">
                  {option}
                </span>
              </Button>
            ))}
          </div>

          {/* Previous Choices */}
          {choices.length > 0 && (
            <div className="bg-accent/10 p-4 rounded-lg">
              <h5 className="text-sm font-orbitron font-bold mb-2 text-accent">
                Your Logical Path:
              </h5>
              <div className="flex flex-wrap gap-2">
                {choices.map((choice, index) => (
                  <span key={index} className="bg-black/30 px-2 py-1 rounded text-xs font-mono">
                    Step {index + 1}: {String.fromCharCode(65 + parseInt(choice))}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ParadoxBox;