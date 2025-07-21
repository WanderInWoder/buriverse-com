import { Card, CardContent } from "@/components/ui/card";

const CheckmateMoments = () => {
  return (
    <section className="py-20 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-blue-900/10 to-cyan-900/10" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-12 text-center neon-text">
          ♟️ Checkmate Moments
        </h2>
        
        <Card className="cosmic-glow aurora-border backdrop-blur-sm bg-background/90">
          <CardContent className="p-8">
            <div className="text-lg font-space leading-relaxed space-y-6">
              <p className="text-xl text-accent font-medium">
                Among all the deep talks and tech adventures, there's one thing that stays just ours — our chess matches.
              </p>
              
              <p>
                Not serious tournaments. Not bragging rights. Just quiet moments where we laughed over misclicks, plotted emotional checkmates, and built a bond beyond words.
              </p>
              
              <p>
                It's not about the pieces. It's about having a player who gets you.
              </p>
              
              <div className="mt-8 p-6 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg border border-accent/20">
                <p className="text-accent italic text-center">
                  "Every game we played was never really about winning — it was about the conversations between moves, the shared silence, and the way we understood each other's strategies without saying a word."
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CheckmateMoments;