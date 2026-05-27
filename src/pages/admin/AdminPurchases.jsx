import { formatCurrency } from '../../utils/formatCurrency';

const mockPurchases = [
  { id: 1, date: '2024-05-25', supplier: 'Inversiones Agrícolas del Sur', document: 'Factura', series: 'F001', number: '000001', total: 12500, status: 'Recibida' },
  { id: 2, date: '2024-05-23', supplier: 'Químicos Agrícolas del Perú', document: 'Factura', series: 'F001', number: '000002', total: 8750, status: 'Recibida' },
  { id: 3, date: '2024-05-20', supplier: 'Semillería Nacional del Perú', document: 'Factura', series: 'F001', number: '000003', total: 6250, status: 'Recibida' },
  { id: 4, date: '2024-05-18', supplier: 'Distribuidora de Minerales S.A.', document: 'Factura', series: 'F001', number: '000004', total: 5500, status: 'Recibida' },
];

export default function AdminPurchases() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Gestión de Compras</h1>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">Fecha</th>
              <th className="px-6 py-3 text-left font-semibold">Proveedor</th>
              <th className="px-6 py-3 text-left font-semibold">Tipo</th>
              <th className="px-6 py-3 text-left font-semibold">Comprobante</th>
              <th className="px-6 py-3 text-left font-semibold">Total</th>
              <th className="px-6 py-3 text-left font-semibold">Estado</th>
            </tr>
          </thead>
          <tbody>
            {mockPurchases.map((purchase, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{purchase.date}</td>
                <td className="px-6 py-4">{purchase.supplier}</td>
                <td className="px-6 py-4">{purchase.document}</td>
                <td className="px-6 py-4 font-mono text-xs">{purchase.series}-{purchase.number}</td>
                <td className="px-6 py-4 font-bold text-agro-primary">{formatCurrency(purchase.total)}</td>
                <td className="px-6 py-4"><span className="badge badge-success">{purchase.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
