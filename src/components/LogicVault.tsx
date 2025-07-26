import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CipherLabyrinth from "./CipherLabyrinth";
import ParadoxBox from "./ParadoxBox";
import FrozenFunctions from "./FrozenFunctions";
import PrimeProtocol from "./PrimeProtocol";
import LogicMasquerade from "./LogicMasquerade";

const LogicVault = () => {
  const [openDoor, setOpenDoor] = useState<number | null>(null);

  const doors = [
    {
      id: 1,
      title: "🔐 Cipher Labyrinth",
      subtitle: "Logic Deduction Puzzle",
      description: "Crack the rotating cipher wheel to uncover the final keyword. Every move counts, and every pattern hides a logic key.",
      difficulty: "Genius",
      component: CipherLabyrinth
    },
    {
      id: 2,
      title: "⌛ The Paradox Box",
      subtitle: "Recursive Logic Puzzle",
      description: "Solve a recursive logic puzzle where each answer changes the rules. Only the correct reasoning order unlocks the solution.",
      difficulty: "Mastermind",
      component: ParadoxBox
    },
    {
      id: 3,
      title: "🧊 Frozen Functions",
      subtitle: "Code Debugging Challenge",
      description: "Can you melt the logic beneath frozen Python functions? Wrong logic = refreeze.",
      difficulty: "Pro Coder",
      component: FrozenFunctions
    },
    {
      id: 4,
      title: "🧮 Prime Protocol",
      subtitle: "Mathematical Logic Puzzle",
      description: "Communicate with a machine using only prime number logic. Solve patterns and identify hidden sequences.",
      difficulty: "Mathemagician",
      component: PrimeProtocol
    },
    {
      id: 5,
      title: "🎭 Logic Masquerade",
      subtitle: "Truth vs Lie Challenge",
      description: "Everyone's wearing masks. Can you find the honest one using pure logic deduction?",
      difficulty: "Detective Mode",
      component: LogicMasquerade
    }
  ];

  const handleDoorOpen = (doorId: number) => {
    setOpenDoor(doorId);
  };

  const handleCloseDoor = () => {
    setOpenDoor(null);
  };

  if (openDoor) {
    const selectedDoor = doors.find(door => door.id === openDoor);
    const Component = selectedDoor?.component;
    
    return (
      <section id="logic-vault" className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/10 via-purple-900/10 to-cyan-900/10" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <Button 
              onClick={handleCloseDoor}
              variant="outline"
              className="aurora-border font-orbitron mb-4"
            >
              ← Return to Logic Vault
            </Button>
          </div>
          
          {Component && <Component />}
        </div>
      </section>
    );
  }

  return (
    <section id="logic-vault" className="py-20 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/10 via-purple-900/10 to-cyan-900/10" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6 neon-text">
            🧠 BURIVERSE Logic Vault
          </h2>
          <p className="text-xl font-space text-muted-foreground mb-8">
            A mysterious chamber opens five doors – each one a mind-bending logic game
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full"></div>
        </div>

        {/* Vault Doors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doors.map((door) => (
            <Card 
              key={door.id} 
              className="cosmic-glow aurora-border group hover:scale-105 transition-all duration-500 cursor-pointer"
              onClick={() => handleDoorOpen(door.id)}
            >
              <CardContent className="p-6 h-full flex flex-col">
                {/* Door Header */}
                <div className="text-center mb-4">
                  <div className="text-3xl mb-3 group-hover:animate-pulse">
                    {door.title.split(' ')[0]}
                  </div>
                  <h3 className="text-xl font-orbitron font-bold text-accent mb-2">
                    {door.title}
                  </h3>
                  <p className="text-sm font-space text-muted-foreground opacity-80">
                    {door.subtitle}
                  </p>
                </div>

                {/* Door Description */}
                <div className="flex-1 mb-4">
                  <p className="font-space text-sm leading-relaxed">
                    {door.description}
                  </p>
                </div>

                {/* Difficulty Badge */}
                <div className="mb-4">
                  <span className="inline-block bg-accent/20 text-accent px-3 py-1 rounded-full text-xs font-orbitron font-bold">
                    Difficulty: {door.difficulty}
                  </span>
                </div>

                {/* Enter Button */}
                <Button 
                  className="w-full cosmic-glow font-orbitron hover-scale group-hover:shadow-glow transition-all duration-300"
                  variant="outline"
                >
                  <span className="group-hover:animate-pulse">Enter Game</span>
                </Button>

                {/* Door Animation Effect */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-purple-600/0 to-cyan-600/0 group-hover:from-purple-600/10 group-hover:to-cyan-600/10 transition-all duration-500 pointer-events-none" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Vault Footer */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-purple-900/20 to-cyan-900/20 p-6 rounded-lg border border-accent/20">
            <p className="font-space text-muted-foreground italic">
              "Each door in the Logic Vault tests a different facet of intelligence. 
              Choose wisely, for each challenge will reshape how you think about logic itself."
            </p>
            <div className="mt-4 text-accent font-orbitron font-bold">
              — The Vault Keeper
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogicVault;