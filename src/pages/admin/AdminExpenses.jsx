import { formatCurrency } from '../../utils/formatCurrency';

const mockExpenses = [
  { id: 1, date: '2024-05-25', type: 'Transporte', responsible: 'Juan Pérez', amount: 250, paymentMethod: 'Efectivo' },
  { id: 2, date: '2024-05-24', type: 'Combustible', responsible: 'Carlos López', amount: 150, paymentMethod: 'Tarjeta' },
  { id: 3, date: '2024-05-23', type: 'Mantenimiento', responsible: 'Roberto Flores', amount: 500, paymentMethod: 'Transferencia' },
  { id: 4, date: '2024-05-22', type: 'Servicios', responsible: 'Ana García', amount: 800, paymentMethod: 'Efectivo' },
  { id: 5, date: '2024-05-21', type: 'Alquiler', responsible: 'Administración', amount: 2000, paymentMethod: 'Transferencia' },
];

export default function AdminExpenses() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Gestión de Gastos</h1>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">Fecha</th>
              <th className="px-6 py-3 text-left font-semibold">Tipo de Gasto</th>
              <th className="px-6 py-3 text-left font-semibold">Responsable</th>
              <th className="px-6 py-3 text-left font-semibold">Monto</th>
              <th className="px-6 py-3 text-left font-semibold">Medio de Pago</th>
            </tr>
          </thead>
          <tbody>
            {mockExpenses.map((expense, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{expense.date}</td>
                <td className="px-6 py-4"><span className="badge badge-warning">{expense.type}</span></td>
                <td className="px-6 py-4">{expense.responsible}</td>
                <td className="px-6 py-4 font-bold text-red-600">{formatCurrency(expense.amount)}</td>
                <td className="px-6 py-4 text-sm">{expense.paymentMethod}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="card">
          <p className="text-gray-600 text-sm">Total Gastos Mes</p>
          <p className="text-2xl font-bold text-red-600">{formatCurrency(mockExpenses.reduce((sum, e) => sum + e.amount, 0))}</p>
        </div>
        <div className="card">
          <p className="text-gray-600 text-sm">Promedio Diario</p>
          <p className="text-2xl font-bold text-orange-600">{formatCurrency(mockExpenses.reduce((sum, e) => sum + e.amount, 0) / mockExpenses.length)}</p>
        </div>
        <div className="card">
          <p className="text-gray-600 text-sm">Gasto Mayor</p>
          <p className="text-2xl font-bold text-agro-primary">{formatCurrency(Math.max(...mockExpenses.map(e => e.amount)))}</p>
        </div>
      </div>
    </div>
  );
}
