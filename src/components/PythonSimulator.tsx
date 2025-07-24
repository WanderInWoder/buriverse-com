import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const PythonSimulator = () => {
  const [code, setCode] = useState("# Welcome to BURIVERSE Python Terminal!\nprint('Hello, Buri! 🐍')\n\n# Try some code:\nname = 'Buri'\nprint(f'Happy Birthday, {name}!')\n\n# Math operations\nage = 25  # Update with your age\nprint(f'In 10 years, you will be {age + 10}!')\n\n# List operations\nhobbies = ['coding', 'gaming', 'researching deep about softwares']\nprint('Your hobbies:', hobbies)");
  const [output, setOutput] = useState("import python\n# Your output will appear here...");
  const [isRunning, setIsRunning] = useState(false);
  const { toast } = useToast();

  const runCode = async () => {
    setIsRunning(true);
    setOutput("🚀 Running your Python code...\n");

    // Simulate code execution with realistic delay
    setTimeout(() => {
      try {
        let result = "";
        const lines = code.split('\n');
        
        for (const line of lines) {
          const trimmedLine = line.trim();
          
          if (trimmedLine.startsWith('#') || trimmedLine === '') {
            continue;
          }
          
          // Simulate basic Python operations
          if (trimmedLine.startsWith('print(')) {
            const printContent = trimmedLine.match(/print\(['"`](.*)['"`]\)/);
            if (printContent) {
              result += printContent[1] + '\n';
            } else if (trimmedLine.includes('f\'') || trimmedLine.includes('f"')) {
              // Handle f-strings
              const fStringMatch = trimmedLine.match(/print\(f['"`](.*)['"`]\)/);
              if (fStringMatch) {
                let content = fStringMatch[1];
                // Simple variable substitution
                content = content.replace(/{name}/g, 'Buri');
                content = content.replace(/{age \+ 10}/g, '35');
                result += content + '\n';
              }
            } else if (trimmedLine.includes('hobbies')) {
              result += "Your hobbies: ['coding', 'gaming', 'researching deep about softwares']\n";
            }
          }
          
          // Handle variable assignments
          if (trimmedLine.includes('=') && !trimmedLine.startsWith('print')) {
            result += `✓ Variable assigned: ${trimmedLine}\n`;
          }
          
          // Handle imports
          if (trimmedLine.startsWith('import ') || trimmedLine.startsWith('from ')) {
            result += `✓ Module imported: ${trimmedLine}\n`;
          }
        }
        
        if (result === "") {
          result = "✨ Code executed successfully! (No output to display)\n";
        }
        
        result += "\n🎉 BURIVERSE Python Simulator - Code executed in cosmic space!";
        
        setOutput(result);
        
        toast({
          title: "🐍 Code Executed!",
          description: "Your Python code ran successfully in the BURIVERSE!",
        });
        
      } catch (error) {
        setOutput(`❌ Error: ${error}\n\nDon't worry, even the best coders debug in space! 🚀`);
      }
      
      setIsRunning(false);
    }, 1500);
  };

  const clearCode = () => {
    setCode("");
    setOutput("import python\n# Ready for new code...");
  };

  const loadExample = () => {
    setCode(`# BURIVERSE Special Functions 🌌
print("Welcome to Buri's Cosmic Python Lab!")

# Birthday calculator
birth_year = 1999  # Update with your birth year
current_year = 2024
age = current_year - birth_year
print(f"You are {age} years old!")

# Cosmic countdown
print("Launching birthday celebration in...")
for i in range(3, 0, -1):
    print(f"{i}... 🚀")
print("🎉 HAPPY BIRTHDAY BURI! 🎉")

# Memory generator
memories = [
    "Snow adventures with Mum Panda",
    "Late night coding sessions", 
    "Gaming marathons till dawn",
    "Researching deep software concepts",
    "Inside jokes that make no sense"
]

print("\\nYour precious memories:")
for i, memory in enumerate(memories, 1):
    print(f"{i}. {memory} ❤️")

print("\\n🌟 This is your universe, built with love! 🌟")`);
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <Card className="cosmic-glow aurora-border">
          <CardContent className="p-8">
            <h2 className="text-4xl font-orbitron font-bold mb-8 text-center neon-text">
              💻 Python Terminal Simulator
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Code Input */}
              <div>
                <h3 className="text-xl font-orbitron mb-4 text-accent">Code Editor</h3>
                <Textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Type your Python code here..."
                  className="h-96 font-mono text-sm cosmic-glow bg-black/50 text-green-400 border-cyan-500"
                />
                
                <div className="flex gap-2 mt-4">
                  <Button 
                    onClick={runCode} 
                    disabled={isRunning}
                    className="cosmic-glow font-orbitron"
                  >
                    {isRunning ? "🚀 Running..." : "▶️ Run Code"}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={clearCode}
                    className="aurora-border font-orbitron"
                  >
                    🗑️ Clear
                  </Button>
                  <Button 
                    variant="secondary" 
                    onClick={loadExample}
                    className="font-orbitron"
                  >
                    📝 Load Example
                  </Button>
                </div>
              </div>

              {/* Output */}
              <div>
                <h3 className="text-xl font-orbitron mb-4 text-accent">Output Terminal</h3>
                <pre className="h-96 p-4 bg-black rounded-lg border border-cyan-500 text-green-400 font-mono text-sm overflow-auto cosmic-glow whitespace-pre-wrap">
                  {output}
                </pre>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-lg font-space text-muted-foreground">
                Your personal Python playground in the cosmos! 🐍✨
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PythonSimulator;