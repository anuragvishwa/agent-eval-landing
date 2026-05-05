import { useEffect, useRef, useState } from 'react';

// Real integration icons
const SentryIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.91 2.505c-.873-1.448-2.972-1.448-3.844 0L6.53 8.969a2.25 2.25 0 0 0 1.922 3.396h.56l-1.86 3.064a.749.749 0 0 0 .643 1.125h2.544l-2.554 4.2a.75.75 0 0 0 1.282.778l7.714-12.7a.75.75 0 0 0-.64-1.128h-2.621l2.56-4.214a.75.75 0 0 0-.641-1.128h-1.489z"/>
  </svg>
);

const DatadogIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.76 18.03l-.72-.37-1.08.56-.15-1.21-.92-.77.87-.24.47-1.15.7.78 1.19-.09-.56.97.4 1.12zm3.38-2.51l-.61-.75-.84.49.05-.98-.72-.64.91-.15.48-.87.42.83.97.05-.67.71.01 1.31zm-8.4-4.33l.85-.2.45-1.05.52.78 1.06-.15-.52.95.32 1.08-.89-.45-.93.53.15-1.17-.96-.77zm10.34 5.76c-.05-2.54-1.85-4.67-4.27-5.16.49-.73.78-1.62.78-2.58 0-2.54-2.06-4.6-4.6-4.6-2.15 0-3.95 1.48-4.45 3.47a4.29 4.29 0 0 0-3.3 4.17c0 2.37 1.92 4.29 4.29 4.29h11.3c.03 0 .25.41.25.41z"/>
  </svg>
);


const PrometheusIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.372 0 12c0 6.627 5.373 12 12 12s12-5.373 12-12c0-6.628-5.373-12-12-12zm0 22.46c-1.885 0-3.414-1.26-3.414-2.814h6.828c0 1.553-1.528 2.813-3.414 2.813zm5.64-3.745H6.36v-1.86h11.28v1.86zm-.04-2.788H6.397c-.052-.063-.106-.124-.156-.187-1.26-1.584-1.533-2.66-1.717-3.564-.227-1.107-.263-1.968-.263-1.968s.507 1.03 1.368 1.897c.347.35.744.717 1.19 1.058 0 0-.28-2.31.553-4.12.918-1.996 2.274-2.696 2.6-4.217.028-.13.047-.25.06-.36.164.05.324.134.476.242.53.382.88 1.034 1.076 1.563.35.945.356 2.084.356 2.084s.295-.57.445-1.453c.054-.32.095-.667.095-1.022 0-.015.283 1.456.596 2.273.32.835.697 1.636 1.103 2.303.17.28.345.54.52.773 0 0 .004-.015.011-.044.053-.207.169-.742.132-1.327-.057-.887-.286-1.63-.286-1.63s.763.97 1.137 2.31c.18.644.285 1.404.233 2.236-.04.65-.176 1.356-.51 2.063-.059.126-.11.24-.183.4z"/>
  </svg>
);

const GitHubIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const SlackIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.522 2.521 2.527 2.527 0 0 1-2.522-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.522 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.522 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.522-2.522v-2.522h2.522zM15.165 17.688a2.527 2.527 0 0 1-2.522-2.522 2.527 2.527 0 0 1 2.522-2.522h6.312A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.522h-6.313z"/>
  </svg>
);

const JiraIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.571 11.513H0a5.218 5.218 0 0 0 5.232 5.215h2.13v2.057A5.215 5.215 0 0 0 12.575 24V12.518a1.005 1.005 0 0 0-1.005-1.005zm5.723-5.756H5.736a5.215 5.215 0 0 0 5.215 5.214h2.129v2.058a5.218 5.218 0 0 0 5.215 5.214V6.758a1.001 1.001 0 0 0-1.001-1.001zM23.013 0H11.455a5.215 5.215 0 0 0 5.215 5.215h2.129v2.057A5.215 5.215 0 0 0 24 12.483V1.005A1.005 1.005 0 0 0 23.013 0z"/>
  </svg>
);

const KubernetesIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10.204 14.35l.007.01-.999 2.413a5.171 5.171 0 0 1-2.075-2.597l2.578-.437.004.005a.44.44 0 0 1 .484.606zm-.833-2.129a.44.44 0 0 0 .173-.756l.002-.011L7.585 9.7a5.143 5.143 0 0 0-.73 3.255l2.514-.725.002-.009zm1.145-1.98a.44.44 0 0 0 .699-.337l-.01-.008.355-2.64a5.172 5.172 0 0 0-2.94 1.409l1.89 1.574.006.002zm1.63.47a.44.44 0 0 0 .712.299l.009.003 1.89-1.574a5.172 5.172 0 0 0-2.94-1.409l.355 2.64-.026.041zm1.18 1.51a.44.44 0 0 0 .173.756l.002.009 2.514.725a5.143 5.143 0 0 0-.73-3.255l-1.961 1.754.002.011zm-.196 1.872a.44.44 0 0 0 .485-.606l.004-.005 2.578.437a5.171 5.171 0 0 1-2.075 2.597l-.999-2.413.007-.01zm-2.126.648a.44.44 0 0 0-.611 0l-.006.006-1.777 1.98a5.172 5.172 0 0 0 4.17 0l-1.777-1.98-.001-.006z"/>
  </svg>
);

const AWSIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 0 1-.056.2l-1.923 6.17c-.048.16-.104.263-.168.311a.51.51 0 0 1-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758.777.777 0 0 0-.215-.559c-.144-.151-.415-.287-.807-.414l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.175 0 .359.008.535.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 0 1 .24.2.43.43 0 0 1 .071.263v.375c0 .168-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167z"/>
  </svg>
);

const GCPIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.19 2.38a9.344 9.344 0 0 0-9.234 6.893c.053-.02-.055.013 0 0-3.875 2.551-3.922 8.11-.247 10.941l.006-.007-.007.03a6.717 6.717 0 0 0 4.077 1.356h5.173l.03.03h5.192c6.687.053 9.376-8.605 3.835-12.35a9.365 9.365 0 0 0-8.825-6.893zM8.073 19.39H5.53a4.443 4.443 0 0 1-2.104-.6c-2.726-1.755-2.726-5.772 0-7.527l.195-.127.3.244a7.062 7.062 0 0 0 2.183 1.163c.26.074.367.35.21.572a2.86 2.86 0 0 0 1.87 4.275zm7.093 0h-4.12l-.03-.03h-.031a5.145 5.145 0 0 1-2.26-4.47c.095-2.74 2.367-5.035 5.113-5.063a5.151 5.151 0 0 1 5.247 5.089 5.14 5.14 0 0 1-3.919 4.474z"/>
  </svg>
);

const ConfluenceIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M.87 18.257c-.248.382-.53.875-.763 1.245a.764.764 0 0 0 .255 1.04l4.965 3.054a.764.764 0 0 0 1.058-.26c.199-.332.454-.763.733-1.221 1.967-3.247 3.945-2.853 7.508-1.146l4.957 2.377a.764.764 0 0 0 1.028-.382l2.36-5.023a.764.764 0 0 0-.382-1.003c-1.04-.497-2.476-1.182-3.707-1.772-5.226-2.504-9.634-3.926-13.012 3.09zm22.24-12.475c.248-.382.53-.875.763-1.245a.764.764 0 0 0-.255-1.04L18.653.443a.764.764 0 0 0-1.058.26c-.199.332-.454.763-.733 1.221-1.967 3.247-3.945 2.853-7.508 1.146L4.397.693a.764.764 0 0 0-1.028.382L1.01 6.098a.764.764 0 0 0 .382 1.003c1.04.497 2.476 1.182 3.707 1.772 5.226 2.504 9.634 3.926 13.012-3.09z"/>
  </svg>
);

