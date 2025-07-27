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
        let variables: Record<string, any> = {};
        const lines = code.split('\n');
        
        for (const line of lines) {
          const trimmedLine = line.trim();
          
          if (trimmedLine.startsWith('#') || trimmedLine === '') {
            continue;
          }

          // Check for syntax errors
          if (trimmedLine.includes('print(') && !trimmedLine.includes(')')) {
            throw new Error("SyntaxError: missing closing parenthesis in print statement");
          }

          if (trimmedLine.includes('=') && trimmedLine.startsWith('=')) {
            throw new Error("SyntaxError: invalid assignment target");
          }
          
          // Handle variable assignments
          if (trimmedLine.includes('=') && !trimmedLine.startsWith('print') && !trimmedLine.includes('==')) {
            const [varName, varValue] = trimmedLine.split('=').map(s => s.trim());
            try {
              if (varValue.startsWith('"') || varValue.startsWith("'")) {
                variables[varName] = varValue.slice(1, -1);
              } else if (!isNaN(Number(varValue))) {
                variables[varName] = Number(varValue);
              } else if (varValue.startsWith('[') && varValue.endsWith(']')) {
                variables[varName] = varValue;
              } else {
                variables[varName] = varValue;
              }
              result += `✓ Variable assigned: ${varName} = ${varValue}\n`;
            } catch {
              throw new Error(`NameError: variable '${varValue}' is not defined`);
            }
          }
          
          // Handle print statements
          if (trimmedLine.startsWith('print(')) {
            // Basic string print
            const basicPrint = trimmedLine.match(/print\(['"`]([^'"`]*)['"`]\)/);
            if (basicPrint) {
              result += basicPrint[1] + '\n';
              continue;
            }

            // F-string handling
            if (trimmedLine.includes('f\'') || trimmedLine.includes('f"')) {
              const fStringMatch = trimmedLine.match(/print\(f['"`]([^'"`]*)['"`]\)/);
              if (fStringMatch) {
                let content = fStringMatch[1];
                // Replace variables in f-strings
                for (const [varName, varValue] of Object.entries(variables)) {
                  content = content.replace(new RegExp(`{${varName}}`, 'g'), String(varValue));
                }
                // Handle expressions like {age + 10}
                content = content.replace(/{(\w+)\s*\+\s*(\d+)}/g, (match, varName, num) => {
                  const varValue = variables[varName];
                  if (typeof varValue === 'number') {
                    return String(varValue + Number(num));
                  }
                  return match;
                });
                result += content + '\n';
                continue;
              }
            }

            // Variable print
            const varMatch = trimmedLine.match(/print\((\w+)\)/);
            if (varMatch) {
              const varName = varMatch[1];
              if (variables[varName] !== undefined) {
                result += variables[varName] + '\n';
              } else {
                throw new Error(`NameError: name '${varName}' is not defined`);
              }
              continue;
            }

            // Print with string concatenation
            if (trimmedLine.includes(',')) {
              const printArgs = trimmedLine.match(/print\((.*)\)/);
              if (printArgs) {
                const args = printArgs[1].split(',').map(arg => arg.trim());
                let output = '';
                for (const arg of args) {
                  if (arg.startsWith('"') || arg.startsWith("'")) {
                    output += arg.slice(1, -1) + ' ';
                  } else if (variables[arg] !== undefined) {
                    output += variables[arg] + ' ';
                  } else {
                    output += arg + ' ';
                  }
                }
                result += output.trim() + '\n';
              }
            }
          }
          
          // Handle imports
          if (trimmedLine.startsWith('import ') || trimmedLine.startsWith('from ')) {
            result += `✓ Module imported: ${trimmedLine}\n`;
          }

          // Handle for loops (basic)
          if (trimmedLine.startsWith('for ')) {
            const forMatch = trimmedLine.match(/for\s+(\w+)\s+in\s+range\((\d+),?\s*(\d+)?,?\s*(-?\d+)?\)/);
            if (forMatch) {
              const [, varName, start, end, step] = forMatch;
              const startNum = parseInt(start);
              const endNum = end ? parseInt(end) : startNum;
              const stepNum = step ? parseInt(step) : 1;
              
              const actualStart = end ? startNum : 0;
              const actualEnd = end ? endNum : startNum;
              
              for (let i = actualStart; stepNum > 0 ? i < actualEnd : i > actualEnd; i += stepNum) {
                variables[varName] = i;
              }
              result += `✓ Loop executed: ${trimmedLine}\n`;
            }
          }

          // Check for undefined variables in expressions
          const undefinedVarMatch = trimmedLine.match(/\b([a-zA-Z_]\w*)\b/g);
          if (undefinedVarMatch && !trimmedLine.includes('=') && !trimmedLine.includes('print') && !trimmedLine.includes('import') && !trimmedLine.includes('for')) {
            for (const varName of undefinedVarMatch) {
              if (!['range', 'len', 'str', 'int', 'float', 'list', 'dict'].includes(varName) && variables[varName] === undefined) {
                throw new Error(`NameError: name '${varName}' is not defined`);
              }
            }
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
        const errorMessage = error instanceof Error ? error.message : String(error);
        setOutput(`❌ ${errorMessage}\n\nDon't worry, even the best coders debug in space! 🚀\n\nTip: Check for typos, missing parentheses, or undefined variables.`);
        
        toast({
          title: "🚫 Execution Error",
          description: "Found an issue in your code. Check the output for details!",
          variant: "destructive"
        });
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