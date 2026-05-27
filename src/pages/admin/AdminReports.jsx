import { useMemo, useState } from 'react';
import {
  Archive,
  BarChart3,
  CalendarDays,
  Download,
  Eye,
  FileSpreadsheet,
  FileText,
  Filter,
  Package,
  PieChart,
  Search,
  ShoppingCart,
  TrendingDown,
  TrendingUp,
  Wallet,
} from 'lucide-react';

const reports = [
  {
    id: 'REP-001',
    name: 'Reporte de ventas por producto',
    module: 'Ventas',
    period: 'Mayo 2026',
    generatedBy: 'Admin Demo',
    updatedAt: '27/05/2026 10:45 AM',
    status: 'Disponible',
    format: 'Excel / PDF',
    description: 'Resumen de productos vendidos, cantidades, importes y margen estimado.',
  },
  {
    id: 'REP-002',
    name: 'Reporte de compras por proveedor',
    module: 'Compras',
    period: 'Mayo 2026',
    generatedBy: 'María Torres',
    updatedAt: '27/05/2026 09:20 AM',
    status: 'Disponible',
    format: 'Excel',
    description: 'Compras agrupadas por proveedor, documento, flete y estado de recepción.',
  },
  {
    id: 'REP-003',
    name: 'Kardex valorizado por producto',
    module: 'Inventario',
    period: 'Mayo 2026',
    generatedBy: 'Luis Apaza',
    updatedAt: '26/05/2026 05:15 PM',
    status: 'En revisión',
    format: 'PDF',
    description: 'Movimientos de entradas, salidas y saldos con método promedio ponderado.',
  },
  {
    id: 'REP-004',
    name: 'Reporte de gastos operativos',
    module: 'Gastos',
    period: 'Mayo 2026',
    generatedBy: 'Carlos Mendoza',
    updatedAt: '25/05/2026 04:10 PM',
    status: 'Disponible',
    format: 'Excel / PDF',
    description: 'Detalle de gastos por tipo, responsable, medio de pago y observación.',
  },
];

const indicators = [
  { label: 'Ventas netas', value: 14580.5, change: '+18%', type: 'positive' },
  { label: 'Compras del mes', value: 50870.0, change: '+9%', type: 'neutral' },
  { label: 'Gastos operativos', value: 3280.0, change: '-6%', type: 'positive' },
  { label: 'Utilidad estimada', value: 6420.75, change: '+12%', type: 'positive' },
];

const topProducts = [
  { product: 'Fosfato Diamónico 25 Kg', category: 'Fertilizantes', units: 58, amount: 5568 },
  { product: 'Basfoliar Calcio 1 Lt', category: 'Foliares', units: 42, amount: 2478 },
  { product: 'Cinta de Riego 16 mm x 1000 m', category: 'Riego', units: 14, amount: 5880 },
  { product: 'Sulfato de Amonio 50 Kg', category: 'Fertilizantes', units: 35, amount: 4830 },
];

const categorySummary = [
  { category: 'Fertilizantes', sales: 10398, percentage: 45 },
  { category: 'Agroquímicos', sales: 5420, percentage: 24 },
  { category: 'Cinta de riego', sales: 5880, percentage: 25 },
  { category: 'Herramientas', sales: 1380, percentage: 6 },
];

