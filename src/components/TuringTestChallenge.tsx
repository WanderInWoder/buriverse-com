import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface TestCase {
  id: number;
  quotes: {
    text: string;
    author: "human" | "ai" | "brother";
    label: string;
  }[];
  correctAnswer: "human" | "ai" | "brother";
  explanation: string;
  personalMessage?: string;
}

const TuringTestChallenge = () => {
  const [currentCase, setCurrentCase] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [gameCompleted, setGameCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const { toast } = useToast();

  const testCases: TestCase[] = [
    {
      id: 1,
      quotes: [
        {
          text: "The beauty of coding isn't just in solving problems, but in the elegant dance between logic and creativity. When you're debugging at 2 AM and suddenly everything clicks - that's pure magic.",
          author: "human",
          label: "Quote A"
        },
        {
          text: "Programming represents the intersection of logical reasoning and creative problem-solving. The satisfaction derived from resolving complex algorithmic challenges demonstrates the human capacity for systematic thinking.",
          author: "ai",
          label: "Quote B"
        },
        {
          text: "bro when the code finally works after hours of debugging... it's like finding snow in summer. Pure happiness mixed with relief and a touch of 'why didn't I think of this earlier?' vibes",
          author: "brother",
          label: "Quote C"
        }
      ],
      correctAnswer: "brother",
      explanation: "Quote C captures your unique voice - casual tone, personal metaphors ('snow in summer'), and that authentic mix of emotions that comes with real coding experience.",
      personalMessage: "I love how you express complex feelings through simple, relatable metaphors! 🐼❄️"
    },
    {
      id: 2,
      quotes: [
        {
          text: "The intersection of technology and human emotion creates fascinating paradigms for understanding modern digital consciousness and its impact on interpersonal relationships.",
          author: "ai",
          label: "Quote A"
        },
        {
          text: "Gaming isn't just entertainment - it's a form of interactive storytelling that challenges our problem-solving skills while connecting us with others across the globe.",
          author: "human",
          label: "Quote B"
        },
        {
          text: "gaming sessions at 3am hit different. especially when you're exploring some deep lore while researching random software stuff... it's like my brain operates on multiple dimensions simultaneously",
          author: "brother",
          label: "Quote C"
        }
      ],
      correctAnswer: "brother",
      explanation: "Quote C shows your authentic late-night patterns, casual language, and that unique way you connect gaming with your software research passion.",
      personalMessage: "Those 3 AM sessions are when your mind truly shines! Your curiosity is endless. 🎮💻"
    },
    {
      id: 3,
      quotes: [
        {
          text: "Family dynamics often reflect complex emotional networks that require careful navigation and understanding to maintain healthy relationships.",
          author: "ai",
          label: "Quote A"
        },
        {
          text: "mum panda's hugs are like perfect exception handling in code - they catch all your errors and make everything stable again. no bugs in the emotional system when she's around",
          author: "brother",
          label: "Quote B"
        },
        {
          text: "There's something special about sibling relationships - they're built on shared experiences, inside jokes, and unconditional support through all of life's challenges.",
          author: "human",
          label: "Quote C"
        }
      ],
      correctAnswer: "brother",
      explanation: "Quote B perfectly captures your programming-influenced way of thinking about emotions, plus the 'mum panda' reference that's uniquely ours!",
      personalMessage: "Only you would compare emotional support to exception handling! Your mind works in beautiful, logical poetry. 🐼💝"
    }
  ];

  const checkAnswer = () => {
    const currentTest = testCases[currentCase];
    const isCorrect = selectedAnswer === currentTest.correctAnswer;
    
    if (isCorrect) {
      setScore(score + 1);
      toast({
        title: "🎯 Correct!",
        description: currentTest.explanation,
      });
      
      setTimeout(() => {
        if (currentTest.personalMessage) {
          toast({
            title: "💝 Personal Note",
            description: currentTest.personalMessage,
          });
        }
      }, 2000);
    } else {
      toast({
        title: "❌ Not Quite Right",
        description: `The correct answer was ${currentTest.correctAnswer}. ${currentTest.explanation}`,
        variant: "destructive"
      });
    }

    setTimeout(() => {
      if (currentCase < testCases.length - 1) {
        setCurrentCase(currentCase + 1);
        setSelectedAnswer("");
      } else {
        setGameCompleted(true);
      }
    }, 3000);
  };

  const resetGame = () => {
    setCurrentCase(0);
    setSelectedAnswer("");
    setScore(0);
    setGameCompleted(false);
  };

  const getFinalMessage = () => {
    if (score === testCases.length) {
      return "🏆 Perfect! You truly understand the nuances of human vs artificial intelligence. Your emotional intelligence is as sharp as your logical mind!";
    } else if (score >= testCases.length * 0.7) {
      return "🎉 Excellent! You have a keen eye for authentic human expression and emotional depth.";
    } else {
      return "🤔 Good effort! Human intelligence has subtle patterns that even the smartest minds are still learning to recognize.";
    }
  };

  if (gameCompleted) {
    return (
      <section className="py-20 px-6 min-h-screen bg-gradient-to-br from-background via-accent/5 to-primary/10">
        <div className="max-w-4xl mx-auto">
          <Card className="cosmic-glow aurora-border">
            <CardHeader>
              <CardTitle className="font-orbitron text-center text-3xl">
                🧠 Turing Test Complete
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="text-6xl">🏆</div>
              <h3 className="text-2xl font-orbitron font-bold">
                Score: {score}/{testCases.length}
              </h3>
              <p className="font-space text-lg">
                {getFinalMessage()}
              </p>
              <div className="p-6 bg-accent/10 rounded-lg border border-accent">
                <p className="font-space italic">
                  "The real test isn't whether machines can think like humans, 
                  but whether humans can maintain their unique emotional authenticity 
                  in an increasingly digital world." 
                </p>
                <p className="font-space text-sm mt-2 text-muted-foreground">
                  - A thought inspired by your brilliant mind
                </p>
              </div>
              <Button onClick={resetGame} className="cosmic-glow font-orbitron" size="lg">
                🔄 Test Again
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  const currentTest = testCases[currentCase];

  return (
    <section className="py-20 px-6 min-h-screen bg-gradient-to-br from-background via-accent/5 to-primary/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-orbitron font-bold mb-4 neon-text">
            🧠 The Turing Test: Emotional Intelligence Challenge
          </h2>
          <p className="text-xl font-space text-muted-foreground">
            Identify the truly human voice among AI and personal expressions
          </p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="font-space text-lg">Test Case {currentCase + 1} of {testCases.length}</span>
            <span className="font-space text-lg">Score: {score}/{testCases.length}</span>
          </div>
          <div className="w-full bg-accent/20 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentCase + 1) / testCases.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="grid gap-6 mb-8">
          {currentTest.quotes.map((quote, index) => (
            <Card 
              key={index} 
              className={`cosmic-glow aurora-border cursor-pointer transition-all duration-300 ${
                selectedAnswer === quote.author ? 'ring-2 ring-primary bg-primary/10' : ''
              }`}
              onClick={() => setSelectedAnswer(quote.author)}
            >
              <CardHeader>
                <CardTitle className="font-orbitron text-lg">{quote.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-space text-base leading-relaxed">
                  "{quote.text}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center space-y-4">
          <p className="font-space text-lg mb-6">
            Which quote shows the most authentic <strong>human emotional intelligence</strong>?
          </p>
          
          <Button 
            onClick={checkAnswer}
            disabled={!selectedAnswer}
            className="cosmic-glow font-orbitron px-8"
            size="lg"
          >
            🎯 Submit Analysis
          </Button>

          <div className="mt-8 p-4 bg-accent/5 rounded-lg border border-accent/20">
            <p className="font-space text-sm text-muted-foreground">
              💡 Look for emotional authenticity, personal voice patterns, and genuine human expression nuances
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TuringTestChallenge;