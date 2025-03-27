
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import AnimatedContainer from '../components/ui/AnimatedContainer';
import BlogCard from '../components/ui/BlogCard';
import CategoryCard from '../components/ui/CategoryCard';
import { fetchBlogs, fetchCategories } from '../utils/dataFetcher';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const Index = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [blogsData, categoriesData] = await Promise.all([
          fetchBlogs(),
          fetchCategories()
        ]);
        
        setBlogs(blogsData.slice(0, 3)); // Take first 3 blogs for the homepage
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error loading homepage data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Find category names for blogs
  const getBlogWithCategory = (blog: any) => {
    const category = categories.find(c => c.id === blog.category);
    return {
      ...blog,
      categoryName: category ? category.name : ''
    };
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative">
        <div className="container mx-auto px-4">
          <AnimatedContainer animation="fade" className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Welcome to MinimalBlog
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              Stories and ideas that inspire
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              A beautiful blog exploring design, technology, business, and lifestyle topics with a focus on simplicity and clarity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/blogs" 
                className="px-8 py-3 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors font-medium"
              >
                Explore Articles
              </Link>
              <Link 
                to="/about" 
                className="px-8 py-3 rounded-full bg-secondary text-gray-800 hover:bg-secondary/80 transition-colors font-medium"
              >
                Learn More
              </Link>
            </div>
          </AnimatedContainer>
        </div>
      </section>
      
      {/* Featured Articles */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <AnimatedContainer animation="fade" className="mb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold mb-2">Featured Articles</h2>
                <p className="text-muted-foreground">Our latest and most notable stories</p>
              </div>
              <Link 
                to="/blogs" 
                className="group flex items-center text-primary font-medium"
              >
                View all articles
                <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={18} />
              </Link>
            </div>
          </AnimatedContainer>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="h-96 rounded-2xl bg-gray-200 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogs.map((blog, index) => {
                const blogWithCategory = getBlogWithCategory(blog);
                return (
                  <BlogCard
                    key={blog.id}
                    id={blog.id}
                    title={blog.title}
                    excerpt={blog.excerpt}
                    image={blog.image}
                    author={blog.author}
                    date={blog.date}
                    category={blogWithCategory.categoryName}
                    index={index}
                  />
                );
              })}
            </div>
          )}
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <AnimatedContainer animation="fade" className="mb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold mb-2">Browse by Category</h2>
                <p className="text-muted-foreground">Discover content in your areas of interest</p>
              </div>
              <Link 
                to="/categories" 
                className="group flex items-center text-primary font-medium"
              >
                View all categories
                <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={18} />
              </Link>
            </div>
          </AnimatedContainer>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="h-64 rounded-2xl bg-gray-200 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {categories.map((category, index) => (
                <CategoryCard
                  key={category.id}
                  id={category.id}
                  name={category.name}
                  description={category.description}
                  image={category.image}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <AnimatedContainer animation="fade" className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Stay in the Loop</h2>
            <p className="text-primary-foreground/80 mb-8">
              Subscribe to our newsletter to receive updates, new articles, and exclusive content.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 rounded-full flex-grow focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-white text-primary font-medium hover:bg-gray-100 transition-colors"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-primary-foreground/60 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </AnimatedContainer>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
