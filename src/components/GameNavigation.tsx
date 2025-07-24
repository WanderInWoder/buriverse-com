import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import KnightsCode from "./KnightsCode";
import OperationInversion from "./OperationInversion";
import TuringTestChallenge from "./TuringTestChallenge";
import EnhancedGames from "./EnhancedGames";

type GameType = "menu" | "knights" | "operation" | "turing" | "original";

const GameNavigation = () => {
  const [activeGame, setActiveGame] = useState<GameType>("menu");

  const games = [
    {
      id: "knights" as GameType,
      title: "♞ Knight's Code",
      subtitle: "Chess Logic Maze",
      description: "Navigate through a strategic chess puzzle using pure logical reasoning",
      difficulty: "Expert",
      color: "from-blue-600 to-purple-600"
    },
    {
      id: "operation" as GameType,
      title: "🔢 Operation Inversion",
      subtitle: "Emoji Math Puzzle",
      description: "Reverse-engineer mathematical values through advanced logical deduction",
      difficulty: "Master",
      color: "from-green-600 to-teal-600"
    },
    {
      id: "turing" as GameType,
      title: "🧠 Turing Test",
      subtitle: "Emotional Intelligence Challenge",
      description: "Distinguish human authenticity from artificial patterns",
      difficulty: "Genius",
      color: "from-purple-600 to-pink-600"
    },
    {
      id: "original" as GameType,
      title: "🌌 Original Adventures",
      subtitle: "Classic BURIVERSE Games",
      description: "The foundational interactive experiences of your universe",
      difficulty: "Varied",
      color: "from-orange-600 to-red-600"
    }
  ];

  const renderGame = () => {
    switch (activeGame) {
      case "knights":
        return <KnightsCode />;
      case "operation":
        return <OperationInversion />;
      case "turing":
        return <TuringTestChallenge />;
      case "original":
        return <EnhancedGames />;
      default:
        return null;
    }
  };

  if (activeGame !== "menu") {
    return (
      <div className="relative">
        <div className="fixed top-4 left-4 z-50">
          <Button
            onClick={() => setActiveGame("menu")}
            variant="outline"
            className="cosmic-glow font-orbitron"
          >
            ← Game Menu
          </Button>
        </div>
        {renderGame()}
      </div>
    );
  }

  return (
    <section className="py-20 px-6 min-h-screen bg-gradient-to-br from-background via-accent/5 to-primary/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-orbitron font-bold mb-4 neon-text">
            🎮 BURIVERSE: Mind Palace Games
          </h2>
          <p className="text-xl font-space text-muted-foreground">
            Challenge your intellect with seriously intense logic games designed for brilliant minds
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {games.map((game) => (
            <Card 
              key={game.id}
              className="cosmic-glow aurora-border transform hover:scale-105 transition-all duration-300 cursor-pointer"
              onClick={() => setActiveGame(game.id)}
            >
              <CardContent className="p-8">
                <div className={`bg-gradient-to-r ${game.color} text-white p-4 rounded-lg mb-6`}>
                  <h3 className="text-2xl font-orbitron font-bold">{game.title}</h3>
                  <p className="font-space text-lg opacity-90">{game.subtitle}</p>
                </div>
                
                <div className="space-y-4">
                  <p className="font-space text-base text-muted-foreground">
                    {game.description}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <span className="font-space text-sm bg-accent/20 px-3 py-1 rounded-full">
                      Difficulty: {game.difficulty}
                    </span>
                    <Button 
                      className="cosmic-glow font-orbitron"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveGame(game.id);
                      }}
                    >
                      Enter Game
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="p-6 bg-accent/5 rounded-lg border border-accent/20 max-w-3xl mx-auto">
            <h3 className="font-orbitron font-bold text-xl mb-3 text-accent">
              🧠 Intelligence Warning
            </h3>
            <p className="font-space text-base text-muted-foreground">
              These games are designed to seriously challenge your mind. They require deep logical thinking, 
              pattern recognition, and strategic reasoning. Perfect for someone who appreciates the beauty 
              of complex problems and elegant solutions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GameNavigation;