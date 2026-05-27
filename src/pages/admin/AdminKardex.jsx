import { useMemo, useState } from 'react';
import {
  Archive,
  Calculator,
  CalendarDays,
  Download,
  Eye,
  FileText,
  Filter,
  Package,
  Search,
  ShoppingCart,
  Truck,
  Wallet,
} from 'lucide-react';

const products = [
  'Fosfato Monoamónico Granulado 50 Kg',
  'Fosfato Diamónico 25 Kg',
  'Sulfato de Amonio 50 Kg',
  'Cinta de Riego 16 mm x 1000 m',
];

const kardexMovements = [
  {
    id: 1,
    date: '01/05/2026',
    product: 'Fosfato Monoamónico Granulado 50 Kg',
    documentType: 'Inventario inicial',
    series: '-',
    number: 'INI-0001',
    operation: 'Saldo inicial',
    entryQty: 30,
    entryUnitCost: 140.0,
    entryTotal: 4200.0,
    exitQty: 0,
    exitUnitCost: 0,
    exitTotal: 0,
    balanceQty: 30,
    balanceUnitCost: 140.0,
    balanceTotal: 4200.0,
  },
  {
    id: 2,
    date: '10/05/2026',
    product: 'Fosfato Monoamónico Granulado 50 Kg',
    documentType: 'Factura compra',
    series: 'F001',
    number: '4587',
    operation: 'Compra',
    entryQty: 80,
    entryUnitCost: 142.8,
    entryTotal: 11424.0,
    exitQty: 0,
    exitUnitCost: 0,
    exitTotal: 0,
    balanceQty: 110,
    balanceUnitCost: 142.04,
    balanceTotal: 15624.0,
  },
  {
    id: 3,
    date: '11/05/2026',
    product: 'Fosfato Monoamónico Granulado 50 Kg',
    documentType: 'Factura flete',
    series: 'FT01',
    number: '0098',
    operation: 'Flete distribuido',
    entryQty: 0,
    entryUnitCost: 0,
    entryTotal: 680.0,
    exitQty: 0,
    exitUnitCost: 0,
    exitTotal: 0,
    balanceQty: 110,
    balanceUnitCost: 148.22,
    balanceTotal: 16304.0,
  },
  {
    id: 4,
    date: '17/05/2026',
    product: 'Fosfato Monoamónico Granulado 50 Kg',
    documentType: 'Boleta venta',
    series: 'B001',
    number: '000145',
    operation: 'Venta',
    entryQty: 0,
    entryUnitCost: 0,
    entryTotal: 0,
    exitQty: 20,
    exitUnitCost: 148.22,
    exitTotal: 2964.4,
    balanceQty: 90,
    balanceUnitCost: 148.22,
    balanceTotal: 13339.6,
  },
  {
    id: 5,
    date: '22/05/2026',
    product: 'Fosfato Monoamónico Granulado 50 Kg',
    documentType: 'Boleta venta',
    series: 'B001',
    number: '000188',
    operation: 'Venta',
    entryQty: 0,
    entryUnitCost: 0,
    entryTotal: 0,
    exitQty: 35,
    exitUnitCost: 148.22,
    exitTotal: 5187.7,
    balanceQty: 55,
    balanceUnitCost: 148.22,
    balanceTotal: 8151.9,
  },
  {
    id: 6,
    date: '25/05/2026',
    product: 'Sulfato de Amonio 50 Kg',
    documentType: 'Factura compra',
    series: 'F001',
    number: '4599',
    operation: 'Compra',
    entryQty: 120,
    entryUnitCost: 102.3,
    entryTotal: 12276.0,
    exitQty: 0,
    exitUnitCost: 0,
    exitTotal: 0,
    balanceQty: 120,
    balanceUnitCost: 102.3,
    balanceTotal: 12276.0,
  },
];

function formatCurrency(value) {
  return `S/ ${Number(value).toLocaleString('es-PE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatNumber(value) {
  return Number(value).toLocaleString('es-PE', {
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  });
}

function OperationBadge({ operation }) {
  const styles = {
    Compra: 'bg-green-100 text-green-700 border-green-200',
    Venta: 'bg-red-100 text-red-700 border-red-200',
    'Flete distribuido': 'bg-blue-100 text-blue-700 border-blue-200',
    'Saldo inicial': 'bg-gray-100 text-gray-700 border-gray-200',
  };

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${
        styles[operation] || 'bg-gray-100 text-gray-700 border-gray-200'
      }`}
    >
      {operation}
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

