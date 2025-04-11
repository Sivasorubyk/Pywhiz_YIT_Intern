// src/components/Navbar.tsx
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useState } from 'react'
import { Menu, X, User, LogOut } from 'lucide-react'

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth()
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen)

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="bg-[#003366] text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center">
          <span className="text-[#10b3b3]">Py</span>Whiz
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
            Home
          </Link>
          <Link to="/learn" className={`nav-link ${isActive('/learn') ? 'active' : ''}`}>
            Learn
          </Link>
          <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`}>
            Contact
          </Link>
          
          {isAuthenticated ? (
            <div className="relative">
              <button 
                onClick={toggleProfile}
                className="flex items-center text-white hover:text-[#66cccc]"
              >
                <User className="h-5 w-5" />
              </button>
              
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">
                    {user?.username}
                  </div>
                  <button
                    onClick={() => {
                      logout()
                      setIsProfileOpen(false)
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn-primary">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#003366] px-4 py-2">
          <div className="flex flex-col space-y-3">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/learn" 
              className={`nav-link ${isActive('/learn') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Learn
            </Link>
            <Link 
              to="/contact" 
              className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            
            {isAuthenticated ? (
              <>
                <div className="border-t border-gray-700 my-2"></div>
                <div className="text-sm text-gray-300">
                  {user?.username}
                </div>
                <button
                  onClick={() => {
                    logout()
                    setIsMenuOpen(false)
                  }}
                  className="flex items-center text-white hover:text-[#66cccc]"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="btn-primary inline-block text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar