
import { ReactNode } from 'react';

interface AnimatedContainerProps {
  children: ReactNode;
  animation?: 'fade' | 'scale' | 'slide' | 'none';
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
