import { useState } from 'react';
import { getOrders, updateOrderStatus } from '../../utils/localStorage';
import { formatCurrency } from '../../utils/formatCurrency';
import { ChevronDown } from 'lucide-react';

const statuses = ['Pedido recepcionado', 'En almacén', 'En entrega', 'Entregado'];
const statusColors = {
  'Pedido recepcionado': 'badge-warning',
  'En almacén': 'badge-info',
  'En entrega': 'badge-warning',
  'Entregado': 'badge-success'
};

export default function AdminOrders() {
  const [expandedOrder, setExpandedOrder] = useState(null);
  const orders = getOrders();

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
    window.location.reload();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Ventas y Pedidos</h1>

      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">Pedido</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Cliente</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Fecha</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Total</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Estado</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                  No hay pedidos aún
                </td>
              </tr>
            ) : (
              orders.map(order => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-mono text-sm">{order.id}</td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-sm">{order.customer.firstName} {order.customer.lastName}</p>
                      <p className="text-xs text-gray-500">{order.customer.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {new Date(order.date).toLocaleDateString('es-PE')}
                  </td>
                  <td className="px-6 py-4 font-bold text-agro-primary">{formatCurrency(order.total)}</td>
                  <td className="px-6 py-4">
                    <span className={`badge ${statusColors[order.status] || 'badge-info'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                      className="text-blue-600 hover:text-blue-800 font-semibold text-sm"
                    >
                      {expandedOrder === order.id ? 'Cerrar' : 'Ver'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Detalle Expandido */}
      {expandedOrder && (
        <div className="card">
          {orders.map(order => 
            order.id === expandedOrder ? (
              <div key={order.id} className="space-y-4">
                <h3 className="font-bold text-lg">Detalle del Pedido {order.id}</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 text-sm">Cliente</p>
                    <p className="font-semibold">{order.customer.firstName} {order.customer.lastName}</p>
                    <p className="text-sm text-gray-600">{order.customer.phone}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Entrega</p>
                    <p className="font-semibold">{order.customer.address}</p>
                    <p className="text-sm text-gray-600">{order.customer.district}, {order.customer.department}</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <p className="font-bold mb-3">Productos:</p>
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between py-2 border-b">
                      <div>
                        <p className="font-semibold text-sm">{item.name}</p>
                        <p className="text-xs text-gray-600">x{item.quantity}</p>
                      </div>
                      <p className="font-bold">{formatCurrency(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 p-4 rounded space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>{formatCurrency(order.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>IGV (18%):</span>
                    <span>{formatCurrency(order.igv)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Envío:</span>
                    <span>{formatCurrency(order.shipping)}</span>
                  </div>
                  <div className="flex justify-between font-bold border-t pt-2 text-lg">
                    <span>Total:</span>
                    <span className="text-agro-primary">{formatCurrency(order.total)}</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <p className="font-bold mb-3">Cambiar Estado:</p>
                  <div className="flex gap-2 flex-wrap">
                    {statuses.map(status => (
                      <button
                        key={status}
                        onClick={() => handleStatusChange(order.id, status)}
                        className={`px-3 py-2 rounded text-sm font-semibold transition ${
                          order.status === status
                            ? 'bg-agro-primary text-white'
                            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : null
          )}
        </div>
      )}
    </div>
  );
}
