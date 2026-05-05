import { useEffect, useRef } from 'react';
import { TerminalParticles } from './TerminalParticles';

// Canvas-based graph visualization with animated particles and trails
function GraphVisualization() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;

    // Particle class for traveling along paths with trails
    const particles = [];
    const pulseRings = [];

    // Define bezier curve paths (from corners to center)
    const paths = [
      { start: { x: 0.12, y: 0.15 }, cp1: { x: 0.28, y: 0.15 }, cp2: { x: 0.35, y: 0.5 }, end: { x: 0.5, y: 0.5 } },
      { start: { x: 0.12, y: 0.85 }, cp1: { x: 0.28, y: 0.85 }, cp2: { x: 0.35, y: 0.5 }, end: { x: 0.5, y: 0.5 } },
      { start: { x: 0.88, y: 0.15 }, cp1: { x: 0.72, y: 0.15 }, cp2: { x: 0.65, y: 0.5 }, end: { x: 0.5, y: 0.5 } },
      { start: { x: 0.88, y: 0.85 }, cp1: { x: 0.72, y: 0.85 }, cp2: { x: 0.65, y: 0.5 }, end: { x: 0.5, y: 0.5 } },
    ];

    // Create particle
    const createParticle = (pathIndex, delay) => ({
      pathIndex,
      progress: 0,
      speed: 0.006 + Math.random() * 0.003,
      size: 3 + Math.random() * 2,
      delay,
      active: false,
      trail: [],
      reachedCenter: false,
    });

    // Initialize particles - multiple per path with staggered delays
    paths.forEach((_, pathIndex) => {
      particles.push(createParticle(pathIndex, pathIndex * 0.6));
      particles.push(createParticle(pathIndex, pathIndex * 0.6 + 1.8));
      particles.push(createParticle(pathIndex, pathIndex * 0.6 + 3.6));
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    // Get point on bezier curve at t (0-1)
    const getBezierPoint = (path, t, width, height) => {
      const x = Math.pow(1-t, 3) * path.start.x * width +
                3 * Math.pow(1-t, 2) * t * path.cp1.x * width +
                3 * (1-t) * Math.pow(t, 2) * path.cp2.x * width +
                Math.pow(t, 3) * path.end.x * width;
      const y = Math.pow(1-t, 3) * path.start.y * height +
                3 * Math.pow(1-t, 2) * t * path.cp1.y * height +
                3 * (1-t) * Math.pow(t, 2) * path.cp2.y * height +
                Math.pow(t, 3) * path.end.y * height;
      return { x, y };
    };

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      time += 0.016;

      ctx.clearRect(0, 0, width, height);

      // Draw curved paths with gradient
      paths.forEach((path) => {
        // Draw main path
        ctx.beginPath();
        ctx.moveTo(path.start.x * width, path.start.y * height);
        ctx.bezierCurveTo(
          path.cp1.x * width, path.cp1.y * height,
          path.cp2.x * width, path.cp2.y * height,
          path.end.x * width, path.end.y * height
        );
        ctx.strokeStyle = 'rgba(61, 52, 85, 0.5)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw glowing path overlay
        ctx.beginPath();
        ctx.moveTo(path.start.x * width, path.start.y * height);
        ctx.bezierCurveTo(
          path.cp1.x * width, path.cp1.y * height,
          path.cp2.x * width, path.cp2.y * height,
          path.end.x * width, path.end.y * height
        );
        ctx.strokeStyle = 'rgba(34, 197, 94, 0.1)';
        ctx.lineWidth = 6;
        ctx.stroke();
      });

      // Update and draw particles
      particles.forEach((particle) => {
        // Handle delay
        if (particle.delay > 0) {
          particle.delay -= 0.016;
          return;
        }
        particle.active = true;

        // Update progress
        particle.progress += particle.speed;

        // Reset when reaching center
        if (particle.progress > 1) {
          particle.progress = 0;
          particle.trail = [];
          particle.reachedCenter = false;
        }

        const path = paths[particle.pathIndex];
        const point = getBezierPoint(path, particle.progress, width, height);

        // Add to trail
        particle.trail.push({ x: point.x, y: point.y, alpha: 1, size: particle.size });
        if (particle.trail.length > 15) particle.trail.shift();

        // Draw trail with fading effect
        particle.trail.forEach((t, i) => {
          const alpha = (i / particle.trail.length) * 0.7;
          const size = t.size * (0.3 + (i / particle.trail.length) * 0.7);

          ctx.beginPath();
          ctx.arc(t.x, t.y, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(34, 197, 94, ${alpha})`;
          ctx.fill();
        });

        // Draw main particle with glow
        ctx.shadowColor = '#22c55e';
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.arc(point.x, point.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = '#22c55e';
        ctx.fill();
        ctx.shadowBlur = 0;

        // Trigger center pulse when particle reaches center
        if (particle.progress > 0.92 && !particle.reachedCenter) {
          particle.reachedCenter = true;
          pulseRings.push({ radius: 25, alpha: 0.5, maxRadius: 70 });
        }
      });

      // Draw center node effects
      const centerX = width * 0.5;
      const centerY = height * 0.5;

      // Draw expanding pulse rings
      pulseRings.forEach((ring) => {
        ring.radius += 2;
        ring.alpha -= 0.012;

        if (ring.alpha > 0) {
          ctx.beginPath();
          ctx.arc(centerX, centerY, ring.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(34, 197, 94, ${ring.alpha})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      });

      // Remove faded rings
      for (let i = pulseRings.length - 1; i >= 0; i--) {
        if (pulseRings[i].alpha <= 0) pulseRings.splice(i, 1);
      }

      // Draw center glow (pulsing)
      const glowIntensity = 0.25 + Math.sin(time * 2) * 0.1;
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 65);
      gradient.addColorStop(0, `rgba(34, 197, 94, ${glowIntensity})`);
      gradient.addColorStop(0.5, `rgba(34, 197, 94, ${glowIntensity * 0.4})`);
      gradient.addColorStop(1, 'rgba(34, 197, 94, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 65, 0, Math.PI * 2);
      ctx.fill();

      // Draw rotating dashed ring
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(time * 0.4);
      ctx.beginPath();
      ctx.arc(0, 0, 48, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(34, 197, 94, 0.35)';
      ctx.setLineDash([10, 15]);
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // Draw orbiting dots
      for (let i = 0; i < 3; i++) {
        const angle = time * 1.0 + (i * Math.PI * 2 / 3);
        const orbitX = centerX + Math.cos(angle) * 48;
        const orbitY = centerY + Math.sin(angle) * 48;
        const dotAlpha = 0.9 - i * 0.25;

        // Glow behind dot
        ctx.beginPath();
        ctx.arc(orbitX, orbitY, 6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 197, 94, ${dotAlpha * 0.3})`;
        ctx.fill();

        // Main dot
        ctx.beginPath();
        ctx.arc(orbitX, orbitY, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 197, 94, ${dotAlpha})`;
        ctx.fill();
      }

      // Draw node glows at corners when particles are departing
      const nodePositions = [
        { x: 0.12, y: 0.15 },
        { x: 0.12, y: 0.85 },
        { x: 0.88, y: 0.15 },
        { x: 0.88, y: 0.85 },
      ];

      nodePositions.forEach((pos, i) => {
        const nodeX = pos.x * width;
        const nodeY = pos.y * height;

        // Check if any particle just started from this node
        const isActive = particles.some(p =>
          p.pathIndex === i && p.active && p.progress < 0.12 && p.progress > 0
        );

        if (isActive) {
          const pulseSize = 35 + Math.sin(time * 10) * 8;
          const nodeGradient = ctx.createRadialGradient(nodeX, nodeY, 0, nodeX, nodeY, pulseSize);
          nodeGradient.addColorStop(0, 'rgba(34, 197, 94, 0.5)');
          nodeGradient.addColorStop(0.5, 'rgba(34, 197, 94, 0.2)');
          nodeGradient.addColorStop(1, 'rgba(34, 197, 94, 0)');
          ctx.fillStyle = nodeGradient;
          ctx.beginPath();
          ctx.arc(nodeX, nodeY, pulseSize, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationId = requestAnimationFrame(animate);
    };

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
      style={{ zIndex: 5 }}
    />
  );
}

// Service icons for the graph — official brand SVGs
const OpenAIIcon = () => (
  <svg className="w-6 h-6 text-muted" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>
  </svg>
);

const ClaudeIcon = () => (
  <svg className="w-6 h-6 text-muted" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z"/>
  </svg>
);

const GeminiIcon = () => (
  <svg className="w-6 h-6 text-secondary" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81"/>
  </svg>
);

const DeepSeekIcon = () => (
  <svg className="w-6 h-6 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.748 4.651c-.254-.124-.364.113-.512.233-.051.04-.094.09-.137.137-.372.397-.806.657-1.373.626-.829-.046-1.537.214-2.163.848-.133-.782-.575-1.248-1.247-1.548-.352-.155-.708-.311-.955-.65-.172-.24-.219-.509-.305-.774-.055-.16-.11-.323-.293-.35-.2-.031-.278.136-.356.276-.313.572-.434 1.202-.422 1.84.027 1.436.633 2.58 1.838 3.393.137.094.172.187.129.323-.082.28-.18.553-.266.833-.055.179-.137.218-.328.14a5.5 5.5 0 0 1-1.737-1.179c-.857-.828-1.631-1.743-2.597-2.46a12 12 0 0 0-.689-.47c-.985-.957.13-1.743.387-1.836.27-.098.094-.433-.778-.428-.872.003-1.67.295-2.687.685a3 3 0 0 1-.465.136 9.6 9.6 0 0 0-2.883-.101c-1.885.21-3.39 1.1-4.497 2.622C.082 8.776-.231 10.854.152 13.02c.403 2.284 1.568 4.175 3.36 5.653 1.857 1.533 3.997 2.284 6.438 2.14 1.482-.085 3.132-.284 4.994-1.86.47.234.962.328 1.78.398.629.058 1.235-.031 1.705-.129.735-.155.684-.836.418-.961-2.155-1.004-1.682-.595-2.112-.926 1.095-1.295 2.768-3.598 3.284-6.733.05-.346.115-.834.108-1.114-.004-.171.035-.238.23-.257a4.2 4.2 0 0 0 1.545-.475c1.397-.763 1.96-2.016 2.093-3.517.02-.23-.004-.467-.247-.588M11.58 18.168c-2.088-1.642-3.101-2.183-3.52-2.16-.39.024-.32.472-.234.763.09.288.207.487.371.74.114.167.192.416-.113.603-.673.416-1.842-.14-1.897-.168-1.361-.801-2.5-1.86-3.301-3.306-.775-1.393-1.225-2.888-1.299-4.482-.02-.385.094-.522.477-.592a4.7 4.7 0 0 1 1.53-.038c2.131.311 3.946 1.264 5.467 2.774.868.86 1.525 1.887 2.202 2.89.72 1.066 1.494 2.082 2.48 2.915.348.291.626.513.892.677-.802.09-2.14.109-3.055-.615zm1.001-6.44a.306.306 0 0 1 .415-.287.3.3 0 0 1 .113.074.3.3 0 0 1 .086.214c0 .17-.136.307-.308.307a.303.303 0 0 1-.306-.307m3.11 1.596c-.2.081-.4.151-.591.16a1.25 1.25 0 0 1-.798-.254c-.274-.23-.47-.358-.551-.758a1.7 1.7 0 0 1 .015-.588c.07-.327-.007-.537-.238-.727-.188-.156-.426-.199-.689-.199a.6.6 0 0 1-.254-.078.253.253 0 0 1-.114-.358 1 1 0 0 1 .192-.21c.356-.202.767-.136 1.146.016.352.144.618.408 1.001.782.392.451.462.576.685.915.176.264.336.536.446.848.066.194-.02.353-.25.45"/>
  </svg>
);

// Icon SVG strings for DOM insertion
const icons = {
  info: `<svg class="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`,
  alert: `<svg class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>`,
  check: `<svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`,
  search: `<svg class="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>`,
  code: `<svg class="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>`
};

// Terminal commands with timestamps and highlighting
const commands = [
  { icon: icons.info, text: 'Monitoring AI Agent Fleet...', color: 'text-muted', time: '09:42:01' },
  { icon: icons.alert, text: 'Critical: Claude Code tool timeout on MCP Slack', color: 'text-red-400', time: '09:42:03', highlight: true },
  { icon: icons.search, text: 'Analyzing Agent Traces (7-Layer Stack)...', color: 'text-muted', time: '09:42:03' },
  { icon: icons.search, text: 'Trace: Orchestrator → Tools → Network → MCP', color: 'text-muted', time: '09:42:04' },
  { icon: icons.code, text: 'Correlation Found: Database connection pool exhaustion', color: 'text-blue-400', time: '09:42:05' },
  { icon: icons.code, text: 'Evidence: 89 failures in 2 hours, connection leak', color: 'text-amber-400', time: '09:42:05', highlight: true },
  { icon: icons.check, text: 'Confidence: 85%. Replay Status: REPLAY-READY.', color: 'text-green-400', time: '09:42:06' },
  { icon: icons.check, text: 'Action: Implement connection pooling with proper release', color: 'text-green-400', time: '09:42:07' },
  { icon: icons.info, text: 'Agent Resumed Successfully ✓', color: 'text-muted', time: '09:42:08' },
];

export function Terminal() {
  const terminalRef = useRef(null);

  useEffect(() => {
    const termOutput = terminalRef.current;
    if (!termOutput) return;

    const typingSpeed = 26;
    const linePause = 650;
    const resetPause = 1200;

    let cmdIndex = 0;
    let charIndex = 0;
    let isTyping = false;
    let animationId = null;

    function smoothScrollToBottom() {
      termOutput.scrollTo({ top: termOutput.scrollHeight, behavior: 'smooth' });
    }

    function vanishAndReset() {
      const lines = Array.from(termOutput.children);
      if (!lines.length) {
        cmdIndex = 0;
        typeCommand();
        return;
      }

      lines.forEach((line, i) => {
        line.style.animation = `vanishOut 0.7s ease forwards`;
        line.style.animationDelay = `${i * 60}ms`;
      });

      const totalMs = 700 + lines.length * 60 + 150;
      animationId = setTimeout(() => {
        termOutput.innerHTML = '';
        cmdIndex = 0;
        typeCommand();
      }, totalMs);
    }

    function typeCommand() {
      if (cmdIndex >= commands.length) {
        animationId = setTimeout(vanishAndReset, resetPause);
        return;
      }

      const cmd = commands[cmdIndex];
      let currentLine = termOutput.lastElementChild;

      if (!currentLine || !isTyping) {
        currentLine = document.createElement('div');
        currentLine.className = `terminal-line flex items-center gap-3 mb-3 ${cmd.color} ${cmd.highlight ? 'bg-white/5 -mx-2 px-2 py-1 rounded' : ''}`;

        // Timestamp
        const timeSpan = document.createElement('span');
        timeSpan.className = 'text-muted text-xs font-mono flex-shrink-0';
        timeSpan.textContent = cmd.time;
        currentLine.appendChild(timeSpan);

        const iconSpan = document.createElement('span');
        iconSpan.className = 'flex-shrink-0';
        iconSpan.innerHTML = cmd.icon;
        currentLine.appendChild(iconSpan);

        const textSpan = document.createElement('span');
        textSpan.className = 'whitespace-pre-wrap';
        currentLine.appendChild(textSpan);

        const cursorSpan = document.createElement('span');
        cursorSpan.className = 'cursor';
        currentLine.appendChild(cursorSpan);

        termOutput.appendChild(currentLine);

        requestAnimationFrame(() => {
          currentLine.classList.add('show');
        });

        isTyping = true;
        charIndex = 0;
        smoothScrollToBottom();
      }

      const textNode = currentLine.children[2];
      const cursorNode = currentLine.children[3];

      if (charIndex < cmd.text.length) {
        textNode.textContent += cmd.text.charAt(charIndex);
        charIndex++;
        animationId = setTimeout(typeCommand, typingSpeed);
      } else {
        isTyping = false;
        cmdIndex++;
        if (cursorNode) cursorNode.remove();
        smoothScrollToBottom();
        animationId = setTimeout(typeCommand, linePause);
      }
    }

    animationId = setTimeout(typeCommand, 900);

    return () => {
      if (animationId) clearTimeout(animationId);
    };
  }, []);

  return (
    <div className="relative w-full max-w-[1000px] h-[520px] md:h-[580px] bg-canvas rounded-xl border border-border overflow-hidden shadow-lg">
      {/* Particle background */}
      <TerminalParticles />

      {/* Terminal header */}
      <div className="bg-surface px-4 py-3 flex items-center gap-2 border-b border-border">
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-green-500/80" />
        <div className="ml-auto font-mono text-xs text-muted flex items-center">
          <span className="w-2 h-2 bg-secondary rounded-full animate-blink mr-2" />
          lumni — live topology
        </div>
      </div>

      <div className="relative flex flex-col" style={{ height: 'calc(100% - 52px)' }}>
        {/* Graph visualization area */}
        <div className="relative h-[55%] shrink-0">
          {/* Canvas-based animated graph */}
          <GraphVisualization />

          {/* Service icons */}
          <div className="service-icon service-icon-pulse absolute top-[10%] left-[7%] w-12 h-12 bg-surface border border-border rounded-lg flex items-center justify-center animate-float z-10">
            <OpenAIIcon />
          </div>

          <div className="service-icon service-icon-pulse-delayed absolute bottom-[12%] left-[7%] w-12 h-12 bg-surface border border-border rounded-lg flex items-center justify-center animate-float-delayed z-10">
            <GeminiIcon />
          </div>

          <div className="service-icon service-icon-pulse absolute top-[10%] right-[7%] w-12 h-12 bg-surface border border-border rounded-lg flex items-center justify-center animate-float z-10" style={{ animationDelay: '1s' }}>
            <ClaudeIcon />
          </div>

          <div className="service-icon service-icon-pulse-delayed absolute bottom-[12%] right-[7%] w-12 h-12 bg-surface border border-border rounded-lg flex items-center justify-center animate-float-delayed z-10">
            <DeepSeekIcon />
          </div>

          {/* Central Lumniverse node */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="w-20 h-20 bg-surface rounded-full border-2 border-secondary/60 flex items-center justify-center">
              <svg className="w-10 h-10 text-secondary" fill="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Terminal output area */}
        <div className="relative flex-1 min-h-0 border-t border-border">
          <div
            ref={terminalRef}
            className="p-4 h-full font-mono text-sm overflow-y-auto terminal-scroll"
          />
        </div>
      </div>
    </div>
  );
}