// Instant Detection - Live monitoring dashboard with animated metrics
export function InstantDetectionIllustration() {
  const canvasRef = useRef(null);
  const [metrics, setMetrics] = useState({ cpu: 45, memory: 62, latency: 23 });
  const [alertActive, setAlertActive] = useState(false);

  useEffect(() => {
    // Simulate live metrics
    const interval = setInterval(() => {
      setMetrics({
        cpu: 35 + Math.random() * 30,
        memory: 55 + Math.random() * 20,
        latency: 15 + Math.random() * 25,
      });
    }, 2000);

    // Trigger alert periodically
    const alertInterval = setInterval(() => {
      setAlertActive(true);
      setTimeout(() => setAlertActive(false), 3000);
    }, 6000);

    return () => {
      clearInterval(interval);
      clearInterval(alertInterval);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let dataPoints = Array(50).fill(0).map((_, i) => 50 + Math.sin(i * 0.2) * 20 + Math.random() * 10);
    let time = 0;

    // Floating particles
    let particles = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

      // Initialize particles on resize
      particles = Array(30).fill(null).map(() => ({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: 1 + Math.random() * 2,
        isGreen: Math.random() > 0.6,
      }));
    };

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      time += 0.01;

      ctx.fillStyle = '#0b0b0b';
      ctx.fillRect(0, 0, width, height);

      // Dot grid pattern
      ctx.fillStyle = 'rgba(61, 52, 85, 0.12)';
      for (let x = 0; x < width; x += 25) {
        for (let y = 0; y < height; y += 25) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Radial gradient glow in center
      const bgGradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width * 0.6);
      bgGradient.addColorStop(0, 'rgba(34, 197, 94, 0.03)');
      bgGradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.02)');
      bgGradient.addColorStop(1, 'rgba(26, 22, 37, 0)');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Floating ambient particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        p.x = Math.max(0, Math.min(width, p.x));
        p.y = Math.max(0, Math.min(height, p.y));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.isGreen ? 'rgba(34, 197, 94, 0.25)' : 'rgba(139, 92, 246, 0.2)';
        ctx.fill();

        // Particle glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = p.isGreen ? 'rgba(34, 197, 94, 0.08)' : 'rgba(139, 92, 246, 0.06)';
        ctx.fill();
      });

      // Subtle horizontal scan lines
      ctx.fillStyle = 'rgba(34, 197, 94, 0.015)';
      const scanY = (time * 100) % height;
      ctx.fillRect(0, scanY, width, 2);
      ctx.fillRect(0, (scanY + height / 2) % height, width, 1);

      // Animated line chart
      dataPoints.shift();
      dataPoints.push(50 + Math.sin(Date.now() * 0.002) * 20 + Math.random() * 15);

      ctx.beginPath();
      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 2;
      dataPoints.forEach((point, i) => {
        const x = (i / dataPoints.length) * width;
        const y = height - (point / 100) * height * 0.6 - height * 0.2;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Glow effect for the line
      ctx.strokeStyle = 'rgba(34, 197, 94, 0.3)';
      ctx.lineWidth = 6;
      ctx.stroke();

      // Fill under the line
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, 'rgba(34, 197, 94, 0.15)');
      gradient.addColorStop(1, 'rgba(34, 197, 94, 0)');
      ctx.fillStyle = gradient;
      ctx.fill();

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
    <div className="relative h-[280px] bg-canvas overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="relative z-10 w-full h-full p-4 flex flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-[10px] text-muted font-mono">TOTAL COST TODAY</div>
          <div className="text-[10px] font-mono text-green-400">● LIVE</div>
        </div>
        
        <div className="text-3xl font-mono text-foreground mb-1">$10.58</div>
        <div className="text-[10px] text-muted font-mono mb-4">4 agents • <span className="text-green-400">2 active</span> • <span className="text-red-400">1 failed</span></div>

        {/* Agent cards */}
        <div className="flex flex-col gap-2">
          <div className="bg-surface/80 rounded-lg p-3 border border-border flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-orange-500/10 text-orange-500 flex items-center justify-center font-mono font-bold">AI</div>
              <div>
                <div className="text-xs font-medium text-foreground">Support Agent</div>
                <div className="text-[10px] text-muted">Claude 3.5 Sonnet</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
               <div className="text-sm font-mono text-foreground">$4.80</div>
               <div className="px-2 py-0.5 rounded text-[9px] font-mono bg-green-500/20 text-green-400 border border-green-500/30">SUCCESS</div>
            </div>
          </div>

          <div className="bg-surface/80 rounded-lg p-3 border border-border flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-blue-500/10 text-blue-500 flex items-center justify-center font-mono font-bold">GPT</div>
              <div>
                <div className="text-xs font-medium text-foreground">RCA Investigator</div>
                <div className="text-[10px] text-muted">GPT-4o</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
               <div className="text-sm font-mono text-foreground">$3.10</div>
               <div className="px-2 py-0.5 rounded text-[9px] font-mono bg-blue-500/20 text-blue-400 border border-blue-500/30">RUNNING</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Auto-Resolution - Animated workflow pipeline
export function AutoResolutionIllustration() {
  const canvasRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 5);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;
    let particles = [];
    let flowParticles = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

      // Ambient floating particles
      particles = Array(25).fill(null).map(() => ({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        radius: 1 + Math.random() * 1.5,
        isGreen: Math.random() > 0.5,
      }));

      // Horizontal flow particles (pipeline direction)
      flowParticles = Array(12).fill(null).map(() => ({
        x: Math.random() * rect.width,
        y: rect.height * 0.4 + (Math.random() - 0.5) * 60,
        speed: 0.5 + Math.random() * 1,
        radius: 1.5 + Math.random() * 2,
      }));
    };

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      time += 0.01;

      ctx.fillStyle = '#0b0b0b';
      ctx.fillRect(0, 0, width, height);

      // Dot grid pattern
      ctx.fillStyle = 'rgba(61, 52, 85, 0.1)';
      for (let x = 0; x < width; x += 25) {
        for (let y = 0; y < height; y += 25) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Radial gradient glow
      const bgGradient = ctx.createRadialGradient(width / 2, height * 0.4, 0, width / 2, height * 0.4, width * 0.5);
      bgGradient.addColorStop(0, 'rgba(34, 197, 94, 0.04)');
      bgGradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.02)');
      bgGradient.addColorStop(1, 'rgba(26, 22, 37, 0)');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Horizontal flow particles (along pipeline)
      flowParticles.forEach((p) => {
        p.x += p.speed;
        if (p.x > width + 10) {
          p.x = -10;
          p.y = height * 0.4 + (Math.random() - 0.5) * 60;
        }

        // Trail effect
        const trailGradient = ctx.createLinearGradient(p.x - 20, 0, p.x, 0);
        trailGradient.addColorStop(0, 'rgba(34, 197, 94, 0)');
        trailGradient.addColorStop(1, 'rgba(34, 197, 94, 0.3)');
        ctx.fillStyle = trailGradient;
        ctx.fillRect(p.x - 20, p.y - 1, 20, 2);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(34, 197, 94, 0.5)';
        ctx.fill();

        // Glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(34, 197, 94, 0.1)';
        ctx.fill();
      });

      // Floating ambient particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        p.x = Math.max(0, Math.min(width, p.x));
        p.y = Math.max(0, Math.min(height, p.y));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.isGreen ? 'rgba(34, 197, 94, 0.2)' : 'rgba(139, 92, 246, 0.15)';
        ctx.fill();
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

  const getStepStatus = (index) => {
    if (index < activeStep) return 'completed';
    if (index === activeStep) return 'active';
    return 'pending';
  };

  return (
    <div className="relative h-[280px] bg-canvas overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Pipeline visualization */}
      <div className="relative z-10 h-full p-4 flex flex-col">
        <div className="text-sm font-medium text-foreground mb-2">Database connection pool exhaustion</div>
        <div className="flex gap-2 mb-4">
          <div className="px-2 py-0.5 rounded text-[9px] font-mono bg-red-500/20 text-red-400 border border-red-500/30">CRITICAL</div>
          <div className="text-[10px] text-muted font-mono mt-0.5">Environment / Dependency</div>
        </div>

        <div className="bg-surface/80 rounded-lg p-3 border border-border mb-3">
          <div className="text-[10px] text-muted font-mono mb-2 text-blue-400">RCA SUMMARY</div>
          <div className="text-xs text-foreground leading-relaxed">Database connection pool exhaustion — connections not released after batch queries</div>
        </div>

        <div className="flex gap-2">
           <div className="flex-1 bg-surface/80 rounded-lg p-3 border border-border">
             <div className="text-[10px] text-muted font-mono mb-1">CONFIDENCE</div>
             <div className="text-xl font-mono text-foreground">85%</div>
           </div>
           <div className="flex-1 bg-surface/80 rounded-lg p-3 border border-border">
             <div className="text-[10px] text-muted font-mono mb-1">REPLAY STATUS</div>
             <div className="text-[10px] font-mono text-green-400 mt-2 px-2 py-1 bg-green-500/10 rounded inline-block border border-green-500/20">REPLAY-READY</div>
           </div>
        </div>
      </div>
    </div>
  );
}

