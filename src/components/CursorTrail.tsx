import { useEffect, useState } from "react";

interface Trail {
  x: number;
  y: number;
  id: number;
}

const CursorTrail = () => {
  const [trails, setTrails] = useState<Trail[]>([]);
  const [nextId, setNextId] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newTrail: Trail = {
        x: e.clientX,
        y: e.clientY,
        id: nextId,
      };

      setTrails(prev => [...prev.slice(-15), newTrail]); // Keep last 15 trails
      setNextId(prev => prev + 1);
    };

    const handleMouseLeave = () => {
      setTrails([]);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [nextId]);

  return (
    <>
      {trails.map((trail, index) => (
        <div
          key={trail.id}
          className="cursor-trail"
          style={{
            left: trail.x - 10,
            top: trail.y - 10,
            opacity: (index + 1) / trails.length,
            transform: `scale(${(index + 1) / trails.length})`,
            background: `radial-gradient(circle, 
              hsl(${200 + index * 10}, 100%, 70%) 0%, 
              transparent 70%
            )`,
          }}
        />
      ))}
    </>
  );
};

export default CursorTrail;