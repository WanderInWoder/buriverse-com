import { useEffect, useState } from "react";

const FloatingElements = () => {
  const [elements, setElements] = useState<Array<{
    id: number;
    emoji: string;
    x: number;
    y: number;
    size: number;
    duration: number;
  }>>([]);

  const floatingEmojis = ["🐍", "🐼", "❄️", "🎂", "💻", "♟️", "🚀", "🌌", "⭐", "💫", "🎮", "🎵"];

  useEffect(() => {
    const createFloatingElement = () => {
      const newElement = {
        id: Date.now() + Math.random(),
        emoji: floatingEmojis[Math.floor(Math.random() * floatingEmojis.length)],
        x: Math.random() * 100,
        y: 100 + Math.random() * 20,
        size: Math.random() * 1.5 + 0.5,
        duration: 15 + Math.random() * 10,
      };
      
      setElements(prev => [...prev, newElement]);
      
      // Remove element after animation
      setTimeout(() => {
        setElements(prev => prev.filter(el => el.id !== newElement.id));
      }, newElement.duration * 1000);
    };

    // Create initial elements
    for (let i = 0; i < 5; i++) {
      setTimeout(() => createFloatingElement(), i * 2000);
    }

    // Continue creating elements
    const interval = setInterval(createFloatingElement, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {elements.map(element => (
        <div
          key={element.id}
          className="absolute opacity-60"
          style={{
            left: `${element.x}%`,
            bottom: `${element.y}%`,
            fontSize: `${element.size}rem`,
            animation: `float-up ${element.duration}s linear forwards`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        >
          {element.emoji}
        </div>
      ))}
      
      <style>{`
        @keyframes float-up {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.6;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default FloatingElements;