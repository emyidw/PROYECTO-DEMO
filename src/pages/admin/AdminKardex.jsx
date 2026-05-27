import { useState } from 'react';
import { products } from '../../data/products';
import { formatCurrency } from '../../utils/formatCurrency';

export default function AdminKardex() {
  const [selectedProduct, setSelectedProduct] = useState(products[0]);

  const mockKardex = [
    { date: '2024-05-10', type: 'Compra', series: 'F001', number: '000001', operation: 'Entrada', entQty: 50, entCost: 85.50, entTotal: 4275, salQty: 0, salCost: 0, salTotal: 0, saldoQty: 50, saldoCost: 85.50, saldoTotal: 4275 },
    { date: '2024-05-15', type: 'Venta', series: 'BOL', number: '000001', operation: 'Salida', entQty: 0, entCost: 0, entTotal: 0, salQty: 5, salCost: 85.50, salTotal: 427.50, saldoQty: 45, saldoCost: 85.50, saldoTotal: 3847.50 },
    { date: '2024-05-20', type: 'Compra', series: 'F001', number: '000002', operation: 'Entrada', entQty: 30, entCost: 85.50, entTotal: 2565, salQty: 0, salCost: 0, salTotal: 0, saldoQty: 75, saldoCost: 85.50, saldoTotal: 6412.50 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Kardex Valorizado</h1>

      <div className="card space-y-4 mb-6">
        <h3 className="font-bold">Información General</h3>
        <div className="grid md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Período</p>
            <p className="font-semibold">Mayo 2024</p>
          </div>
          <div>
            <p className="text-gray-600">Producto</p>
            <p className="font-semibold">{selectedProduct.name}</p>
          </div>
          <div>
            <p className="text-gray-600">Método Valuación</p>
            <p className="font-semibold">Promedio Ponderado</p>
          </div>
          <div>
            <p className="text-gray-600">Stock Actual</p>
            <p className="font-bold text-agro-primary">{selectedProduct.stock}</p>
          </div>
        </div>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-xs">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-3 py-2 text-left">Fecha</th>
              <th className="px-3 py-2 text-left">Tipo</th>
              <th className="px-3 py-2 text-left">Comprobante</th>
              <th className="px-3 py-2 text-left">Operación</th>
              <th className="px-3 py-2 text-right">Ent. Qty</th>
              <th className="px-3 py-2 text-right">Ent. Costo</th>
              <th className="px-3 py-2 text-right">Ent. Total</th>
              <th className="px-3 py-2 text-right">Sal. Qty</th>
              <th className="px-3 py-2 text-right">Sal. Costo</th>
              <th className="px-3 py-2 text-right">Sal. Total</th>
              <th className="px-3 py-2 text-right">Saldo Qty</th>
              <th className="px-3 py-2 text-right">Saldo Costo</th>
              <th className="px-3 py-2 text-right">Saldo Total</th>
            </tr>
          </thead>
          <tbody>
            {mockKardex.map((item, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="px-3 py-2">{item.date}</td>
                <td className="px-3 py-2">{item.type}</td>
                <td className="px-3 py-2 font-mono">{item.series}-{item.number}</td>
                <td className="px-3 py-2">{item.operation}</td>
                <td className="px-3 py-2 text-right">{item.entQty}</td>
                <td className="px-3 py-2 text-right">{item.entCost}</td>
                <td className="px-3 py-2 text-right">{formatCurrency(item.entTotal)}</td>
                <td className="px-3 py-2 text-right">{item.salQty}</td>
                <td className="px-3 py-2 text-right">{item.salCost}</td>
                <td className="px-3 py-2 text-right">{formatCurrency(item.salTotal)}</td>
                <td className="px-3 py-2 text-right font-bold">{item.saldoQty}</td>
                <td className="px-3 py-2 text-right font-bold">{item.saldoCost}</td>
                <td className="px-3 py-2 text-right font-bold text-agro-primary">{formatCurrency(item.saldoTotal)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
