import { Link } from "wouter";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto border border-white/10">
          <AlertTriangle className="h-10 w-10 text-primary" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-4xl font-display font-bold text-white">Page Not Found</h1>
          <p className="text-muted-foreground">
            The page you are looking for doesn't exist or has been moved.
          </p>
        </div>

        <Link href="/" className="inline-block w-full py-3 px-6 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-white hover:text-black transition-colors">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
