import { motion } from 'framer-motion';

const Badge = ({ children, variant = 'default', className = '' }) => {
    const variants = {
        default: 'bg-dark-700/80 text-text-secondary border-dark-600',
        accent: 'bg-accent/10 text-accent border-accent/30',
        success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
        warning: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    };

    return (
        <motion.span
            className={`
        inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
        border backdrop-blur-sm
        ${variants[variant]}
        ${className}
      `}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
        >
            {children}
        </motion.span>
    );
};

export default Badge;
