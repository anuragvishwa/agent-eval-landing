import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Zap } from 'lucide-react';
import { PageShell } from '../components/PageShell';
import { ThemeToggle } from '../components/ThemeToggle';

export function VideoPage() {
  const videoRef = useRef(null);

  const videoUrl = 'https://lumniverse-cloud.s3.us-east-1.amazonaws.com/Lumni-trailer-with-audio.mp4';

  // Auto-play video on mount (muted for browser autoplay policy)
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay was prevented
      });
    }
  }, []);

  return (
    <PageShell>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-foreground hover:text-secondary transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-mono text-sm">Back to Home</span>
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link to="/" className="flex items-center gap-2 text-foreground">
              <Zap className="w-5 h-5 text-secondary" />
              <span className="font-mono text-sm font-medium">Lumniverse</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <div className="text-center mb-12">
            <span className="font-mono text-xs uppercase tracking-widest text-secondary mb-4 block">
              Demo
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-foreground mb-4">
              See Lumni in action
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Watch how we detect, analyze, and resolve production incidents in minutes, not hours.
            </p>
          </div>

          {/* Video container */}
          <div className="relative rounded-xl overflow-hidden border border-border bg-canvas shadow-2xl">
            <video
              ref={videoRef}
              src={videoUrl}
              muted
              playsInline
              controls
              className="w-full h-auto"
            />
          </div>

          {/* CTA below video */}
          <div className="text-center mt-12">
            <p className="text-muted mb-6">Ready to transform your incident response?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://cal.com/anuragvishwa/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-secondary text-primary-foreground px-8 py-3 rounded-md font-mono text-sm font-medium hover:bg-secondary/90 transition-colors"
              >
                Book a Demo
              </a>
              <Link
                to="/"
                className="inline-block bg-transparent border border-border text-foreground px-8 py-3 rounded-md font-mono text-sm font-medium hover:bg-surface transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </main>
    </PageShell>
  );
}
