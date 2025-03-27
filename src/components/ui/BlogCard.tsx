
import { Link } from 'react-router-dom';
import AnimatedContainer from './AnimatedContainer';

interface BlogCardProps {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  category?: string;
  index?: number;
}

const BlogCard = ({ id, title, excerpt, image, author, date, category, index = 0 }: BlogCardProps) => {
  // Format date
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <AnimatedContainer 
      animation="fade" 
      delay={index * 100}
      className="group"
    >
      <Link to={`/blogs/${id}`} className="block">
        <div className="rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
          <div className="relative overflow-hidden h-64">
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {category && (
              <span className="absolute top-4 left-4 text-xs font-medium bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                {category}
              </span>
            )}
          </div>
          
          <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-medium mb-2 group-hover:text-primary transition-colors duration-300">{title}</h3>
            <p className="text-muted-foreground text-sm mb-4 flex-grow">{excerpt}</p>
            
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
              <span className="text-sm font-medium">{author}</span>
              <span className="text-xs text-muted-foreground">{formattedDate}</span>
            </div>
          </div>
        </div>
      </Link>
    </AnimatedContainer>
  );
};

export default BlogCard;