function formatCurrency(value) {
  return `S/ ${Number(value).toLocaleString('es-PE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function StatusBadge({ status }) {
  const styles = {
    Disponible: 'bg-green-100 text-green-700 border-green-200',
    'En revisión': 'bg-yellow-100 text-yellow-700 border-yellow-200',
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

export default function AdminReports() {
  const [search, setSearch] = useState('');
  const [moduleFilter, setModuleFilter] = useState('Todos');

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const text = `${report.id} ${report.name} ${report.module} ${report.period}`
        .toLowerCase()
        .trim();

      const matchesSearch = text.includes(search.toLowerCase().trim());
      const matchesModule =
        moduleFilter === 'Todos' || report.module === moduleFilter;

      return matchesSearch && matchesModule;
    });
  }, [search, moduleFilter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 rounded-2xl bg-gradient-to-r from-green-900 via-green-800 to-lime-700 p-6 text-white shadow-lg md:flex-row md:items-center">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-white/15 p-3">
            <BarChart3 size={30} />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Reportes Administrativos</h1>
            <p className="mt-1 text-sm text-white/80">
              Reportes simulados de ventas, compras, inventario, kardex, gastos y utilidad.
            </p>
          </div>
        </div>

        <button className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-bold text-green-800 shadow transition hover:bg-green-50">
          <Download size={18} />
          Exportar panel
        </button>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Reportes Generados"
          value={reports.length}
          subtitle="Disponibles para consulta"
          color="border-green-600"
          icon={<FileText className="text-green-700" size={28} />}
        />
        <SummaryCard
          title="Ventas Analizadas"
          value={formatCurrency(14580.5)}
          subtitle="Periodo mayo 2026"
          color="border-blue-500"
          icon={<ShoppingCart className="text-blue-600" size={28} />}
        />
        <SummaryCard
          title="Compras Analizadas"
          value={formatCurrency(50870)}
          subtitle="Incluye fletes asociados"
          color="border-amber-500"
          icon={<Package className="text-amber-600" size={28} />}
        />
        <SummaryCard
          title="Utilidad Estimada"
          value={formatCurrency(6420.75)}
          subtitle="Resultado referencial"
          color="border-purple-500"
          icon={<Wallet className="text-purple-600" size={28} />}
        />
      </div>

      <section className="rounded-2xl bg-white p-5 shadow-md">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex items-center gap-2 rounded-xl border bg-gray-50 px-4 py-3 xl:w-96">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Buscar reporte, módulo o periodo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-2 text-sm font-semibold text-gray-600">
              <Filter size={18} />
              Módulo:
            </span>

            {['Todos', 'Ventas', 'Compras', 'Inventario', 'Gastos'].map((module) => (
              <button
                key={module}
                onClick={() => setModuleFilter(module)}
                className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                  moduleFilter === module
                    ? 'bg-green-700 text-white shadow'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {module}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-3">
        <section className="rounded-2xl bg-white p-6 shadow-md xl:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Biblioteca de Reportes</h2>
              <p className="mt-1 text-sm text-gray-500">
                Reportes ficticios listos para visualizar o exportar.
              </p>
            </div>
            <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-700">
              {filteredReports.length} resultados
            </span>
          </div>

          <div className="overflow-hidden rounded-xl border">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-4">Reporte</th>
                  <th className="px-4 py-4">Módulo</th>
                  <th className="px-4 py-4">Periodo</th>
                  <th className="px-4 py-4">Formato</th>
                  <th className="px-4 py-4">Estado</th>
                  <th className="px-4 py-4">Acciones</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {filteredReports.map((report) => (
                  <tr key={report.id} className="hover:bg-green-50">
                    <td className="px-4 py-4">
                      <p className="font-bold text-gray-900">{report.name}</p>
                      <p className="mt-1 text-xs text-gray-500">{report.description}</p>
                      <p className="mt-1 text-xs font-semibold text-gray-400">
                        {report.id} · Actualizado: {report.updatedAt}
                      </p>
                    </td>
                    <td className="px-4 py-4 font-semibold text-gray-700">{report.module}</td>
                    <td className="px-4 py-4 text-gray-600">{report.period}</td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                        <FileSpreadsheet size={13} />
                        {report.format}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <StatusBadge status={report.status} />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <button className="rounded-lg bg-blue-50 p-2 text-blue-700 hover:bg-blue-100">
                          <Eye size={16} />
                        </button>
                        <button className="rounded-lg bg-green-50 p-2 text-green-700 hover:bg-green-100">
                          <Download size={16} />
                        </button>
                      </div>
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
              <TrendingUp className="text-green-700" size={22} />
              <h2 className="text-xl font-bold text-gray-900">Indicadores clave</h2>
            </div>

            <div className="space-y-3">
              {indicators.map((item) => (
                <div key={item.label} className="rounded-2xl border bg-gray-50 p-4">
                  <div className="flex justify-between">
                    <p className="font-bold text-gray-900">{item.label}</p>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        item.type === 'positive'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {item.change}
                    </span>
                  </div>
                  <p className="mt-2 text-2xl font-bold text-green-700">
                    {formatCurrency(item.value)}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-md">
            <div className="mb-5 flex items-center gap-2">
              <PieChart className="text-blue-700" size={22} />
              <h2 className="text-xl font-bold text-gray-900">Ventas por categoría</h2>
            </div>

            <div className="space-y-4">
              {categorySummary.map((item) => (
                <div key={item.category}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="font-bold text-gray-700">{item.category}</span>
                    <span className="text-gray-500">{formatCurrency(item.sales)}</span>
                  </div>
                  <div className="h-3 rounded-full bg-gray-100">
                    <div
                      className="h-3 rounded-full bg-green-700"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>

      <section className="rounded-2xl bg-white p-6 shadow-md">
        <div className="mb-5 flex items-center gap-2">
          <Archive className="text-amber-700" size={22} />
          <h2 className="text-xl font-bold text-gray-900">Productos más vendidos</h2>
        </div>

        <div className="overflow-hidden rounded-xl border">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-4">Producto</th>
                <th className="px-4 py-4">Categoría</th>
                <th className="px-4 py-4">Unidades</th>
                <th className="px-4 py-4">Importe</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {topProducts.map((item) => (
                <tr key={item.product} className="hover:bg-gray-50">
                  <td className="px-4 py-4 font-bold text-gray-900">{item.product}</td>
                  <td className="px-4 py-4 text-gray-600">{item.category}</td>
                  <td className="px-4 py-4 font-semibold">{item.units}</td>
                  <td className="px-4 py-4 font-bold text-green-700">
                    {formatCurrency(item.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="rounded-2xl border border-green-200 bg-green-50 p-5 text-sm text-green-800">
        <strong>Modo demostración:</strong> los botones de exportación y visualización son simulados. En una implementación real, aquí se generarían archivos Excel, PDF o reportes descargables por periodo.
      </div>
    </div>
  );
}