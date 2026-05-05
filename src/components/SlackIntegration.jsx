import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, Clock, Zap, MessageCircle, Users, GitBranch } from 'lucide-react';

// Typing indicator component
function TypingIndicator({ name, avatar }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex gap-3 p-3"
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
        style={{ backgroundColor: avatar.color }}
      >
        {avatar.initials}
      </div>
      <div className="flex items-center gap-1 text-muted text-sm">
        <span className="font-medium text-foreground">{name}</span>
        <span>is typing</span>
        <div className="flex gap-1 ml-1">
          <motion.span
            className="w-1.5 h-1.5 bg-muted rounded-full"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0 }}
          />
          <motion.span
            className="w-1.5 h-1.5 bg-muted rounded-full"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
          />
          <motion.span
            className="w-1.5 h-1.5 bg-muted rounded-full"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
          />
        </div>
      </div>
    </motion.div>
  );
}

// Slack-style message component
function SlackMessage({ avatar, name, time, children, isNew = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`flex gap-3 p-3 hover:bg-surface rounded-lg transition-colors ${isNew ? 'bg-violet-500/10' : ''}`}
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
        style={{ backgroundColor: avatar.color }}
      >
        {avatar.initials}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="font-semibold text-foreground">{name}</span>
          <span className="text-xs text-muted">{time}</span>
          {isNew && (
            <span className="px-1.5 py-0.5 bg-violet-500/20 rounded text-[10px] text-violet-600 dark:text-violet-300 font-medium">NEW</span>
          )}
        </div>
        <div className="text-muted text-sm mt-0.5">{children}</div>
      </div>
    </motion.div>
  );
}

