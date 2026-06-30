import { motion } from 'framer-motion';
import { textReveal } from '../../lib/animations';

const AnimatedText = ({
    text,
    className = '',
    as: Component = 'span',
    staggerDelay = 0.03,
    wordBased = false
}) => {
    const items = wordBased ? text.split(' ') : text.split('');

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: staggerDelay,
                delayChildren: 0.1
            }
        }
    };

    const child = {
        hidden: {
            opacity: 0,
            y: 20,
            filter: 'blur(8px)'
        },
        visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: {
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94]
            }
        }
    };

    return (
        <motion.span
            className={`inline-block ${className}`}
            variants={container}
            initial="hidden"
            animate="visible"
        >
            {items.map((item, index) => (
                <motion.span
                    key={index}
                    className="inline-block"
                    variants={child}
                >
                    {item}
                    {wordBased && index < items.length - 1 && '\u00A0'}
                </motion.span>
            ))}
        </motion.span>
    );
};

export default AnimatedText;
