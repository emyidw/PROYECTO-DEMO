import { useMemo, useState } from 'react';
import {
  AlertTriangle,
  Archive,
  Boxes,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  ClipboardList,
  Clock,
  Eye,
  FileCheck2,
  Filter,
  MapPin,
  PackageCheck,
  PackageOpen,
  Search,
  ShieldCheck,
  Truck,
  Warehouse,
} from 'lucide-react';

const lowStockProducts = [
  {
    id: 1,
    producto: 'Sulfato de Amonio 50 Kg',
    sku: 'SULFATO-001',
    categoria: 'Fertilizantes',
    stockActual: 8,
    limiteMinimo: 10,
    almacen: 'Almacén Principal',
    estado: 'Crítico',
  },
  {
    id: 2,
    producto: 'Fosfato Monoamónico Granulado 50 Kg',
    sku: 'MAP-050',
    categoria: 'Fertilizantes',
    stockActual: 12,
    limiteMinimo: 15,
    almacen: 'Almacén Principal',
    estado: 'Bajo',
  },
  {
    id: 3,
    producto: 'Cinta de Riego 16 mm x 1000 m',
    sku: 'RIEGO-016',
    categoria: 'Cinta de riego',
    stockActual: 5,
    limiteMinimo: 8,
    almacen: 'Zona de Riego',
    estado: 'Crítico',
  },
];

const receptions = [
  {
    id: 'RC-0001',
    proveedor: 'Agroinsumos del Sur S.A.C.',
    documento: 'F001-4587',
    fecha: '27/05/2026',
    estado: 'Pendiente de recepción',
    responsable: 'María Torres',
    total: 'S/ 18,450.00',
    productos: [
      {
        producto: 'Fosfato Monoamónico Granulado 50 Kg',
        cantidad: 80,
        unidad: 'Sacos',
        lote: 'LT-MAP-0526',
        vencimiento: '15/05/2028',
        ubicacion: 'Pasillo A - Rack 02',
      },
      {
        producto: 'Sulfato de Amonio 50 Kg',
        cantidad: 120,
        unidad: 'Sacos',
        lote: 'LT-SUL-0526',
        vencimiento: '21/04/2028',
        ubicacion: 'Pasillo A - Rack 04',
      },
    ],
  },
  {
    id: 'RC-0002',
    proveedor: 'Riegos Andinos E.I.R.L.',
    documento: 'F002-1098',
    fecha: '26/05/2026',
    estado: 'En validación',
    responsable: 'Carlos Mendoza',
    total: 'S/ 9,720.00',
    productos: [
      {
        producto: 'Cinta de Riego 16 mm x 1000 m',
        cantidad: 35,
        unidad: 'Rollos',
        lote: 'LT-RIE-0526',
        vencimiento: 'No aplica',
        ubicacion: 'Zona de Riego - Estante 01',
      },
      {
        producto: 'Conector Inicial para Cinta de Riego',
        cantidad: 500,
        unidad: 'Unidades',
        lote: 'LT-CON-0526',
        vencimiento: 'No aplica',
        ubicacion: 'Zona de Riego - Gaveta 03',
      },
    ],
  },
  {
    id: 'RC-0003',
    proveedor: 'Química Agrícola Tacna S.A.C.',
    documento: 'F003-2241',
    fecha: '25/05/2026',
    estado: 'Recibido',
    responsable: 'Luis Apaza',
    total: 'S/ 12,380.00',
    productos: [
      {
        producto: 'Avant Natur 1 Lt',
        cantidad: 60,
        unidad: 'Botellas',
        lote: 'LT-AVA-0526',
        vencimiento: '10/03/2028',
        ubicacion: 'Zona Agroquímicos - Rack 01',
      },
      {
        producto: 'Basfoliar Calcio 1 Lt',
        cantidad: 48,
        unidad: 'Botellas',
        lote: 'LT-BAS-0526',
        vencimiento: '18/02/2028',
        ubicacion: 'Zona Agroquímicos - Rack 02',
      },
    ],
  },
];

