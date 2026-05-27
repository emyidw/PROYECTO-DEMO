import { useMemo, useState } from 'react';
import {
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  CreditCard,
  Download,
  Edit,
  Eye,
  Filter,
  MapPin,
  Package,
  PackageCheck,
  Phone,
  Plus,
  ReceiptText,
  Search,
  ShoppingCart,
  Truck,
  UserRound,
  Wallet,
  XCircle,
} from 'lucide-react';

const orders = [
  {
    id: 'PED-1779868992431',
    customer: 'Ericka Martínez',
    document: 'DNI 76543218',
    phone: '952 458 741',
    email: 'ericka.martinez@gmail.com',
    date: '27/05/2026',
    time: '10:35 AM',
    district: 'Tacna',
    address: 'Av. Industrial 1450, Tacna',
    reference: 'Frente al mercado mayorista',
    paymentMethod: 'Yape',
    paymentStatus: 'Pagado',
    status: 'Pedido recepcionado',
    priority: 'Alta',
    subtotal: 1350.0,
    igv: 243.0,
    freight: 79.5,
    total: 1672.5,
    warehouseResponsible: 'Juan Quispe',
    deliveryResponsible: 'Miguel Salas',
    products: [
      {
        name: 'Fosfato Diamónico 25 Kg',
        sku: 'DAP-025',
        quantity: 6,
        unitPrice: 96.0,
        total: 576.0,
        location: 'Pasillo A - Rack 01',
        status: 'Validado',
      },
      {
        name: 'Cinta de Riego 16 mm x 1000 m',
        sku: 'RIEGO-016',
        quantity: 2,
        unitPrice: 420.0,
        total: 840.0,
        location: 'Zona de Riego - Estante 01',
        status: 'Pendiente',
      },
      {
        name: 'Basfoliar Calcio 1 Lt',
        sku: 'BASF-001',
        quantity: 4,
        unitPrice: 59.0,
        total: 236.0,
        location: 'Zona Agroquímicos - Rack 02',
        status: 'Validado',
      },
    ],
    timeline: [
      {
        title: 'Pedido recepcionado',
        description: 'El pedido fue generado desde la tienda virtual.',
        date: '27/05/2026',
        time: '10:35 AM',
        done: true,
      },
      {
        title: 'En almacén',
        description: 'El pedido será asignado para preparación y validación.',
        date: 'Pendiente',
        time: '--',
        done: false,
      },
      {
        title: 'En entrega',
        description: 'El pedido será asignado a reparto local.',
        date: 'Pendiente',
        time: '--',
        done: false,
      },
      {
        title: 'Entregado',
        description: 'Confirmación final de entrega al cliente.',
        date: 'Pendiente',
        time: '--',
        done: false,
      },
    ],
  },
  {
    id: 'PED-1779868993012',
    customer: 'Agrícola Los Pinos',
    document: 'RUC 20611244578',
    phone: '945 884 210',
    email: 'compras@lospinos.pe',
    date: '27/05/2026',
    time: '09:20 AM',
    district: 'Calana',
    address: 'Carretera Calana Km 5.8',
    reference: 'Ingreso por portón azul',
    paymentMethod: 'Transferencia',
    paymentStatus: 'Pendiente',
    status: 'En almacén',
    priority: 'Media',
    subtotal: 2491.53,
    igv: 448.47,
    freight: 120.0,
    total: 3060.0,
    warehouseResponsible: 'Pedro Mamani',
    deliveryResponsible: 'Sin asignar',
    products: [
      {
        name: 'Sulfato de Amonio 50 Kg',
        sku: 'SULFATO-001',
        quantity: 20,
        unitPrice: 138.0,
        total: 2760.0,
        location: 'Pasillo A - Rack 04',
        status: 'Validado',
      },
      {
        name: 'Arriba 1 Lt',
        sku: 'ARR-001',
        quantity: 12,
        unitPrice: 72.5,
        total: 870.0,
        location: 'Zona Agroquímicos - Rack 03',
        status: 'Validado',
      },
    ],
    timeline: [
      {
        title: 'Pedido recepcionado',
        description: 'Pedido registrado por venta directa.',
        date: '27/05/2026',
        time: '09:20 AM',
        done: true,
      },
      {
        title: 'En almacén',
        description: 'Productos en proceso de picking.',
        date: '27/05/2026',
        time: '09:45 AM',
        done: true,
      },
      {
        title: 'En entrega',
        description: 'Pendiente de asignación de transporte.',
        date: 'Pendiente',
        time: '--',
        done: false,
      },
      {
        title: 'Entregado',
        description: 'Pendiente de confirmación.',
        date: 'Pendiente',
        time: '--',
        done: false,
      },
    ],
  },
  {
    id: 'PED-1779868994125',
    customer: 'Fundo Santa Rosa',
    document: 'RUC 20577896321',
    phone: '987 451 632',
    email: 'administracion@santarosa.pe',
    date: '26/05/2026',
    time: '04:10 PM',
    district: 'Pocollay',
    address: 'Sector agrícola Pocollay Mz. C Lt. 12',
    reference: 'Almacén junto a reservorio',
    paymentMethod: 'Pago contra entrega',
    paymentStatus: 'Pendiente',
    status: 'En entrega',
    priority: 'Alta',
    subtotal: 3716.1,
    igv: 668.9,
    freight: 180.0,
    total: 4565.0,
    warehouseResponsible: 'Ana Flores',
    deliveryResponsible: 'Miguel Salas',
    products: [
      {
        name: 'Fosfato Monoamónico Granulado 50 Kg',
        sku: 'MAP-050',
        quantity: 20,
        unitPrice: 185.5,
        total: 3710.0,
        location: 'Pasillo A - Rack 02',
        status: 'Validado',
      },
      {
        name: 'Avant Natur 1 Lt',
        sku: 'AVANT-001',
        quantity: 10,
        unitPrice: 86.0,
        total: 860.0,
        location: 'Zona Agroquímicos - Rack 01',
        status: 'Validado',
      },
    ],
    timeline: [
      {
        title: 'Pedido recepcionado',
        description: 'Pedido registrado correctamente.',
        date: '26/05/2026',
        time: '04:10 PM',
        done: true,
      },
      {
        title: 'En almacén',
        description: 'Productos preparados y validados.',
        date: '26/05/2026',
        time: '04:40 PM',
        done: true,
      },
      {
        title: 'En entrega',
        description: 'Pedido asignado a reparto local.',
        date: '27/05/2026',
        time: '08:15 AM',
        done: true,
      },
      {
        title: 'Entregado',
        description: 'Pendiente de confirmación del cliente.',
        date: 'Pendiente',
        time: '--',
        done: false,
      },
    ],
  },
  {
    id: 'PED-1779868995188',
    customer: 'Agrocomercial El Valle',
    document: 'RUC 20445127896',
    phone: '956 778 412',
    email: 'ventas@elvalle.pe',
    date: '25/05/2026',
    time: '02:30 PM',
    district: 'Ciudad Nueva',
    address: 'Av. Internacional 820',
    reference: 'Local con puerta verde',
    paymentMethod: 'Tarjeta',
    paymentStatus: 'Pagado',
    status: 'Entregado',
    priority: 'Baja',
    subtotal: 1843.22,
    igv: 331.78,
    freight: 85.0,
    total: 2260.0,
    warehouseResponsible: 'Luis Apaza',
    deliveryResponsible: 'Roberto Díaz',
    products: [
      {
        name: 'Basfoliar Calcio 1 Lt',
        sku: 'BASF-001',
        quantity: 18,
        unitPrice: 59.0,
        total: 1062.0,
        location: 'Zona Agroquímicos - Rack 02',
        status: 'Validado',
      },
      {
        name: 'Fosfato Diamónico 25 Kg',
        sku: 'DAP-025',
        quantity: 10,
        unitPrice: 96.0,
        total: 960.0,
        location: 'Pasillo A - Rack 01',
        status: 'Validado',
      },
    ],
    timeline: [
      {
        title: 'Pedido recepcionado',
        description: 'Pedido ingresado y confirmado.',
        date: '25/05/2026',
        time: '02:30 PM',
        done: true,
      },
      {
        title: 'En almacén',
        description: 'Pedido preparado para despacho.',
        date: '25/05/2026',
        time: '03:00 PM',
        done: true,
      },
      {
        title: 'En entrega',
        description: 'Pedido enviado al cliente.',
        date: '25/05/2026',
        time: '04:20 PM',
        done: true,
      },
      {
        title: 'Entregado',
        description: 'Entrega confirmada satisfactoriamente.',
        date: '25/05/2026',
        time: '05:35 PM',
        done: true,
      },
    ],
  },
];

