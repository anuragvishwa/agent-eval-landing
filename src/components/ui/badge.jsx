import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

function Badge({ className, children, ...props }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-accent/10 text-accent border border-accent/20',
        className
      )}
      {...props}
    >
      {children}
    </motion.span>
  );
}

export { Badge };
