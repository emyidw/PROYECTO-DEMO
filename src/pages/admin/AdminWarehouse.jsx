import { products } from '../../data/products';
import { formatCurrency } from '../../utils/formatCurrency';
import { AlertCircle, Package } from 'lucide-react';

export default function AdminWarehouse() {
  const expiringProducts = products.filter(p => {
    const expDate = new Date(p.expirationDate);
    const today = new Date();
    const daysUntilExp = Math.ceil((expDate - today) / (1000 * 60 * 60 * 24));
    return daysUntilExp <= 30 && daysUntilExp > 0;
  });

  const lowStockProducts = products.filter(p => p.stock <= p.lowStockLimit && p.stock > 0);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Gestión de Almacén</h1>

      {/* KPIs */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="card border-l-4 border-blue-500">
          <p className="text-gray-600 text-sm">Total Productos</p>
          <p className="text-3xl font-bold text-blue-600">{products.length}</p>
        </div>
        <div className="card border-l-4 border-yellow-500">
          <p className="text-gray-600 text-sm">Stock Bajo</p>
          <p className="text-3xl font-bold text-yellow-600">{lowStockProducts.length}</p>
        </div>
        <div className="card border-l-4 border-red-500">
          <p className="text-gray-600 text-sm">Próximos a Vencer</p>
          <p className="text-3xl font-bold text-red-600">{expiringProducts.length}</p>
        </div>
        <div className="card border-l-4 border-green-500">
          <p className="text-gray-600 text-sm">Valor Total Stock</p>
          <p className="text-2xl font-bold text-green-600">
            {formatCurrency(products.reduce((sum, p) => sum + (p.price * p.stock), 0))}
          </p>
        </div>
      </div>

      {/* Productos con Stock Bajo */}
      {lowStockProducts.length > 0 && (
        <div className="card">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <AlertCircle className="text-yellow-600" size={20} />
            Productos con Stock Bajo
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left">Producto</th>
                  <th className="px-6 py-3 text-left">SKU</th>
                  <th className="px-6 py-3 text-left">Stock Actual</th>
                  <th className="px-6 py-3 text-left">Límite Mínimo</th>
                  <th className="px-6 py-3 text-left">Acción</th>
                </tr>
              </thead>
              <tbody>
                {lowStockProducts.map((product, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold">{product.name}</td>
                    <td className="px-6 py-4 font-mono text-xs">{product.sku}</td>
                    <td className="px-6 py-4">
                      <span className="badge badge-warning">{product.stock}</span>
                    </td>
                    <td className="px-6 py-4">{product.lowStockLimit}</td>
                    <td className="px-6 py-4">
                      <button className="text-blue-600 hover:text-blue-800 font-semibold text-sm">
                        Comprar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Productos Próximos a Vencer */}
      {expiringProducts.length > 0 && (
        <div className="card">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Package className="text-red-600" size={20} />
            Productos Próximos a Vencer (30 días)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left">Producto</th>
                  <th className="px-6 py-3 text-left">Lote</th>
                  <th className="px-6 py-3 text-left">Vencimiento</th>
                  <th className="px-6 py-3 text-left">Stock</th>
                  <th className="px-6 py-3 text-left">Acción</th>
                </tr>
              </thead>
              <tbody>
                {expiringProducts.map((product, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold">{product.name}</td>
                    <td className="px-6 py-4">{product.lot}</td>
                    <td className="px-6 py-4 text-red-600 font-bold">{product.expirationDate}</td>
                    <td className="px-6 py-4">{product.stock}</td>
                    <td className="px-6 py-4">
                      <button className="text-red-600 hover:text-red-800 font-semibold text-sm">
                        Vender Urgente
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Recepción de Mercadería */}
      <div className="card">
        <h3 className="font-bold text-lg mb-4">Recepción de Mercadería</h3>
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
          <p className="text-yellow-800 text-sm">
            Funcionalidad simulada para presentación del prototipo.
          </p>
          <p className="text-yellow-700 text-xs mt-2">
            En un proyecto real, aquí estaría el formulario para recibir compras, validar documentos y actualizar stock.
          </p>
        </div>
      </div>

      {/* Preparación de Pedidos */}
      <div className="card">
        <h3 className="font-bold text-lg mb-4">Preparación de Pedidos</h3>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <p className="text-blue-800 text-sm">
            Funcionalidad simulada para presentación del prototipo.
          </p>
          <p className="text-blue-700 text-xs mt-2">
            En un proyecto real, aquí se mostrarían los pedidos pendientes, picking list y validación de envío.
          </p>
        </div>
      </div>
    </div>
  );
}
