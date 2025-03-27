
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AnimatedContainer from '../components/ui/AnimatedContainer';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative">
        <div className="container mx-auto px-4">
          <AnimatedContainer animation="fade" className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              About Us
            </span>
            <h1 className="text-5xl font-bold mb-6">Our Story</h1>
            <p className="text-xl text-muted-foreground">
              Dedicated to crafting thoughtful content that inspires, informs, and sparks curiosity.
            </p>
          </AnimatedContainer>
        </div>
      </section>
      
      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <AnimatedContainer animation="fade" delay={100} className="order-2 md:order-1">
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-muted-foreground mb-4">
                At MinimalBlog, we believe in the power of simplicity. Our mission is to cut through the noise and deliver thoughtful, well-crafted content that adds genuine value to our readers' lives.
              </p>
              <p className="text-muted-foreground mb-4">
                We focus on quality over quantity, taking the time to research, write, and refine our articles to ensure they provide depth, clarity, and insight. Every piece is created with intention, designed to inspire curiosity and encourage meaningful reflection.
              </p>
              <p className="text-muted-foreground">
                Through our content, we aim to foster a community of lifelong learners who appreciate the beauty of simplicity and the value of ideas that truly matter.
              </p>
            </AnimatedContainer>
            
            <AnimatedContainer animation="fade" delay={200} className="order-1 md:order-2">
              <div className="rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" 
                  alt="Our team collaborating" 
                  className="w-full h-auto"
                />
              </div>
            </AnimatedContainer>
          </div>
        </div>
      </section>
      
      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <AnimatedContainer animation="fade" className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground">
              The principles that guide our work and shape our approach to content creation
            </p>
          </AnimatedContainer>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedContainer animation="fade" delay={100} className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <span className="text-primary font-bold">01</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Simplicity</h3>
              <p className="text-muted-foreground">
                We embrace the power of simplicity in both our content and design, focusing on what truly matters and eliminating unnecessary complexity.
              </p>
            </AnimatedContainer>
            
            <AnimatedContainer animation="fade" delay={200} className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <span className="text-primary font-bold">02</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Quality</h3>
              <p className="text-muted-foreground">
                We prioritize depth and thoughtfulness in our content, taking the time to research, write, and refine our articles to deliver genuine value.
              </p>
            </AnimatedContainer>
            
            <AnimatedContainer animation="fade" delay={300} className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <span className="text-primary font-bold">03</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Curiosity</h3>
              <p className="text-muted-foreground">
                We approach topics with an open mind and a genuine desire to understand, encouraging our readers to embrace curiosity and lifelong learning.
              </p>
            </AnimatedContainer>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <AnimatedContainer animation="fade" className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground">
              The passionate individuals behind MinimalBlog
            </p>
          </AnimatedContainer>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedContainer animation="fade" delay={100}>
              <div className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop" 
                    alt="Sarah Johnson" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">Sarah Johnson</h3>
                <p className="text-primary font-medium mb-3">Founder & Editor-in-Chief</p>
                <p className="text-muted-foreground">
                  With a background in journalism and a passion for storytelling, Sarah leads our editorial vision.
                </p>
              </div>
            </AnimatedContainer>
            
            <AnimatedContainer animation="fade" delay={200}>
              <div className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop" 
                    alt="David Chen" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">David Chen</h3>
                <p className="text-primary font-medium mb-3">Senior Writer</p>
                <p className="text-muted-foreground">
                  David specializes in technology and business topics, bringing analytical depth to complex subjects.
                </p>
              </div>
            </AnimatedContainer>
            
            <AnimatedContainer animation="fade" delay={300}>
              <div className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop" 
                    alt="Olivia Martinez" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">Olivia Martinez</h3>
                <p className="text-primary font-medium mb-3">Creative Director</p>
                <p className="text-muted-foreground">
                  Olivia oversees our visual identity, ensuring our content is as beautiful as it is informative.
                </p>
              </div>
            </AnimatedContainer>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <AnimatedContainer animation="fade" delay={100}>
              <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
              <p className="text-muted-foreground mb-8">
                Have a question, suggestion, or just want to say hello? We'd love to hear from you.
              </p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-1">Email</h3>
                  <p className="text-muted-foreground">hello@minimalblog.com</p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-1">Address</h3>
                  <p className="text-muted-foreground">
                    123 Design Street<br />
                    San Francisco, CA 94103
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-1">Social</h3>
                  <div className="flex space-x-4 mt-2">
                    <a 
                      href="#" 
                      className="text-gray-600 hover:text-primary transition-colors"
                    >
                      Twitter
                    </a>
                    <a 
                      href="#" 
                      className="text-gray-600 hover:text-primary transition-colors"
                    >
                      Instagram
                    </a>
                    <a 
                      href="#" 
                      className="text-gray-600 hover:text-primary transition-colors"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedContainer>
            
            <AnimatedContainer animation="fade" delay={200}>
              <form className="bg-white p-8 rounded-2xl shadow-sm">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Your email"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Your message"
                      required
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </AnimatedContainer>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About;
