import { useState } from 'react';
import { Search, Edit, Trash2, Plus } from 'lucide-react';
import { products } from '../../data/products';
import { formatCurrency } from '../../utils/formatCurrency';

export default function AdminProducts() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [showModal, setShowModal] = useState(false);

  const categories = ['Todas', 'Agroquímicos', 'Fertilizantes', 'Semillas', 'Cinta de riego'];
  
  const filtered = search
    ? products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.sku.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase())
      )
    : products;

  const handleAction = (action, product) => {
    alert(`Funcionalidad simulada para presentación del prototipo.\nAcción: ${action}\nProducto: ${product.name}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestión de Productos</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-agro-primary text-white rounded-lg hover:bg-blue-600 transition"
        >
          <Plus size={18} /> Nuevo Producto
        </button>
      </div>

      {/* Filters */}
      <div className="card space-y-4">
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
                className="input pl-10"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Categoría</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="select"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">
              Exportar Excel
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left">Imagen</th>
              <th className="px-4 py-3 text-left">SKU</th>
              <th className="px-4 py-3 text-left max-w-xs">Nombre</th>
              <th className="px-4 py-3 text-left">Categoría</th>
              <th className="px-4 py-3 text-left">Marca</th>
              <th className="px-4 py-3 text-left">Stock</th>
              <th className="px-4 py-3 text-left">Precio</th>
              <th className="px-4 py-3 text-left">Estado</th>
              <th className="px-4 py-3 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.slice(0, 10).map(product => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-600">
                    IMG
                  </div>
                </td>
                <td className="px-4 py-3 font-mono text-xs">{product.sku}</td>
                <td className="px-4 py-3 max-w-xs">
                  <span className="block break-words">{product.name}</span>
                </td>
                <td className="px-4 py-3"><span className="badge badge-info">{product.category}</span></td>
                <td className="px-4 py-3 text-sm">{product.brand}</td>
                <td className="px-4 py-3">
                  <span className={product.stock <= product.lowStockLimit ? 'text-red-600 font-bold' : 'font-semibold'}>
                    {product.stock}
                  </span>
                </td>
                <td className="px-4 py-3 font-bold text-agro-primary">{formatCurrency(product.price)}</td>
                <td className="px-4 py-3"><span className="badge badge-success">Activo</span></td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAction('Editar', product)}
                      className="p-1 hover:bg-blue-100 text-blue-600 rounded"
                      title="Editar"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleAction('Eliminar', product)}
                      className="p-1 hover:bg-red-100 text-red-600 rounded"
                      title="Eliminar"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-4 text-sm text-gray-600">Mostrando {Math.min(10, filtered.length)} de {filtered.length} productos</p>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 max-h-96 overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Nuevo Producto</h2>
            <p className="text-gray-600 mb-6">Funcionalidad simulada para presentación del prototipo.</p>
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 bg-agro-green text-white rounded-lg hover:bg-agro-green transition"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
