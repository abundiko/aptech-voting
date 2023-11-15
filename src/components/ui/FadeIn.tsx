import { motion } from "framer-motion";

export default function FadeIn({
  children,
  className,
  wait
}: {
  children: React.ReactNode;
  className?: string;
  wait: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: wait }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
