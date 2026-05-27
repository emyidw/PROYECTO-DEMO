import { useMemo, useState } from 'react';
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Banknote,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  Download,
  Eye,
  Filter,
  Landmark,
  Search,
  TrendingDown,
  TrendingUp,
  Wallet,
} from 'lucide-react';

const movements = [
  {
    id: 'MOV-001',
    date: '27/05/2026',
    type: 'Ingreso',
    concept: 'Venta tienda virtual - PED-1779868992431',
    category: 'Ventas',
    method: 'Yape',
    responsible: 'Admin Demo',
    amount: 1672.5,
    status: 'Confirmado',
  },
  {
    id: 'MOV-002',
    date: '27/05/2026',
    type: 'Egreso',
    concept: 'Compra de fertilizantes - F001-4587',
    category: 'Compras',
    method: 'Transferencia',
    responsible: 'María Torres',
    amount: 19300.0,
    status: 'Pendiente',
  },
  {
    id: 'MOV-003',
    date: '26/05/2026',
    type: 'Ingreso',
    concept: 'Venta directa a Agrícola Los Pinos',
    category: 'Ventas',
    method: 'Transferencia',
    responsible: 'Carlos Mendoza',
    amount: 3060.0,
    status: 'Confirmado',
  },
  {
    id: 'MOV-004',
    date: '26/05/2026',
    type: 'Egreso',
    concept: 'Flete de mercadería - Transportes del Sur',
    category: 'Fletes',
    method: 'Efectivo',
    responsible: 'Luis Apaza',
    amount: 850.0,
    status: 'Confirmado',
  },
  {
    id: 'MOV-005',
    date: '25/05/2026',
    type: 'Egreso',
    concept: 'Combustible para reparto local',
    category: 'Gastos operativos',
    method: 'Efectivo',
    responsible: 'Miguel Salas',
    amount: 180.0,
    status: 'Confirmado',
  },
  {
    id: 'MOV-006',
    date: '25/05/2026',
    type: 'Ingreso',
    concept: 'Venta a Agrocomercial El Valle',
    category: 'Ventas',
    method: 'Tarjeta',
    responsible: 'Ana Flores',
    amount: 2260.0,
    status: 'Confirmado',
  },
];

const dailyCash = [
  { day: 'Lun', ingresos: 4200, egresos: 1850 },
  { day: 'Mar', ingresos: 3500, egresos: 2600 },
  { day: 'Mié', ingresos: 6932.5, egresos: 20330 },
  { day: 'Jue', ingresos: 5400, egresos: 2800 },
  { day: 'Vie', ingresos: 3800, egresos: 1450 },
];

const accounts = [
  {
    name: 'Caja principal',
    type: 'Efectivo',
    balance: 4250.0,
    status: 'Activo',
  },
  {
    name: 'Cuenta BCP empresa',
    type: 'Banco',
    balance: 18540.5,
    status: 'Activo',
  },
  {
    name: 'Yape negocios',
    type: 'Billetera digital',
    balance: 2760.0,
    status: 'Activo',
  },
  {
    name: 'Cuenta de compras',
    type: 'Banco',
    balance: 7350.0,
    status: 'Reservado',
  },
];

function formatCurrency(value) {
  return `S/ ${Number(value).toLocaleString('es-PE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function StatusBadge({ status }) {
  const styles = {
    Confirmado: 'bg-green-100 text-green-700 border-green-200',
    Pendiente: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    Activo: 'bg-green-100 text-green-700 border-green-200',
    Reservado: 'bg-blue-100 text-blue-700 border-blue-200',
  };

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${
        styles[status] || 'bg-gray-100 text-gray-700 border-gray-200'
      }`}
    >
      {status}
    </span>
  );
}

