import { customers } from '../../data/customers';
import { formatCurrency } from '../../utils/formatCurrency';

export default function AdminCustomers() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Gestión de Clientes</h1>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">Cliente</th>
              <th className="px-6 py-3 text-left font-semibold">DNI</th>
              <th className="px-6 py-3 text-left font-semibold">Teléfono</th>
              <th className="px-6 py-3 text-left font-semibold">Total Comprado</th>
              <th className="px-6 py-3 text-left font-semibold">Última Compra</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <p className="font-semibold">{customer.name}</p>
                    <p className="text-xs text-gray-600">{customer.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4">{customer.dni}</td>
                <td className="px-6 py-4">{customer.phone}</td>
                <td className="px-6 py-4 font-bold text-agro-primary">{formatCurrency(customer.totalPurchases)}</td>
                <td className="px-6 py-4">{customer.lastPurchase}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
