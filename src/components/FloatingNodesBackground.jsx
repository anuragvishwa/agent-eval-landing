import { useEffect, useRef } from 'react';

export function FloatingNodesBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];

    // Resize handler
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

      // Reinitialize particles on resize
      initParticles(rect.width, rect.height);
    };

    // Initialize particles
    const initParticles = (width, height) => {
      particles = Array(45).fill(null).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: 2 + Math.random() * 3,
        isAccent: Math.random() > 0.75,
      }));
    };

    // Animation loop
    function animate() {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      // Draw connections first (behind particles)
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            const opacity = 0.25 * (1 - dist / 150);
            // Use green tint for connections between accent particles
            if (particles[i].isAccent || particles[j].isAccent) {
              ctx.strokeStyle = `rgba(34, 197, 94, ${opacity * 0.6})`;
            } else {
              ctx.strokeStyle = `rgba(180, 180, 180, ${opacity})`;
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

        // Bounce off edges with padding
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Keep within bounds
        p.x = Math.max(0, Math.min(width, p.x));
        p.y = Math.max(0, Math.min(height, p.y));

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        if (p.isAccent) {
          // Green accent particles with glow effect
          ctx.fillStyle = 'rgba(34, 197, 94, 0.7)';
          ctx.shadowColor = 'rgba(34, 197, 94, 0.4)';
          ctx.shadowBlur = 8;
        } else {
          // Gray particles
          ctx.fillStyle = 'rgba(180, 180, 180, 0.5)';
          ctx.shadowColor = 'transparent';
          ctx.shadowBlur = 0;
        }
        ctx.fill();

        // Reset shadow for next iteration
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
      });

      animationId = requestAnimationFrame(animate);
    }

    resize();
    window.addEventListener('resize', resize);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
