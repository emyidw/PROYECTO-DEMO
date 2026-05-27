import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { getCart, setCart, addOrder } from '../../utils/localStorage';
import { decreaseStock } from '../../utils/stockManager';
import { formatCurrency } from '../../utils/formatCurrency';
import { products } from '../../data/products';

const IGV_RATE = 0.18;
const SHIPPING_FEE = 50;

const paymentMethods = ['Yape', 'Plin', 'Transferencia bancaria', 'Tarjeta', 'Pago contra entrega'];
const departments = ['Arequipa', 'Tacna', 'Puno', 'Cusco', 'Moquegua', 'Ica', 'Lima'];

export default function StoreCheckout() {
  const navigate = useNavigate();
  const cart = getCart();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dni: '',
    email: '',
    phone: '',
    address: '',
    department: 'Arequipa',
    province: '',
    district: '',
    reference: '',
    paymentMethod: 'Yape'
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.dni || !formData.email || !formData.phone || !formData.address) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    setIsProcessing(true);
    
    setTimeout(() => {
      const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const igv = subtotal * IGV_RATE;
      const total = subtotal + igv + SHIPPING_FEE;

      const order = {
        id: `PED-${Date.now()}`,
        date: new Date().toISOString(),
        customer: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          dni: formData.dni,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          department: formData.department,
          province: formData.province,
          district: formData.district,
          reference: formData.reference
        },
        items: cart,
        subtotal,
        igv,
        shipping: SHIPPING_FEE,
        total,
        paymentMethod: formData.paymentMethod,
        status: 'Pedido recepcionado',
        receipt: {
          number: `BOL-${Date.now().toString().slice(-8)}`,
          date: new Date().toLocaleDateString('es-PE'),
          time: new Date().toLocaleTimeString('es-PE')
        }
      };

      addOrder(order);
      
      // Decrementar stock de productos
      cart.forEach(item => {
        decreaseStock(item.id, item.quantity);
      });
      
      setCart([]);
      navigate(`/store/receipt/${order.id}`);
      setIsProcessing(false);
    }, 1500);
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg mb-4">Tu carrito está vacío</p>
        <button
          onClick={() => navigate('/store/catalog')}
          className="px-6 py-2 bg-agro-green text-white rounded-lg"
        >
          Volver al Catálogo
        </button>
      </div>
    );
  }

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const igv = subtotal * IGV_RATE;
  const total = subtotal + igv + SHIPPING_FEE;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Form */}
        <form onSubmit={handleSubmit} className="md:col-span-2 space-y-6">
          {/* Personal Info */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Información Personal</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="Nombre *"
                value={formData.firstName}
                onChange={handleChange}
                className="input"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Apellido *"
                value={formData.lastName}
                onChange={handleChange}
                className="input"
                required
              />
              <input
                type="text"
                name="dni"
                placeholder="DNI/RUC *"
                value={formData.dni}
                onChange={handleChange}
                className="input"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email *"
                value={formData.email}
                onChange={handleChange}
                className="input"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Teléfono *"
                value={formData.phone}
                onChange={handleChange}
                className="input col-span-2"
                required
              />
            </div>
          </div>

          {/* Address */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Dirección de Entrega</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="address"
                placeholder="Dirección *"
                value={formData.address}
                onChange={handleChange}
                className="input"
                required
              />
              <div className="grid md:grid-cols-3 gap-4">
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="select"
                >
                  {departments.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                <input
                  type="text"
                  name="province"
                  placeholder="Provincia"
                  value={formData.province}
                  onChange={handleChange}
                  className="input"
                />
                <input
                  type="text"
                  name="district"
                  placeholder="Distrito"
                  value={formData.district}
                  onChange={handleChange}
                  className="input"
                />
              </div>
              <textarea
                name="reference"
                placeholder="Referencia de entrega (opcional)"
                value={formData.reference}
                onChange={handleChange}
                className="input h-24"
              ></textarea>
            </div>
          </div>

          {/* Payment */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Método de Pago</h2>
            <div className="space-y-2">
              {paymentMethods.map(method => (
                <label key={method} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method}
                    checked={formData.paymentMethod === method}
                    onChange={handleChange}
                  />
                  <span className="font-medium">{method}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-4 bg-agro-green text-white rounded-lg hover:bg-agro-green transition font-bold text-lg disabled:opacity-50"
          >
            {isProcessing ? 'Procesando...' : 'Confirmar Pedido'}
          </button>
        </form>

        {/* Summary */}
        <div className="card h-fit sticky top-24">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <ShoppingCart size={24} /> Resumen ({cart.length})
          </h2>
          <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between text-sm pb-2 border-b">
                <div>
                  <p className="font-semibold line-clamp-1">{item.name}</p>
                  <p className="text-gray-600">x{item.quantity}</p>
                </div>
                <p className="font-bold">{formatCurrency(item.price * item.quantity)}</p>
              </div>
            ))}
          </div>
          
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal:</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>IGV (18%):</span>
              <span>{formatCurrency(igv)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Envío:</span>
              <span>{formatCurrency(SHIPPING_FEE)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
              <span>Total:</span>
              <span className="text-agro-green">{formatCurrency(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
