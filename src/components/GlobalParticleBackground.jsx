import { useEffect, useRef } from 'react';

export function GlobalParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const theme = { accent: '142 71% 45%', base: '0 0% 30%' };
    let animationId;
    let particles = [];
    let themeObserver;

    // Responsive particle count
    const getParticleCount = () => {
      if (typeof window === 'undefined') return 60;
      return window.innerWidth < 768 ? 40 : 80;
    };

    const syncTheme = () => {
      const styles = getComputedStyle(document.documentElement);
      theme.accent = styles.getPropertyValue('--secondary').trim() || '142 71% 45%';
      theme.base = styles.getPropertyValue('--border').trim() || '0 0% 30%';
    };

    // Resize handler
    const resize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

      // Reinitialize particles on resize
      initParticles(window.innerWidth, window.innerHeight);
    };

    // Initialize particles
    const initParticles = (width, height) => {
      const count = getParticleCount();
      particles = Array(count).fill(null).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: 1.5 + Math.random() * 2.5,
        isAccent: Math.random() > 0.8, // 20% green accent particles
      }));
    };

    // Animation loop
    function animate() {
      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.clearRect(0, 0, width, height);

      // Draw connections first (behind particles)
      ctx.lineWidth = 0.6;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 180) {
            const opacity = 0.18 * (1 - dist / 180);
            // Use green for accent connections, neutral for others
            if (particles[i].isAccent || particles[j].isAccent) {
              ctx.strokeStyle = `hsl(${theme.accent} / ${opacity * 0.7})`;
            } else {
              ctx.strokeStyle = `hsl(${theme.base} / ${opacity * 0.45})`;
            }
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw and update particles
      particles.forEach((p) => {
        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Keep within bounds
        p.x = Math.max(0, Math.min(width, p.x));
        p.y = Math.max(0, Math.min(height, p.y));

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        if (p.isAccent) {
          ctx.fillStyle = `hsl(${theme.accent} / 0.55)`;
        } else {
          ctx.fillStyle = `hsl(${theme.base} / 0.35)`;
        }
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    }

    syncTheme();
    resize();
    window.addEventListener('resize', resize);
    themeObserver = new MutationObserver(syncTheme);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (themeObserver) themeObserver.disconnect();
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-screen h-screen pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
