import { useRef, ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  once?: boolean;
};

export function Reveal({ children, delay = 0, className = '', once = true }: RevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

type RevealLineProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'span' | 'p' | 'h1' | 'h2' | 'h3';
};

export function RevealLine({ children, delay = 0, className = '', as: Tag = 'div' }: RevealLineProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div className="mask" ref={ref} style={{ paddingBottom: '0.5em', marginBottom: '-0.5em' }}>
      <motion.div
        initial={{ y: '110%' }}
        animate={inView ? { y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      >
        <Tag className={className}>{children}</Tag>
      </motion.div>
    </div>
  );
}
