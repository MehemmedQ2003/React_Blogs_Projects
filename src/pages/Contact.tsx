
import { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AnimatedContainer from '../components/ui/AnimatedContainer';
import { Send, Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset submission status after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative">
        <div className="container mx-auto px-4">
          <AnimatedContainer animation="fade" className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Contact Us
            </span>
            <h1 className="text-5xl font-bold mb-6 font-serif">Get In Touch</h1>
            <p className="text-xl text-muted-foreground">
              Have a question or want to collaborate? Reach out to us using the form below.
            </p>
          </AnimatedContainer>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <AnimatedContainer animation="fade" delay={100} className="lg:col-span-2">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                {isSubmitted ? (
                  <div className="text-center py-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                      <Send className="text-green-500" size={24} />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                    <p className="text-muted-foreground">
                      Your message has been sent successfully. We'll get back to you soon.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-bold mb-6 font-serif">Send us a Message</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Full Name
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email Address
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-6">
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">
                        Subject
                      </label>
                      <input
                        id="subject"
                        name="subject"
                        type="text"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="How can we help you?"
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Write your message here..."
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors flex items-center justify-center font-medium"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2" size={16} />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </AnimatedContainer>
            
            {/* Contact Information */}
            <AnimatedContainer animation="fade" delay={200} className="space-y-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start">
                <div className="p-3 rounded-full bg-primary/10 mr-4">
                  <Mail className="text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1 font-serif">Email</h3>
                  <p className="text-muted-foreground mb-1">For general inquiries:</p>
                  <a href="mailto:info@minimalblog.com" className="text-primary hover:underline">
                    info@minimalblog.com
                  </a>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start">
                <div className="p-3 rounded-full bg-primary/10 mr-4">
                  <Phone className="text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1 font-serif">Phone</h3>
                  <p className="text-muted-foreground mb-1">Mon-Fri from 9am to 5pm:</p>
                  <a href="tel:+1234567890" className="text-primary hover:underline">
                    +1 (234) 567-890
                  </a>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start">
                <div className="p-3 rounded-full bg-primary/10 mr-4">
                  <MapPin className="text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1 font-serif">Office</h3>
                  <p className="text-muted-foreground">
                    123 Creative Street<br />
                    San Francisco, CA 94103<br />
                    United States
                  </p>
                </div>
              </div>
            </AnimatedContainer>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-8 pb-16">
        <div className="container mx-auto px-4">
          <AnimatedContainer animation="slide" className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 aspect-ratio-16/9">
            <div className="aspect-w-16 aspect-h-9">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100940.14245968247!2d-122.43759999999999!3d37.75769999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2sin!4v1655719451258!5m2!1sen!2sin" 
                width="100%" 
                height="450" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
              ></iframe>
            </div>
          </AnimatedContainer>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Contact;
