import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const InteractiveGames = () => {
  const [currentGame, setCurrentGame] = useState<string | null>(null);
  const { toast } = useToast();

  // Memory Match Game
  const [cards, setCards] = useState<Array<{id: number, emoji: string, flipped: boolean, matched: boolean}>>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  // Number Guessing Game
  const [targetNumber, setTargetNumber] = useState(0);
  const [guess, setGuess] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [hint, setHint] = useState("");

  // Snake Game State
  const [snake, setSnake] = useState([{x: 10, y: 10}]);
  const [food, setFood] = useState({x: 15, y: 15});
  const [direction, setDirection] = useState({x: 0, y: 1});
  const [gameRunning, setGameRunning] = useState(false);
  const [score, setScore] = useState(0);

  // Quiz Game
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const memoryEmojis = ["🐼", "🐍", "❄️", "🎂", "💻", "♟️", "🚀", "🌌"];
  
  const quizQuestions = [
    {
      question: "What's Buri's favorite programming language?",
      options: ["JavaScript", "Python", "Java", "C++"],
      correct: "Python"
    },
    {
      question: "What does 'Mum Panda' refer to?",
      options: ["A nickname", "A cartoon character", "Aradhya's nickname", "A coding term"],
      correct: "Aradhya's nickname"
    },
    {
      question: "What's the famous misheard phrase?",
      options: ["take le", "vomit out", "Both", "Neither"],
      correct: "Both"
    }
  ];

  const initMemoryGame = () => {
    const shuffledEmojis = [...memoryEmojis, ...memoryEmojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        flipped: false,
        matched: false
      }));
    setCards(shuffledEmojis);
    setMoves(0);
    setFlippedCards([]);
  };

  const initNumberGame = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
    setAttempts(0);
    setHint("I'm thinking of a number between 1 and 100!");
    setGuess("");
  };

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length === 2) return;
    
    const newCards = cards.map(card => 
      card.id === cardId ? {...card, flipped: true} : card
    );
    setCards(newCards);
    
    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);
    
    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      const [first, second] = newFlippedCards;
      const firstCard = newCards.find(c => c.id === first);
      const secondCard = newCards.find(c => c.id === second);
      
      if (firstCard?.emoji === secondCard?.emoji) {
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            card.id === first || card.id === second 
              ? {...card, matched: true}
              : card
          ));
          setFlippedCards([]);
        }, 1000);
      } else {
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            card.id === first || card.id === second 
              ? {...card, flipped: false}
              : card
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const handleGuess = () => {
    const guessNum = parseInt(guess);
    setAttempts(attempts + 1);
    
    if (guessNum === targetNumber) {
      setHint(`🎉 Correct! You got it in ${attempts + 1} attempts!`);
      toast({
        title: "🎯 Amazing!",
        description: `You guessed the number in ${attempts + 1} attempts!`,
      });
    } else if (guessNum < targetNumber) {
      setHint("📈 Too low! Try a higher number.");
    } else {
      setHint("📉 Too high! Try a lower number.");
    }
    setGuess("");
  };

  const games = [
    {
      id: "memory",
      title: "🧠 Memory Match",
      description: "Match pairs of BURIVERSE memories!",
      icon: "🎮"
    },
    {
      id: "guess",
      title: "🎯 Number Guessing",
      description: "Can you read Buri's mind?",
      icon: "🔢"
    },
    {
      id: "quiz",
      title: "🤔 BURIVERSE Quiz",
      description: "Test your knowledge about Buri!",
      icon: "❓"
    },
    {
      id: "trivia",
      title: "🧩 Cosmic Trivia",
      description: "Random fun facts and challenges!",
      icon: "🌟"
    }
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-orbitron font-bold mb-4 neon-text">
            🎮 Interactive Cosmic Games
          </h2>
          <p className="text-xl font-space text-muted-foreground">
            Endless entertainment in the BURIVERSE!
          </p>
        </div>

        {!currentGame ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {games.map((game) => (
              <Card 
                key={game.id} 
                className="cosmic-glow aurora-border cursor-pointer transform hover:scale-105 transition-all duration-300"
                onClick={() => {
                  setCurrentGame(game.id);
                  if (game.id === "memory") initMemoryGame();
                  if (game.id === "guess") initNumberGame();
                }}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-6xl mb-4">{game.icon}</div>
                  <h3 className="text-xl font-orbitron font-bold mb-2">
                    {game.title}
                  </h3>
                  <p className="font-space text-sm text-muted-foreground">
                    {game.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="cosmic-glow aurora-border">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="font-orbitron text-2xl">
                  {games.find(g => g.id === currentGame)?.title}
                </CardTitle>
                <Button 
                  onClick={() => setCurrentGame(null)}
                  variant="outline"
                  className="aurora-border"
                >
                  🔙 Back to Games
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {currentGame === "memory" && (
                <div>
                  <div className="text-center mb-6">
                    <p className="text-lg font-space">Moves: {moves}</p>
                  </div>
                  <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
                    {cards.map((card) => (
                      <div
                        key={card.id}
                        className={`w-16 h-16 flex items-center justify-center text-2xl rounded-lg cursor-pointer transition-all duration-300 ${
                          card.flipped || card.matched 
                            ? 'bg-accent text-accent-foreground' 
                            : 'bg-muted cosmic-glow hover:scale-110'
                        }`}
                        onClick={() => handleCardClick(card.id)}
                      >
                        {card.flipped || card.matched ? card.emoji : "❓"}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentGame === "guess" && (
                <div className="text-center max-w-md mx-auto">
                  <p className="text-lg font-space mb-4">{hint}</p>
                  <p className="text-sm text-muted-foreground mb-4">Attempts: {attempts}</p>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      value={guess}
                      onChange={(e) => setGuess(e.target.value)}
                      placeholder="Enter your guess..."
                      className="cosmic-glow"
                      min="1"
                      max="100"
                    />
                    <Button onClick={handleGuess} className="cosmic-glow">
                      🎯 Guess
                    </Button>
                  </div>
                </div>
              )}

              {currentGame === "quiz" && (
                <div className="max-w-md mx-auto">
                  {currentQuestion < quizQuestions.length ? (
                    <div>
                      <h3 className="text-xl font-orbitron mb-4">
                        Question {currentQuestion + 1} of {quizQuestions.length}
                      </h3>
                      <p className="text-lg font-space mb-6">
                        {quizQuestions[currentQuestion].question}
                      </p>
                      <div className="space-y-2">
                        {quizQuestions[currentQuestion].options.map((option) => (
                          <Button
                            key={option}
                            variant="outline"
                            className="w-full aurora-border"
                            onClick={() => {
                              if (option === quizQuestions[currentQuestion].correct) {
                                setQuizScore(quizScore + 1);
                                toast({
                                  title: "✅ Correct!",
                                  description: "You know Buri well!",
                                });
                              } else {
                                toast({
                                  title: "❌ Oops!",
                                  description: `Correct answer: ${quizQuestions[currentQuestion].correct}`,
                                  variant: "destructive",
                                });
                              }
                              setTimeout(() => setCurrentQuestion(currentQuestion + 1), 1500);
                            }}
                          >
                            {option}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <h3 className="text-2xl font-orbitron mb-4">Quiz Complete! 🎉</h3>
                      <p className="text-lg font-space mb-4">
                        Score: {quizScore}/{quizQuestions.length}
                      </p>
                      <Button 
                        onClick={() => {
                          setCurrentQuestion(0);
                          setQuizScore(0);
                        }}
                        className="cosmic-glow"
                      >
                        🔄 Play Again
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {currentGame === "trivia" && (
                <div className="text-center max-w-md mx-auto">
                  <h3 className="text-xl font-orbitron mb-4">🌟 Cosmic Trivia</h3>
                  <p className="font-space mb-6">
                    Did you know? The BURIVERSE contains infinite possibilities, 
                    just like your coding potential! 🚀
                  </p>
                  <Button 
                    className="cosmic-glow"
                    onClick={() => {
                      const facts = [
                        "🐍 Python was named after Monty Python's Flying Circus!",
                        "❄️ No two snowflakes are exactly alike, just like your memories!",
                        "🧠 Your brain has more neural connections than stars in the galaxy!",
                        "🎂 Birthdays are just annual commits to the repository of life!",
                        "♟️ Chess has more possible games than atoms in the observable universe!"
                      ];
                      const randomFact = facts[Math.floor(Math.random() * facts.length)];
                      toast({
                        title: "🌟 Cosmic Fact!",
                        description: randomFact,
                      });
                    }}
                  >
                    🎲 Random Cosmic Fact
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
};

export default InteractiveGames;