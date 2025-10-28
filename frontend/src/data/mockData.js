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
    name: 'Electronics',
    description: 'Latest electronic gadgets and devices',
    imageUrl: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400'
  },
  {
    id: 2,
    name: 'Clothing',
    description: 'Fashion and apparel for all seasons',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400'
  },
  {
    id: 3,
    name: 'Books',
    description: 'Books and educational materials',
    imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400'
  },
  {
    id: 4,
    name: 'Sports',
    description: 'Sports equipment and fitness gear',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400'
  }
];

export const mockProducts = [
  {
    id: 1,
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 199.99,
    stock: 50,
    category: mockCategories[0],
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    rating: 4.5,
    reviews: 128
  },
  {
    id: 2,
    name: 'Smartphone',
    description: 'Latest smartphone with advanced features',
    price: 899.99,
    stock: 25,
    category: mockCategories[0],
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
    rating: 4.8,
    reviews: 256
  },
  {
    id: 3,
    name: 'Cotton T-Shirt',
    description: 'Comfortable cotton t-shirt in various colors',
    price: 29.99,
    stock: 100,
    category: mockCategories[1],
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
    rating: 4.2,
    reviews: 89
  },
  {
    id: 4,
    name: 'Programming Book',
    description: 'Complete guide to modern programming',
    price: 49.99,
    stock: 75,
    category: mockCategories[2],
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400',
    rating: 4.7,
    reviews: 156
  },
  {
    id: 5,
    name: 'Running Shoes',
    description: 'Comfortable running shoes for all terrains',
    price: 129.99,
    stock: 40,
    category: mockCategories[3],
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
    rating: 4.6,
    reviews: 203
  },
  {
    id: 6,
    name: 'Yoga Mat',
    description: 'Non-slip yoga mat for home workouts',
    price: 39.99,
    stock: 60,
    category: mockCategories[3],
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400',
    rating: 4.4,
    reviews: 92
  }
];

export const mockOrders = [
  {
    id: 1,
    userId: 1,
    items: [
      { product: mockProducts[0], quantity: 1 },
      { product: mockProducts[2], quantity: 2 }
    ],
    totalAmount: 259.97,
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
      { product: mockProducts[1], quantity: 1 }
    ],
    totalAmount: 899.99,
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

