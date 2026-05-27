import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import { products } from '../../data/products';
import { getStock, initializeStock } from '../../utils/stockManager';
import { formatCurrency } from '../../utils/formatCurrency';

export default function StoreCatalog() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [productsWithStock, setProductsWithStock] = useState([]);

  useEffect(() => {
    // Inicializar stock
    initializeStock(products);
    
    // Actualizar productos con stock real
    const updated = products.map(p => ({
      ...p,
      currentStock: getStock(p.id) || p.stock
    }));
    setProductsWithStock(updated);
  }, []);

  const categories = ['Todas', ...new Set(products.map(p => p.category))];

  const filtered = productsWithStock.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                         p.sku.toLowerCase().includes(search.toLowerCase()) ||
                         p.brand.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'Todas' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Catálogo de Productos</h1>
        <p className="text-gray-600">Explora nuestros productos de agroquímicos, fertilizantes y semillas</p>
      </div>

      {/* Filtros */}
      <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Buscar</label>
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Nombre, SKU o marca..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-agro-primary"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Categoría</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-agro-primary"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <p className="text-sm text-gray-600">
              Se encontraron <strong>{filtered.length}</strong> productos
            </p>
          </div>
        </div>
      </div>

      {/* Grid de Productos */}
      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No se encontraron productos</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map(product => (
            <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
              {/* Imagen */}
              <div className="bg-gray-100 h-48 flex items-center justify-center overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23e5e7eb" width="100" height="100"/%3E%3C/svg%3E'}
                />
              </div>

              {/* Info */}
              <div className="p-4 space-y-3">
                <div>
                  <p className="text-xs text-gray-500">{product.sku}</p>
                  <h3 className="font-semibold text-sm line-clamp-2">{product.name}</h3>
                </div>

                <div className="flex justify-between items-center">
                  <span className="badge badge-info text-xs">{product.category}</span>
                  <span className="text-xs text-gray-600">{product.brand}</span>
                </div>

                <div className="border-t pt-3">
                  <p className="text-2xl font-bold text-agro-primary">{formatCurrency(product.price)}</p>
                  <p className={`text-sm font-semibold ${
                    product.currentStock > 10 ? 'text-green-600' :
                    product.currentStock > 0 ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {product.currentStock > 0 ? `${product.currentStock} disponibles` : 'Agotado'}
                  </p>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => navigate(`/store/product/${product.id}`)}
                    className="w-full py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 text-sm font-semibold"
                  >
                    Ver Detalle
                  </button>
                  <button
                    disabled={product.currentStock === 0}
                    className="w-full py-2 bg-agro-secondary text-white rounded hover:bg-green-700 text-sm font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Agregar al Carrito
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
