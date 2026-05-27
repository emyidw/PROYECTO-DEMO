import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  LogOut,
  BarChart3,
  Package,
  Users,
  ShoppingCart,
  Settings,
  Home,
  TrendingUp,
  Archive,
  Wallet,
  Warehouse,
} from 'lucide-react';
import { useState } from 'react';

const menuItems = [
  {
    label: 'Dashboard',
    icon: <BarChart3 size={20} />,
    path: '/admin/dashboard',
  },
  {
    label: 'Productos',
    icon: <Package size={20} />,
    path: '/admin/products',
  },
  {
    label: 'Categorías',
    icon: <Home size={20} />,
    path: '/admin/categories',
  },
  {
    label: 'Compras',
    icon: <ShoppingCart size={20} />,
    path: '/admin/purchases',
  },
  {
    label: 'Flete de Compras',
    icon: <TrendingUp size={20} />,
    path: '/admin/freight',
  },
  {
    label: 'Ventas/Pedidos',
    icon: <ShoppingCart size={20} />,
    path: '/admin/orders',
  },
  {
    label: 'Clientes',
    icon: <Users size={20} />,
    path: '/admin/customers',
  },
  {
    label: 'Proveedores',
    icon: <Users size={20} />,
    path: '/admin/suppliers',
  },
  {
    label: 'Kardex',
    icon: <Archive size={20} />,
    path: '/admin/kardex',
  },
  {
    label: 'Gastos',
    icon: <TrendingUp size={20} />,
    path: '/admin/expenses',
  },
  {
    label: 'Flujo de Caja',
    icon: <Wallet size={20} />,
    path: '/admin/cashflow',
  },
  {
    label: 'Reportes',
    icon: <BarChart3 size={20} />,
    path: '/admin/reports',
  },
  {
    label: 'Almacén',
    icon: <Warehouse size={20} />,
    path: '/admin/warehouse',
  },
  {
    label: 'Usuarios',
    icon: <Users size={20} />,
    path: '/admin/users',
  },
  {
    label: 'Configuración',
    icon: <Settings size={20} />,
    path: '/admin/settings',
  },
];

export default function AdminLayout() {
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar escritorio */}
      <aside
        style={{
          background:
            'linear-gradient(180deg, #0F2F22 0%, #164532 55%, #0B2419 100%)',
          backgroundColor: '#0F2F22',
          color: '#ffffff',
        }}
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } fixed left-0 top-0 z-50 hidden h-screen overflow-y-auto text-white shadow-2xl transition-all duration-300 lg:block`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between border-b border-white/10 p-6">
          {sidebarOpen && (
            <Link to="/" className="flex items-center gap-2 text-lg font-bold">
              <img
                src="/images/logo.jpg"
                alt="AGRANET"
                className="h-8 rounded bg-white px-1 py-0.5"
              />
              <span className="text-white">AgroAdmin</span>
            </Link>
          )}

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="rounded-lg p-2 text-white/80 transition hover:bg-white/10 hover:text-white"
            type="button"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Menú */}
        <nav className="space-y-2 px-3 py-5">
          {menuItems.map((item) => {
            const active = isActivePath(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                title={!sidebarOpen ? item.label : ''}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  active
                    ? 'bg-green-700 text-white shadow-lg shadow-black/20'
                    : 'text-white/85 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span
                  className={`flex items-center justify-center ${
                    active ? 'text-white' : 'text-white/85'
                  }`}
                >
                  {item.icon}
                </span>

                {sidebarOpen && (
                  <span className="text-sm font-semibold text-white">
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Volver a tienda */}
        <div className="mt-6 border-t border-white/10 px-3 pt-4">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            title="Volver a Tienda"
          >
            <LogOut size={20} />
            {sidebarOpen && <span>Volver a Tienda</span>}
          </Link>
        </div>
      </aside>

      {/* Contenido principal */}
      <div
        className={`${
          sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'
        } flex min-h-screen flex-1 flex-col transition-all duration-300`}
      >
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white shadow-md">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="rounded-lg p-2 hover:bg-gray-100"
                type="button"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            <div>
              <h1 className="hidden text-2xl font-bold text-gray-800 sm:block">
                AgroDistribuciones Admin
              </h1>
              <p className="hidden text-center text-sm text-gray-500 sm:block">
                Sistema simulado
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold text-gray-900">
                  Admin Demo
                </p>
                <p className="text-xs text-gray-600">Sistema simulado</p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-700 font-bold text-white">
                AD
              </div>
            </div>
          </div>

          {/* Menú móvil */}
          {mobileMenuOpen && (
            <nav
              style={{
                background:
                  'linear-gradient(180deg, #0F2F22 0%, #164532 55%, #0B2419 100%)',
                backgroundColor: '#0F2F22',
              }}
              className="space-y-2 border-t border-white/10 px-4 pb-4 pt-3 lg:hidden"
            >
              {menuItems.map((item) => {
                const active = isActivePath(item.path);

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm transition ${
                      active
                        ? 'bg-green-700 font-semibold text-white'
                        : 'text-white/85 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <LogOut size={18} />
                <span>Volver a Tienda</span>
              </Link>
            </nav>
          )}
        </header>

        {/* Contenido de páginas */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
