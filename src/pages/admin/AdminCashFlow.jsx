import { formatCurrency } from '../../utils/formatCurrency';
import { TrendingUp, TrendingDown } from 'lucide-react';

const mockCashFlow = {
  initialBalance: 15000,
  sales: 32500,
  purchases: 18750,
  expenses: 4700,
  shipping: 2000,
};

const finalBalance = mockCashFlow.initialBalance + mockCashFlow.sales - mockCashFlow.purchases - mockCashFlow.expenses - mockCashFlow.shipping;

export default function AdminCashFlow() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Flujo de Caja</h1>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="card border-l-4 border-blue-500">
          <p className="text-gray-600 text-sm mb-2">Saldo Inicial</p>
          <p className="text-3xl font-bold text-blue-600">{formatCurrency(mockCashFlow.initialBalance)}</p>
        </div>
        <div className="card border-l-4 border-green-500">
          <p className="text-gray-600 text-sm mb-2">Saldo Final</p>
          <p className="text-3xl font-bold text-green-600">{formatCurrency(finalBalance)}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Ingresos */}
        <div className="card space-y-4">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <TrendingUp className="text-green-600" /> Ingresos
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b">
              <span>Ventas</span>
              <span className="font-bold text-green-600">{formatCurrency(mockCashFlow.sales)}</span>
            </div>
            <div className="bg-green-50 p-3 rounded text-right">
              <p className="text-sm text-gray-600">Total Ingresos</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(mockCashFlow.sales)}</p>
            </div>
          </div>
        </div>

        {/* Egresos */}
        <div className="card space-y-4">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <TrendingDown className="text-red-600" /> Egresos
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b">
              <span>Compras</span>
              <span className="font-bold text-red-600">{formatCurrency(mockCashFlow.purchases)}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span>Gastos</span>
              <span className="font-bold text-red-600">{formatCurrency(mockCashFlow.expenses)}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span>Envíos</span>
              <span className="font-bold text-red-600">{formatCurrency(mockCashFlow.shipping)}</span>
            </div>
            <div className="bg-red-50 p-3 rounded text-right">
              <p className="text-sm text-gray-600">Total Egresos</p>
              <p className="text-2xl font-bold text-red-600">{formatCurrency(mockCashFlow.purchases + mockCashFlow.expenses + mockCashFlow.shipping)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-gradient-to-r from-agro-primary to-blue-600 text-white p-6 rounded-lg">
        <p className="text-sm opacity-90 mb-2">Flujo Neto del Período</p>
        <p className="text-4xl font-bold">
          {formatCurrency(mockCashFlow.sales - mockCashFlow.purchases - mockCashFlow.expenses - mockCashFlow.shipping)}
        </p>
      </div>

      <div className="card">
        <h3 className="font-bold mb-4">Movimientos Diarios</h3>
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-2 text-left">Concepto</th>
              <th className="px-6 py-2 text-right">Monto</th>
              <th className="px-6 py-2 text-right">Saldo</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="px-6 py-2">Saldo Inicial</td>
              <td className="px-6 py-2 text-right">{formatCurrency(mockCashFlow.initialBalance)}</td>
              <td className="px-6 py-2 text-right font-bold">{formatCurrency(mockCashFlow.initialBalance)}</td>
            </tr>
            <tr className="border-b bg-green-50">
              <td className="px-6 py-2">+ Ventas</td>
              <td className="px-6 py-2 text-right text-green-600 font-bold">{formatCurrency(mockCashFlow.sales)}</td>
              <td className="px-6 py-2 text-right font-bold">{formatCurrency(mockCashFlow.initialBalance + mockCashFlow.sales)}</td>
            </tr>
            <tr className="border-b bg-red-50">
              <td className="px-6 py-2">- Compras</td>
              <td className="px-6 py-2 text-right text-red-600 font-bold">{formatCurrency(mockCashFlow.purchases)}</td>
              <td className="px-6 py-2 text-right font-bold">{formatCurrency(mockCashFlow.initialBalance + mockCashFlow.sales - mockCashFlow.purchases)}</td>
            </tr>
            <tr className="border-b bg-red-50">
              <td className="px-6 py-2">- Gastos</td>
              <td className="px-6 py-2 text-right text-red-600 font-bold">{formatCurrency(mockCashFlow.expenses)}</td>
              <td className="px-6 py-2 text-right font-bold">{formatCurrency(mockCashFlow.initialBalance + mockCashFlow.sales - mockCashFlow.purchases - mockCashFlow.expenses)}</td>
            </tr>
            <tr className="bg-blue-50">
              <td className="px-6 py-2 font-bold">Saldo Final</td>
              <td className="px-6 py-2 text-right"></td>
              <td className="px-6 py-2 text-right font-bold text-lg text-agro-primary">{formatCurrency(finalBalance)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