// Alert card component
function AlertCard() {
  return (
    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
          <AlertTriangle className="w-4 h-4 text-red-500 dark:text-red-300" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-red-500 dark:text-red-300">Critical Alert</span>
            <span className="px-2 py-0.5 bg-red-500/20 rounded text-xs text-red-500 dark:text-red-300">P1</span>
          </div>
          <p className="text-sm text-muted mt-1">
            Production API latency spike detected on <code className="text-red-500 dark:text-red-300 bg-red-500/10 px-1 rounded border border-red-500/30">user-service</code>
          </p>
          <div className="flex items-center gap-4 mt-3 text-xs text-muted">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" /> 2 min ago
            </span>
            <span>Affected: 12,847 requests</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Analysis card component
function AnalysisCard({ onApplyFix }) {
  const [isApplying, setIsApplying] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  const handleApply = () => {
    setIsApplying(true);
    setTimeout(() => {
      setIsApplying(false);
      setIsApplied(true);
      onApplyFix?.();
    }, 1500);
  };

  return (
    <div className="bg-violet-500/10 border border-violet-500/30 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 bg-violet-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
          <Zap className="w-4 h-4 text-violet-500 dark:text-violet-300" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-violet-500 dark:text-violet-300">Lumniverse Analysis</span>
            <span className="px-2 py-0.5 bg-violet-500/20 rounded text-xs text-violet-500 dark:text-violet-300">AI</span>
          </div>
          <div className="mt-3 space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-muted">Root cause: Connection pool exhausted on postgres-primary</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-muted">Impact: 47 downstream services affected</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-muted">Suggested fix: Increase max_connections from 100 to 200</span>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            {!isApplied ? (
              <>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleApply}
                  disabled={isApplying}
                  className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {isApplying ? (
                    <>
                      <motion.div
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      />
                      Applying...
                    </>
                  ) : (
                    'Apply Fix'
                  )}
                </motion.button>
                <button className="px-4 py-2 bg-surface hover:bg-border text-muted text-sm font-medium rounded-lg transition-colors">
                  View Details
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2 text-green-500 text-sm font-medium">
                <CheckCircle className="w-4 h-4" />
                Fix applied successfully
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Resolution card
function ResolutionCard() {
  return (
    <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
          <CheckCircle className="w-4 h-4 text-emerald-500 dark:text-emerald-300" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-emerald-500 dark:text-emerald-300">Incident Resolved</span>
            <span className="px-2 py-0.5 bg-emerald-500/20 rounded text-xs text-emerald-500 dark:text-emerald-300">Auto</span>
          </div>
          <p className="text-sm text-muted mt-1">
            Database connection pool increased. All services recovered. MTTR: <span className="text-emerald-500 dark:text-emerald-300 font-semibold">3m 42s</span>
          </p>
        </div>
      </div>
    </div>
  );
}

// Git card
function GitCard() {
  return (
    <div className="bg-surface border border-border rounded-lg p-4">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 bg-canvas rounded-lg flex items-center justify-center flex-shrink-0">
          <GitBranch className="w-4 h-4 text-muted" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">Auto-generated PR</span>
            <span className="px-2 py-0.5 bg-canvas rounded text-xs text-muted">#1847</span>
          </div>
          <p className="text-sm text-muted mt-1">
            <code className="text-blue-500 dark:text-blue-300 bg-blue-500/10 px-1 rounded border border-blue-500/30">fix: increase postgres max_connections</code>
          </p>
          <div className="flex items-center gap-3 mt-2 text-xs">
            <span className="text-emerald-500">+2 lines</span>
            <span className="text-rose-500">-1 line</span>
            <span className="text-muted">in config/database.yml</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reaction emoji component
function Reactions({ reactions }) {
  return (
    <div className="flex gap-1 mt-2">
      {reactions.map((r, i) => (
        <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 bg-surface border border-border rounded-full text-xs">
          {r.emoji} <span className="text-muted">{r.count}</span>
        </span>
      ))}
    </div>
  );
}

export function SlackIntegration() {
  const sectionRef = useRef(null);
  const [visibleMessages, setVisibleMessages] = useState(0);
  const [typingUser, setTypingUser] = useState(null);
  const [showResolution, setShowResolution] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // Message sequence with timing
  const messageSequence = [
    { id: 1, type: 'message', delay: 500 },
    { id: 2, type: 'typing', user: 'John Doe', avatar: { initials: 'JD', color: '#3b82f6' }, delay: 1000 },
    { id: 3, type: 'message', delay: 1500 },
    { id: 4, type: 'typing', user: 'Lumniverse', avatar: { initials: 'LV', color: '#7c3aed' }, delay: 800 },
    { id: 5, type: 'message', delay: 1200 },
    { id: 6, type: 'typing', user: 'Sarah Chen', avatar: { initials: 'SC', color: '#10b981' }, delay: 1000 },
    { id: 7, type: 'message', delay: 1000 },
    { id: 8, type: 'typing', user: 'Mike Wilson', avatar: { initials: 'MW', color: '#f59e0b' }, delay: 800 },
    { id: 9, type: 'message', delay: 1000 },
  ];

  // Start animation when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  // Run message sequence
  useEffect(() => {
    if (!hasStarted) return;

    let timeoutId;
    let currentIndex = 0;
    let totalDelay = 0;

    const showNext = () => {
      if (currentIndex >= messageSequence.length) return;

      const item = messageSequence[currentIndex];
      totalDelay += item.delay;

      timeoutId = setTimeout(() => {
        if (item.type === 'typing') {
          setTypingUser({ name: item.user, avatar: item.avatar });
        } else {
          setTypingUser(null);
          setVisibleMessages((prev) => prev + 1);
        }
        currentIndex++;
        showNext();
      }, item.delay);
    };

    showNext();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [hasStarted]);

  // All messages in order
  const allMessages = [
    {
      id: 1,
      avatar: { initials: 'LV', color: '#7c3aed' },
      name: 'Lumniverse',
      time: '2:34 PM',
      content: <AlertCard />,
    },
    {
      id: 2,
      avatar: { initials: 'JD', color: '#3b82f6' },
      name: 'John Doe',
      time: '2:35 PM',
      content: (
        <div>
          <p>Looking into this now. @lumniverse can you analyze?</p>
          <Reactions reactions={[{ emoji: '👀', count: 2 }, { emoji: '👍', count: 1 }]} />
        </div>
      ),
    },
    {
      id: 3,
      avatar: { initials: 'LV', color: '#7c3aed' },
      name: 'Lumniverse',
      time: '2:35 PM',
      content: <AnalysisCard onApplyFix={() => setShowResolution(true)} />,
    },
    {
      id: 4,
      avatar: { initials: 'SC', color: '#10b981' },
      name: 'Sarah Chen',
      time: '2:36 PM',
      content: (
        <div>
          <p>Nice catch! This explains the complaints we were getting from mobile team.</p>
          <Reactions reactions={[{ emoji: '💯', count: 3 }]} />
        </div>
      ),
    },
    {
      id: 5,
      avatar: { initials: 'MW', color: '#f59e0b' },
      name: 'Mike Wilson',
      time: '2:36 PM',
      content: <p>@john go ahead and apply the fix, I'll monitor the dashboards</p>,
    },
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-canvas/80">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-full text-sm text-muted mb-6">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#E01E5A]">
              <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zm10.124 2.521a2.528 2.528 0 0 1 2.52-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.52V8.834zm-1.271 0a2.528 2.528 0 0 1-2.521 2.521 2.528 2.528 0 0 1-2.521-2.521V2.522A2.528 2.528 0 0 1 15.166 0a2.528 2.528 0 0 1 2.521 2.522v6.312zm-2.521 10.124a2.528 2.528 0 0 1 2.521 2.52A2.528 2.528 0 0 1 15.166 24a2.528 2.528 0 0 1-2.521-2.522v-2.52h2.521zm0-1.271a2.528 2.528 0 0 1-2.521-2.521 2.528 2.528 0 0 1 2.521-2.521h6.312A2.528 2.528 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.521h-6.312z"/>
            </svg>
            Slack Integration
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-4">
            Resolve incidents where you work
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Get alerts, analysis, and apply fixes directly from Slack
          </p>
        </motion.div>

        {/* Slack-style interface */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-background border border-border rounded-xl overflow-hidden shadow-lg">
            {/* Slack header */}
            <div className="px-4 py-3 border-b border-border flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-muted">#</span>
                <span className="font-semibold text-foreground">incidents-prod</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted">
                <Users className="w-3 h-3" />
                <span>24 members</span>
              </div>
              <div className="flex items-center gap-1 ml-auto">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-muted">4 online</span>
              </div>
            </div>

            {/* Messages */}
            <div className="p-4 space-y-1 min-h-[400px]">
              <AnimatePresence mode="popLayout">
                {allMessages.slice(0, visibleMessages).map((msg, index) => (
                  <SlackMessage
                    key={msg.id}
                    avatar={msg.avatar}
                    name={msg.name}
                    time={msg.time}
                    isNew={index === visibleMessages - 1 && visibleMessages > 1}
                  >
                    {msg.content}
                  </SlackMessage>
                ))}

                {typingUser && (
                  <TypingIndicator
                    key="typing"
                    name={typingUser.name}
                    avatar={typingUser.avatar}
                  />
                )}

                {showResolution && (
                  <SlackMessage
                    key="resolution"
                    avatar={{ initials: 'LV', color: '#7c3aed' }}
                    name="Lumniverse"
                    time="2:38 PM"
                    isNew
                  >
                    <ResolutionCard />
                  </SlackMessage>
                )}

                {showResolution && (
                  <SlackMessage
                    key="git"
                    avatar={{ initials: 'LV', color: '#7c3aed' }}
                    name="Lumniverse"
                    time="2:38 PM"
                  >
                    <GitCard />
                  </SlackMessage>
                )}

                {showResolution && (
                  <SlackMessage
                    key="celebration"
                    avatar={{ initials: 'SC', color: '#10b981' }}
                    name="Sarah Chen"
                    time="2:39 PM"
                  >
                    <div>
                      <p>That was fast! Great work team 🎉</p>
                      <Reactions reactions={[{ emoji: '🎉', count: 4 }, { emoji: '🚀', count: 2 }, { emoji: '❤️', count: 3 }]} />
                    </div>
                  </SlackMessage>
                )}
              </AnimatePresence>
            </div>

            {/* Input area */}
            <div className="px-4 py-3 border-t border-border">
              <div className="bg-surface rounded-lg px-4 py-2 text-muted text-sm flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                <span>Message #incidents-prod</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
