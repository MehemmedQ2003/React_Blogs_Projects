
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AnimatedContainer from '../components/ui/AnimatedContainer';
import { fetchBlogById, fetchCategoryById, fetchBlogs } from '../utils/dataFetcher';
import { ArrowLeft, Calendar, User, Tag, Clock } from 'lucide-react';
import BlogCard from '../components/ui/BlogCard';

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<any | null>(null);
  const [category, setCategory] = useState<any | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const blogId = parseInt(id);
        const blogData = await fetchBlogById(blogId);
        
        if (blogData) {
          setBlog(blogData);
          
          // Fetch category
          const categoryData = await fetchCategoryById(blogData.category);
          setCategory(categoryData);
          
          // Fetch related blogs (same category, excluding current)
          const allBlogs = await fetchBlogs();
          const related = allBlogs
            .filter(b => b.category === blogData.category && b.id !== blogData.id)
            .slice(0, 3);
          setRelatedBlogs(related);
        }
      } catch (error) {
        console.error(`Error loading blog ${id} data:`, error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
    // Scroll to top when blog changes
    window.scrollTo(0, 0);
  }, [id]);

  if (!id) {
    return <div>Invalid blog ID</div>;
  }

  // Format date
  const formattedDate = blog ? new Date(blog.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : '';

  // Estimate read time (1 min per 200 words)
  const calculateReadTime = (content: string) => {
    const words = content.split(/\s+/).length;
    const readTime = Math.ceil(words / 200);
    return `${readTime} min read`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {loading ? (
        <div className="pt-32 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="h-8 w-32 bg-gray-200 animate-pulse rounded mb-6"></div>
              <div className="h-16 w-full bg-gray-200 animate-pulse rounded mb-8"></div>
              <div className="h-64 w-full bg-gray-200 animate-pulse rounded mb-8"></div>
              <div className="space-y-4">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="h-4 w-full bg-gray-200 animate-pulse rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : blog ? (
        <>
          {/* Hero Section */}
          <section className="pt-32 pb-12">
            <div className="container mx-auto px-4">
              <AnimatedContainer animation="fade" className="max-w-3xl mx-auto">
                <Link to="/blogs" className="inline-flex items-center text-muted-foreground hover:text-gray-800 mb-6 transition-colors">
                  <ArrowLeft size={16} className="mr-2" />
                  Back to Blogs
                </Link>
                
                {category && (
                  <Link 
                    to={`/categories/${category.id}`}
                    className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
                  >
                    {category.name}
                  </Link>
                )}
                
                <h1 className="text-4xl md:text-5xl font-bold mb-6">{blog.title}</h1>
                
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-8">
                  <div className="flex items-center">
                    <User size={16} className="mr-2" />
                    {blog.author}
                  </div>
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-2" />
                    {formattedDate}
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="mr-2" />
                    {calculateReadTime(blog.content)}
                  </div>
                </div>
              </AnimatedContainer>
            </div>
          </section>
          
          {/* Featured Image */}
          <section className="pb-12">
            <div className="container mx-auto px-4">
              <AnimatedContainer animation="fade" delay={100} className="max-w-4xl mx-auto">
                <div className="rounded-2xl overflow-hidden">
                  <img 
                    src={blog.image} 
                    alt={blog.title} 
                    className="w-full h-auto"
                  />
                </div>
              </AnimatedContainer>
            </div>
          </section>
          
          {/* Blog Content */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <AnimatedContainer animation="fade" delay={200} className="prose prose-lg max-w-none">
                  {blog.content.split('\n\n').map((paragraph: string, index: number) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </AnimatedContainer>
                
                {blog.tags && blog.tags.length > 0 && (
                  <AnimatedContainer animation="fade" delay={300} className="mt-12 flex flex-wrap gap-2">
                    <Tag size={16} className="mr-2 text-muted-foreground" />
                    {blog.tags.map((tag: string, index: number) => (
                      <span 
                        key={index}
                        className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </AnimatedContainer>
                )}
                
                <AnimatedContainer animation="fade" delay={400} className="mt-12 pt-12 border-t border-gray-200">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                        {blog.author.charAt(0)}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold">Written by {blog.author}</h3>
                      <p className="text-muted-foreground text-sm">
                        Content writer specializing in technology and design topics.
                      </p>
                    </div>
                  </div>
                </AnimatedContainer>
              </div>
            </div>
          </section>
          
          {/* Related Articles */}
          {relatedBlogs.length > 0 && (
            <section className="py-16 bg-gray-50">
              <div className="container mx-auto px-4">
                <AnimatedContainer animation="fade" className="mb-12 text-center">
                  <h2 className="text-3xl font-bold mb-2">Related Articles</h2>
                  <p className="text-muted-foreground">
                    Explore more content in the {category?.name} category
                  </p>
                </AnimatedContainer>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {relatedBlogs.map((relatedBlog, index) => (
                    <BlogCard
                      key={relatedBlog.id}
                      id={relatedBlog.id}
                      title={relatedBlog.title}
                      excerpt={relatedBlog.excerpt}
                      image={relatedBlog.image}
                      author={relatedBlog.author}
                      date={relatedBlog.date}
                      category={category?.name}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      ) : (
        <section className="pt-32 pb-16">
          <div className="container mx-auto px-4">
            <AnimatedContainer animation="fade" className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold mb-4">Blog Not Found</h1>
              <p className="text-muted-foreground mb-8">
                The article you're looking for doesn't exist or has been removed.
              </p>
              <Link 
                to="/blogs" 
                className="px-6 py-3 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
              >
                Browse All Articles
              </Link>
            </AnimatedContainer>
          </div>
        </section>
      )}
      
      <Footer />
    </div>
  );
};

export default BlogDetail;
