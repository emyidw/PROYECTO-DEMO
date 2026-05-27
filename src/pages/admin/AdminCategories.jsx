import { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const mockCategories = [
  { id: 1, name: 'Agroquímicos', subcategories: ['Herbicidas', 'Fungicidas', 'Insecticidas', 'Bioestimulantes'], products: 8, status: 'Activa' },
  { id: 2, name: 'Fertilizantes', subcategories: ['Granulados', 'Foliares', 'Especiales'], products: 6, status: 'Activa' },
  { id: 3, name: 'Semillas', subcategories: ['Hortícolas', 'Maíz', 'Otros'], products: 4, status: 'Activa' },
  { id: 4, name: 'Cinta de Riego', subcategories: ['Goteo', 'Microaspersión'], products: 2, status: 'Activa' },
];

export default function AdminCategories() {
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setShowModal(true);
  };

  const handleDelete = (categoryId) => {
    alert('Funcionalidad simulada para presentación del prototipo.');
  };

  const handleNew = () => {
    setSelectedCategory(null);
    setShowModal(true);
  };

  const handleSave = () => {
    alert('Funcionalidad simulada para presentación del prototipo.');
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestión de Categorías</h1>
        <button
          onClick={handleNew}
          className="bg-agro-primary hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-semibold"
        >
          <Plus size={20} /> Nueva Categoría
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {mockCategories.map((category, idx) => (
          <div key={idx} className="card">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg">{category.name}</h3>
                <span className="badge badge-success">{category.status}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(category)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600 font-semibold mb-2">Subcategorías:</p>
                <div className="flex flex-wrap gap-2">
                  {category.subcategories.map((sub, i) => (
                    <span key={i} className="badge badge-info">{sub}</span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 text-sm pt-3 border-t">
                <div>
                  <p className="text-gray-600">Productos</p>
                  <p className="font-bold text-agro-primary text-lg">{category.products}</p>
                </div>
                <div>
                  <p className="text-gray-600">Subcategorías</p>
                  <p className="font-bold text-agro-secondary text-lg">{category.subcategories.length}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-6">
              {selectedCategory ? 'Editar Categoría' : 'Nueva Categoría'}
            </h2>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold mb-1">Nombre</label>
                <input
                  type="text"
                  defaultValue={selectedCategory?.name || ''}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-agro-primary"
                  placeholder="Nombre de la categoría"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Descripción</label>
                <textarea
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-agro-primary"
                  placeholder="Descripción"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Estado</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-agro-primary">
                  <option>Activa</option>
                  <option>Inactiva</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleSave}
                className="flex-1 bg-agro-primary hover:bg-blue-600 text-white py-2 rounded-lg font-semibold"
              >
                Guardar
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-lg font-semibold"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
