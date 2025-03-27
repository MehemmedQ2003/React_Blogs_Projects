
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AnimatedContainer from '../components/ui/AnimatedContainer';
import { getCurrentUser } from '../utils/dataFetcher';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const [user, setUser] = useState<any>(getCurrentUser());
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: ''
  });
  const { toast } = useToast();

  // If no user is logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        bio: user.bio || ''
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call to update profile
    setTimeout(() => {
      // Update local storage
      const updatedUser = {
        ...user,
        name: formData.name,
        email: formData.email,
        bio: formData.bio
      };
      
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
      
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Profile Section */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <AnimatedContainer animation="fade" className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <div className="bg-white p-6 rounded-2xl shadow-sm">
                  <div className="flex flex-col items-center">
                    <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                      <img 
                        src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`} 
                        alt={user.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h2 className="text-xl font-bold">{user.name}</h2>
                    <p className="text-muted-foreground text-sm mb-4">{user.username}</p>
                    <button 
                      className="text-primary text-sm hover:text-primary/80"
                    >
                      Change profile photo
                    </button>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <nav className="space-y-2">
                      <a href="#profile" className="block px-4 py-2 rounded-lg bg-primary/10 text-primary font-medium">
                        Profile Information
                      </a>
                      <a href="#account" className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                        Account Settings
                      </a>
                      <a href="#notifications" className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                        Notifications
                      </a>
                      <a href="#security" className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                        Security
                      </a>
                    </nav>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-2">
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm">
                  <h3 className="text-xl font-bold mb-6">Profile Information</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="bio" className="block text-sm font-medium mb-2">
                        Bio
                      </label>
                      <textarea
                        id="bio"
                        name="bio"
                        rows={4}
                        value={formData.bio}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Tell us a little about yourself"
                      ></textarea>
                    </div>
                    
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {loading ? 'Saving...' : 'Save Changes'}
                      </button>
                    </div>
                  </div>
                </form>
                
                <div className="mt-8 bg-white p-6 rounded-2xl shadow-sm">
                  <h3 className="text-xl font-bold mb-6">Account Preferences</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Email Notifications</h4>
                        <p className="text-sm text-muted-foreground">Receive email updates about blog activity</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Newsletter</h4>
                        <p className="text-sm text-muted-foreground">Receive our weekly newsletter</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedContainer>
        </div>
      </section>
      
      <div className="flex-grow"></div>
      
      <Footer />
    </div>
  );
};

export default Profile;
