import { motion } from 'framer-motion';
import { hoverLift } from '../../lib/animations';

const Card = ({
    children,
    className = '',
    hover = true,
    glow = false,
    ...props
}) => {
    return (
        <motion.div
            className={`
        bg-dark-800/60 backdrop-blur-sm rounded-xl border border-dark-600/50
        ${glow ? 'glow-box' : ''}
        ${className}
      `}
            variants={hoverLift}
            initial="rest"
            whileHover={hover ? "hover" : undefined}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default Card;
