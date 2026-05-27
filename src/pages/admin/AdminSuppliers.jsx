import { suppliers } from '../../data/suppliers';
import { formatCurrency } from '../../utils/formatCurrency';

export default function AdminSuppliers() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Gestión de Proveedores</h1>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">RUC</th>
              <th className="px-6 py-3 text-left font-semibold">Razón Social</th>
              <th className="px-6 py-3 text-left font-semibold">Contacto</th>
              <th className="px-6 py-3 text-left font-semibold">Teléfono</th>
              <th className="px-6 py-3 text-left font-semibold">Productos</th>
              <th className="px-6 py-3 text-left font-semibold">Total Comprado</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-mono">{supplier.ruc}</td>
                <td className="px-6 py-4 font-semibold">{supplier.company}</td>
                <td className="px-6 py-4">{supplier.contact}</td>
                <td className="px-6 py-4">{supplier.phone}</td>
                <td className="px-6 py-4">{supplier.products}</td>
                <td className="px-6 py-4 font-bold text-agro-primary">{formatCurrency(supplier.totalPurchases)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
