import { GlobalParticleBackground } from './GlobalParticleBackground';

export function PageShell({ children }) {
  return (
    <div className="min-h-screen relative text-foreground app-shell">
      <GlobalParticleBackground />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
