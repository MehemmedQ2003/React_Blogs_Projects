
import { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AnimatedContainer from '../components/ui/AnimatedContainer';
import BlogCard from '../components/ui/BlogCard';
import { fetchBlogs, fetchCategories } from '../utils/dataFetcher';
import { Search } from 'lucide-react';

const Blogs = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [filteredBlogs, setFilteredBlogs] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [blogsData, categoriesData] = await Promise.all([
          fetchBlogs(),
          fetchCategories()
        ]);
        
        setBlogs(blogsData);
        setCategories(categoriesData);
        setFilteredBlogs(blogsData);
      } catch (error) {
        console.error('Error loading blogs data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    let result = blogs;
    
    // Filter by category if selected
    if (selectedCategory !== null) {
      result = result.filter(blog => blog.category === selectedCategory);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(blog => 
        blog.title.toLowerCase().includes(term) || 
        blog.excerpt.toLowerCase().includes(term) ||
        blog.author.toLowerCase().includes(term) ||
        (blog.tags && blog.tags.some((tag: string) => tag.toLowerCase().includes(term)))
      );
    }
    
    setFilteredBlogs(result);
  }, [blogs, searchTerm, selectedCategory]);

  // Find category name for each blog
  const getBlogWithCategory = (blog: any) => {
    const category = categories.find(c => c.id === blog.category);
    return {
      ...blog,
      categoryName: category ? category.name : ''
    };
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryFilter = (categoryId: number | null) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative">
        <div className="container mx-auto px-4">
          <AnimatedContainer animation="fade" className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              All Articles
            </span>
            <h1 className="text-5xl font-bold mb-6">Our Blog</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Explore our collection of thought-provoking articles across various topics
            </p>
            
            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <Search className="text-gray-400" size={20} />
              </div>
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </AnimatedContainer>
        </div>
      </section>
      
      {/* Category Filters */}
      <section className="py-4">
        <div className="container mx-auto px-4">
          <AnimatedContainer animation="fade" delay={100} className="overflow-x-auto hide-scrollbar pb-4">
            <div className="flex space-x-2 min-w-max">
              <button
                onClick={() => handleCategoryFilter(null)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                  selectedCategory === null 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                All Categories
              </button>
              
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryFilter(category.id)}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                    selectedCategory === category.id 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </AnimatedContainer>
        </div>
      </section>
      
      {/* Blog Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="h-96 rounded-2xl bg-gray-200 animate-pulse"></div>
              ))}
            </div>
          ) : filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredBlogs.map((blog, index) => {
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
          ) : (
            <AnimatedContainer animation="fade" className="text-center py-16">
              <h3 className="text-2xl font-bold mb-4">No articles found</h3>
              <p className="text-muted-foreground mb-6">
                We couldn't find any articles matching your search criteria.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory(null);
                }}
                className="px-6 py-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
              >
                Reset Filters
              </button>
            </AnimatedContainer>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Blogs;
