import { useMemo, useState } from 'react';
import {
  AlertTriangle,
  Archive,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Download,
  Edit,
  Eye,
  FileCheck2,
  FileText,
  Filter,
  Package,
  Plus,
  ReceiptText,
  Search,
  ShieldCheck,
  ShoppingCart,
  Truck,
  UserRound,
  Wallet,
} from 'lucide-react';

const purchases = [
  {
    id: 'COMP-0001',
    date: '27/05/2026',
    supplier: 'Agroinsumos del Sur S.A.C.',
    ruc: '20601875421',
    documentType: 'Factura',
    document: 'F001-4587',
    status: 'Pendiente de recepción',
    paymentStatus: 'Pendiente',
    subtotal: 15635.59,
    igv: 2814.41,
    freight: 850.0,
    total: 19300.0,
    responsible: 'María Torres',
    warehouse: 'Almacén Principal',
    notes: 'Compra de fertilizantes granulados para reposición de stock.',
    products: [
      {
        name: 'Fosfato Monoamónico Granulado 50 Kg',
        sku: 'MAP-050',
        quantity: 80,
        unit: 'Sacos',
        unitCost: 142.8,
        total: 11424.0,
        lot: 'LT-MAP-0526',
        expiration: '15/05/2028',
      },
      {
        name: 'Sulfato de Amonio 50 Kg',
        sku: 'SULFATO-001',
        quantity: 40,
        unit: 'Sacos',
        unitCost: 102.3,
        total: 4092.0,
        lot: 'LT-SUL-0526',
        expiration: '21/04/2028',
      },
    ],
  },
  {
    id: 'COMP-0002',
    date: '26/05/2026',
    supplier: 'Riegos Andinos E.I.R.L.',
    ruc: '20481200315',
    documentType: 'Factura',
    document: 'F002-1098',
    status: 'En validación',
    paymentStatus: 'Pagado',
    subtotal: 8237.29,
    igv: 1482.71,
    freight: 420.0,
    total: 10140.0,
    responsible: 'Carlos Mendoza',
    warehouse: 'Zona de Riego',
    notes: 'Compra de cinta de riego y accesorios para campaña agrícola.',
    products: [
      {
        name: 'Cinta de Riego 16 mm x 1000 m',
        sku: 'RIEGO-016',
        quantity: 20,
        unit: 'Rollos',
        unitCost: 318.5,
        total: 6370.0,
        lot: 'LT-RIE-0526',
        expiration: 'No aplica',
      },
      {
        name: 'Conector Inicial para Cinta de Riego',
        sku: 'CON-INI',
        quantity: 500,
        unit: 'Unidades',
        unitCost: 2.65,
        total: 1325.0,
        lot: 'LT-CON-0526',
        expiration: 'No aplica',
      },
    ],
  },
  {
    id: 'COMP-0003',
    date: '25/05/2026',
    supplier: 'Química Agrícola Tacna S.A.C.',
    ruc: '20544789632',
    documentType: 'Factura',
    document: 'F003-2241',
    status: 'Recibido',
    paymentStatus: 'Pagado',
    subtotal: 10491.53,
    igv: 1888.47,
    freight: 300.0,
    total: 12680.0,
    responsible: 'Luis Apaza',
    warehouse: 'Zona Agroquímicos',
    notes: 'Ingreso de agroquímicos y fertilizantes foliares con control de vencimiento.',
    products: [
      {
        name: 'Avant Natur 1 Lt',
        sku: 'AVANT-001',
        quantity: 60,
        unit: 'Botellas',
        unitCost: 61.2,
        total: 3672.0,
        lot: 'LT-AVA-0526',
        expiration: '10/03/2028',
      },
      {
        name: 'Basfoliar Calcio 1 Lt',
        sku: 'BASF-001',
        quantity: 48,
        unit: 'Botellas',
        unitCost: 38.5,
        total: 1848.0,
        lot: 'LT-BAS-0526',
        expiration: '18/02/2028',
      },
      {
        name: 'Arriba 1 Lt',
        sku: 'ARR-001',
        quantity: 40,
        unit: 'Botellas',
        unitCost: 49.9,
        total: 1996.0,
        lot: 'LT-ARR-0526',
        expiration: '10/03/2028',
      },
    ],
  },
  {
    id: 'COMP-0004',
    date: '23/05/2026',
    supplier: 'Fertilizantes Andinos S.A.C.',
    ruc: '20611258974',
    documentType: 'Factura',
    document: 'F004-0875',
    status: 'Observado',
    paymentStatus: 'Pendiente',
    subtotal: 7415.25,
    igv: 1334.75,
    freight: 0,
    total: 8750.0,
    responsible: 'Ana Flores',
    warehouse: 'Almacén Principal',
    notes: 'Documento observado por diferencia entre cantidades facturadas y guía remitida.',
    products: [
      {
        name: 'Fosfato Diamónico 25 Kg',
        sku: 'DAP-025',
        quantity: 70,
        unit: 'Sacos',
        unitCost: 71.4,
        total: 4998.0,
        lot: 'LT-DAP-0526',
        expiration: '22/04/2028',
      },
    ],
  },
];