const orders = [
  {
    id: 'PED-1779868992431',
    cliente: 'Ericka Martínez',
    fecha: '27/05/2026',
    distrito: 'Tacna',
    estado: 'Pendiente de picking',
    prioridad: 'Alta',
    total: 'S/ 1,672.50',
    responsable: 'Juan Quispe',
    productos: [
      {
        producto: 'Fosfato Diamónico 25 Kg',
        sku: 'DAP-025',
        cantidad: 6,
        ubicacion: 'Pasillo A - Rack 01',
        validado: true,
      },
      {
        producto: 'Cinta de Riego 16 mm x 1000 m',
        sku: 'RIEGO-016',
        cantidad: 2,
        ubicacion: 'Zona de Riego - Estante 01',
        validado: false,
      },
      {
        producto: 'Basfoliar Calcio 1 Lt',
        sku: 'BASF-001',
        cantidad: 4,
        ubicacion: 'Zona Agroquímicos - Rack 02',
        validado: true,
      },
    ],
  },
  {
    id: 'PED-1779868993012',
    cliente: 'Agrícola Los Pinos',
    fecha: '27/05/2026',
    distrito: 'Calana',
    estado: 'En preparación',
    prioridad: 'Media',
    total: 'S/ 2,940.00',
    responsable: 'Pedro Mamani',
    productos: [
      {
        producto: 'Sulfato de Amonio 50 Kg',
        sku: 'SULFATO-001',
        cantidad: 20,
        ubicacion: 'Pasillo A - Rack 04',
        validado: true,
      },
      {
        producto: 'Arriba 1 Lt',
        sku: 'ARR-001',
        cantidad: 12,
        ubicacion: 'Zona Agroquímicos - Rack 03',
        validado: true,
      },
    ],
  },
  {
    id: 'PED-1779868994125',
    cliente: 'Fundo Santa Rosa',
    fecha: '26/05/2026',
    distrito: 'Pocollay',
    estado: 'Listo para despacho',
    prioridad: 'Alta',
    total: 'S/ 4,385.00',
    responsable: 'Ana Flores',
    productos: [
      {
        producto: 'Fosfato Monoamónico Granulado 50 Kg',
        sku: 'MAP-050',
        cantidad: 35,
        ubicacion: 'Pasillo A - Rack 02',
        validado: true,
      },
      {
        producto: 'Avant Natur 1 Lt',
        sku: 'AVANT-001',
        cantidad: 10,
        ubicacion: 'Zona Agroquímicos - Rack 01',
        validado: true,
      },
    ],
  },
];

const warehouseMovements = [
  {
    id: 1,
    tipo: 'Entrada',
    descripcion: 'Recepción parcial de fertilizantes',
    documento: 'F001-4587',
    fecha: '27/05/2026',
    hora: '09:15 AM',
    responsable: 'María Torres',
  },
  {
    id: 2,
    tipo: 'Salida',
    descripcion: 'Preparación de pedido para cliente final',
    documento: 'PED-1779868992431',
    fecha: '27/05/2026',
    hora: '10:30 AM',
    responsable: 'Juan Quispe',
  },
  {
    id: 3,
    tipo: 'Validación',
    descripcion: 'Control de lote y vencimiento de agroquímicos',
    documento: 'F003-2241',
    fecha: '26/05/2026',
    hora: '04:20 PM',
    responsable: 'Luis Apaza',
  },
];