export default function AdminKardex() {
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('Fosfato Monoamónico Granulado 50 Kg');
  const [operationFilter, setOperationFilter] = useState('Todos');

  const filteredMovements = useMemo(() => {
    return kardexMovements.filter((item) => {
      const text = `${item.product} ${item.documentType} ${item.series} ${item.number} ${item.operation}`
        .toLowerCase()
        .trim();

      const matchesSearch = text.includes(search.toLowerCase().trim());
      const matchesProduct = item.product === selectedProduct;
      const matchesOperation =
        operationFilter === 'Todos' || item.operation === operationFilter;

      return matchesSearch && matchesProduct && matchesOperation;
    });
  }, [search, selectedProduct, operationFilter]);

  const totalEntries = filteredMovements.reduce((sum, item) => sum + item.entryTotal, 0);
  const totalExits = filteredMovements.reduce((sum, item) => sum + item.exitTotal, 0);
  const lastBalance = filteredMovements.length
    ? filteredMovements[filteredMovements.length - 1]
    : null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 rounded-2xl bg-gradient-to-r from-green-900 via-green-800 to-lime-700 p-6 text-white shadow-lg md:flex-row md:items-center">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-white/15 p-3">
            <Archive size={30} />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Kardex Valorizado</h1>
            <p className="mt-1 text-sm text-white/80">
              Registro simulado de inventario permanente valorizado con método promedio ponderado.
            </p>
          </div>
        </div>

        <button className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-bold text-green-800 shadow transition hover:bg-green-50">
          <Download size={18} />
          Exportar kardex
        </button>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Entradas Valorizadas"
          value={formatCurrency(totalEntries)}
          subtitle="Compras y fletes"
          color="border-green-600"
          icon={<ShoppingCart className="text-green-700" size={28} />}
        />
        <SummaryCard
          title="Salidas Valorizadas"
          value={formatCurrency(totalExits)}
          subtitle="Ventas y retiros"
          color="border-red-500"
          icon={<Package className="text-red-600" size={28} />}
        />
        <SummaryCard
          title="Saldo Actual"
          value={lastBalance ? formatCurrency(lastBalance.balanceTotal) : 'S/ 0.00'}
          subtitle={lastBalance ? `${lastBalance.balanceQty} unidades` : 'Sin movimientos'}
          color="border-blue-500"
          icon={<Wallet className="text-blue-600" size={28} />}
        />
        <SummaryCard
          title="Costo Promedio"
          value={lastBalance ? formatCurrency(lastBalance.balanceUnitCost) : 'S/ 0.00'}
          subtitle="Método ponderado"
          color="border-purple-500"
          icon={<Calculator className="text-purple-600" size={28} />}
        />
      </div>

      <section className="rounded-2xl bg-white p-5 shadow-md">
        <div className="grid gap-4 xl:grid-cols-3">
          <div className="flex items-center gap-2 rounded-xl border bg-gray-50 px-4 py-3">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Buscar documento, operación..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>

          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="rounded-xl border bg-gray-50 px-4 py-3 text-sm font-semibold outline-none"
          >
            {products.map((product) => (
              <option key={product}>{product}</option>
            ))}
          </select>

          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-2 text-sm font-semibold text-gray-600">
              <Filter size={18} />
              Operación:
            </span>

            {['Todos', 'Compra', 'Venta', 'Flete distribuido'].map((operation) => (
              <button
                key={operation}
                onClick={() => setOperationFilter(operation)}
                className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                  operationFilter === operation
                    ? 'bg-green-700 text-white shadow'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {operation}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-2xl bg-white p-6 shadow-md">
        <div className="mb-5 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <div className="flex items-center gap-2">
              <FileText className="text-green-700" size={24} />
              <h2 className="text-2xl font-bold text-gray-900">
                Registro de Inventario Permanente Valorizado
              </h2>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Producto: <strong>{selectedProduct}</strong> · Método: promedio ponderado.
            </p>
          </div>

          <div className="rounded-xl border bg-gray-50 px-4 py-3 text-sm">
            <p className="font-bold text-gray-900">Periodo: Mayo 2026</p>
            <p className="text-gray-500">RUC: 20600000001 · AGRANET S.A.C.</p>
          </div>
        </div>

        <div className="overflow-auto rounded-xl border">
          <table className="min-w-[1250px] w-full text-left text-xs">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th rowSpan="2" className="border px-3 py-3">Fecha</th>
                <th colSpan="4" className="border px-3 py-3 text-center">Documento</th>
                <th colSpan="3" className="border px-3 py-3 text-center bg-green-50">Entradas</th>
                <th colSpan="3" className="border px-3 py-3 text-center bg-red-50">Salidas</th>
                <th colSpan="3" className="border px-3 py-3 text-center bg-blue-50">Saldo final</th>
                <th rowSpan="2" className="border px-3 py-3">Acción</th>
              </tr>
              <tr>
                <th className="border px-3 py-3">Tipo</th>
                <th className="border px-3 py-3">Serie</th>
                <th className="border px-3 py-3">Número</th>
                <th className="border px-3 py-3">Operación</th>
                <th className="border px-3 py-3 bg-green-50">Cant.</th>
                <th className="border px-3 py-3 bg-green-50">C. Unit.</th>
                <th className="border px-3 py-3 bg-green-50">Total</th>
                <th className="border px-3 py-3 bg-red-50">Cant.</th>
                <th className="border px-3 py-3 bg-red-50">C. Unit.</th>
                <th className="border px-3 py-3 bg-red-50">Total</th>
                <th className="border px-3 py-3 bg-blue-50">Cant.</th>
                <th className="border px-3 py-3 bg-blue-50">C. Unit.</th>
                <th className="border px-3 py-3 bg-blue-50">Total</th>
              </tr>
            </thead>

            <tbody>
              {filteredMovements.map((item) => (
                <tr key={item.id} className="hover:bg-green-50">
                  <td className="border px-3 py-3 font-semibold">{item.date}</td>
                  <td className="border px-3 py-3">{item.documentType}</td>
                  <td className="border px-3 py-3">{item.series}</td>
                  <td className="border px-3 py-3">{item.number}</td>
                  <td className="border px-3 py-3">
                    <OperationBadge operation={item.operation} />
                  </td>

                  <td className="border px-3 py-3 bg-green-50">{formatNumber(item.entryQty)}</td>
                  <td className="border px-3 py-3 bg-green-50">{item.entryUnitCost ? formatCurrency(item.entryUnitCost) : '-'}</td>
                  <td className="border px-3 py-3 bg-green-50 font-bold">{item.entryTotal ? formatCurrency(item.entryTotal) : '-'}</td>

                  <td className="border px-3 py-3 bg-red-50">{formatNumber(item.exitQty)}</td>
                  <td className="border px-3 py-3 bg-red-50">{item.exitUnitCost ? formatCurrency(item.exitUnitCost) : '-'}</td>
                  <td className="border px-3 py-3 bg-red-50 font-bold">{item.exitTotal ? formatCurrency(item.exitTotal) : '-'}</td>

                  <td className="border px-3 py-3 bg-blue-50 font-semibold">{formatNumber(item.balanceQty)}</td>
                  <td className="border px-3 py-3 bg-blue-50">{formatCurrency(item.balanceUnitCost)}</td>
                  <td className="border px-3 py-3 bg-blue-50 font-bold text-blue-800">{formatCurrency(item.balanceTotal)}</td>

                  <td className="border px-3 py-3">
                    <button className="rounded-lg bg-blue-50 p-2 text-blue-700 hover:bg-blue-100">
                      <Eye size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-2xl bg-white p-6 shadow-md">
          <div className="mb-5 flex items-center gap-2">
            <Truck className="text-blue-700" size={22} />
            <h2 className="text-xl font-bold text-gray-900">Impacto del flete</h2>
          </div>

          <div className="rounded-2xl border bg-blue-50 p-5">
            <p className="font-bold text-blue-900">Factura de flete FT01-0098</p>
            <p className="mt-2 text-sm text-blue-700">
              El flete distribuido incrementó el valor del inventario en S/ 680.00,
              recalculando el costo promedio del producto de S/ 142.04 a S/ 148.22.
            </p>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-md">
          <div className="mb-5 flex items-center gap-2">
            <CalendarDays className="text-amber-700" size={22} />
            <h2 className="text-xl font-bold text-gray-900">Resumen técnico</h2>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-xl border bg-gray-50 p-4">
              <p className="text-xs font-bold uppercase text-gray-500">Método</p>
              <p className="mt-1 font-bold text-gray-900">Promedio ponderado</p>
            </div>
            <div className="rounded-xl border bg-gray-50 p-4">
              <p className="text-xs font-bold uppercase text-gray-500">Unidad</p>
              <p className="mt-1 font-bold text-gray-900">Sacos / unidades</p>
            </div>
            <div className="rounded-xl border bg-gray-50 p-4">
              <p className="text-xs font-bold uppercase text-gray-500">Tipo existencia</p>
              <p className="mt-1 font-bold text-gray-900">Mercadería</p>
            </div>
            <div className="rounded-xl border bg-gray-50 p-4">
              <p className="text-xs font-bold uppercase text-gray-500">Origen</p>
              <p className="mt-1 font-bold text-gray-900">Compras, ventas y fletes</p>
            </div>
          </div>
        </section>
      </div>

      <div className="rounded-2xl border border-green-200 bg-green-50 p-5 text-sm text-green-800">
        <strong>Modo demostración:</strong> este kardex usa datos ficticios. En una implementación real, los movimientos se generarían automáticamente desde compras, ventas, fletes, ajustes y documentos registrados.
      </div>
    </div>
  );
}