import { Outlet, useNavigate, Link } from 'react-router-dom';
import { ShoppingCart, Home, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { getCart } from '../utils/localStorage';
import ChatBot from '../components/common/ChatBot';

export default function StoreLayout() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const cartItems = getCart();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/store/landing" className="flex items-center gap-2 text-2xl font-bold text-agro-primary">
              <img src="/images/logo.jpg" alt="AGRANET" className="h-10" onError={(e) => e.target.style.display='none'} />
              <span>AgroDistribuciones</span>
            </Link>

            {/* Navigation - Desktop */}
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/store/landing" className="text-gray-700 hover:text-agro-green transition">Inicio</Link>
              <Link to="/store/catalog" className="text-gray-700 hover:text-agro-green transition">Catálogo</Link>
              <a href="#categories" className="text-gray-700 hover:text-agro-green transition">Categorías</a>
              <Link to="/store/tracking" className="text-gray-700 hover:text-agro-green transition">Seguimiento</Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <Link 
                to="/store/cart"
                className="relative p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <ShoppingCart size={24} className="text-agro-green" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setShowLoginModal(true)}
                className="px-4 py-2 bg-agro-green text-white rounded-lg hover:bg-agro-green transition hidden sm:block"
              >
                Entrar
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2"
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <nav className="md:hidden mt-4 pb-4 border-t pt-4 space-y-3">
              <Link to="/store/landing" className="block text-gray-700 hover:text-agro-green">Inicio</Link>
              <Link to="/store/catalog" className="block text-gray-700 hover:text-agro-green">Catálogo</Link>
              <a href="#categories" className="block text-gray-700 hover:text-agro-green">Categorías</a>
              <Link to="/store/tracking" className="block text-gray-700 hover:text-agro-green">Seguimiento</Link>
              <button
                onClick={() => setShowLoginModal(true)}
                className="w-full mt-4 px-4 py-2 bg-agro-green text-white rounded-lg"
              >
                Entrar como Admin
              </button>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-agro-green text-white mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <img src="/logo.jpg" alt="AGRANET" className="h-6" />
                AgroDistribuciones
              </h3>
              <p className="text-green-100">Productos agrícolas de calidad para tu empresa.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Productos</h4>
              <ul className="space-y-2 text-green-100 text-sm">
                <li><Link to="/store/catalog">Catálogo</Link></li>
                <li><a href="#categories">Categorías</a></li>
                <li><a href="#featured">Destacados</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Soporte</h4>
              <ul className="space-y-2 text-green-100 text-sm">
                <li><a href="tel:987654321">Tel: 987 654 321</a></li>
                <li><a href="mailto:info@agrodistribuciones.com">Email: info@agro.com</a></li>
                <li><Link to="/store/tracking">Tracking Pedidos</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Empresa</h4>
              <p className="text-green-100 text-sm">
                AgroDistribuciones del Valle S.A.C.<br/>
                RUC: 20601234567<br/>
                Av. Agricultura 450, Tacna
              </p>
            </div>
          </div>
          <div className="border-t border-green-700 pt-8 text-center text-green-100 text-sm">
            <p>&copy; 2024 AgroDistribuciones del Valle. Sistema Demo sin conexión a base de datos.</p>
          </div>
        </div>
      </footer>

      {/* ChatBot */}
      <ChatBot />

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold mb-6">Opciones de Acceso</h2>
            
            <button
              onClick={() => {
                navigate('/admin/dashboard');
                setShowLoginModal(false);
              }}
              className="w-full mb-4 py-3 bg-agro-green text-white rounded-lg hover:bg-agro-green transition font-semibold"
            >
              Entrar como Administrador
            </button>

            <button
              onClick={() => setShowLoginModal(false)}
              className="w-full py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
            >
              Volver a la Tienda
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
