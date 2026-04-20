import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="font-display font-bold text-primary-foreground text-sm">G</span>
              </div>
              <span className="font-display font-semibold text-foreground">GrowGuide</span>
            </div>
            <p className="text-sm text-muted-foreground">
              AI-powered career intelligence for modern professionals.
            </p>
          </div>
          <div>
            <h4 className="font-display font-semibold text-foreground mb-3 text-sm">Product</h4>
            <div className="space-y-2">
              <Link to="/features" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Features</Link>
              <Link to="/app" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Launch App</Link>
            </div>
          </div>
          <div>
            <h4 className="font-display font-semibold text-foreground mb-3 text-sm">Company</h4>
            <div className="space-y-2">
              <Link to="/about" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">About</Link>
              <Link to="/contact" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
            </div>
          </div>
          <div>
            <h4 className="font-display font-semibold text-foreground mb-3 text-sm">App</h4>
            <div className="space-y-2">
              <Link to="/app/history" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">History</Link>
              <Link to="/app/compare" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Compare</Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border/50 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} GrowGuide. Built with hybrid AI.
        </div>
      </div>
    </footer>
  );
}
