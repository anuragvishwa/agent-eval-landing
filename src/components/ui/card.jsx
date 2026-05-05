import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

function Card({ className, children, ...props }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={cn(
        'rounded-xl bg-canvas border border-border p-6 transition-all duration-300 hover:border-border-hover',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

function CardHeader({ className, children, ...props }) {
  return (
    <div className={cn('mb-4', className)} {...props}>
      {children}
    </div>
  );
}

function CardTitle({ className, children, ...props }) {
  return (
    <h3 className={cn('text-lg font-semibold text-foreground', className)} {...props}>
      {children}
    </h3>
  );
}

function CardDescription({ className, children, ...props }) {
  return (
    <p className={cn('text-sm text-muted leading-relaxed', className)} {...props}>
      {children}
    </p>
  );
}

export { Card, CardHeader, CardTitle, CardDescription };