// Smart Context - Knowledge graph visualization
export function SmartContextIllustration() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;

    const nodes = [
      { id: 'core', x: 0.5, y: 0.5, radius: 24, color: '#22c55e', label: 'State' },
      { id: 'github', x: 0.15, y: 0.25, radius: 16, color: '#ffffff', label: 'Memory' },
      { id: 'slack', x: 0.85, y: 0.25, radius: 16, color: '#E01E5A', label: 'Tools' },
      { id: 'docs', x: 0.1, y: 0.7, radius: 16, color: '#0052CC', label: 'Context' },
      { id: 'jira', x: 0.9, y: 0.7, radius: 16, color: '#0052CC', label: 'Human' },
      { id: 'logs', x: 0.35, y: 0.85, radius: 16, color: '#632ca6', label: 'Action' },
      { id: 'metrics', x: 0.65, y: 0.85, radius: 16, color: '#e6522c', label: 'Replay' },
    ];

    const connections = [
      { from: 'core', to: 'github' },
      { from: 'core', to: 'slack' },
      { from: 'core', to: 'docs' },
      { from: 'core', to: 'jira' },
      { from: 'core', to: 'logs' },
      { from: 'core', to: 'metrics' },
    ];

    // Floating ambient particles
    let particles = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

      // Initialize floating particles
      particles = Array(20).fill(null).map(() => ({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        radius: 1 + Math.random() * 1.5,
        isGreen: Math.random() > 0.5,
      }));
    };

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      time += 0.02;

      ctx.fillStyle = '#0b0b0b';
      ctx.fillRect(0, 0, width, height);

      // Dot grid pattern
      ctx.fillStyle = 'rgba(61, 52, 85, 0.1)';
      for (let x = 0; x < width; x += 25) {
        for (let y = 0; y < height; y += 25) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Radial gradient glow in center
      const bgGradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width * 0.5);
      bgGradient.addColorStop(0, 'rgba(34, 197, 94, 0.05)');
      bgGradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.02)');
      bgGradient.addColorStop(1, 'rgba(26, 22, 37, 0)');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Floating ambient particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        p.x = Math.max(0, Math.min(width, p.x));
        p.y = Math.max(0, Math.min(height, p.y));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.isGreen ? 'rgba(34, 197, 94, 0.2)' : 'rgba(139, 92, 246, 0.15)';
        ctx.fill();
      });

      // Draw connections with animated particles
      connections.forEach((conn, i) => {
        const fromNode = nodes.find(n => n.id === conn.from);
        const toNode = nodes.find(n => n.id === conn.to);
        const x1 = fromNode.x * width;
        const y1 = fromNode.y * height;
        const x2 = toNode.x * width;
        const y2 = toNode.y * height;

        // Connection line with gradient
        const lineGradient = ctx.createLinearGradient(x1, y1, x2, y2);
        lineGradient.addColorStop(0, 'rgba(34, 197, 94, 0.4)');
        lineGradient.addColorStop(1, 'rgba(61, 52, 85, 0.3)');
        ctx.beginPath();
        ctx.strokeStyle = lineGradient;
        ctx.lineWidth = 1.5;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        // Multiple animated particles along connection
        for (let p = 0; p < 2; p++) {
          const particleProgress = (time * 0.3 + i * 0.2 + p * 0.5) % 1;
          const px = x1 + (x2 - x1) * particleProgress;
          const py = y1 + (y2 - y1) * particleProgress;

          ctx.beginPath();
          ctx.fillStyle = `rgba(34, 197, 94, ${0.8 - particleProgress * 0.5})`;
          ctx.arc(px, py, 3 - p, 0, Math.PI * 2);
          ctx.fill();

          // Glow
          ctx.beginPath();
          ctx.fillStyle = `rgba(34, 197, 94, ${0.15 - particleProgress * 0.1})`;
          ctx.arc(px, py, 8, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Draw node glows and orbit trails
      nodes.forEach((node) => {
        const x = node.x * width;
        const y = node.y * height;
        const pulseScale = 1 + Math.sin(time * 2) * 0.1;

        if (node.id === 'core') {
          // Orbit trails around center
          for (let i = 0; i < 3; i++) {
            const orbitRadius = 35 + i * 12;
            const orbitAngle = time * (0.5 - i * 0.1) + i * (Math.PI * 2 / 3);
            const orbX = x + Math.cos(orbitAngle) * orbitRadius;
            const orbY = y + Math.sin(orbitAngle) * orbitRadius;

            // Orbit path (subtle)
            ctx.beginPath();
            ctx.strokeStyle = `rgba(34, 197, 94, ${0.1 - i * 0.02})`;
            ctx.lineWidth = 1;
            ctx.arc(x, y, orbitRadius, 0, Math.PI * 2);
            ctx.stroke();

            // Orbiting particle
            ctx.beginPath();
            ctx.fillStyle = `rgba(34, 197, 94, ${0.6 - i * 0.15})`;
            ctx.arc(orbX, orbY, 3 - i * 0.5, 0, Math.PI * 2);
            ctx.fill();
          }

          // Central glow
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, node.radius * 2.5 * pulseScale);
          gradient.addColorStop(0, 'rgba(34, 197, 94, 0.35)');
          gradient.addColorStop(0.5, 'rgba(34, 197, 94, 0.15)');
          gradient.addColorStop(1, 'rgba(34, 197, 94, 0)');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(x, y, node.radius * 2.5 * pulseScale, 0, Math.PI * 2);
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
    <div className="relative h-[280px] bg-canvas overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="relative z-10 w-full h-full">
        {/* Integration nodes */}
        <div className="absolute top-[18%] left-[10%] flex flex-col items-center">
          <div className="w-9 h-9 bg-surface border border-border rounded-lg flex items-center justify-center hover:scale-110 transition-transform cursor-pointer" style={{ boxShadow: '0 0 15px rgba(255, 255, 255, 0.1)' }}>
            <div className="text-white"><GitHubIcon /></div>
          </div>
          <span className="text-[8px] text-muted mt-1 font-mono">Memory</span>
        </div>

        <div className="absolute top-[18%] right-[10%] flex flex-col items-center">
          <div className="w-9 h-9 bg-surface border border-border rounded-lg flex items-center justify-center hover:scale-110 transition-transform cursor-pointer" style={{ boxShadow: '0 0 15px rgba(224, 30, 90, 0.2)' }}>
            <div className="text-[#E01E5A]"><SlackIcon /></div>
          </div>
          <span className="text-[8px] text-muted mt-1 font-mono">Tools</span>
        </div>

        <div className="absolute top-[62%] left-[5%] flex flex-col items-center">
          <div className="w-9 h-9 bg-surface border border-border rounded-lg flex items-center justify-center hover:scale-110 transition-transform cursor-pointer" style={{ boxShadow: '0 0 15px rgba(0, 82, 204, 0.2)' }}>
            <div className="text-[#0052CC]"><ConfluenceIcon /></div>
          </div>
          <span className="text-[8px] text-muted mt-1 font-mono">Context</span>
        </div>

        <div className="absolute top-[62%] right-[5%] flex flex-col items-center">
          <div className="w-9 h-9 bg-surface border border-border rounded-lg flex items-center justify-center hover:scale-110 transition-transform cursor-pointer" style={{ boxShadow: '0 0 15px rgba(0, 82, 204, 0.2)' }}>
            <div className="text-[#0052CC]"><JiraIcon /></div>
          </div>
          <span className="text-[8px] text-muted mt-1 font-mono">Human</span>
        </div>

        <div className="absolute bottom-[8%] left-[28%] flex flex-col items-center">
          <div className="w-9 h-9 bg-surface border border-border rounded-lg flex items-center justify-center hover:scale-110 transition-transform cursor-pointer" style={{ boxShadow: '0 0 15px rgba(99, 44, 166, 0.2)' }}>
            <div className="text-[#632ca6]"><DatadogIcon /></div>
          </div>
          <span className="text-[8px] text-muted mt-1 font-mono">Action</span>
        </div>

        <div className="absolute bottom-[8%] right-[28%] flex flex-col items-center">
          <div className="w-9 h-9 bg-surface border border-border rounded-lg flex items-center justify-center hover:scale-110 transition-transform cursor-pointer" style={{ boxShadow: '0 0 15px rgba(230, 82, 44, 0.2)' }}>
            <div className="text-[#e6522c]"><PrometheusIcon /></div>
          </div>
          <span className="text-[8px] text-muted mt-1 font-mono">Replay</span>
        </div>

        {/* Center node */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="w-14 h-14 rounded-full bg-surface border-2 border-green-500 flex items-center justify-center" style={{ boxShadow: '0 0 30px rgba(34, 197, 94, 0.4)' }}>
            <svg className="w-7 h-7 text-green-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-[9px] text-green-400 mt-1 font-mono">State Graph</span>
        </div>
      </div>
    </div>
  );
}

// Global Coverage - World map with active regions
export function GlobalCoverageIllustration() {
  const canvasRef = useRef(null);
  const [activeRegion, setActiveRegion] = useState(0);

  const regions = [
    { name: 'Code Reviewer', x: 0.2, y: 0.2, provider: 'k8s', latency: 12 },
    { name: 'Deploy Bot', x: 0.5, y: 0.4, provider: 'aws', latency: 18 },
    { name: 'Analytics', x: 0.8, y: 0.3, provider: 'gcp', latency: 45 },
    { name: 'Security', x: 0.7, y: 0.7, provider: 'k8s', latency: 89 },
    { name: 'CI Monitor', x: 0.2, y: 0.7, provider: 'aws', latency: 65 },
    { name: 'Audit Logger', x: 0.45, y: 0.85, provider: 'gcp', latency: 120 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveRegion((prev) => (prev + 1) % regions.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;

    // Floating ambient particles
    let particles = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

      // Initialize floating particles
      particles = Array(25).fill(null).map(() => ({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        radius: 1 + Math.random() * 1.5,
        isGreen: Math.random() > 0.5,
      }));
    };

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      time += 0.02;

      ctx.fillStyle = '#0b0b0b';
      ctx.fillRect(0, 0, width, height);

      // Dot grid pattern (representing world map dots)
      ctx.fillStyle = 'rgba(61, 52, 85, 0.08)';
      for (let x = 0; x < width; x += 20) {
        for (let y = 0; y < height; y += 20) {
          // Add some variation to simulate continental shapes
          const noise = Math.sin(x * 0.02) * Math.cos(y * 0.03);
          if (noise > -0.3) {
            ctx.beginPath();
            ctx.arc(x, y, 1, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // Radial gradient glow
      const bgGradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width * 0.6);
      bgGradient.addColorStop(0, 'rgba(34, 197, 94, 0.03)');
      bgGradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.02)');
      bgGradient.addColorStop(1, 'rgba(26, 22, 37, 0)');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Floating ambient particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        p.x = Math.max(0, Math.min(width, p.x));
        p.y = Math.max(0, Math.min(height, p.y));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.isGreen ? 'rgba(34, 197, 94, 0.2)' : 'rgba(139, 92, 246, 0.15)';
        ctx.fill();
      });

      // Draw connection arcs between regions
      regions.forEach((region, i) => {
        regions.forEach((otherRegion, j) => {
          if (i >= j) return;

          const x1 = region.x * width;
          const y1 = region.y * height;
          const x2 = otherRegion.x * width;
          const y2 = otherRegion.y * height;

          // Curved connection
          const midX = (x1 + x2) / 2;
          const midY = (y1 + y2) / 2 - 30;

          // Connection line with gradient
          const lineGradient = ctx.createLinearGradient(x1, y1, x2, y2);
          lineGradient.addColorStop(0, 'rgba(34, 197, 94, 0.2)');
          lineGradient.addColorStop(0.5, 'rgba(34, 197, 94, 0.25)');
          lineGradient.addColorStop(1, 'rgba(34, 197, 94, 0.2)');
          ctx.beginPath();
          ctx.strokeStyle = lineGradient;
          ctx.lineWidth = 1;
          ctx.moveTo(x1, y1);
          ctx.quadraticCurveTo(midX, midY, x2, y2);
          ctx.stroke();

          // Multiple animated data packets
          for (let p = 0; p < 2; p++) {
            const progress = (time * 0.2 + i * 0.15 + j * 0.1 + p * 0.5) % 1;
            const t = progress;
            const px = (1-t)*(1-t)*x1 + 2*(1-t)*t*midX + t*t*x2;
            const py = (1-t)*(1-t)*y1 + 2*(1-t)*t*midY + t*t*y2;

            ctx.beginPath();
            ctx.fillStyle = `rgba(34, 197, 94, ${0.7 - progress * 0.5})`;
            ctx.arc(px, py, 2.5 - p * 0.5, 0, Math.PI * 2);
            ctx.fill();

            // Particle glow
            ctx.beginPath();
            ctx.fillStyle = `rgba(34, 197, 94, ${0.1 - progress * 0.08})`;
            ctx.arc(px, py, 6, 0, Math.PI * 2);
            ctx.fill();
          }
        });
      });

      // Draw region pulses
      regions.forEach((region, i) => {
        const x = region.x * width;
        const y = region.y * height;
        const isActive = i === activeRegion;

        if (isActive) {
          // Multiple expanding rings
          for (let r = 0; r < 2; r++) {
            const pulseRadius = 18 + Math.sin(time * 3 + r * Math.PI) * 6 + r * 8;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(34, 197, 94, ${0.3 - r * 0.1})`;
            ctx.lineWidth = 2 - r * 0.5;
            ctx.arc(x, y, pulseRadius, 0, Math.PI * 2);
            ctx.stroke();
          }
        }

        // Region glow
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 18);
        gradient.addColorStop(0, isActive ? 'rgba(34, 197, 94, 0.5)' : 'rgba(34, 197, 94, 0.25)');
        gradient.addColorStop(0.5, isActive ? 'rgba(34, 197, 94, 0.2)' : 'rgba(34, 197, 94, 0.1)');
        gradient.addColorStop(1, 'rgba(34, 197, 94, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, 18, 0, Math.PI * 2);
        ctx.fill();
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
  }, [activeRegion]);

  const providerIcons = {
    aws: <AWSIcon />,
    gcp: <GCPIcon />,
    k8s: <KubernetesIcon />,
  };

  const providerColors = {
    aws: '#FF9900',
    gcp: '#4285F4',
    k8s: '#326CE5',
  };

  return (
    <div className="relative h-[280px] bg-canvas overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="relative z-10 w-full h-full">
        {/* Region nodes */}
        {regions.map((region, i) => (
          <div
            key={region.name}
            className="absolute flex flex-col items-center transition-all duration-300"
            style={{
              left: `${region.x * 100}%`,
              top: `${region.y * 100}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div
              className={`w-8 h-8 rounded-lg bg-surface border flex items-center justify-center transition-all ${i === activeRegion ? 'scale-125 border-green-500' : 'border-border'}`}
              style={{ boxShadow: `0 0 15px ${providerColors[region.provider]}30` }}
            >
              <div style={{ color: providerColors[region.provider] }}>{providerIcons[region.provider]}</div>
            </div>
            <span className="text-[8px] text-muted mt-1 font-mono">{region.name}</span>
            {i === activeRegion && (
              <span className="text-[8px] text-green-400 font-mono">{region.latency}ms</span>
            )}
          </div>
        ))}

        {/* Status panel */}
        <div className="absolute bottom-3 left-3 right-3 bg-surface/90 rounded-lg p-2 border border-border">
          <div className="flex items-center justify-between text-[9px] font-mono">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-400">6 Agents Online</span>
            </div>
            <span className="text-purple-400">Avg Handoff: 58ms</span>
            <span className="text-muted">Topology Sync</span>
          </div>
        </div>
      </div>
    </div>
  );
}
