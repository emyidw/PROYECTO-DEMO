import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, ShoppingCart, CheckCircle } from 'lucide-react';
import { products } from '../../data/products';
import { formatCurrency } from '../../utils/formatCurrency';
import { getCart, setCart } from '../../utils/localStorage';

export default function StoreProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Producto no encontrado</p>
        <button
          onClick={() => navigate('/store/catalog')}
          className="mt-4 px-6 py-2 bg-agro-green text-white rounded-lg hover:bg-agro-green transition"
        >
          Volver al Catálogo
        </button>
      </div>
    );
  }

  const related = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (quantity > product.stock) {
      alert('No hay suficiente stock');
      return;
    }
    const cart = getCart();
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity,
        stock: product.stock
      });
    }
    setCart(cart);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-8">
      <button
        onClick={() => navigate('/store/catalog')}
        className="flex items-center gap-2 text-agro-primary hover:underline font-semibold"
      >
        <ArrowLeft size={20} /> Volver al Catálogo
      </button>

      {/* Main Product */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Image */}
        <div className="bg-gray-100 rounded-lg h-80 flex items-center justify-center overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="max-w-sm max-h-80 object-contain"
            onError={(e) => e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23e5e7eb" width="100" height="100"/%3E%3C/svg%3E'}
          />
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div>
            <p className="text-gray-500 text-sm mb-2">{product.sku}</p>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <span className="badge badge-info">{product.category}</span>
              <span className="badge badge-info">{product.subcategory}</span>
            </div>
            <p className="text-gray-600">Marca: <strong>{product.brand}</strong></p>
            <p className="text-gray-600">Proveedor: <strong>{product.supplier}</strong></p>
          </div>

          <div className="border-t border-b py-4">
            <p className="text-5xl font-bold text-agro-primary mb-2">{formatCurrency(product.price)}</p>
            <p className={`text-lg font-semibold ${product.stock > 20 ? 'text-green-600' : product.stock > 5 ? 'text-yellow-600' : 'text-red-600'}`}>
              {product.stock > 0 ? `${product.stock} unidades disponibles` : 'Agotado'}
            </p>
          </div>

          <div className="space-y-3">
            <label className="block font-semibold">Cantidad:</label>
            <input
              type="number"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={(e) => setQuantity(Math.min(parseInt(e.target.value) || 1, product.stock))}
              className="input w-32"
            />
            <p className="text-sm text-gray-600">Subtotal: {formatCurrency(product.price * quantity)}</p>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="w-full py-4 bg-agro-green text-white rounded-lg hover:bg-agro-green transition font-bold text-lg flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <ShoppingCart size={24} /> Agregar al Carrito
          </button>

          {added && (
            <div className="bg-green-100 border-2 border-green-600 text-green-800 p-4 rounded-lg flex items-center gap-2">
              <CheckCircle size={20} /> ¡Agregado al carrito exitosamente!
            </div>
          )}

          <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold">Especificaciones:</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Unidad:</strong> {product.unit}</p>
              <p><strong>Presentación:</strong> {product.presentation}</p>
              <p><strong>Peso/Volumen:</strong> {product.weightOrVolume}</p>
              <p><strong>Registro Sanitario:</strong> {product.sanitaryRegistration}</p>
              <p><strong>Lote:</strong> {product.lot}</p>
              <p><strong>Fecha de Vencimiento:</strong> {product.expirationDate}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="space-y-4">
        <div className="border-b">
          <div className="flex gap-8">
            <button className="py-4 px-2 border-b-2 border-agro-green text-agro-green font-semibold">
              Descripción
            </button>
            <button className="py-4 px-2 text-gray-500 hover:text-gray-700">
              Ficha Técnica
            </button>
            <button className="py-4 px-2 text-gray-500 hover:text-gray-700">
              Modo de Uso
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-lg">Descripción</h3>
          <p className="text-gray-700 leading-relaxed">{product.description}</p>

          <h3 className="font-bold text-lg mt-6">Ficha Técnica</h3>
          <p className="text-gray-700 bg-gray-50 p-4 rounded-lg font-mono text-sm">{product.technicalSheet}</p>

          <h3 className="font-bold text-lg mt-6">Modo de Uso</h3>
          <p className="text-gray-700">{product.usage}</p>

          <h3 className="font-bold text-lg mt-6">Advertencias</h3>
          <p className="text-gray-700 bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">{product.warnings}</p>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div className="space-y-6 mt-12 border-t pt-8">
          <h2 className="text-3xl font-bold text-gray-900">Productos Relacionados</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map(prod => (
              <div key={prod.id} className="card">
                <div className="bg-gray-200 rounded-lg h-32 mb-3 flex items-center justify-center overflow-hidden">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="max-w-xs max-h-32 object-contain"
                    onError={(e) => e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23e5e7eb" width="100" height="100"/%3E%3C/svg%3E'}
                  />
                </div>
                <h4 className="font-bold text-sm line-clamp-2 mb-2">{prod.name}</h4>
                <p className="text-lg font-bold text-agro-primary mb-3">{formatCurrency(prod.price)}</p>
                <button
                  onClick={() => navigate(`/store/product/${prod.id}`)}
                  className="w-full py-2 bg-agro-secondary text-white rounded-lg hover:bg-green-700 transition text-sm font-semibold"
                >
                  Ver Detalle
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
