import { motion } from 'framer-motion';

const GlowEffect = ({
    children,
    color = 'accent',
    intensity = 'normal',
    className = ''
}) => {
    const colors = {
        accent: 'from-accent/30 to-accent/10',
        blue: 'from-blue-500/30 to-blue-500/10',
        purple: 'from-purple-500/30 to-purple-500/10',
    };

    const intensities = {
        subtle: 'blur-xl opacity-30',
        normal: 'blur-2xl opacity-50',
        strong: 'blur-3xl opacity-70',
    };

    return (
        <div className={`relative ${className}`}>
            <motion.div
                className={`
          absolute inset-0 -z-10 bg-gradient-radial ${colors[color]} ${intensities[intensity]}
          rounded-full transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2
        `}
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.7, 0.5]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut'
                }}
            />
            {children}
        </div>
    );
};

export default GlowEffect;