function SummaryCard({ title, value, subtitle, icon, color }) {
  return (
    <div className={`rounded-2xl border-l-4 ${color} bg-white p-5 shadow-md`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-600">{title}</p>
          <h3 className="mt-2 text-3xl font-bold text-gray-900">{value}</h3>
          <p className="mt-2 text-sm text-gray-500">{subtitle}</p>
        </div>
        <div className="rounded-xl bg-gray-50 p-3 text-gray-700">{icon}</div>
      </div>
    </div>
  );
}

export default function AdminCashFlow() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('Todos');

  const filteredMovements = useMemo(() => {
    return movements.filter((item) => {
      const text = `${item.id} ${item.concept} ${item.category} ${item.method} ${item.responsible}`
        .toLowerCase()
        .trim();

      const matchesSearch = text.includes(search.toLowerCase().trim());
      const matchesType = typeFilter === 'Todos' || item.type === typeFilter;

      return matchesSearch && matchesType;
    });
  }, [search, typeFilter]);

  const totalIncome = movements
    .filter((item) => item.type === 'Ingreso')
    .reduce((sum, item) => sum + item.amount, 0);

  const totalExpense = movements
    .filter((item) => item.type === 'Egreso')
    .reduce((sum, item) => sum + item.amount, 0);

  const currentBalance = totalIncome - totalExpense;
  const bankBalance = accounts.reduce((sum, item) => sum + item.balance, 0);
  const maxValue = Math.max(...dailyCash.map((item) => item.ingresos + item.egresos));

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 rounded-2xl bg-gradient-to-r from-green-900 via-green-800 to-lime-700 p-6 text-white shadow-lg md:flex-row md:items-center">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-white/15 p-3">
            <Wallet size={30} />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Flujo de Caja</h1>
            <p className="mt-1 text-sm text-white/80">
              Control visual de ingresos, egresos, saldo disponible, métodos de pago y caja diaria.
            </p>
          </div>
        </div>

        <button className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-bold text-green-800 shadow transition hover:bg-green-50">
          <Download size={18} />
          Exportar reporte
        </button>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Ingresos del Periodo"
          value={formatCurrency(totalIncome)}
          subtitle="Ventas confirmadas y cobradas"
          color="border-green-600"
          icon={<TrendingUp className="text-green-700" size={28} />}
        />
        <SummaryCard
          title="Egresos del Periodo"
          value={formatCurrency(totalExpense)}
          subtitle="Compras, fletes y gastos"
          color="border-red-500"
          icon={<TrendingDown className="text-red-600" size={28} />}
        />
        <SummaryCard
          title="Saldo Operativo"
          value={formatCurrency(currentBalance)}
          subtitle="Resultado neto simulado"
          color="border-blue-500"
          icon={<Banknote className="text-blue-600" size={28} />}
        />
        <SummaryCard
          title="Fondos Disponibles"
          value={formatCurrency(bankBalance)}
          subtitle="Caja y cuentas registradas"
          color="border-purple-500"
          icon={<Landmark className="text-purple-600" size={28} />}
        />
      </div>

      <section className="rounded-2xl bg-white p-5 shadow-md">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex items-center gap-2 rounded-xl border bg-gray-50 px-4 py-3 xl:w-96">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Buscar movimiento, concepto, responsable..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-2 text-sm font-semibold text-gray-600">
              <Filter size={18} />
              Tipo:
            </span>

            {['Todos', 'Ingreso', 'Egreso'].map((type) => (
              <button
                key={type}
                onClick={() => setTypeFilter(type)}
                className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                  typeFilter === type
                    ? 'bg-green-700 text-white shadow'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-3">
        <section className="rounded-2xl bg-white p-6 shadow-md xl:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Movimientos de Caja</h2>
              <p className="mt-1 text-sm text-gray-500">
                Registro simulado de entradas y salidas de dinero.
              </p>
            </div>
            <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-700">
              {filteredMovements.length} movimientos
            </span>
          </div>

          <div className="overflow-hidden rounded-xl border">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-4">Movimiento</th>
                  <th className="px-4 py-4">Categoría</th>
                  <th className="px-4 py-4">Método</th>
                  <th className="px-4 py-4">Responsable</th>
                  <th className="px-4 py-4">Monto</th>
                  <th className="px-4 py-4">Estado</th>
                  <th className="px-4 py-4">Acción</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {filteredMovements.map((item) => (
                  <tr key={item.id} className="hover:bg-green-50">
                    <td className="px-4 py-4">
                      <div className="flex items-start gap-3">
                        <div
                          className={`rounded-xl p-2 ${
                            item.type === 'Ingreso'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {item.type === 'Ingreso' ? (
                            <ArrowUpCircle size={20} />
                          ) : (
                            <ArrowDownCircle size={20} />
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{item.concept}</p>
                          <p className="text-xs text-gray-500">
                            {item.id} · {item.date}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-gray-600">{item.category}</td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                        <CreditCard size={13} />
                        {item.method}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-gray-600">{item.responsible}</td>
                    <td className="px-4 py-4">
                      <p
                        className={`font-bold ${
                          item.type === 'Ingreso' ? 'text-green-700' : 'text-red-700'
                        }`}
                      >
                        {item.type === 'Ingreso' ? '+' : '-'} {formatCurrency(item.amount)}
                      </p>
                    </td>
                    <td className="px-4 py-4">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="px-4 py-4">
                      <button className="rounded-lg bg-blue-50 p-2 text-blue-700 hover:bg-blue-100">
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <aside className="space-y-6">
          <section className="rounded-2xl bg-white p-6 shadow-md">
            <div className="mb-5 flex items-center gap-2">
              <Landmark className="text-green-700" size={22} />
              <h2 className="text-xl font-bold text-gray-900">Cuentas y Caja</h2>
            </div>

            <div className="space-y-3">
              {accounts.map((account) => (
                <div key={account.name} className="rounded-2xl border bg-gray-50 p-4">
                  <div className="flex justify-between gap-3">
                    <div>
                      <p className="font-bold text-gray-900">{account.name}</p>
                      <p className="text-sm text-gray-500">{account.type}</p>
                    </div>
                    <StatusBadge status={account.status} />
                  </div>
                  <p className="mt-3 text-2xl font-bold text-green-700">
                    {formatCurrency(account.balance)}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-md">
            <div className="mb-5 flex items-center gap-2">
              <CalendarDays className="text-blue-700" size={22} />
              <h2 className="text-xl font-bold text-gray-900">Caja diaria</h2>
            </div>

            <div className="space-y-4">
              {dailyCash.map((item) => (
                <div key={item.day}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="font-bold text-gray-700">{item.day}</span>
                    <span className="text-gray-500">
                      {formatCurrency(item.ingresos - item.egresos)}
                    </span>
                  </div>
                  <div className="flex h-3 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="bg-green-600"
                      style={{ width: `${(item.ingresos / maxValue) * 100}%` }}
                    />
                    <div
                      className="bg-red-400"
                      style={{ width: `${(item.egresos / maxValue) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>

      <div className="rounded-2xl border border-green-200 bg-green-50 p-5 text-sm text-green-800">
        <strong>Modo demostración:</strong> esta vista simula el flujo de caja. En una versión real, los ingresos vendrían de ventas, los egresos de compras, gastos y fletes, y el saldo se actualizaría automáticamente.
      </div>
    </div>
  );
}