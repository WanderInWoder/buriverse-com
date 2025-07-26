import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const FrozenFunctions = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [selectedLines, setSelectedLines] = useState<number[]>([]);
  const [isThawed, setIsThawed] = useState(false);
  const { toast } = useToast();

  const frozenCode = [
    {
      title: "Frozen Love Calculator",
      code: [
        "def calculate_love(panda, python):",
        "    if panda == 'happy':",
        "        return python * 0  # BUG: This kills the love!",
        "    elif python == 'coding':",
        "        return panda + python  # BUG: Can't add strings!",
        "    else:",
        "        return infinite_love()  # BUG: Function doesn't exist!",
        "",
        "# Fix the bugs to thaw the function:",
        "result = calculate_love('happy', 'coding')"
      ],
      bugs: [2, 4, 6], // Line indices with bugs
      fixes: [
        "return python * infinite  # Love multiplies infinitely",
        "return len(panda) + len(python)  # Count the characters of love",
        "return float('inf')  # Return infinite love"
      ],
      correctFixes: [0, 1, 2]
    },
    {
      title: "Memory Snow Function",
      code: [
        "def create_snow_memory(day, emotion):",
        "    memories = []",
        "    for i in range(10):",
        "        snow_flake = day[i]  # BUG: Index out of range!",
        "        if emotion > 'happy':  # BUG: Can't compare string with string this way!",
        "            memories.append(snow_flake)",
        "    return memories[10]  # BUG: Index out of range again!",
        "",
        "# Debug this snowy memory creator:",
        "snow_day = create_snow_memory('birthday', 'joyful')"
      ],
      bugs: [3, 4, 6],
      fixes: [
        "snow_flake = day[i % len(day)]  # Wrap around the day string",
        "if len(emotion) > 5:  # Compare string lengths instead",
        "return memories[-1] if memories else None  # Return last or None"
      ],
      correctFixes: [0, 1, 2]
    }
  ];

  const handleLineClick = (lineIndex: number) => {
    const currentCode = frozenCode[currentLevel];
    
    if (currentCode.bugs.includes(lineIndex)) {
      if (selectedLines.includes(lineIndex)) {
        setSelectedLines(prev => prev.filter(i => i !== lineIndex));
      } else {
        setSelectedLines(prev => [...prev, lineIndex]);
      }
    } else {
      toast({
        title: "❄️ Not a Bug",
        description: "This line is frozen but not buggy. Look for the red error lines!",
      });
    }
  };

  const handleDefrost = () => {
    const currentCode = frozenCode[currentLevel];
    const foundAllBugs = currentCode.bugs.every(bugIndex => selectedLines.includes(bugIndex));
    
    if (foundAllBugs && selectedLines.length === currentCode.bugs.length) {
      if (currentLevel === frozenCode.length - 1) {
        setIsThawed(true);
        toast({
          title: "🔥 Code Fully Thawed!",
          description: "You've debugged all frozen functions in BURIVERSE!",
        });
      } else {
        setCurrentLevel(prev => prev + 1);
        setSelectedLines([]);
        toast({
          title: "🌡️ Function Thawed!",
          description: "Moving to next frozen function...",
        });
      }
    } else {
      toast({
        title: "❄️ Still Frozen",
        description: "Find all the bugs to melt this function. Look for logical errors!",
      });
    }
  };

  const resetGame = () => {
    setCurrentLevel(0);
    setSelectedLines([]);
    setIsThawed(false);
  };

  if (isThawed) {
    return (
      <Card className="cosmic-glow aurora-border">
        <CardContent className="p-8 text-center">
          <div className="text-6xl mb-4">🔥</div>
          <h3 className="text-2xl font-orbitron font-bold mb-4 text-accent">
            Code Debugger Master!
          </h3>
          <p className="font-space text-muted-foreground mb-6">
            You've melted all the frozen functions and restored the flow of BURIVERSE logic!
          </p>
          <Button onClick={resetGame} className="cosmic-glow font-orbitron">
            Debug More Frozen Code
          </Button>
        </CardContent>
      </Card>
    );
  }

  const currentCode = frozenCode[currentLevel];

  return (
    <Card className="cosmic-glow aurora-border">
      <CardContent className="p-8">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-orbitron font-bold mb-2 text-accent">
            🧊 Frozen Functions
          </h3>
          <p className="font-space text-muted-foreground">
            Can you melt the logic beneath frozen Python functions?
          </p>
          <div className="text-sm bg-accent/20 px-3 py-1 rounded-full inline-block mt-2">
            Function {currentLevel + 1} of {frozenCode.length} • Difficulty: Pro Coder
          </div>
        </div>

        <div className="space-y-6">
          {/* Function Title */}
          <div className="text-center">
            <h4 className="text-xl font-orbitron font-bold text-accent">
              {currentCode.title}
            </h4>
          </div>

          {/* Code Block */}
          <div className="bg-black/80 p-4 rounded-lg border border-accent/20 font-mono text-sm">
            {currentCode.code.map((line, index) => {
              const isBug = currentCode.bugs.includes(index);
              const isSelected = selectedLines.includes(index);
              
              return (
                <div
                  key={index}
                  onClick={() => handleLineClick(index)}
                  className={`px-2 py-1 rounded cursor-pointer transition-all duration-200 ${
                    isBug 
                      ? isSelected 
                        ? 'bg-red-500/30 border border-red-400 text-red-300' 
                        : 'bg-red-900/20 text-red-400 hover:bg-red-800/30'
                      : 'text-green-400'
                  } ${
                    isBug ? 'hover:scale-105' : ''
                  }`}
                >
                  <span className="text-gray-500 mr-4 select-none">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {line || '\u00A0'}
                  {isBug && !isSelected && (
                    <span className="ml-2 text-red-500 animate-pulse">❄️</span>
                  )}
                  {isSelected && (
                    <span className="ml-2 text-orange-400 animate-bounce">🔥</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bug Fixes Preview */}
          {selectedLines.length > 0 && (
            <div className="bg-accent/10 p-4 rounded-lg">
              <h5 className="text-sm font-orbitron font-bold mb-2 text-accent">
                Your Fixes:
              </h5>
              {selectedLines.sort().map((lineIndex, fixIndex) => {
                const bugPosition = currentCode.bugs.indexOf(lineIndex);
                return (
                  <div key={lineIndex} className="text-sm font-mono text-green-400 mb-1">
                    Line {lineIndex + 1}: {currentCode.fixes[bugPosition]}
                  </div>
                );
              })}
            </div>
          )}

          {/* Instructions */}
          <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/30">
            <p className="text-sm font-space text-center">
              Click on the ❄️ frozen lines that contain bugs. Find all {currentCode.bugs.length} bugs to defrost this function!
            </p>
          </div>

          {/* Defrost Button */}
          <Button 
            onClick={handleDefrost}
            className="w-full cosmic-glow font-orbitron hover-scale"
            disabled={selectedLines.length === 0}
          >
            🔥 Defrost the Code
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FrozenFunctions;