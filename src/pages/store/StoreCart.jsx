import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';
import { getCart, setCart } from '../../utils/localStorage';
import { formatCurrency } from '../../utils/formatCurrency';
import { products } from '../../data/products';

const IGV_RATE = 0.18;
const SHIPPING_FEE = 50;

export default function StoreCart() {
  const navigate = useNavigate();
  const cart = getCart();

  const updateQuantity = (productId, quantity) => {
    const product = products.find(p => p.id === productId);
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    if (quantity > product.stock) {
      alert('No hay suficiente stock disponible');
      return;
    }
    const updatedCart = cart.map(item =>
      item.id === productId ? { ...item, quantity } : item
    );
    setCart(updatedCart);
  };

  const removeItem = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
  };

  const clearCart = () => {
    if (confirm('¿Vaciar el carrito?')) {
      setCart([]);
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const igv = subtotal * IGV_RATE;
  const total = subtotal + igv + SHIPPING_FEE;

  if (cart.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-xl mb-6">Tu carrito está vacío</p>
        <button
          onClick={() => navigate('/store/catalog')}
          className="px-6 py-3 bg-agro-green text-white rounded-lg hover:bg-agro-green transition font-semibold"
        >
          Continuar Comprando
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Mi Carrito</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="md:col-span-2 space-y-4">
          {cart.map(item => {
            const product = products.find(p => p.id === item.id);
            return (
              <div key={item.id} className="card flex gap-4">
                <div className="bg-gray-200 w-24 h-24 rounded-lg flex items-center justify-center flex-shrink-0">
                  <img
                    src={product?.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-lg"
                    onError={(e) => e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23e5e7eb" width="100" height="100"/%3E%3C/svg%3E'}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">{item.name}</h3>
                  <p className="text-gray-600 text-sm">{product?.brand}</p>
                  <p className="text-lg font-bold text-agro-green mt-2">{formatCurrency(item.price)}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-gray-200 rounded"
                    >
                      <Minus size={16} />
                    </button>
                    <input
                      type="number"
                      min="1"
                      max={item.stock}
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                      className="w-12 text-center input"
                    />
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-gray-200 rounded"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 hover:text-red-800 flex items-center gap-1"
                  >
                    <Trash2 size={16} /> Eliminar
                  </button>
                  <p className="font-bold text-gray-900">
                    {formatCurrency(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            );
          })}

          <button
            onClick={clearCart}
            className="text-red-600 hover:text-red-800 font-semibold"
          >
            Vaciar Carrito
          </button>
        </div>

        {/* Summary */}
        <div className="card h-fit sticky top-24">
          <h2 className="text-2xl font-bold mb-6">Resumen</h2>
          <div className="space-y-3 border-b pb-4 mb-4">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-semibold">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>IGV (18%):</span>
              <span className="font-semibold">{formatCurrency(igv)}</span>
            </div>
            <div className="flex justify-between">
              <span>Envío:</span>
              <span className="font-semibold">{formatCurrency(SHIPPING_FEE)}</span>
            </div>
          </div>
          <div className="flex justify-between items-center mb-6">
            <span className="text-lg font-bold">Total:</span>
            <span className="text-2xl font-bold text-agro-green">{formatCurrency(total)}</span>
          </div>
          <button
            onClick={() => navigate('/store/checkout')}
            className="w-full py-3 bg-agro-green text-white rounded-lg hover:bg-agro-green transition font-bold"
          >
            Continuar Compra
          </button>
          <button
            onClick={() => navigate('/store/catalog')}
            className="w-full mt-3 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-semibold"
          >
            Seguir Comprando
          </button>
        </div>
      </div>
    </div>
  );
}
