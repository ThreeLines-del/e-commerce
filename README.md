# E-Commerce TypeScript Application

A full-stack e-commerce application built with TypeScript, featuring a customer-facing store, admin panel, and REST API backend.

## 🚀 Live Demo

[![Netlify Status](https://api.netlify.com/api/v1/badges/6b71a643-e4bb-45d2-a418-d3a9d9f8ae12/deploy-status)](https://precious-kataifi-083559.netlify.app/)

## 🏗️ Project Structure

This project consists of three main applications:

- **`backend/`** - Node.js/Express API server with MongoDB
- **`store/`** - React customer-facing e-commerce store
- **`admin/`** - React admin panel for product management

## 🚀 Tech Stack

### Backend

- **Node.js** with **TypeScript**
- **Express.js** - Web framework
- **MongoDB** with **Mongoose** - Database and ODM
- **JWT** - Authentication
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

### Frontend (Store)

- **React 18** with **TypeScript**
- **Vite** - Build tool and dev server
- **TailwindCSS** - Styling framework
- **React Router DOM** - Client-side routing
- **React Icons** - Icon library
- **React Spinners** - Loading indicators
- **JWT Decode** - Token handling

### Frontend (Admin)

- **React 18** with **TypeScript**
- **Vite** - Build tool and dev server
- **TailwindCSS** - Styling framework
- **React Router DOM** - Client-side routing
- **React Icons** - Icon library

## ✨ Features

### Customer Store

- 🛍️ Product browsing and search
- 🏷️ Category-based product filtering
- 🛒 Shopping cart functionality
- 👤 User authentication (signup/login)
- 📱 Responsive design with dark mode
- 🆕 New arrivals section
- 💳 Product details and pricing

### Admin Panel

- 📦 Product management (CRUD operations)
- 📊 Product listing and inventory
- 🖼️ Image upload for products
- 📋 Admin dashboard interface

### Backend API

- 🔐 JWT-based authentication
- 📝 RESTful API endpoints
- 🖼️ Image upload and storage
- 🔍 Product search functionality
- 🏷️ Category management
- 🛒 Cart operations
- 📊 Product analytics

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- MongoDB database
- npm or yarn package manager

### Environment Variables

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

The backend server will start on `http://localhost:5000`

### Store Frontend Setup

```bash
cd store
npm install
npm run dev
```

The store will be available at `http://localhost:5173`

### Admin Frontend Setup

```bash
cd admin
npm install
npm run dev
```

The admin panel will be available at `http://localhost:5174`

## 📡 API Endpoints

### Products

- `GET /api/products` - Get all products
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `GET /api/new` - Get latest products

### Authentication

- `POST /api/signup` - User registration
- `POST /api/login` - User login

### Cart

- `GET /api/cart/:userId` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item
- `DELETE /api/cart/remove` - Remove cart item

### Categories & Search

- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/search?q=query` - Search products

### File Upload

- `POST /api/upload` - Upload product images

## 🗂️ Project Architecture

### Database Models

**Product Schema:**

```typescript
{
  id: Number,
  name: String,
  description: String,
  image: String,
  category: String,
  new_price: Number,
  old_price: Number,
  date: Date,
  available: Boolean
}
```

**User Schema:**

```typescript
{
  name: String,
  email: String,
  password: String,
  cartData: Object,
  date: Date
}
```

### Frontend Context Providers

- **ProductContext** - Product state management
- **CartContext** - Shopping cart state
- **AuthContext** - User authentication
- **DarkModeContext** - Theme management
- **SearchContext** - Search functionality
- **SideCartContext** - Cart sidebar state

## 🚀 Deployment

### Backend Deployment

1. Set up MongoDB database (MongoDB Atlas recommended)
2. Configure environment variables
3. Deploy to platforms like Heroku, Railway, or DigitalOcean
4. Update CORS origins for production domains

### Frontend Deployment

1. Build the applications:

   ```bash
   # Store
   cd store && npm run build

   # Admin
   cd admin && npm run build
   ```

2. Deploy to platforms like Vercel, Netlify, or AWS S3
3. Update API endpoints to point to production backend

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Development Scripts

### Backend

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

### Frontend (Store & Admin)

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔧 Configuration

### TailwindCSS

Both frontend applications use TailwindCSS v4 with custom configurations for consistent styling.

### TypeScript

All applications use TypeScript with strict type checking enabled for better code quality and developer experience.

### Vite

Frontend applications use Vite for fast development and optimized production builds.

## 📄 License

This project is licensed under the ISC License.

## 🐛 Issues & Support

If you encounter any issues or need support, please create an issue in the GitHub repository.

---

**Happy Coding! 🚀**
