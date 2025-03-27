
import { ReactNode } from 'react';

interface AnimatedContainerProps {
  children: ReactNode;
  animation?: 'fade' | 'scale' | 'slide' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'none';
  className?: string;
  delay?: number; 
}

const AnimatedContainer = ({ 
  children, 
  animation = 'fade', 
  className = '', 
  delay = 0 
}: AnimatedContainerProps) => {
  let animationClass = '';
  
  switch (animation) {
    case 'fade':
      animationClass = 'animate-fade-in';
      break;
    case 'scale':
      animationClass = 'animate-scale-in';
      break;
    case 'slide':
      animationClass = 'animate-slide-in-bottom';
      break;
    case 'slide-up':
      animationClass = 'animate-slide-up';
      break;
    case 'slide-down':
      animationClass = 'animate-slide-down';
      break;
    case 'slide-left':
      animationClass = 'animate-slide-in-left';
      break;
    case 'slide-right':
      animationClass = 'animate-slide-in-right';
      break;
    case 'none':
    default:
      animationClass = '';
  }
  
  const delayStyle = {
    animationDelay: delay > 0 ? `${delay}ms` : undefined
  };

  return (
    <div className={`${animationClass} ${className}`} style={delayStyle}>
      {children}
    </div>
  );
};

export default AnimatedContainer;
