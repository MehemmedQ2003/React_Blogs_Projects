
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AnimatedContainer from '../components/ui/AnimatedContainer';
import BlogCard from '../components/ui/BlogCard';
import { fetchBlogsByCategory, fetchCategoryById } from '../utils/dataFetcher';
import { ArrowLeft } from 'lucide-react';

const CategoryBlogs = () => {
  const { id } = useParams<{ id: string }>();
  const [blogs, setBlogs] = useState<any[]>([]);
  const [category, setCategory] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const categoryId = parseInt(id);
        const [categoryData, blogsData] = await Promise.all([
          fetchCategoryById(categoryId),
          fetchBlogsByCategory(categoryId)
        ]);
        
        setCategory(categoryData);
        setBlogs(blogsData);
      } catch (error) {
        console.error(`Error loading category ${id} data:`, error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  if (!id) {
    return <div>Invalid category ID</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section 
        className="pt-32 pb-16 relative bg-cover bg-center"
        style={{ 
          backgroundImage: category ? `url(${category.image})` : 'none',
          backgroundColor: !category ? '#f9fafb' : undefined
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedContainer animation="fade" className="max-w-3xl mx-auto">
            <Link to="/categories" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors">
              <ArrowLeft size={16} className="mr-2" />
              Back to Categories
            </Link>
            
            {loading ? (
              <div>
                <div className="h-12 w-48 bg-gray-200 animate-pulse rounded mb-4"></div>
                <div className="h-8 w-full bg-gray-200 animate-pulse rounded"></div>
              </div>
            ) : category ? (
              <>
                <span className="inline-block px-4 py-1 rounded-full bg-white/10 text-white text-sm font-medium backdrop-blur-sm mb-6">
                  Category
                </span>
                <h1 className="text-5xl font-bold text-white mb-6">{category.name}</h1>
                <p className="text-xl text-white/80">
                  {category.description}
                </p>
              </>
            ) : (
              <div className="text-center text-white">
                <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
                <p className="mb-8">The category you're looking for doesn't exist.</p>
                <Link 
                  to="/categories" 
                  className="px-6 py-3 rounded-full bg-white text-black hover:bg-gray-100 transition-colors"
                >
                  Browse All Categories
                </Link>
              </div>
            )}
          </AnimatedContainer>
        </div>
      </section>
      
      {/* Blogs Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="h-96 rounded-2xl bg-gray-200 animate-pulse"></div>
              ))}
            </div>
          ) : blogs.length > 0 ? (
            <>
              <AnimatedContainer animation="fade" className="mb-12">
                <h2 className="text-3xl font-bold text-center">
                  {blogs.length} Article{blogs.length !== 1 ? 's' : ''} in {category?.name}
                </h2>
              </AnimatedContainer>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {blogs.map((blog, index) => (
                  <BlogCard
                    key={blog.id}
                    id={blog.id}
                    title={blog.title}
                    excerpt={blog.excerpt}
                    image={blog.image}
                    author={blog.author}
                    date={blog.date}
                    index={index}
                  />
                ))}
              </div>
            </>
          ) : (
            <AnimatedContainer animation="fade" className="text-center py-16">
              <h3 className="text-2xl font-bold mb-4">No articles in this category yet</h3>
              <p className="text-muted-foreground mb-6">
                Check back soon for new content or explore other categories.
              </p>
              <Link
                to="/categories"
                className="px-6 py-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
              >
                Browse Categories
              </Link>
            </AnimatedContainer>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default CategoryBlogs;
