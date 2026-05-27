import { useNavigate } from 'react-router-dom';
import { Leaf, Truck, CheckCircle, Package, ArrowRight } from 'lucide-react';
import { products } from '../../data/products';

const benefits = [
  {
    icon: <Package size={32} />,
    title: 'Productos de Calidad',
    description: 'Amplia variedad de agroquímicos, fertilizantes y semillas'
  },
  {
    icon: <Truck size={32} />,
    title: 'Entrega Rápida',
    description: 'Envíos a todo el Perú en tiempo récord'
  },
  {
    icon: <CheckCircle size={32} />,
    title: 'Stock Actualizado',
    description: 'Inventario real y disponibilidad confirmada'
  }
];

const categories = [
  { name: 'Agroquímicos', count: 6, color: 'from-blue-500 to-blue-600' },
  { name: 'Fertilizantes', count: 4, color: 'from-green-500 to-green-600' },
  { name: 'Semillas', count: 4, color: 'from-yellow-500 to-yellow-600' },
  { name: 'Bioestimulantes', count: 2, color: 'from-purple-500 to-purple-600' }
];

export default function StoreLanding() {
  const navigate = useNavigate();
  const featured = products.filter(p => p.featured).slice(0, 6);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-agro-green to-agro-light rounded-2xl overflow-hidden text-white p-12 md:p-16">
        <div className="absolute right-0 top-0 opacity-10">
          <Leaf size={300} />
        </div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Soluciones Agrícolas Completas
          </h1>
          <p className="text-lg md:text-xl mb-8 text-green-100">
            Encuentra todo lo que necesitas para tu cultivo: agroquímicos, fertilizantes, semillas y más.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/store/catalog')}
              className="flex items-center gap-2 px-6 py-3 bg-white text-agro-green font-bold rounded-lg hover:bg-green-50 transition"
            >
              Ver Catálogo <ArrowRight size={20} />
            </button>
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-agro-green transition"
            >
              Panel Demo
            </button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900">Categorías</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {categories.map(cat => (
            <div
              key={cat.name}
              className={`bg-gradient-to-br ${cat.color} text-white p-6 rounded-lg cursor-pointer hover:shadow-lg transition transform hover:scale-105`}
            >
              <h3 className="text-xl font-bold mb-2">{cat.name}</h3>
              <p className="text-sm opacity-90">{cat.count} productos</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured" className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-900">Productos Destacados</h2>
          <button
            onClick={() => navigate('/store/catalog')}
            className="text-agro-green font-semibold hover:underline flex items-center gap-2"
          >
            Ver todos <ArrowRight size={20} />
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {featured.map(product => (
            <div key={product.id} className="card group cursor-pointer">
              <div className="bg-gray-200 rounded-lg h-48 mb-4 flex items-center justify-center overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition"
                  onError={(e) => e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23e5e7eb" width="100" height="100"/%3E%3Ctext x="50" y="50" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-size="12" fill="%239ca3af"%3EProducto%3C/text%3E%3C/svg%3E'}
                />
              </div>
              <h3 className="font-bold text-lg text-gray-900 line-clamp-2 mb-2">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{product.brand}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-agro-green">S/ {product.price}</span>
                <span className={`badge ${product.stock > 20 ? 'badge-success' : product.stock > 5 ? 'badge-warning' : 'badge-danger'}`}>
                  {product.stock} en stock
                </span>
              </div>
              <button
                onClick={() => navigate(`/store/product/${product.id}`)}
                className="w-full py-2 bg-agro-green text-white rounded-lg hover:bg-agro-green transition"
              >
                Ver Detalle
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900">¿Por qué confiar en nosotros?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="card text-center">
              <div className="text-agro-green mb-4 flex justify-center">{benefit.icon}</div>
              <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-agro-green text-white rounded-2xl p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">¿Listo para comprar?</h2>
        <p className="text-lg mb-6 text-green-100">Accede a nuestro catálogo completo y realiza tu pedido ahora</p>
        <button
          onClick={() => navigate('/store/catalog')}
          className="px-8 py-3 bg-white text-agro-green font-bold rounded-lg hover:bg-green-50 transition"
        >
          Ir al Catálogo
        </button>
      </section>
    </div>
  );
}
