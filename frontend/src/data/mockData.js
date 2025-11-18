// Mock data for testing frontend without backend dependency

export const mockUsers = [
  {
    id: 1,
    email: 'user@finapp.com',
    password: 'password123',
    firstName: 'John',
    lastName: 'Doe',
    role: 'USER'
  },
  {
    id: 2,
    email: 'admin@finapp.com',
    password: 'admin123',
    firstName: 'Admin',
    lastName: 'User',
    role: 'ADMIN'
  }
];

export const mockCategories = [
  {
    id: 1,
    name: 'tshirts',
    description: 'Premium t-shirts with FinApp branding',
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400'
  },
  {
    id: 2,
    name: 'hoodies',
    description: 'Comfortable hoodies for everyday wear',
    imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400'
  },
  {
    id: 3,
    name: 'sweatshirts',
    description: 'Cozy sweatshirts with classic style',
    imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400'
  },
  {
    id: 4,
    name: 'caps',
    description: 'Stylish baseball caps',
    imageUrl: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400'
  },
  {
    id: 5,
    name: 'sweatpants',
    description: 'Comfortable sweatpants for active lifestyle',
    imageUrl: 'https://images.unsplash.com/photo-1624378515193-9bb8baf9f969?w=400'
  }
];

export const mockProducts = [
  {
    id: 1,
    name: 'Classic T-Shirt - Black',
    description: 'Premium black t-shirt featuring the iconic FinApp FA logo in vibrant red. Made from soft, comfortable cotton blend.',
    price: 29.99,
    stock: 100,
    category: mockCategories[0],
    imageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tshirt-D6PkbtXXbeieR1Ws69tEfY3t0iayPy.png',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tshirt-D6PkbtXXbeieR1Ws69tEfY3t0iayPy.png',
    inStock: true,
    rating: 4.8,
    reviews: 124
  },
  {
    id: 2,
    name: 'Classic T-Shirt - White',
    description: 'Crisp white t-shirt with the bold FinApp FA logo in red. Perfect for everyday casual wear.',
    price: 29.99,
    stock: 95,
    category: mockCategories[0],
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
    inStock: true,
    rating: 4.7,
    reviews: 98
  },
  {
    id: 3,
    name: 'Premium Hoodie - Black',
    description: 'Comfortable black hoodie with the FinApp FA logo embroidered in red. Soft fleece lining for ultimate comfort.',
    price: 59.99,
    stock: 75,
    category: mockCategories[1],
    imageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hoodie-fSia0nJ3SoXAUcfjR28vg9Th0MNsfe.png',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hoodie-fSia0nJ3SoXAUcfjR28vg9Th0MNsfe.png',
    inStock: true,
    rating: 4.9,
    reviews: 156
  },
  {
    id: 4,
    name: 'Cozy Sweatshirt - White',
    description: 'Classic white sweatshirt featuring the FinApp FA logo in burgundy red. Perfect for layering or wearing alone.',
    price: 49.99,
    stock: 80,
    category: mockCategories[2],
    imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400',
    inStock: true,
    rating: 4.7,
    reviews: 87
  },
  {
    id: 5,
    name: 'Classic Cap - Black',
    description: 'Stylish black baseball cap with embroidered FinApp FA logo in red. Adjustable strap for perfect fit.',
    price: 24.99,
    stock: 120,
    category: mockCategories[3],
    imageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cap-HrbhifBMr8y1MQe40aXZe2AJczoR1f.png',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cap-HrbhifBMr8y1MQe40aXZe2AJczoR1f.png',
    inStock: true,
    rating: 4.6,
    reviews: 62
  },
  {
    id: 6,
    name: 'Sweatpants - Grey',
    description: 'Comfortable grey sweatpants with the FinApp FA logo on the thigh. Perfect for active lifestyle or lounging.',
    price: 54.99,
    stock: 65,
    category: mockCategories[4],
    imageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sweatpant2-eUvhG88qGWGnr6ISTKnIrguwTVv38G.png',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sweatpant2-eUvhG88qGWGnr6ISTKnIrguwTVv38G.png',
    inStock: true,
    rating: 4.8,
    reviews: 112
  }
];

export const mockOrders = [
  {
    id: 1,
    userId: 1,
    items: [
      { product: mockProducts[0], quantity: 1 },
      { product: mockProducts[2], quantity: 1 }
    ],
    totalAmount: 89.98,
    status: 'DELIVERED',
    orderDate: '2024-01-15',
    shippingAddress: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    }
  },
  {
    id: 2,
    userId: 1,
    items: [
      { product: mockProducts[3], quantity: 1 },
      { product: mockProducts[5], quantity: 1 }
    ],
    totalAmount: 104.98,
    status: 'SHIPPED',
    orderDate: '2024-01-20',
    shippingAddress: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    }
  }
];

// Mock API responses
export const mockApiResponses = {
  login: (email, password) => {
    const user = mockUsers.find(u => u.email === email && u.password === password);
    if (user) {
      return {
        result: 'SUCCESS',
        message: 'Login successful',
        data: {
          token: `mock-jwt-token-${user.id}`,
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role
          }
        }
      };
    }
    return {
      result: 'ERROR',
      message: 'Invalid credentials'
    };
  },
  
  register: (userData) => {
    const existingUser = mockUsers.find(u => u.email === userData.email);
    if (existingUser) {
      return {
        result: 'ERROR',
        message: 'User already exists'
      };
    }
    
    const newUser = {
      id: mockUsers.length + 1,
      ...userData,
      role: 'USER'
    };
    mockUsers.push(newUser);
    
    return {
      result: 'SUCCESS',
      message: 'Registration successful',
      data: {
        token: `mock-jwt-token-${newUser.id}`,
        user: {
          id: newUser.id,
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          role: newUser.role
        }
      }
    };
  },
  
  getProducts: () => ({
    result: 'SUCCESS',
    message: 'Products retrieved successfully',
    data: mockProducts
  }),
  
  getCategories: () => ({
    result: 'SUCCESS',
    message: 'Categories retrieved successfully',
    data: mockCategories
  }),
  
  getProductById: (id) => {
    const product = mockProducts.find(p => p.id === parseInt(id));
    if (product) {
      return {
        result: 'SUCCESS',
        message: 'Product retrieved successfully',
        data: product
      };
    }
    return {
      result: 'ERROR',
      message: 'Product not found'
    };
  },
  
  getUserOrders: (userId) => {
    const userOrders = mockOrders.filter(o => o.userId === userId);
    return {
      result: 'SUCCESS',
      message: 'Orders retrieved successfully',
      data: userOrders
    };
  }
};