const supplierSummary = [
  { supplier: 'Agroinsumos del Sur S.A.C.', purchases: 7, amount: 45800 },
  { supplier: 'Riegos Andinos E.I.R.L.', purchases: 4, amount: 21940 },
  { supplier: 'Química Agrícola Tacna S.A.C.', purchases: 5, amount: 31280 },
  { supplier: 'Fertilizantes Andinos S.A.C.', purchases: 3, amount: 18750 },
];

const purchaseTimeline = [
  {
    title: 'Factura registrada',
    description: 'Documento F001-4587 cargado y validado visualmente.',
    date: '27/05/2026',
    time: '08:45 AM',
    type: 'success',
  },
  {
    title: 'Mercadería pendiente',
    description: 'La recepción física aún no fue confirmada por almacén.',
    date: '27/05/2026',
    time: '09:15 AM',
    type: 'warning',
  },
  {
    title: 'Flete asociado',
    description: 'Costo de transporte pendiente de distribución por producto.',
    date: '27/05/2026',
    time: '09:40 AM',
    type: 'info',
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
    Recibido: 'bg-green-100 text-green-700 border-green-200',
    'Pendiente de recepción': 'bg-amber-100 text-amber-700 border-amber-200',
    'En validación': 'bg-blue-100 text-blue-700 border-blue-200',
    Observado: 'bg-red-100 text-red-700 border-red-200',
    Pagado: 'bg-green-100 text-green-700 border-green-200',
    Pendiente: 'bg-yellow-100 text-yellow-700 border-yellow-200',
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

export default function AdminPurchases() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [selectedPurchase, setSelectedPurchase] = useState(purchases[0]);

  const filteredPurchases = useMemo(() => {
    return purchases.filter((purchase) => {
      const text = `${purchase.id} ${purchase.supplier} ${purchase.document} ${purchase.status}`
        .toLowerCase()
        .trim();

      const matchesSearch = text.includes(search.toLowerCase().trim());
      const matchesStatus =
        statusFilter === 'Todos' || purchase.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const totalPurchases = purchases.reduce((sum, item) => sum + item.total, 0);
  const pendingReception = purchases.filter(
    (item) => item.status === 'Pendiente de recepción'
  ).length;
  const observedPurchases = purchases.filter(
    (item) => item.status === 'Observado'
  ).length;
  const totalFreight = purchases.reduce((sum, item) => sum + item.freight, 0);

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl bg-gradient-to-r from-green-900 via-green-800 to-lime-700 p-6 text-white shadow-lg md:flex-row md:items-center">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-white/15 p-3">
            <ShoppingCart size={30} />
          </div>

          <div>
            <h1 className="text-3xl font-bold">Gestión de Compras</h1>
            <p className="mt-1 text-sm text-white/80">
              Registro visual de compras, proveedores, documentos, fletes,
              recepción y control de inventario.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-bold text-green-800 shadow transition hover:bg-green-50">
            <Plus size={18} />
            Nueva compra
          </button>

          <button className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-bold text-white ring-1 ring-white/20 transition hover:bg-white/20">
            <Download size={18} />
            Exportar
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Compras del Mes"
          value={formatCurrency(totalPurchases)}
          subtitle={`${purchases.length} documentos registrados`}
          color="border-green-600"
          icon={<ReceiptText className="text-green-700" size={28} />}
        />

        <SummaryCard
          title="Pendientes de Recepción"
          value={pendingReception}
          subtitle="Compras por validar en almacén"
          color="border-amber-500"
          icon={<Truck className="text-amber-600" size={28} />}
        />

        <SummaryCard
          title="Documentos Observados"
          value={observedPurchases}
          subtitle="Requieren revisión administrativa"
          color="border-red-500"
          icon={<AlertTriangle className="text-red-600" size={28} />}
        />

        <SummaryCard
          title="Fletes Asociados"
          value={formatCurrency(totalFreight)}
          subtitle="Impactan el costo del inventario"
          color="border-blue-500"
          icon={<Wallet className="text-blue-600" size={28} />}
        />
      </div>

      {/* Filtros */}
      <section className="rounded-2xl bg-white p-5 shadow-md">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex items-center gap-2 rounded-xl border bg-gray-50 px-4 py-3 xl:w-96">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Buscar compra, proveedor, factura o estado..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-2 text-sm font-semibold text-gray-600">
              <Filter size={18} />
              Estado:
            </span>

            {[
              'Todos',
              'Pendiente de recepción',
              'En validación',
              'Recibido',
              'Observado',
            ].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                  statusFilter === status
                    ? 'bg-green-700 text-white shadow'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-3">
        {/* Listado de compras */}
        <section className="rounded-2xl bg-white p-6 shadow-md xl:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Documentos de Compra
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Compras registradas con detalle de proveedor, recepción, pago e
                inventario.
              </p>
            </div>

            <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-700">
              {filteredPurchases.length} resultados
            </span>
          </div>

          <div className="overflow-hidden rounded-xl border">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-4">Documento</th>
                  <th className="px-4 py-4">Proveedor</th>
                  <th className="px-4 py-4">Fecha</th>
                  <th className="px-4 py-4">Total</th>
                  <th className="px-4 py-4">Estado</th>
                  <th className="px-4 py-4">Acciones</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {filteredPurchases.map((purchase) => (
                  <tr
                    key={purchase.id}
                    onClick={() => setSelectedPurchase(purchase)}
                    className={`cursor-pointer transition hover:bg-green-50 ${
                      selectedPurchase.id === purchase.id ? 'bg-green-50' : ''
                    }`}
                  >
                    <td className="px-4 py-4">
                      <p className="font-bold text-gray-900">
                        {purchase.document}
                      </p>
                      <p className="text-xs text-gray-500">
                        {purchase.documentType} · {purchase.id}
                      </p>
                    </td>

                    <td className="px-4 py-4">
                      <p className="font-semibold text-gray-900">
                        {purchase.supplier}
                      </p>
                      <p className="text-xs text-gray-500">RUC {purchase.ruc}</p>
                    </td>

                    <td className="px-4 py-4 text-gray-600">
                      {purchase.date}
                    </td>

                    <td className="px-4 py-4">
                      <p className="font-bold text-green-700">
                        {formatCurrency(purchase.total)}
                      </p>
                      <p className="text-xs text-gray-500">
                        Flete: {formatCurrency(purchase.freight)}
                      </p>
                    </td>

                    <td className="px-4 py-4">
                      <div className="space-y-2">
                        <StatusBadge status={purchase.status} />
                        <StatusBadge status={purchase.paymentStatus} />
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <button className="rounded-lg bg-blue-50 p-2 text-blue-700 hover:bg-blue-100">
                          <Eye size={16} />
                        </button>
                        <button className="rounded-lg bg-amber-50 p-2 text-amber-700 hover:bg-amber-100">
                          <Edit size={16} />
                        </button>
                        <button className="rounded-lg bg-green-50 p-2 text-green-700 hover:bg-green-100">
                          <ClipboardCheck size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Detalle */}
        <aside className="space-y-6">
          <section className="rounded-2xl bg-white p-6 shadow-md">
            <div className="mb-5 flex items-center gap-2">
              <FileText className="text-green-700" size={22} />
              <h2 className="text-xl font-bold text-gray-900">
                Detalle de Compra
              </h2>
            </div>

            <div className="rounded-2xl border bg-gray-50 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {selectedPurchase.document}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {selectedPurchase.documentType} · {selectedPurchase.id}
                  </p>
                </div>

                <StatusBadge status={selectedPurchase.status} />
              </div>

              <div className="mt-5 space-y-3">
                <div className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-sm">
                  <UserRound className="mt-1 text-green-700" size={18} />
                  <div>
                    <p className="text-xs font-bold uppercase text-gray-500">
                      Proveedor
                    </p>
                    <p className="font-semibold text-gray-900">
                      {selectedPurchase.supplier}
                    </p>
                    <p className="text-sm text-gray-500">
                      RUC {selectedPurchase.ruc}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-sm">
                  <CalendarDays className="mt-1 text-blue-700" size={18} />
                  <div>
                    <p className="text-xs font-bold uppercase text-gray-500">
                      Fecha y responsable
                    </p>
                    <p className="font-semibold text-gray-900">
                      {selectedPurchase.date}
                    </p>
                    <p className="text-sm text-gray-500">
                      {selectedPurchase.responsible}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-sm">
                  <Archive className="mt-1 text-amber-700" size={18} />
                  <div>
                    <p className="text-xs font-bold uppercase text-gray-500">
                      Almacén destino
                    </p>
                    <p className="font-semibold text-gray-900">
                      {selectedPurchase.warehouse}
                    </p>
                    <p className="text-sm text-gray-500">
                      {selectedPurchase.notes}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-md">
            <div className="mb-4 flex items-center gap-2">
              <Wallet className="text-blue-700" size={22} />
              <h2 className="text-xl font-bold text-gray-900">
                Resumen Económico
              </h2>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between rounded-xl bg-gray-50 p-3">
                <span className="font-semibold text-gray-600">Subtotal</span>
                <span className="font-bold text-gray-900">
                  {formatCurrency(selectedPurchase.subtotal)}
                </span>
              </div>

              <div className="flex justify-between rounded-xl bg-gray-50 p-3">
                <span className="font-semibold text-gray-600">IGV</span>
                <span className="font-bold text-gray-900">
                  {formatCurrency(selectedPurchase.igv)}
                </span>
              </div>

              <div className="flex justify-between rounded-xl bg-blue-50 p-3">
                <span className="font-semibold text-blue-700">Flete</span>
                <span className="font-bold text-blue-800">
                  {formatCurrency(selectedPurchase.freight)}
                </span>
              </div>

              <div className="flex justify-between rounded-xl bg-green-700 p-4 text-white">
                <span className="font-bold">Total</span>
                <span className="font-bold">
                  {formatCurrency(selectedPurchase.total)}
                </span>
              </div>
            </div>
          </section>
        </aside>
      </div>

      {/* Productos comprados */}
      <section className="rounded-2xl bg-white p-6 shadow-md">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Package className="text-green-700" size={24} />
              <h2 className="text-2xl font-bold text-gray-900">
                Productos de la Compra Seleccionada
              </h2>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Productos vinculados al documento, con lotes, vencimientos y costo
              de compra.
            </p>
          </div>

          <button className="rounded-xl bg-green-700 px-4 py-2 text-sm font-bold text-white transition hover:bg-green-800">
            Asociar flete
          </button>
        </div>

        <div className="overflow-hidden rounded-xl border">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-4">Producto</th>
                <th className="px-4 py-4">SKU</th>
                <th className="px-4 py-4">Cantidad</th>
                <th className="px-4 py-4">Costo unitario</th>
                <th className="px-4 py-4">Total</th>
                <th className="px-4 py-4">Lote</th>
                <th className="px-4 py-4">Vencimiento</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {selectedPurchase.products.map((product) => (
                <tr key={product.sku} className="hover:bg-gray-50">
                  <td className="px-4 py-4 font-semibold text-gray-900">
                    {product.name}
                  </td>
                  <td className="px-4 py-4 text-xs font-semibold text-gray-500">
                    {product.sku}
                  </td>
                  <td className="px-4 py-4">
                    {product.quantity} {product.unit}
                  </td>
                  <td className="px-4 py-4">
                    {formatCurrency(product.unitCost)}
                  </td>
                  <td className="px-4 py-4 font-bold text-green-700">
                    {formatCurrency(product.total)}
                  </td>
                  <td className="px-4 py-4 text-gray-600">{product.lot}</td>
                  <td className="px-4 py-4 text-gray-600">
                    {product.expiration}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Proveedores y línea de tiempo */}
      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-2xl bg-white p-6 shadow-md">
          <div className="mb-5 flex items-center gap-2">
            <ShieldCheck className="text-green-700" size={22} />
            <h2 className="text-xl font-bold text-gray-900">
              Proveedores con Mayor Movimiento
            </h2>
          </div>

          <div className="space-y-4">
            {supplierSummary.map((item) => (
              <div key={item.supplier} className="rounded-2xl border p-4">
                <div className="mb-2 flex justify-between gap-4">
                  <div>
                    <p className="font-bold text-gray-900">{item.supplier}</p>
                    <p className="text-sm text-gray-500">
                      {item.purchases} compras registradas
                    </p>
                  </div>
                  <p className="font-bold text-green-700">
                    {formatCurrency(item.amount)}
                  </p>
                </div>

                <div className="h-2 rounded-full bg-gray-100">
                  <div
                    className="h-2 rounded-full bg-green-700"
                    style={{
                      width: `${Math.min((item.amount / 50000) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-md">
          <div className="mb-5 flex items-center gap-2">
            <FileCheck2 className="text-blue-700" size={22} />
            <h2 className="text-xl font-bold text-gray-900">
              Línea de Control Documentario
            </h2>
          </div>

          <div className="space-y-4">
            {purchaseTimeline.map((item) => (
              <div key={item.title} className="flex gap-4 rounded-2xl border p-4">
                <div
                  className={`mt-1 flex h-10 w-10 items-center justify-center rounded-full ${
                    item.type === 'success'
                      ? 'bg-green-100 text-green-700'
                      : item.type === 'warning'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  {item.type === 'success' ? (
                    <CheckCircle2 size={20} />
                  ) : item.type === 'warning' ? (
                    <AlertTriangle size={20} />
                  ) : (
                    <Truck size={20} />
                  )}
                </div>

                <div>
                  <h3 className="font-bold text-gray-900">{item.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {item.description}
                  </p>
                  <p className="mt-2 text-xs font-semibold text-gray-400">
                    {item.date} · {item.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Nota demo */}
      <div className="rounded-2xl border border-green-200 bg-green-50 p-5 text-sm text-green-800">
        <strong>Modo demostración:</strong> esta vista no registra compras
        reales. En una implementación final, este módulo permitiría registrar
        facturas, asociar fletes, validar documentos, actualizar inventario,
        generar entradas al kardex y alimentar reportes administrativos.
      </div>
    </div>
  );
}