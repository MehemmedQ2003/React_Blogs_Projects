
import { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AnimatedContainer from '../components/ui/AnimatedContainer';
import CategoryCard from '../components/ui/CategoryCard';
import { fetchCategories } from '../utils/dataFetcher';

const Categories = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error loading categories:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative">
        <div className="container mx-auto px-4">
          <AnimatedContainer animation="fade" className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Categories
            </span>
            <h1 className="text-5xl font-bold mb-6">Browse by Topic</h1>
            <p className="text-xl text-muted-foreground">
              Explore our content organized by category to find exactly what interests you
            </p>
          </AnimatedContainer>
        </div>
      </section>
      
      {/* Categories Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
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
      
      {/* Subscribe Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <AnimatedContainer animation="fade" className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Never Miss an Update</h2>
            <p className="text-muted-foreground mb-8">
              Subscribe to our newsletter to get notified when we publish new articles in your favorite categories.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 rounded-full flex-grow border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-muted-foreground mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </AnimatedContainer>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Categories;
