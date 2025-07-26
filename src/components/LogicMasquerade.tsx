import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const LogicMasquerade = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<number | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [currentScenario, setCurrentScenario] = useState(0);
  const { toast } = useToast();

  const scenarios = [
    {
      title: "The BURIVERSE Council",
      setup: "Five beings claim to know the secret of infinite love. Four are mimics, one speaks truth.",
      characters: [
        {
          name: "Echo",
          avatar: "🌟",
          statement: "Panda always lies about coding",
          isHonest: false,
          mask: "The Mimic of Stars"
        },
        {
          name: "Mirror",
          avatar: "🔮",
          statement: "Love is finite and measurable",
          isHonest: false,
          mask: "The False Prophet"
        },
        {
          name: "Truth",
          avatar: "💎",
          statement: "I am the only honest one here",
          isHonest: true,
          mask: "The Keeper of Truth"
        },
        {
          name: "Shadow",
          avatar: "🌙",
          statement: "Python never creates beautiful code",
          isHonest: false,
          mask: "The Dark Mimic"
        },
        {
          name: "Whisper",
          avatar: "🌸",
          statement: "All statements here are lies",
          isHonest: false,
          mask: "The Paradox Weaver"
        }
      ],
      explanation: "Truth claims to be the only honest one. If this is true, then Truth is honest. If this is false, then no one can be fully honest, but that would make the statement true - a paradox. The only logical solution is that Truth IS the honest one.",
      logicHint: "Look for self-referential statements that create logical consistency."
    }
  ];

  const handleCharacterSelect = (index: number) => {
    setSelectedCharacter(index);
    const currentGame = scenarios[currentScenario];
    const character = currentGame.characters[index];
    
    if (character.isHonest) {
      setIsRevealed(true);
      toast({
        title: "🎭 Mask Removed!",
        description: `You found ${character.name}, the honest one!`,
      });
    } else {
      toast({
        title: "🎭 False Mask",
        description: `${character.name} is a mimic. Their mask hides deception.`,
      });
    }
  };

  const resetMasquerade = () => {
    setSelectedCharacter(null);
    setIsRevealed(false);
    setCurrentScenario(0);
  };

  const currentGame = scenarios[currentScenario];

  if (isRevealed) {
    const honestCharacter = currentGame.characters.find(c => c.isHonest);
    
    return (
      <Card className="cosmic-glow aurora-border">
        <CardContent className="p-8 text-center">
          <div className="text-6xl mb-4">{honestCharacter?.avatar}</div>
          <h3 className="text-2xl font-orbitron font-bold mb-4 text-accent">
            Truth Unveiled!
          </h3>
          <p className="font-space text-muted-foreground mb-4">
            You've seen through the masquerade and found {honestCharacter?.name}.
          </p>
          
          <div className="bg-accent/10 p-6 rounded-lg mb-6">
            <h4 className="font-orbitron font-bold text-accent mb-3">The Logic:</h4>
            <p className="font-space text-sm leading-relaxed">
              {currentGame.explanation}
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 p-4 rounded-lg mb-6">
            <p className="font-space italic text-sm">
              "In BURIVERSE, truth isn't just about facts - it's about the love and authenticity 
              we bring to every interaction. You've learned to see beyond the masks."
            </p>
          </div>

          <Button onClick={resetMasquerade} className="cosmic-glow font-orbitron">
            New Masquerade Challenge
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
            🎭 Logic Masquerade
          </h3>
          <p className="font-space text-muted-foreground">
            Everyone's wearing masks. Can you find the honest one?
          </p>
          <div className="text-sm bg-accent/20 px-3 py-1 rounded-full inline-block mt-2">
            Scenario {currentScenario + 1} • Difficulty: Detective Mode
          </div>
        </div>

        <div className="space-y-6">
          {/* Scenario Setup */}
          <div className="bg-black/50 p-6 rounded-lg border border-accent/20">
            <h4 className="text-lg font-orbitron font-bold text-accent mb-3">
              {currentGame.title}
            </h4>
            <p className="font-space">
              {currentGame.setup}
            </p>
          </div>

          {/* Logic Hint */}
          <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/30">
            <p className="text-sm font-space text-center">
              💡 {currentGame.logicHint}
            </p>
          </div>

          {/* Characters Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentGame.characters.map((character, index) => (
              <div
                key={index}
                onClick={() => handleCharacterSelect(index)}
                className={`cursor-pointer transition-all duration-300 p-4 rounded-lg border-2 hover:scale-105 ${
                  selectedCharacter === index
                    ? character.isHonest
                      ? 'border-green-500 bg-green-500/10'
                      : 'border-red-500 bg-red-500/10'
                    : 'border-accent/30 bg-accent/5 hover:border-accent/50'
                }`}
              >
                <div className="text-center">
                  <div className="text-4xl mb-3">{character.avatar}</div>
                  <h5 className="font-orbitron font-bold text-accent mb-2">
                    {character.name}
                  </h5>
                  <div className="text-xs text-muted-foreground mb-3">
                    {character.mask}
                  </div>
                  <div className="bg-black/30 p-3 rounded border border-accent/20">
                    <p className="font-space text-sm italic">
                      "{character.statement}"
                    </p>
                  </div>
                </div>
                
                {selectedCharacter === index && (
                  <div className="mt-3 text-center">
                    {character.isHonest ? (
                      <span className="text-green-400 text-sm font-bold">✓ TRUTH DETECTED</span>
                    ) : (
                      <span className="text-red-400 text-sm font-bold">✗ DECEPTION FOUND</span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Instructions */}
          <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
            <p className="text-sm font-space text-center">
              Click on a character to reveal their true nature. Use pure logic to determine who speaks truth.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LogicMasquerade;