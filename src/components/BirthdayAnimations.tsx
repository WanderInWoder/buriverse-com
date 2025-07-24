import { useEffect, useState } from "react";

const BirthdayAnimations = () => {
  const [balloons, setBalloons] = useState<Array<{
    id: number;
    color: string;
    x: number;
    delay: number;
    size: number;
  }>>([]);

  const [confetti, setConfetti] = useState<Array<{
    id: number;
    color: string;
    x: number;
    y: number;
    rotation: number;
    duration: number;
  }>>([]);

  const balloonColors = ["#FF6B9D", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD", "#98D8C8"];
  const confettiColors = ["#FF6B9D", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD", "#FFB347"];

  useEffect(() => {
    // Create floating balloons
    const createBalloons = () => {
      const newBalloons = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        color: balloonColors[Math.floor(Math.random() * balloonColors.length)],
        x: Math.random() * 100,
        delay: Math.random() * 5,
        size: 0.8 + Math.random() * 0.4,
      }));
      setBalloons(newBalloons);
    };

    // Create falling confetti
    const createConfetti = () => {
      const newConfetti = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        x: Math.random() * 100,
        y: -20,
        rotation: Math.random() * 360,
        duration: 3 + Math.random() * 4,
      }));
      setConfetti(newConfetti);
    };

    createBalloons();
    createConfetti();

    // Recreate confetti periodically
    const confettiInterval = setInterval(createConfetti, 8000);

    return () => clearInterval(confettiInterval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
      {/* Floating Balloons */}
      {balloons.map((balloon) => (
        <div
          key={`balloon-${balloon.id}`}
          className="absolute animate-bounce"
          style={{
            left: `${balloon.x}%`,
            bottom: "10%",
            animationDelay: `${balloon.delay}s`,
            animationDuration: "3s",
            transform: `scale(${balloon.size})`,
          }}
        >
          <div
            className="w-12 h-16 rounded-full shadow-lg relative"
            style={{ backgroundColor: balloon.color }}
          >
            {/* Balloon string */}
            <div 
              className="absolute top-full left-1/2 w-0.5 h-20 bg-gray-600 transform -translate-x-1/2"
              style={{ backgroundColor: "#8B7355" }}
            />
            {/* Balloon highlight */}
            <div 
              className="absolute top-2 left-2 w-3 h-4 bg-white/30 rounded-full"
            />
          </div>
        </div>
      ))}

      {/* Falling Confetti */}
      {confetti.map((piece) => (
        <div
          key={`confetti-${piece.id}`}
          className="absolute w-2 h-2 opacity-80"
          style={{
            left: `${piece.x}%`,
            backgroundColor: piece.color,
            animation: `confetti-fall ${piece.duration}s linear infinite`,
            animationDelay: `${Math.random() * 2}s`,
            transform: `rotate(${piece.rotation}deg)`,
          }}
        />
      ))}

      {/* Birthday cake floating */}
      <div className="absolute top-20 right-10 animate-pulse">
        <div className="text-6xl transform rotate-12 hover:rotate-0 transition-transform duration-500">
          🎂
        </div>
      </div>

      {/* Party hat floating */}
      <div className="absolute top-32 left-10 animate-bounce">
        <div className="text-5xl transform -rotate-12 hover:rotate-0 transition-transform duration-500">
          🎉
        </div>
      </div>

      {/* Gift box floating */}
      <div className="absolute bottom-20 right-20 animate-pulse">
        <div className="text-4xl transform rotate-45 hover:rotate-0 transition-transform duration-700">
          🎁
        </div>
      </div>

      {/* Birthday candles scattered */}
      <div className="absolute top-1/3 left-1/4 animate-bounce" style={{ animationDelay: "1s" }}>
        <div className="text-3xl">🕯️</div>
      </div>
      
      <div className="absolute top-2/3 right-1/3 animate-bounce" style={{ animationDelay: "2s" }}>
        <div className="text-3xl">🕯️</div>
      </div>

      {/* Party poppers */}
      <div className="absolute top-1/4 right-1/4 animate-spin" style={{ animationDuration: "8s" }}>
        <div className="text-4xl">🎊</div>
      </div>

      <style>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        
        @keyframes float-gentle {
          0%, 100% {
            transform: translateY(0px) rotate(-2deg);
          }
          50% {
            transform: translateY(-10px) rotate(2deg);
          }
        }
      `}</style>
    </div>
  );
};

export default BirthdayAnimations;