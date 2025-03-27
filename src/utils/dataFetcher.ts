
/**
 * Data fetcher utility for accessing blog data
 */

interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
}

interface Blog {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: number;
  tags: string[];
}

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  name: string;
  bio: string;
  avatar: string;
}

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Fetch all categories
export const fetchCategories = async (): Promise<Category[]> => {
  try {
    await delay(300); // Simulate network delay
    const response = await fetch('/src/data/data.json');
    const data = await response.json();
    return data.categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

// Fetch all blogs
export const fetchBlogs = async (): Promise<Blog[]> => {
  try {
    await delay(500); // Simulate network delay
    const response = await fetch('/src/data/data.json');
    const data = await response.json();
    return data.blogs;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
};

// Fetch a single blog by id
export const fetchBlogById = async (id: number): Promise<Blog | null> => {
  try {
    await delay(400); // Simulate network delay
    const response = await fetch('/src/data/data.json');
    const data = await response.json();
    const blog = data.blogs.find((b: Blog) => b.id === id);
    return blog || null;
  } catch (error) {
    console.error(`Error fetching blog with id ${id}:`, error);
    return null;
  }
};

// Fetch blogs by category
export const fetchBlogsByCategory = async (categoryId: number): Promise<Blog[]> => {
  try {
    await delay(400); // Simulate network delay
    const response = await fetch('/src/data/data.json');
    const data = await response.json();
    return data.blogs.filter((blog: Blog) => blog.category === categoryId);
  } catch (error) {
    console.error(`Error fetching blogs for category ${categoryId}:`, error);
    return [];
  }
};

// Fetch a category by id
export const fetchCategoryById = async (id: number): Promise<Category | null> => {
  try {
    await delay(300); // Simulate network delay
    const response = await fetch('/src/data/data.json');
    const data = await response.json();
    const category = data.categories.find((c: Category) => c.id === id);
    return category || null;
  } catch (error) {
    console.error(`Error fetching category with id ${id}:`, error);
    return null;
  }
};

// Authentication functions (with mock implementation)
export const loginUser = async (username: string, password: string): Promise<User | null> => {
  try {
    await delay(600); // Simulate network delay
    const response = await fetch('/src/data/data.json');
    const data = await response.json();
    const user = data.users.find(
      (u: User) => u.username === username && u.password === password
    );
    if (user) {
      // Store user in local storage (in a real app, you'd use a token)
      localStorage.setItem('currentUser', JSON.stringify({
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        bio: user.bio,
        avatar: user.avatar
      }));
      return user;
    }
    return null;
  } catch (error) {
    console.error('Error logging in:', error);
    return null;
  }
};

export const registerUser = async (userData: Omit<User, 'id'>): Promise<User | null> => {
  try {
    await delay(800); // Simulate network delay
    // In a real application, you would send this data to a server
    // For this demo, we'll just simulate a successful registration
    const newUser = {
      id: Date.now(), // Generate a unique ID
      ...userData
    };
    
    // Store user in local storage
    localStorage.setItem('currentUser', JSON.stringify({
      id: newUser.id,
      username: newUser.username,
      name: newUser.name,
      email: newUser.email,
      bio: newUser.bio,
      avatar: newUser.avatar
    }));
    
    return newUser;
  } catch (error) {
    console.error('Error registering user:', error);
    return null;
  }
};

export const getCurrentUser = (): Partial<User> | null => {
  const userJson = localStorage.getItem('currentUser');
  if (userJson) {
    return JSON.parse(userJson);
  }
  return null;
};

export const logoutUser = (): void => {
  localStorage.removeItem('currentUser');
};

export const resetPassword = async (email: string): Promise<boolean> => {
  try {
    await delay(700); // Simulate network delay
    // In a real application, you would send a password reset email
    // For this demo, we'll just simulate a successful request
    return true;
  } catch (error) {
    console.error('Error resetting password:', error);
    return false;
  }
};