const statusOptions = [
  'Todos',
  'Pedido recepcionado',
  'En almacén',
  'En entrega',
  'Entregado',
];

function formatCurrency(value) {
  return `S/ ${Number(value).toLocaleString('es-PE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function StatusBadge({ status }) {
  const styles = {
    'Pedido recepcionado': 'bg-amber-100 text-amber-700 border-amber-200',
    'En almacén': 'bg-blue-100 text-blue-700 border-blue-200',
    'En entrega': 'bg-purple-100 text-purple-700 border-purple-200',
    Entregado: 'bg-green-100 text-green-700 border-green-200',
    Cancelado: 'bg-red-100 text-red-700 border-red-200',
    Pagado: 'bg-green-100 text-green-700 border-green-200',
    Pendiente: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    Alta: 'bg-red-100 text-red-700 border-red-200',
    Media: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    Baja: 'bg-gray-100 text-gray-700 border-gray-200',
    Validado: 'bg-green-100 text-green-700 border-green-200',
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

export default function AdminOrders() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [selectedOrder, setSelectedOrder] = useState(orders[0]);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const text = `${order.id} ${order.customer} ${order.document} ${order.status} ${order.district}`
        .toLowerCase()
        .trim();

      const matchesSearch = text.includes(search.toLowerCase().trim());
      const matchesStatus =
        statusFilter === 'Todos' || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = orders.filter(
    (order) =>
      order.status === 'Pedido recepcionado' || order.status === 'En almacén'
  ).length;
  const deliveryOrders = orders.filter(
    (order) => order.status === 'En entrega'
  ).length;
  const deliveredOrders = orders.filter(
    (order) => order.status === 'Entregado'
  ).length;

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl bg-gradient-to-r from-green-900 via-green-800 to-lime-700 p-6 text-white shadow-lg md:flex-row md:items-center">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-white/15 p-3">
            <ShoppingCart size={30} />
          </div>

          <div>
            <h1 className="text-3xl font-bold">Ventas y Pedidos</h1>
            <p className="mt-1 text-sm text-white/80">
              Seguimiento visual de pedidos, preparación, despacho, pagos y
              estado de entrega.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-bold text-green-800 shadow transition hover:bg-green-50">
            <Plus size={18} />
            Nueva venta
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
          title="Ventas del Mes"
          value={formatCurrency(totalSales)}
          subtitle={`${orders.length} pedidos registrados`}
          color="border-green-600"
          icon={<ReceiptText className="text-green-700" size={28} />}
        />

        <SummaryCard
          title="Pedidos Pendientes"
          value={pendingOrders}
          subtitle="Recepcionados o en almacén"
          color="border-amber-500"
          icon={<Clock className="text-amber-600" size={28} />}
        />

        <SummaryCard
          title="En Entrega"
          value={deliveryOrders}
          subtitle="Pedidos en ruta"
          color="border-purple-500"
          icon={<Truck className="text-purple-600" size={28} />}
        />

        <SummaryCard
          title="Entregados"
          value={deliveredOrders}
          subtitle="Pedidos finalizados"
          color="border-blue-500"
          icon={<CheckCircle2 className="text-blue-600" size={28} />}
        />
      </div>

      {/* Filtros */}
      <section className="rounded-2xl bg-white p-5 shadow-md">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex items-center gap-2 rounded-xl border bg-gray-50 px-4 py-3 xl:w-96">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Buscar pedido, cliente, documento, distrito..."
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

            {statusOptions.map((status) => (
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
        {/* Listado de pedidos */}
        <section className="rounded-2xl bg-white p-6 shadow-md xl:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Pedidos Registrados
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Lista de pedidos con estado, cliente, pago y total de venta.
              </p>
            </div>

            <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-700">
              {filteredOrders.length} resultados
            </span>
          </div>

          <div className="overflow-hidden rounded-xl border">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-4">Pedido</th>
                  <th className="px-4 py-4">Cliente</th>
                  <th className="px-4 py-4">Fecha</th>
                  <th className="px-4 py-4">Total</th>
                  <th className="px-4 py-4">Estado</th>
                  <th className="px-4 py-4">Acciones</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    onClick={() => setSelectedOrder(order)}
                    className={`cursor-pointer transition hover:bg-green-50 ${
                      selectedOrder.id === order.id ? 'bg-green-50' : ''
                    }`}
                  >
                    <td className="px-4 py-4">
                      <p className="font-bold text-gray-900">{order.id}</p>
                      <p className="text-xs text-gray-500">
                        Prioridad: {order.priority}
                      </p>
                    </td>

                    <td className="px-4 py-4">
                      <p className="font-semibold text-gray-900">
                        {order.customer}
                      </p>
                      <p className="text-xs text-gray-500">{order.document}</p>
                    </td>

                    <td className="px-4 py-4 text-gray-600">
                      <p>{order.date}</p>
                      <p className="text-xs">{order.time}</p>
                    </td>

                    <td className="px-4 py-4">
                      <p className="font-bold text-green-700">
                        {formatCurrency(order.total)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {order.paymentMethod}
                      </p>
                    </td>

                    <td className="px-4 py-4">
                      <div className="space-y-2">
                        <StatusBadge status={order.status} />
                        <StatusBadge status={order.paymentStatus} />
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

        {/* Detalle del pedido */}
        <aside className="space-y-6">
          <section className="rounded-2xl bg-white p-6 shadow-md">
            <div className="mb-5 flex items-center gap-2">
              <ReceiptText className="text-green-700" size={22} />
              <h2 className="text-xl font-bold text-gray-900">
                Detalle del Pedido
              </h2>
            </div>

            <div className="rounded-2xl border bg-gray-50 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {selectedOrder.id}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {selectedOrder.date} · {selectedOrder.time}
                  </p>
                </div>

                <StatusBadge status={selectedOrder.status} />
              </div>

              <div className="mt-5 space-y-3">
                <div className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-sm">
                  <UserRound className="mt-1 text-green-700" size={18} />
                  <div>
                    <p className="text-xs font-bold uppercase text-gray-500">
                      Cliente
                    </p>
                    <p className="font-semibold text-gray-900">
                      {selectedOrder.customer}
                    </p>
                    <p className="text-sm text-gray-500">
                      {selectedOrder.document}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-sm">
                  <Phone className="mt-1 text-blue-700" size={18} />
                  <div>
                    <p className="text-xs font-bold uppercase text-gray-500">
                      Contacto
                    </p>
                    <p className="font-semibold text-gray-900">
                      {selectedOrder.phone}
                    </p>
                    <p className="text-sm text-gray-500">
                      {selectedOrder.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-sm">
                  <MapPin className="mt-1 text-amber-700" size={18} />
                  <div>
                    <p className="text-xs font-bold uppercase text-gray-500">
                      Dirección
                    </p>
                    <p className="font-semibold text-gray-900">
                      {selectedOrder.address}
                    </p>
                    <p className="text-sm text-gray-500">
                      {selectedOrder.reference}
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
                Resumen de Pago
              </h2>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between rounded-xl bg-gray-50 p-3">
                <span className="font-semibold text-gray-600">Subtotal</span>
                <span className="font-bold text-gray-900">
                  {formatCurrency(selectedOrder.subtotal)}
                </span>
              </div>

              <div className="flex justify-between rounded-xl bg-gray-50 p-3">
                <span className="font-semibold text-gray-600">IGV</span>
                <span className="font-bold text-gray-900">
                  {formatCurrency(selectedOrder.igv)}
                </span>
              </div>

              <div className="flex justify-between rounded-xl bg-blue-50 p-3">
                <span className="font-semibold text-blue-700">Flete</span>
                <span className="font-bold text-blue-800">
                  {formatCurrency(selectedOrder.freight)}
                </span>
              </div>

              <div className="flex justify-between rounded-xl bg-green-700 p-4 text-white">
                <span className="font-bold">Total</span>
                <span className="font-bold">
                  {formatCurrency(selectedOrder.total)}
                </span>
              </div>

              <div className="mt-4 flex items-start gap-3 rounded-xl border bg-gray-50 p-4">
                <CreditCard className="mt-1 text-green-700" size={18} />
                <div>
                  <p className="text-xs font-bold uppercase text-gray-500">
                    Método de pago
                  </p>
                  <p className="font-semibold text-gray-900">
                    {selectedOrder.paymentMethod}
                  </p>
                  <StatusBadge status={selectedOrder.paymentStatus} />
                </div>
              </div>
            </div>
          </section>
        </aside>
      </div>

      {/* Productos del pedido */}
      <section className="rounded-2xl bg-white p-6 shadow-md">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Package className="text-green-700" size={24} />
              <h2 className="text-2xl font-bold text-gray-900">
                Productos del Pedido Seleccionado
              </h2>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Picking list con ubicación, cantidad, precio y validación de
              almacén.
            </p>
          </div>

          <button className="rounded-xl bg-green-700 px-4 py-2 text-sm font-bold text-white transition hover:bg-green-800">
            Actualizar estado
          </button>
        </div>

        <div className="overflow-hidden rounded-xl border">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-4">Producto</th>
                <th className="px-4 py-4">SKU</th>
                <th className="px-4 py-4">Cantidad</th>
                <th className="px-4 py-4">Precio</th>
                <th className="px-4 py-4">Total</th>
                <th className="px-4 py-4">Ubicación</th>
                <th className="px-4 py-4">Validación</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {selectedOrder.products.map((product) => (
                <tr key={product.sku} className="hover:bg-gray-50">
                  <td className="px-4 py-4 font-semibold text-gray-900">
                    {product.name}
                  </td>
                  <td className="px-4 py-4 text-xs font-semibold text-gray-500">
                    {product.sku}
                  </td>
                  <td className="px-4 py-4">{product.quantity}</td>
                  <td className="px-4 py-4">
                    {formatCurrency(product.unitPrice)}
                  </td>
                  <td className="px-4 py-4 font-bold text-green-700">
                    {formatCurrency(product.total)}
                  </td>
                  <td className="px-4 py-4 text-gray-600">
                    {product.location}
                  </td>
                  <td className="px-4 py-4">
                    {product.status === 'Validado' ? (
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
      </section>

      {/* Seguimiento y responsables */}
      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-2xl bg-white p-6 shadow-md">
          <div className="mb-5 flex items-center gap-2">
            <Truck className="text-purple-700" size={22} />
            <h2 className="text-xl font-bold text-gray-900">
              Seguimiento del Pedido
            </h2>
          </div>

          <div className="space-y-5">
            {selectedOrder.timeline.map((item, index) => (
              <div key={item.title} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-full ${
                      item.done
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {item.done ? (
                      <CheckCircle2 size={22} />
                    ) : (
                      <Clock size={22} />
                    )}
                  </div>

                  {index < selectedOrder.timeline.length - 1 && (
                    <div
                      className={`mt-2 h-10 w-1 rounded-full ${
                        item.done ? 'bg-green-300' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>

                <div className="flex-1 rounded-2xl border bg-gray-50 p-4">
                  <div className="flex justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-gray-900">{item.title}</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.description}
                      </p>
                    </div>

                    {item.done ? (
                      <CheckCircle2 className="text-green-600" size={20} />
                    ) : (
                      <XCircle className="text-gray-300" size={20} />
                    )}
                  </div>

                  <p className="mt-3 text-xs font-semibold text-gray-400">
                    {item.date} · {item.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-md">
          <div className="mb-5 flex items-center gap-2">
            <PackageCheck className="text-green-700" size={22} />
            <h2 className="text-xl font-bold text-gray-900">
              Control Operativo
            </h2>
          </div>

          <div className="grid gap-4">
            <div className="rounded-2xl border bg-green-50 p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-green-100 p-3 text-green-700">
                  <PackageCheck size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-green-700">
                    Responsable de almacén
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    {selectedOrder.warehouseResponsible}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border bg-blue-50 p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-blue-100 p-3 text-blue-700">
                  <Truck size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-blue-700">
                    Responsable de entrega
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    {selectedOrder.deliveryResponsible}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border bg-amber-50 p-5">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-1 text-amber-700" size={24} />
                <div>
                  <p className="font-bold text-amber-800">
                    Acción simulada
                  </p>
                  <p className="mt-1 text-sm text-amber-700">
                    En una versión real, aquí se actualizaría el estado del
                    pedido, se validaría el pago, se generaría la salida de
                    almacén y se notificaría al cliente.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border bg-gray-50 p-5">
              <div className="flex items-center gap-2">
                <CalendarDays className="text-gray-700" size={20} />
                <h3 className="font-bold text-gray-900">
                  Resumen de operación
                </h3>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Pedido con prioridad <strong>{selectedOrder.priority}</strong>,
                entrega en <strong>{selectedOrder.district}</strong> y método de
                pago <strong>{selectedOrder.paymentMethod}</strong>.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Nota demo */}
      <div className="rounded-2xl border border-green-200 bg-green-50 p-5 text-sm text-green-800">
        <strong>Modo demostración:</strong> esta vista simula la gestión de
        ventas y pedidos. En una implementación real, el cambio de estado se
        conectaría con inventario, kardex, comprobantes, pagos y seguimiento del
        cliente.
      </div>
    </div>
  );
}