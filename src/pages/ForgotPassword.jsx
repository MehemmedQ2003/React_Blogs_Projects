
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AnimatedContainer from '../components/ui/AnimatedContainer';
import { resetPassword } from '../utils/dataFetcher';
import { useToast } from '@/hooks/use-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const result = await resetPassword(email);
      
      if (result) {
        setSuccess(true);
        toast({
          title: "Email sent!",
          description: "Check your inbox for password reset instructions.",
        });
      } else {
        setError('Failed to send reset email. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <AnimatedContainer animation="scale" className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-sm">
        <div className="text-center">
          <Link to="/" className="inline-block text-2xl font-bold text-primary mb-4">
            Minimal<span className="text-black">Blog</span>
          </Link>
          <h2 className="text-3xl font-bold mb-2">Forgot Password</h2>
          <p className="text-muted-foreground">
            Enter your email and we'll send you a link to reset your password
          </p>
        </div>
        
        {success ? (
          <div className="mt-8">
            <div className="bg-green-50 text-green-600 p-6 rounded-lg text-center mb-6">
              <h3 className="font-medium text-lg mb-2">Check your email</h3>
              <p>
                We've sent password reset instructions to {email}. Please check your inbox.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                Didn't receive the email? Check your spam folder or try again.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="text-primary hover:text-primary/80 font-medium"
              >
                Try another email
              </button>
              <div className="pt-4">
                <Link 
                  to="/login" 
                  className="inline-block px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
                >
                  Back to Sign In
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm">
                {error}
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Reset Password'}
            </button>
            
            <div className="text-center mt-4">
              <p className="text-sm text-muted-foreground">
                Remember your password?{' '}
                <Link to="/login" className="text-primary hover:text-primary/80 font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        )}
      </AnimatedContainer>
    </div>
  );
};

export default ForgotPassword;
