import { motion } from 'framer-motion';
import { forwardRef } from 'react';

const Button = forwardRef(({
    children,
    variant = 'primary',
    size = 'md',
    href,
    className = '',
    ...props
}, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-dark-950';

    const variants = {
        primary: 'bg-accent hover:bg-accent-dark text-white shadow-lg shadow-accent/20 hover:shadow-accent/30',
        secondary: 'bg-dark-700 hover:bg-dark-600 text-text-primary border border-dark-500 hover:border-dark-400',
        ghost: 'bg-transparent hover:bg-dark-700/50 text-text-secondary hover:text-text-primary',
        outline: 'bg-transparent border border-accent/50 text-accent hover:bg-accent/10 hover:border-accent',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm gap-1.5',
        md: 'px-5 py-2.5 text-sm gap-2',
        lg: 'px-6 py-3 text-base gap-2.5',
    };

    const buttonClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

    const MotionComponent = motion.create(href ? 'a' : 'button');

    return (
        <MotionComponent
            ref={ref}
            href={href}
            className={buttonClasses}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            {...props}
        >
            {children}
        </MotionComponent>
    );
});

Button.displayName = 'Button';

export default Button;
