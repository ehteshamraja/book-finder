import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';
import { Navbar } from './components/Navbar.tsx';
import { Home } from './pages/Home.tsx';
import { LoginForm } from './components/LoginForm.tsx';
import { ProtectedRoute } from './components/ProtectedRoute.tsx';
import { Favorites } from './pages/Favorites.tsx';
import { Register } from './pages/Register.tsx';
import { BookDetail } from './pages/BookDetail.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/favorites"
                  element={
                    <ProtectedRoute>
                      <Favorites />
                    </ProtectedRoute>
                  }
                />
             <Route path="/book/:id" element={<ProtectedRoute><BookDetail /></ProtectedRoute>} />

              </Routes>
            </main>
            <Toaster position="top-right" />
          </div>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
};

export default App; 