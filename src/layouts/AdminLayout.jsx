import { Outlet, useNavigate, Link } from 'react-router-dom';
import { Menu, X, LogOut, BarChart3, Package, Users, ShoppingCart, Settings, Home, TrendingUp } from 'lucide-react';
import { useState } from 'react';

const menuItems = [
  { label: 'Dashboard', icon: <BarChart3 size={20} />, path: '/admin/dashboard' },
  { label: 'Productos', icon: <Package size={20} />, path: '/admin/products' },
  { label: 'Categorías', icon: <Home size={20} />, path: '/admin/categories' },
  { label: 'Compras', icon: <ShoppingCart size={20} />, path: '/admin/purchases' },
  { label: 'Flete de Compras', icon: <TrendingUp size={20} />, path: '/admin/freight' },
  { label: 'Ventas/Pedidos', icon: <ShoppingCart size={20} />, path: '/admin/orders' },
  { label: 'Clientes', icon: <Users size={20} />, path: '/admin/customers' },
  { label: 'Proveedores', icon: <Users size={20} />, path: '/admin/suppliers' },
  { label: 'Kardex', icon: <Home size={20} />, path: '/admin/kardex' },
  { label: 'Gastos', icon: <TrendingUp size={20} />, path: '/admin/expenses' },
  { label: 'Flujo de Caja', icon: <TrendingUp size={20} />, path: '/admin/cashflow' },
  { label: 'Reportes', icon: <BarChart3 size={20} />, path: '/admin/reports' },
  { label: 'Almacén', icon: <Package size={20} />, path: '/admin/warehouse' },
  { label: 'Usuarios', icon: <Users size={20} />, path: '/admin/users' },
  { label: 'Configuración', icon: <Settings size={20} />, path: '/admin/settings' },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`${
        sidebarOpen ? 'w-64' : 'w-20'
      } bg-agro-secondary text-white transition-all duration-300 fixed h-screen left-0 top-0 overflow-y-auto z-50`}>
        <div className="p-6 flex items-center justify-between">
          {sidebarOpen && (
            <Link to="/" className="flex items-center gap-2 font-bold text-lg text-white">
              <img src="/images/logo.jpg" alt="AGRANET" className="h-8" onError={(e) => e.target.style.display='none'} />
              AgroAdmin
            </Link>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 hover:bg-green-700 rounded lg:block hidden text-white"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="space-y-2 px-3">
          {menuItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-green-700 transition"
              title={!sidebarOpen ? item.label : ''}
            >
              {item.icon}
              {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="border-t border-green-700 mt-6 pt-4 px-3">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-green-700 transition text-white"
            title="Volver a Tienda"
          >
            <LogOut size={20} />
            {sidebarOpen && <span className="text-sm font-medium">Volver a Tienda</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`${sidebarOpen ? 'ml-64' : 'ml-20'} flex-1 flex flex-col transition-all duration-300`}>
        {/* Header */}
        <header className="bg-white shadow-md sticky top-0 z-40">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 hover:bg-gray-100 rounded text-gray-700"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
            <div className="flex-1 text-center">
              <h1 className="text-2xl font-bold text-gray-800">AgroDistribuciones Admin</h1>
              <p className="text-xs text-gray-500">Sistema simulado</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden md:block">
                <p className="text-sm font-semibold text-gray-800">Admin Demo</p>
                <p className="text-xs text-gray-500">Sistema simulado</p>
              </div>
              <div className="w-10 h-10 bg-agro-secondary text-white rounded-full flex items-center justify-center font-bold">
                AD
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden">
          <div className="fixed left-0 top-0 h-full w-64 bg-agro-secondary text-white p-4">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="mb-4 p-2 hover:bg-green-700 rounded"
            >
              <X size={24} />
            </button>
            <nav className="space-y-2">
              {menuItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-green-700 transition"
                >
                  {item.icon}
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}