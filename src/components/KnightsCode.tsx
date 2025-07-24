import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface Position {
  row: number;
  col: number;
}

interface Condition {
  type: 'snow' | 'panda' | 'code';
  active: boolean;
}

const KnightsCode = () => {
  const [knightPos, setKnightPos] = useState<Position>({ row: 0, col: 0 });
  const [targetPos] = useState<Position>({ row: 7, col: 7 });
  const [moves, setMoves] = useState<Position[]>([]);
  const [conditions, setConditions] = useState<Condition[]>([
    { type: 'snow', active: false },
    { type: 'panda', active: true },
    { type: 'code', active: false }
  ]);
  const [gameCompleted, setGameCompleted] = useState(false);
  const { toast } = useToast();

  const snowTiles = [
    { row: 2, col: 3 }, { row: 3, col: 5 }, { row: 5, col: 2 }, { row: 6, col: 6 }
  ];

  const obstacles = [
    { row: 1, col: 2 }, { row: 4, col: 4 }, { row: 6, col: 1 }
  ];

  const knightMoves = [
    [-2, -1], [-2, 1], [-1, -2], [-1, 2],
    [1, -2], [1, 2], [2, -1], [2, 1]
  ];

  const isValidMove = (newPos: Position): boolean => {
    if (newPos.row < 0 || newPos.row > 7 || newPos.col < 0 || newPos.col > 7) {
      return false;
    }

    // Check obstacles
    if (obstacles.some(obs => obs.row === newPos.row && obs.col === newPos.col)) {
      return false;
    }

    // Check snow tile condition
    const isSnowTile = snowTiles.some(snow => snow.row === newPos.row && snow.col === newPos.col);
    if (isSnowTile && !conditions.find(c => c.type === 'panda')?.active) {
      return false;
    }

    return true;
  };

  const getPossibleMoves = (): Position[] => {
    return knightMoves
      .map(([rowDelta, colDelta]) => ({
        row: knightPos.row + rowDelta,
        col: knightPos.col + colDelta
      }))
      .filter(isValidMove);
  };

  const moveKnight = (newPos: Position) => {
    if (isValidMove(newPos)) {
      setKnightPos(newPos);
      setMoves([...moves, newPos]);
      
      if (newPos.row === targetPos.row && newPos.col === targetPos.col) {
        setGameCompleted(true);
        toast({
          title: "🏆 Knight's Code Solved!",
          description: "You've mastered the chess logic maze with pure strategic thinking!",
        });
      }
    } else {
      toast({
        title: "❌ Invalid Move",
        description: "Check the logic conditions and obstacles!",
        variant: "destructive"
      });
    }
  };

  const toggleCondition = (type: string) => {
    setConditions(prev => prev.map(c => 
      c.type === type ? { ...c, active: !c.active } : c
    ));
  };

  const resetGame = () => {
    setKnightPos({ row: 0, col: 0 });
    setMoves([]);
    setGameCompleted(false);
    setConditions([
      { type: 'snow', active: false },
      { type: 'panda', active: true },
      { type: 'code', active: false }
    ]);
  };

  const getCellClass = (row: number, col: number): string => {
    let baseClass = "w-12 h-12 border border-gray-600 flex items-center justify-center text-2xl font-bold transition-all cursor-pointer hover:bg-accent/20";
    
    if ((row + col) % 2 === 0) {
      baseClass += " bg-gray-800";
    } else {
      baseClass += " bg-gray-700";
    }

    if (knightPos.row === row && knightPos.col === col) {
      baseClass += " bg-primary text-primary-foreground";
    }

    if (targetPos.row === row && targetPos.col === col) {
      baseClass += " bg-green-600 text-white";
    }

    if (obstacles.some(obs => obs.row === row && obs.col === col)) {
      baseClass += " bg-red-600";
    }

    if (snowTiles.some(snow => snow.row === row && snow.col === col)) {
      baseClass += " bg-blue-400";
    }

    return baseClass;
  };

  const getCellContent = (row: number, col: number): string => {
    if (knightPos.row === row && knightPos.col === col) return "♞";
    if (targetPos.row === row && targetPos.col === col) return "🏆";
    if (obstacles.some(obs => obs.row === row && obs.col === col)) return "🚫";
    if (snowTiles.some(snow => snow.row === row && snow.col === col)) return "❄️";
    return "";
  };

  const possibleMoves = getPossibleMoves();

  return (
    <section className="py-20 px-6 min-h-screen bg-gradient-to-br from-background via-accent/5 to-primary/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-orbitron font-bold mb-4 neon-text">
            ♞ Knight's Code: The Chess Logic Maze
          </h2>
          <p className="text-xl font-space text-muted-foreground">
            Navigate the knight using pure logic and strategic thinking
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Game Board */}
          <Card className="cosmic-glow aurora-border">
            <CardHeader>
              <CardTitle className="font-orbitron text-center">
                BURIVERSE Chess Arena
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <div className="grid grid-cols-8 gap-1 border-2 border-primary rounded-lg p-2 bg-black/50">
                {Array.from({ length: 8 }, (_, row) =>
                  Array.from({ length: 8 }, (_, col) => (
                    <div
                      key={`${row}-${col}`}
                      className={getCellClass(row, col)}
                      onClick={() => {
                        if (possibleMoves.some(move => move.row === row && move.col === col)) {
                          moveKnight({ row, col });
                        }
                      }}
                    >
                      {getCellContent(row, col)}
                    </div>
                  ))
                )}
              </div>
              
              <div className="text-center">
                <p className="font-space text-sm text-muted-foreground mb-2">
                  Moves made: {moves.length}
                </p>
                <Button onClick={resetGame} variant="outline" size="sm">
                  Reset Game
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Logic Conditions */}
          <Card className="cosmic-glow aurora-border">
            <CardHeader>
              <CardTitle className="font-orbitron">Logic Conditions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-space font-bold text-accent">Active Conditions:</h3>
                {conditions.map((condition) => (
                  <div key={condition.type} className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="font-space">
                      {condition.type === 'snow' && '❄️ Snow Mode'}
                      {condition.type === 'panda' && '🐼 Mum Panda'}
                      {condition.type === 'code' && '💻 Code Mode'}
                    </span>
                    <Button
                      onClick={() => toggleCondition(condition.type)}
                      variant={condition.active ? "default" : "outline"}
                      size="sm"
                    >
                      {condition.active ? 'ON' : 'OFF'}
                    </Button>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="font-space font-bold text-accent">Rules:</h3>
                <div className="space-y-2 text-sm font-space">
                  <p>• ♞ Knight must reach 🏆 target using L-shaped moves</p>
                  <p>• ❄️ Snow tiles: Only accessible when Mum Panda = ON</p>
                  <p>• 🚫 Red obstacles are permanently blocked</p>
                  <p>• Think strategically - each move counts!</p>
                </div>
              </div>

              {gameCompleted && (
                <div className="text-center p-4 bg-green-600/20 rounded-lg border border-green-600">
                  <p className="font-orbitron font-bold text-green-400">
                    🎉 MAZE CONQUERED!
                  </p>
                  <p className="font-space text-sm mt-2">
                    You solved it in {moves.length} moves with pure logic!
                  </p>
                </div>
              )}

              {possibleMoves.length > 0 && !gameCompleted && (
                <div className="text-center">
                  <p className="font-space text-sm text-muted-foreground">
                    {possibleMoves.length} possible moves available
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default KnightsCode;