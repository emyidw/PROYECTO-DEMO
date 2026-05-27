import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Package, Users, ShoppingCart, AlertCircle, Wallet } from 'lucide-react';
import { getOrders } from '../../utils/localStorage';
import { products } from '../../data/products';
import { formatCurrency } from '../../utils/formatCurrency';

const mockSalesData = [
  { month: 'Ene', ventas: 12000, compras: 8000 },
  { month: 'Feb', ventas: 19000, compras: 12000 },
  { month: 'Mar', ventas: 15000, compras: 10000 },
  { month: 'Abr', ventas: 22000, compras: 15000 },
  { month: 'May', ventas: 25000, compras: 18000 },
  { month: 'Jun', ventas: 28000, compras: 20000 },
];

const mockExpensesData = [
  { name: 'Combustible', value: 8000 },
  { name: 'Transporte', value: 6000 },
  { name: 'Servicios', value: 5000 },
  { name: 'Mantenimiento', value: 3000 },
  { name: 'Otros', value: 4000 },
];

const COLORS = ['#2d5016', '#65a30d', '#84cc16', '#bef264', '#dcfce7'];

export default function AdminDashboard() {
  const orders = getOrders();
  const lowStockProducts = products.filter(p => p.stock <= p.lowStockLimit).length;
  
  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status !== 'Entregado').length;

  const stats = [
    {
      title: 'Ventas del Mes',
      value: formatCurrency(totalSales),
      icon: <TrendingUp className="text-green-600" size={32} />,
      bg: 'bg-green-100',
      change: '+12% vs mes anterior'
    },
    {
      title: 'Compras Pendientes',
      value: '4',
      icon: <ShoppingCart className="text-blue-600" size={32} />,
      bg: 'bg-blue-100',
      change: 'Valor: S/ 45,000'
    },
    {
      title: 'Stock Crítico',
      value: lowStockProducts,
      icon: <AlertCircle className="text-red-600" size={32} />,
      bg: 'bg-red-100',
      change: `${lowStockProducts} productos por agotar`
    },
    {
      title: 'Pedidos Pendientes',
      value: pendingOrders,
      icon: <Package className="text-yellow-600" size={32} />,
      bg: 'bg-yellow-100',
      change: `${totalOrders} pedidos totales`
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className={`card ${stat.bg} border-2`}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              {stat.icon}
            </div>
            <p className="text-xs text-gray-600">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="card">
          <h2 className="text-lg font-bold mb-4">Ventas vs Compras (6 meses)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockSalesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="ventas" fill="#2d5016" name="Ventas" />
              <Bar dataKey="compras" fill="#65a30d" name="Compras" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Expenses Pie */}
        <div className="card">
          <h2 className="text-lg font-bold mb-4">Gastos por Categoría</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={mockExpensesData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name} (S/ ${value})`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {mockExpensesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value)} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tables */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="card">
          <h2 className="text-lg font-bold mb-4">Últimos Pedidos</h2>
          <div className="space-y-3">
            {orders.slice(-5).reverse().map(order => (
              <div key={order.id} className="flex justify-between items-center pb-3 border-b last:border-b-0">
                <div className="flex-1">
                  <p className="font-semibold text-sm">{order.id}</p>
                  <p className="text-xs text-gray-600">{order.customer.firstName} {order.customer.lastName}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm">{formatCurrency(order.total)}</p>
                  <span className={`text-xs badge ${order.status === 'Entregado' ? 'badge-success' : 'badge-warning'}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
            {orders.length === 0 && (
              <p className="text-gray-500 text-sm text-center py-4">Sin pedidos aún</p>
            )}
          </div>
        </div>

        {/* Low Stock */}
        <div className="card">
          <h2 className="text-lg font-bold mb-4">Productos con Stock Bajo</h2>
          <div className="space-y-3">
            {products.filter(p => p.stock <= p.lowStockLimit && p.stock > 0).slice(0, 5).map(product => (
              <div key={product.id} className="flex justify-between items-center pb-3 border-b">
                <div className="flex-1">
                  <p className="font-semibold text-sm line-clamp-1">{product.name}</p>
                  <p className="text-xs text-gray-600">{product.sku}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">{product.stock}</p>
                  <span className="text-xs badge badge-warning">Bajo</span>
                </div>
              </div>
            ))}
            {lowStockProducts === 0 && (
              <p className="text-gray-500 text-sm text-center py-4">Todos los productos tienen buen stock</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
