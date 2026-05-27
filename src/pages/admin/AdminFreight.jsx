import { useState } from 'react';
import { Plus, Eye, Trash2 } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';

const mockFreight = [
  { id: 1, date: '2024-05-25', invoice: 'F001-000001', supplier: 'Inversiones Agrícolas del Sur', amount: 250, method: 'Por cantidad', status: 'Aplicado' },
  { id: 2, date: '2024-05-23', invoice: 'F001-000002', supplier: 'Químicos Agrícolas del Perú', amount: 180, method: 'Por costo', status: 'Aplicado' },
  { id: 3, date: '2024-05-20', invoice: 'F001-000003', supplier: 'Semillería Nacional del Perú', amount: 120, method: 'Por peso', status: 'Aplicado' },
  { id: 4, date: '2024-05-18', invoice: 'F001-000004', supplier: 'Distribuidora de Minerales S.A.', amount: 95, method: 'Por cantidad', status: 'Aplicado' },
];

const distributionMethods = ['Por cantidad', 'Por costo', 'Por peso o volumen'];

export default function AdminFreight() {
  const [showModal, setShowModal] = useState(false);
  const [expandedFreight, setExpandedFreight] = useState(null);

  const handleNew = () => {
    setShowModal(true);
  };

  const handleSave = () => {
    alert('Funcionalidad simulada para presentación del prototipo.');
    setShowModal(false);
  };

  const handleDelete = (freightId) => {
    alert('Funcionalidad simulada para presentación del prototipo.');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Flete de Compras</h1>
        <button
          onClick={handleNew}
          className="bg-agro-primary hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-semibold"
        >
          <Plus size={20} /> Nuevo Flete
        </button>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">Fecha</th>
              <th className="px-6 py-3 text-left font-semibold">Factura</th>
              <th className="px-6 py-3 text-left font-semibold">Proveedor</th>
              <th className="px-6 py-3 text-left font-semibold">Monto</th>
              <th className="px-6 py-3 text-left font-semibold">Método</th>
              <th className="px-6 py-3 text-left font-semibold">Estado</th>
              <th className="px-6 py-3 text-left font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {mockFreight.map((freight, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{freight.date}</td>
                <td className="px-6 py-4 font-mono text-xs">{freight.invoice}</td>
                <td className="px-6 py-4">{freight.supplier}</td>
                <td className="px-6 py-4 font-bold text-agro-primary">{formatCurrency(freight.amount)}</td>
                <td className="px-6 py-4"><span className="badge badge-info">{freight.method}</span></td>
                <td className="px-6 py-4"><span className="badge badge-success">{freight.status}</span></td>
                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() => setExpandedFreight(expandedFreight === freight.id ? null : freight.id)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(freight.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detalles Expandidos */}
      {expandedFreight && (
        <div className="card">
          {mockFreight.map(freight =>
            freight.id === expandedFreight ? (
              <div key={freight.id} className="space-y-4">
                <h3 className="font-bold text-lg">Detalle Flete #{freight.id}</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 text-sm">Factura</p>
                    <p className="font-semibold">{freight.invoice}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Proveedor</p>
                    <p className="font-semibold">{freight.supplier}</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <p className="font-bold mb-3">Distribución por Producto:</p>
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left">Producto</th>
                        <th className="px-4 py-2 text-right">Cantidad</th>
                        <th className="px-4 py-2 text-right">Flete Asignado</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="px-4 py-2">Producto A</td>
                        <td className="px-4 py-2 text-right">50</td>
                        <td className="px-4 py-2 text-right font-bold">{formatCurrency(125)}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-4 py-2">Producto B</td>
                        <td className="px-4 py-2 text-right">30</td>
                        <td className="px-4 py-2 text-right font-bold">{formatCurrency(75)}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-bold">Total</td>
                        <td className="px-4 py-2 text-right"></td>
                        <td className="px-4 py-2 text-right font-bold text-agro-primary">{formatCurrency(freight.amount)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ) : null
          )}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-6">Registrar Nuevo Flete</h2>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold mb-1">Número de Factura</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-agro-primary"
                  placeholder="F001-000001"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Monto Flete (S/)</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-agro-primary"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Método de Distribución</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-agro-primary">
                  {distributionMethods.map((method, idx) => (
                    <option key={idx}>{method}</option>
                  ))}
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
