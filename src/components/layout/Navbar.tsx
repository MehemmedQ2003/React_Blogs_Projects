
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { getCurrentUser, logoutUser } from '../../utils/dataFetcher';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
    closeMenu();
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  useEffect(() => {
    const checkUser = () => {
      setCurrentUser(getCurrentUser());
    };

    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-3 bg-white/80 backdrop-blur-lg shadow-sm' : 'py-5 bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary">
            Minimal<span className="text-black">Blog</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/" label="Home" />
            <NavLink to="/blogs" label="Blogs" />
            <NavLink to="/categories" label="Categories" />
            <NavLink to="/about" label="About" />

            {currentUser ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 hover:text-primary transition-colors">
                  <User size={18} />
                  <span>{currentUser.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 origin-top-right">
                  <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-gray-50">Profile</Link>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="px-4 py-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
              >
                Sign In
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu} 
            className="md:hidden text-gray-800 focus:outline-none"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={`fixed inset-0 z-40 bg-white transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-between items-center mb-8">
            <Link to="/" className="text-2xl font-bold text-primary" onClick={closeMenu}>
              Minimal<span className="text-black">Blog</span>
            </Link>
            <button onClick={closeMenu} className="text-gray-800 focus:outline-none">
              <X size={24} />
            </button>
          </div>

          <nav className="flex flex-col space-y-6">
            <MobileNavLink to="/" label="Home" onClick={closeMenu} />
            <MobileNavLink to="/blogs" label="Blogs" onClick={closeMenu} />
            <MobileNavLink to="/categories" label="Categories" onClick={closeMenu} />
            <MobileNavLink to="/about" label="About" onClick={closeMenu} />
            
            {currentUser ? (
              <>
                <MobileNavLink to="/profile" label="Profile" onClick={closeMenu} />
                <button 
                  onClick={handleLogout}
                  className="text-left text-lg font-medium text-red-600"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="mt-4 block w-full px-4 py-3 rounded-full bg-primary text-center text-white hover:bg-primary/90 transition-colors"
                onClick={closeMenu}
              >
                Sign In
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  label: string;
}

const NavLink = ({ to, label }: NavLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to || 
    (to !== '/' && location.pathname.startsWith(to));

  return (
    <Link 
      to={to} 
      className={`font-medium transition-colors hover:text-primary ${
        isActive ? 'text-primary' : 'text-gray-800'
      }`}
    >
      {label}
    </Link>
  );
};

interface MobileNavLinkProps extends NavLinkProps {
  onClick: () => void;
}

const MobileNavLink = ({ to, label, onClick }: MobileNavLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to || 
    (to !== '/' && location.pathname.startsWith(to));

  return (
    <Link 
      to={to} 
      className={`text-lg font-medium ${
        isActive ? 'text-primary' : 'text-gray-800'
      }`}
      onClick={onClick}
    >
      {label}
    </Link>
  );
};

export default Navbar;
