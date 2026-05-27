import { useParams, useNavigate } from 'react-router-dom';
import { getOrderById } from '../../utils/localStorage';
import { formatCurrency } from '../../utils/formatCurrency';
import { Download, FileText, Package } from 'lucide-react';

export default function StoreReceipt() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const order = getOrderById(orderId);

  if (!order) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Pedido no encontrado</p>
        <button onClick={() => navigate('/store/landing')} className="mt-4 px-6 py-2 bg-agro-green text-white rounded-lg">
          Volver al Inicio
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    alert('Descarga simulada para presentación del prototipo.\n\nEn un sistema real, aquí se descargaría el PDF de la boleta.');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center print:hidden">
        <h1 className="text-3xl font-bold text-gray-900">Boleta de Compra</h1>
        <div className="flex gap-2">
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Download size={18} /> Descargar PDF
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            <FileText size={18} /> Imprimir
          </button>
        </div>
      </div>

      {/* Receipt */}
      <div className="bg-white border-2 border-agro-green p-8 rounded-lg max-w-2xl mx-auto print:p-0 print:border-0">
        {/* Header */}
        <div className="text-center border-b-2 border-gray-300 pb-6 mb-6">
          <h2 className="text-2xl font-bold text-agro-green">AGRODISTRIBUCIONES DEL VALLE S.A.C.</h2>
          <p className="text-gray-600">RUC: 20601234567</p>
          <p className="text-gray-600">Av. Agricultura 450, Tacna, Perú</p>
          <p className="text-gray-600">Tel: 987 654 321 | Email: info@agro.com</p>
        </div>

        {/* Receipt Info */}
        <div className="grid grid-cols-2 gap-6 mb-6 pb-6 border-b-2 border-gray-300">
          <div>
            <p className="text-sm text-gray-600">Boleta de Venta</p>
            <p className="text-2xl font-bold">{order.receipt.number}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Fecha</p>
            <p className="text-lg font-bold">{order.receipt.date}</p>
            <p className="text-sm text-gray-600">{order.receipt.time}</p>
          </div>
        </div>

        {/* Customer Info */}
        <div className="mb-6 pb-6 border-b-2 border-gray-300">
          <h3 className="font-bold text-sm uppercase text-gray-600 mb-2">Datos del Cliente</h3>
          <p><strong>{order.customer.firstName} {order.customer.lastName}</strong></p>
          <p>DNI/RUC: {order.customer.dni}</p>
          <p>Dirección: {order.customer.address}</p>
          <p>{order.customer.district}, {order.customer.province} - {order.customer.department}</p>
          <p>Teléfono: {order.customer.phone}</p>
          <p>Email: {order.customer.email}</p>
        </div>

        {/* Items Table */}
        <div className="mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left py-2 font-bold">Producto</th>
                <th className="text-right py-2 font-bold">Cant.</th>
                <th className="text-right py-2 font-bold">P.Unit</th>
                <th className="text-right py-2 font-bold">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, idx) => (
                <tr key={idx} className="border-b border-gray-200">
                  <td className="py-3">{item.name}</td>
                  <td className="text-right">{item.quantity}</td>
                  <td className="text-right">{formatCurrency(item.price)}</td>
                  <td className="text-right font-semibold">{formatCurrency(item.price * item.quantity)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="space-y-2 border-t-2 border-gray-300 pt-4 mb-6">
          <div className="flex justify-between text-sm">
            <span>Subtotal:</span>
            <span>{formatCurrency(order.subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>IGV (18%):</span>
            <span>{formatCurrency(order.igv)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Envío:</span>
            <span>{formatCurrency(order.shipping)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg border-t-2 border-gray-300 pt-2">
            <span>TOTAL A PAGAR:</span>
            <span className="text-agro-green">{formatCurrency(order.total)}</span>
          </div>
        </div>

        {/* Payment Info */}
        <div className="bg-blue-50 p-4 rounded-lg mb-6 border-l-4 border-blue-600">
          <p className="text-sm"><strong>Método de Pago:</strong> {order.paymentMethod}</p>
          <p className="text-sm"><strong>Estado:</strong> <span className="badge badge-info">{order.status}</span></p>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-600 border-t-2 border-gray-300 pt-4">
          <p>Este es un documento generado por el sistema</p>
          <p>Válido como comprobante de venta por el presente período</p>
        </div>
      </div>

      {/* Actions */}
      <div className="print:hidden flex gap-4 justify-center">
        <button
          onClick={() => navigate(`/store/tracking?orderId=${orderId}`)}
          className="flex items-center gap-2 px-6 py-3 bg-agro-green text-white rounded-lg hover:bg-agro-green transition font-semibold"
        >
          <Package size={20} /> Ver Seguimiento
        </button>
        <button
          onClick={() => navigate('/store/landing')}
          className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-semibold"
        >
          Volver al Inicio
        </button>
      </div>
    </div>
  );
}
