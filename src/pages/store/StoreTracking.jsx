import { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getOrderById, getOrders, updateOrderStatus } from '../../utils/localStorage';
import { formatCurrency } from '../../utils/formatCurrency';
import { CheckCircle, Clock, Truck, Package } from 'lucide-react';

const statuses = ['Pedido recepcionado', 'En almacén', 'En entrega', 'Entregado'];
const statusIcons = {
  'Pedido recepcionado': <Package size={32} />,
  'En almacén': <Clock size={32} />,
  'En entrega': <Truck size={32} />,
  'Entregado': <CheckCircle size={32} />
};

export default function StoreTracking() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchOrder, setSearchOrder] = useState(searchParams.get('orderId') || '');
  const [foundOrder, setFoundOrder] = useState(null);
  const [searched, setSearched] = useState(false);

  const allOrders = getOrders();

  const handleSearch = (e) => {
    e.preventDefault();
    const order = allOrders.find(o => o.id === searchOrder);
    if (order) {
      setFoundOrder(order);
      setSearched(true);
    } else {
      setFoundOrder(null);
      setSearched(true);
      alert('Pedido no encontrado. Verifica el número de pedido.');
    }
  };

  const handleChangeStatus = (newStatus) => {
    if (foundOrder) {
      updateOrderStatus(foundOrder.id, newStatus);
      setFoundOrder({ ...foundOrder, status: newStatus });
    }
  };

  const currentStatusIndex = foundOrder ? statuses.indexOf(foundOrder.status) : -1;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Seguimiento de Pedidos</h1>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="card max-w-md">
        <h2 className="text-lg font-bold mb-4">Buscar Pedido</h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Ej: PED-1234567890"
            value={searchOrder}
            onChange={(e) => setSearchOrder(e.target.value)}
            className="input flex-1"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-agro-green text-white rounded-lg hover:bg-agro-green transition font-semibold"
          >
            Buscar
          </button>
        </div>
      </form>

      {/* Tracking Timeline */}
      {foundOrder && (
        <div className="space-y-6">
          {/* Order Header */}
          <div className="card">
            <h2 className="text-2xl font-bold mb-4">{foundOrder.id}</h2>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Cliente</p>
                <p className="font-bold">{foundOrder.customer.firstName} {foundOrder.customer.lastName}</p>
              </div>
              <div>
                <p className="text-gray-600">Fecha del Pedido</p>
                <p className="font-bold">{new Date(foundOrder.date).toLocaleDateString('es-PE')}</p>
              </div>
              <div>
                <p className="text-gray-600">Total</p>
                <p className="font-bold text-agro-green text-lg">{formatCurrency(foundOrder.total)}</p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="card">
            <h3 className="text-lg font-bold mb-6">Estado del Pedido</h3>
            <div className="space-y-6">
              {statuses.map((status, idx) => {
                const isCompleted = idx <= currentStatusIndex;
                const isCurrent = idx === currentStatusIndex;
                return (
                  <div key={status} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                        isCompleted ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {statusIcons[status]}
                      </div>
                      {idx < statuses.length - 1 && (
                        <div className={`w-1 h-12 ${isCompleted ? 'bg-green-600' : 'bg-gray-300'}`}></div>
                      )}
                    </div>
                    <div className="flex-1 py-2">
                      <h4 className={`font-bold ${isCurrent ? 'text-agro-green text-lg' : ''}`}>{status}</h4>
                      <p className="text-gray-600 text-sm">
                        {isCompleted
                          ? new Date(foundOrder.date).toLocaleDateString('es-PE')
                          : 'Pendiente'}
                      </p>
                    </div>
                    {isCompleted && (
                      <div className="text-green-600 font-bold text-lg">✓</div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Simulated Status Change (Demo Only) */}
            <div className="mt-8 pt-6 border-t">
              <p className="text-sm text-gray-600 mb-3">*Panel de demostración para cambiar estado:</p>
              <div className="flex gap-2 flex-wrap">
                {statuses.map((status) => (
                  <button
                    key={status}
                    onClick={() => handleChangeStatus(status)}
                    className={`px-4 py-2 rounded-lg transition font-semibold text-sm ${
                      foundOrder.status === status
                        ? 'bg-agro-green text-white'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="card">
            <h3 className="text-lg font-bold mb-4">Productos</h3>
            <div className="space-y-3">
              {foundOrder.items.map((item, idx) => (
                <div key={idx} className="flex justify-between pb-3 border-b last:border-b-0">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                  </div>
                  <p className="font-bold">{formatCurrency(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Info */}
          <div className="card bg-blue-50 border-l-4 border-blue-600">
            <h3 className="text-lg font-bold mb-4">Información de Entrega</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Dirección:</strong> {foundOrder.customer.address}</p>
              <p><strong>Distrito:</strong> {foundOrder.customer.district}, {foundOrder.customer.province}</p>
              <p><strong>Departamento:</strong> {foundOrder.customer.department}</p>
              {foundOrder.customer.reference && (
                <p><strong>Referencia:</strong> {foundOrder.customer.reference}</p>
              )}
              <p><strong>Contacto:</strong> {foundOrder.customer.phone}</p>
            </div>
          </div>

          <button
            onClick={() => navigate('/store/landing')}
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-semibold"
          >
            Volver al Inicio
          </button>
        </div>
      )}

      {/* Recent Orders */}
      {!foundOrder && allOrders.length > 0 && (
        <div className="card">
          <h2 className="text-lg font-bold mb-4">Tus Pedidos Recientes</h2>
          <div className="space-y-3">
            {allOrders.slice(-5).reverse().map(order => (
              <div
                key={order.id}
                onClick={() => {
                  setSearchOrder(order.id);
                  setFoundOrder(order);
                }}
                className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold">{order.id}</p>
                    <p className="text-sm text-gray-600">{new Date(order.date).toLocaleDateString('es-PE')}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-agro-green">{formatCurrency(order.total)}</p>
                    <p className="text-sm badge badge-info">{order.status}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {searched && !foundOrder && (
        <div className="card bg-yellow-50 border-l-4 border-yellow-600">
          <p className="text-yellow-800">No se encontró ningún pedido con ese número.</p>
        </div>
      )}
    </div>
  );
}
