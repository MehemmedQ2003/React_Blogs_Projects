
import { ReactNode } from 'react';

const AnimatedContainer = ({ 
  children, 
  animation = 'fade', 
  className = '', 
  delay = 0 
}) => {
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
