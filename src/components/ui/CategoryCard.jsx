
import { Link } from 'react-router-dom';
import AnimatedContainer from './AnimatedContainer';

const CategoryCard = ({ id, name, description, image, index = 0 }) => {
  return (
    <AnimatedContainer 
      animation="fade" 
      delay={index * 150}
      className="group"
    >
      <Link to={`/categories/${id}`} className="block">
        <div className="rounded-2xl overflow-hidden relative h-64 glass shadow-sm hover:shadow-md transition-all duration-300">
          <div className="absolute inset-0">
            <img 
              src={image} 
              alt={name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 className="text-2xl font-medium mb-2">{name}</h3>
            <p className="text-sm text-white/80">{description}</p>
          </div>
          
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="bg-white/90 backdrop-blur-sm text-black text-xs font-medium px-3 py-1 rounded-full">
              View Articles
            </span>
          </div>
        </div>
      </Link>
    </AnimatedContainer>
  );
};

export default CategoryCard;