function StatusBadge({ status }) {
  const styles = {
    'Pendiente de recepción': 'bg-amber-100 text-amber-700 border-amber-200',
    'En validación': 'bg-blue-100 text-blue-700 border-blue-200',
    Recibido: 'bg-green-100 text-green-700 border-green-200',
    'Pendiente de picking': 'bg-amber-100 text-amber-700 border-amber-200',
    'En preparación': 'bg-blue-100 text-blue-700 border-blue-200',
    'Listo para despacho': 'bg-green-100 text-green-700 border-green-200',
    Crítico: 'bg-red-100 text-red-700 border-red-200',
    Bajo: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    Alta: 'bg-red-100 text-red-700 border-red-200',
    Media: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  };

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${
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

export default function WarehousePage() {
  const [search, setSearch] = useState('');
  const [selectedReception, setSelectedReception] = useState(receptions[0]);
  const [selectedOrder, setSelectedOrder] = useState(orders[0]);

  const filteredReceptions = useMemo(() => {
    return receptions.filter((item) => {
      const text = `${item.id} ${item.proveedor} ${item.documento} ${item.estado}`.toLowerCase();
      return text.includes(search.toLowerCase());
    });
  }, [search]);

  const pendingOrders = orders.filter(
    (order) =>
      order.estado === 'Pendiente de picking' ||
      order.estado === 'En preparación'
  ).length;

  const readyOrders = orders.filter(
    (order) => order.estado === 'Listo para despacho'
  ).length;

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl bg-gradient-to-r from-green-900 via-green-800 to-lime-700 p-6 text-white shadow-lg md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-white/15 p-3">
              <Warehouse size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Gestión de Almacén</h1>
              <p className="mt-1 text-sm text-white/80">
                Control visual de recepción, stock, preparación de pedidos y
                despacho.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm md:grid-cols-4">
          <div className="rounded-xl bg-white/10 px-4 py-3 text-center">
            <p className="font-bold">98%</p>
            <p className="text-white/75">Exactitud</p>
          </div>
          <div className="rounded-xl bg-white/10 px-4 py-3 text-center">
            <p className="font-bold">24 h</p>
            <p className="text-white/75">Rotación</p>
          </div>
          <div className="rounded-xl bg-white/10 px-4 py-3 text-center">
            <p className="font-bold">3</p>
            <p className="text-white/75">Zonas</p>
          </div>
          <div className="rounded-xl bg-white/10 px-4 py-3 text-center">
            <p className="font-bold">Demo</p>
            <p className="text-white/75">Simulado</p>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Recepciones Pendientes"
          value="2"
          subtitle="Compras por validar hoy"
          color="border-amber-500"
          icon={<PackageOpen className="text-amber-600" size={28} />}
        />

        <SummaryCard
          title="Pedidos en Preparación"
          value={pendingOrders}
          subtitle="Picking y validación activa"
          color="border-blue-500"
          icon={<ClipboardList className="text-blue-600" size={28} />}
        />

        <SummaryCard
          title="Listos para Despacho"
          value={readyOrders}
          subtitle="Pedidos embalados"
          color="border-green-500"
          icon={<Truck className="text-green-700" size={28} />}
        />

        <SummaryCard
          title="Stock Bajo"
          value={lowStockProducts.length}
          subtitle="Productos bajo mínimo"
          color="border-red-500"
          icon={<AlertTriangle className="text-red-600" size={28} />}
        />
      </div>

      {/* Productos con stock bajo */}
      <section className="rounded-2xl bg-white p-6 shadow-md">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="text-amber-500" size={22} />
            <h2 className="text-xl font-bold text-gray-900">
              Productos con Stock Bajo
            </h2>
          </div>

          <button className="rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-800">
            Generar reposición
          </button>
        </div>

        <div className="overflow-hidden rounded-xl border">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-5 py-4">Producto</th>
                <th className="px-5 py-4">SKU</th>
                <th className="px-5 py-4">Categoría</th>
                <th className="px-5 py-4">Stock Actual</th>
                <th className="px-5 py-4">Límite Mínimo</th>
                <th className="px-5 py-4">Almacén</th>
                <th className="px-5 py-4">Estado</th>
                <th className="px-5 py-4">Acción</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {lowStockProducts.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-5 py-4 font-semibold text-gray-900">
                    {item.producto}
                  </td>
                  <td className="px-5 py-4 text-xs font-medium text-gray-600">
                    {item.sku}
                  </td>
                  <td className="px-5 py-4 text-gray-600">{item.categoria}</td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-yellow-100 px-3 py-1 font-bold text-yellow-700">
                      {item.stockActual}
                    </span>
                  </td>
                  <td className="px-5 py-4">{item.limiteMinimo}</td>
                  <td className="px-5 py-4 text-gray-600">{item.almacen}</td>
                  <td className="px-5 py-4">
                    <StatusBadge status={item.estado} />
                  </td>
                  <td className="px-5 py-4">
                    <button className="font-semibold text-green-700 hover:text-green-900">
                      Comprar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Recepción de Mercadería */}
      <section className="rounded-2xl bg-white p-6 shadow-md">
        <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2">
              <PackageCheck className="text-green-700" size={24} />
              <h2 className="text-2xl font-bold text-gray-900">
                Recepción de Mercadería
              </h2>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Simulación profesional de recepción, validación documental, lotes,
              vencimientos y ubicación.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl border bg-gray-50 px-3 py-2">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Buscar recepción, proveedor o factura..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-72 bg-transparent text-sm outline-none"
            />
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          <div className="space-y-3">
            {filteredReceptions.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedReception(item)}
                className={`w-full rounded-2xl border p-4 text-left transition hover:shadow-md ${
                  selectedReception.id === item.id
                    ? 'border-green-600 bg-green-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-gray-900">{item.id}</h3>
                    <p className="mt-1 text-sm text-gray-600">
                      {item.proveedor}
                    </p>
                  </div>
                  <StatusBadge status={item.estado} />
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-gray-600">
                  <span className="flex items-center gap-1">
                    <FileCheck2 size={14} /> {item.documento}
                  </span>
                  <span className="flex items-center gap-1">
                    <CalendarDays size={14} /> {item.fecha}
                  </span>
                </div>
              </button>
            ))}
          </div>

          <div className="xl:col-span-2">
            <div className="rounded-2xl border bg-gray-50 p-5">
              <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-center">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {selectedReception.documento}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Proveedor: {selectedReception.proveedor}
                  </p>
                </div>

                <div className="text-right">
                  <StatusBadge status={selectedReception.estado} />
                  <p className="mt-2 text-lg font-bold text-green-800">
                    {selectedReception.total}
                  </p>
                </div>
              </div>

              <div className="mb-5 grid gap-4 md:grid-cols-3">
                <div className="rounded-xl bg-white p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase text-gray-500">
                    Responsable
                  </p>
                  <p className="mt-1 font-bold text-gray-900">
                    {selectedReception.responsable}
                  </p>
                </div>

                <div className="rounded-xl bg-white p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase text-gray-500">
                    Validación
                  </p>
                  <p className="mt-1 font-bold text-blue-700">
                    Documento conforme
                  </p>
                </div>

                <div className="rounded-xl bg-white p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase text-gray-500">
                    Ubicación
                  </p>
                  <p className="mt-1 font-bold text-gray-900">
                    Asignación automática
                  </p>
                </div>
              </div>

              <div className="overflow-hidden rounded-xl border bg-white">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-100 text-gray-700">
                    <tr>
                      <th className="px-4 py-3">Producto</th>
                      <th className="px-4 py-3">Cantidad</th>
                      <th className="px-4 py-3">Lote</th>
                      <th className="px-4 py-3">Vencimiento</th>
                      <th className="px-4 py-3">Ubicación</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y">
                    {selectedReception.productos.map((product) => (
                      <tr key={product.producto} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-semibold text-gray-900">
                          {product.producto}
                        </td>
                        <td className="px-4 py-3">
                          {product.cantidad} {product.unidad}
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {product.lote}
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {product.vencimiento}
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center gap-1 text-green-700">
                            <MapPin size={14} />
                            {product.ubicacion}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-3">
                <div className="rounded-xl border border-green-200 bg-green-50 p-4">
                  <div className="flex items-center gap-2 font-bold text-green-800">
                    <CheckCircle2 size={18} />
                    Documento validado
                  </div>
                  <p className="mt-1 text-sm text-green-700">
                    Factura y guía revisadas visualmente.
                  </p>
                </div>

                <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
                  <div className="flex items-center gap-2 font-bold text-blue-800">
                    <ShieldCheck size={18} />
                    Control sanitario
                  </div>
                  <p className="mt-1 text-sm text-blue-700">
                    Lotes y vencimientos registrados.
                  </p>
                </div>

                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                  <div className="flex items-center gap-2 font-bold text-amber-800">
                    <Archive size={18} />
                    Kardex simulado
                  </div>
                  <p className="mt-1 text-sm text-amber-700">
                    Entrada lista para reflejarse en inventario.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Preparación de Pedidos */}
      <section className="rounded-2xl bg-white p-6 shadow-md">
        <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2">
              <ClipboardCheck className="text-blue-700" size={24} />
              <h2 className="text-2xl font-bold text-gray-900">
                Preparación de Pedidos
              </h2>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Control simulado de picking list, validación de productos,
              embalaje y despacho.
            </p>
          </div>

          <button className="flex items-center gap-2 rounded-xl bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-800">
            <Filter size={17} />
            Filtrar pendientes
          </button>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          <div className="space-y-3">
            {orders.map((order) => (
              <button
                key={order.id}
                onClick={() => setSelectedOrder(order)}
                className={`w-full rounded-2xl border p-4 text-left transition hover:shadow-md ${
                  selectedOrder.id === order.id
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-gray-900">{order.id}</h3>
                    <p className="mt-1 text-sm text-gray-600">
                      {order.cliente}
                    </p>
                  </div>

                  <StatusBadge status={order.prioridad} />
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-gray-600">
                  <span>{order.fecha}</span>
                  <span>{order.distrito}</span>
                  <span className="font-bold text-green-700">
                    {order.total}
                  </span>
                </div>

                <div className="mt-3">
                  <StatusBadge status={order.estado} />
                </div>
              </button>
            ))}
          </div>

          <div className="xl:col-span-2">
            <div className="rounded-2xl border bg-gray-50 p-5">
              <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-center">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {selectedOrder.id}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Cliente: {selectedOrder.cliente} · Distrito:{' '}
                    {selectedOrder.distrito}
                  </p>
                </div>

                <div className="text-right">
                  <StatusBadge status={selectedOrder.estado} />
                  <p className="mt-2 text-lg font-bold text-green-800">
                    {selectedOrder.total}
                  </p>
                </div>
              </div>

              <div className="mb-5 grid gap-4 md:grid-cols-4">
                <div className="rounded-xl bg-white p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase text-gray-500">
                    Responsable
                  </p>
                  <p className="mt-1 font-bold text-gray-900">
                    {selectedOrder.responsable}
                  </p>
                </div>

                <div className="rounded-xl bg-white p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase text-gray-500">
                    Picking
                  </p>
                  <p className="mt-1 font-bold text-blue-700">
                    {
                      selectedOrder.productos.filter((item) => item.validado)
                        .length
                    }{' '}
                    / {selectedOrder.productos.length} validado
                  </p>
                </div>

                <div className="rounded-xl bg-white p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase text-gray-500">
                    Embalaje
                  </p>
                  <p className="mt-1 font-bold text-amber-700">
                    En proceso
                  </p>
                </div>

                <div className="rounded-xl bg-white p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase text-gray-500">
                    Entrega
                  </p>
                  <p className="mt-1 font-bold text-green-700">
                    Ruta local
                  </p>
                </div>
              </div>

              <div className="overflow-hidden rounded-xl border bg-white">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-100 text-gray-700">
                    <tr>
                      <th className="px-4 py-3">Producto</th>
                      <th className="px-4 py-3">SKU</th>
                      <th className="px-4 py-3">Cantidad</th>
                      <th className="px-4 py-3">Ubicación</th>
                      <th className="px-4 py-3">Validación</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y">
                    {selectedOrder.productos.map((product) => (
                      <tr key={product.sku} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-semibold text-gray-900">
                          {product.producto}
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-600">
                          {product.sku}
                        </td>
                        <td className="px-4 py-3">{product.cantidad}</td>
                        <td className="px-4 py-3 text-gray-600">
                          {product.ubicacion}
                        </td>
                        <td className="px-4 py-3">
                          {product.validado ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                              <CheckCircle2 size={14} />
                              Validado
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">
                              <Clock size={14} />
                              Pendiente
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-4">
                <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
                  <div className="flex items-center gap-2 font-bold text-blue-800">
                    <Boxes size={18} />
                    Picking list
                  </div>
                  <p className="mt-1 text-sm text-blue-700">
                    Productos ubicados por zona.
                  </p>
                </div>

                <div className="rounded-xl border border-green-200 bg-green-50 p-4">
                  <div className="flex items-center gap-2 font-bold text-green-800">
                    <ClipboardCheck size={18} />
                    Control de salida
                  </div>
                  <p className="mt-1 text-sm text-green-700">
                    Cantidades verificadas.
                  </p>
                </div>

                <div className="rounded-xl border border-purple-200 bg-purple-50 p-4">
                  <div className="flex items-center gap-2 font-bold text-purple-800">
                    <Eye size={18} />
                    Supervisión
                  </div>
                  <p className="mt-1 text-sm text-purple-700">
                    Revisión antes del despacho.
                  </p>
                </div>

                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                  <div className="flex items-center gap-2 font-bold text-amber-800">
                    <Truck size={18} />
                    Envío
                  </div>
                  <p className="mt-1 text-sm text-amber-700">
                    Ruta y entrega simulada.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Movimientos recientes */}
      <section className="rounded-2xl bg-white p-6 shadow-md">
        <div className="mb-5 flex items-center gap-2">
          <Clock className="text-gray-700" size={22} />
          <h2 className="text-xl font-bold text-gray-900">
            Movimientos Recientes de Almacén
          </h2>
        </div>

        <div className="space-y-4">
          {warehouseMovements.map((movement) => (
            <div
              key={movement.id}
              className="flex flex-col justify-between gap-3 rounded-2xl border bg-gray-50 p-4 md:flex-row md:items-center"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`rounded-xl p-3 ${
                    movement.tipo === 'Entrada'
                      ? 'bg-green-100 text-green-700'
                      : movement.tipo === 'Salida'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {movement.tipo === 'Entrada' ? (
                    <PackageOpen size={22} />
                  ) : movement.tipo === 'Salida' ? (
                    <Truck size={22} />
                  ) : (
                    <ShieldCheck size={22} />
                  )}
                </div>

                <div>
                  <h3 className="font-bold text-gray-900">
                    {movement.descripcion}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Documento: {movement.documento} · Responsable:{' '}
                    {movement.responsable}
                  </p>
                </div>
              </div>

              <div className="text-sm text-gray-600 md:text-right">
                <p className="font-semibold">{movement.fecha}</p>
                <p>{movement.hora}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Nota demo */}
      <div className="rounded-2xl border border-green-200 bg-green-50 p-5 text-sm text-green-800">
        <strong>Modo demostración:</strong> esta vista muestra información
        simulada para una presentación del prototipo. En una implementación
        real, estos datos vendrían de compras, ventas, kardex, lotes,
        documentos y movimientos de inventario.
      </div>
    </div>
  );
}