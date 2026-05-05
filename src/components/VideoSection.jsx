import { useRef, useEffect, useState } from 'react';
import { Play, Volume2, VolumeX, Maximize2 } from 'lucide-react';

export function VideoSection() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isInView, setIsInView] = useState(false);

  const videoUrl = 'https://lumniverse-cloud.s3.us-east-1.amazonaws.com/Lumni-trailer-with-audio.mp4';

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      if (isInView) {
        videoRef.current.play().catch(() => setIsPlaying(false));
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [isInView]);

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      }
    }
  };

  return (
    <section
      id="demo"
      ref={sectionRef}
      className="pt-8 pb-24 bg-background/80"
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-secondary mb-4 block">
            Demo
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-foreground mb-4">
            See Lumni in action
          </h2>
          <p className="text-lg text-muted">
            Watch how we resolve incidents in minutes, not hours
          </p>
        </div>

        {/* Video container */}
        <div className="relative rounded-lg overflow-hidden border border-border bg-canvas">
          <video
            ref={videoRef}
            src={videoUrl}
            muted={isMuted}
            playsInline
            className="w-full h-auto"
            loop
          />

          {/* Controls */}
          <div className="absolute bottom-4 right-4 flex gap-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 bg-surface/90 backdrop-blur-sm rounded-md border border-border text-foreground hover:bg-surface transition-colors"
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <button
              onClick={handleFullscreen}
              className="p-2 bg-surface/90 backdrop-blur-sm rounded-md border border-border text-foreground hover:bg-surface transition-colors"
            >
              <Maximize2 size={18} />
            </button>
          </div>

          {/* Play indicator */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-background/50">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center">
                <Play size={28} className="text-primary-foreground ml-1" fill="currentColor" />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
