import { useMemo, useState } from 'react';
import {
  Search,
  Users,
  UserCheck,
  ShoppingBag,
  MapPin,
  Phone,
  Mail,
  Eye,
  TrendingUp,
  CalendarDays,
  BadgeCheck,
  CreditCard,
} from 'lucide-react';

const customers = [
  {
    id: 1,
    name: 'Ericka Martínez',
    document: '74258963',
    type: 'Persona Natural',
    phone: '987 456 321',
    email: 'ericka.martinez@gmail.com',
    address: 'Av. Bolognesi 123, Tacna',
    district: 'Tacna',
    lastPurchase: '27/05/2026',
    totalPurchases: 'S/ 1,672.50',
    orders: 3,
    status: 'Activo',
    segment: 'Cliente frecuente',
  },
  {
    id: 2,
    name: 'Agrícola Los Pinos S.A.C.',
    document: '20608574125',
    type: 'Empresa',
    phone: '952 114 785',
    email: 'compras@lospinos.pe',
    address: 'Carretera Calana Km 7',
    district: 'Calana',
    lastPurchase: '25/05/2026',
    totalPurchases: 'S/ 12,840.00',
    orders: 8,
    status: 'Activo',
    segment: 'Mayorista',
  },
  {
    id: 3,
    name: 'Fundo Santa Rosa',
    document: '20587412563',
    type: 'Empresa',
    phone: '965 778 410',
    email: 'administracion@santarosa.pe',
    address: 'Sector agrícola Pocollay',
    district: 'Pocollay',
    lastPurchase: '22/05/2026',
    totalPurchases: 'S/ 8,450.00',
    orders: 5,
    status: 'Activo',
    segment: 'Agricultor',
  },
  {
    id: 4,
    name: 'Carlos Mamani Quispe',
    document: '45879632',
    type: 'Persona Natural',
    phone: '933 201 845',
    email: 'carlos.mamani@gmail.com',
    address: 'Asoc. Villa Agrícola Mz. C Lt. 8',
    district: 'Gregorio Albarracín',
    lastPurchase: '18/05/2026',
    totalPurchases: 'S/ 920.00',
    orders: 2,
    status: 'Observado',
    segment: 'Nuevo cliente',
  },
  {
    id: 5,
    name: 'Agroexportadora Valle Sur',
    document: '20601478596',
    type: 'Empresa',
    phone: '954 120 987',
    email: 'logistica@vallesur.pe',
    address: 'Zona industrial Tacna',
    district: 'Tacna',
    lastPurchase: '15/05/2026',
    totalPurchases: 'S/ 21,300.00',
    orders: 12,
    status: 'Activo',
    segment: 'Corporativo',
  },
];

const purchaseHistory = [
  {
    code: 'PED-1779868992431',
    date: '27/05/2026',
    products: 'Fosfato Diamónico, Cinta de Riego, Basfoliar Calcio',
    amount: 'S/ 1,672.50',
    status: 'Entregado',
  },
  {
    code: 'PED-1779868991980',
    date: '20/05/2026',
    products: 'Sulfato de Amonio 50 Kg',
    amount: 'S/ 860.00',
    status: 'Entregado',
  },
  {
    code: 'PED-1779868991055',
    date: '12/05/2026',
    products: 'Avant Natur 1 Lt',
    amount: 'S/ 420.00',
    status: 'Entregado',
  },
];

function StatusBadge({ status }) {
  const styles = {
    Activo: 'bg-green-100 text-green-700 border-green-200',
    Observado: 'bg-amber-100 text-amber-700 border-amber-200',
    Inactivo: 'bg-gray-100 text-gray-700 border-gray-200',
    Entregado: 'bg-green-100 text-green-700 border-green-200',
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

export default function AdminCustomers() {
  const [search, setSearch] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(customers[0]);

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const text = `${customer.name} ${customer.document} ${customer.email} ${customer.district} ${customer.segment}`.toLowerCase();
      return text.includes(search.toLowerCase());
    });
  }, [search]);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-green-900 via-green-800 to-lime-700 p-6 text-white shadow-lg">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-white/15 p-3">
              <Users size={30} />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Gestión de Clientes</h1>
              <p className="mt-1 text-sm text-white/80">
                Consulta comercial, historial de compras, segmentación y datos de contacto.
              </p>
            </div>
          </div>

          <button className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-green-800 shadow transition hover:bg-green-50">
            Nuevo cliente
          </button>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Clientes registrados"
          value={customers.length}
          subtitle="Base comercial activa"
          color="border-green-600"
          icon={<UserCheck className="text-green-700" size={28} />}
        />
        <SummaryCard
          title="Clientes empresa"
          value="3"
          subtitle="Compradores con RUC"
          color="border-blue-600"
          icon={<BadgeCheck className="text-blue-700" size={28} />}
        />
        <SummaryCard
          title="Compras acumuladas"
          value="S/ 45,182"
          subtitle="Monto simulado total"
          color="border-amber-500"
          icon={<ShoppingBag className="text-amber-600" size={28} />}
        />
        <SummaryCard
          title="Pedidos generados"
          value="30"
          subtitle="Historial de atención"
          color="border-purple-500"
          icon={<TrendingUp className="text-purple-700" size={28} />}
        />
      </div>

      <section className="rounded-2xl bg-white p-6 shadow-md">
        <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Directorio de clientes</h2>
            <p className="mt-1 text-sm text-gray-500">
              Datos precargados para la demostración del sistema.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl border bg-gray-50 px-3 py-2">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Buscar cliente, DNI/RUC, distrito..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-72 bg-transparent text-sm outline-none"
            />
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          <div className="overflow-hidden rounded-xl border xl:col-span-2">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-5 py-4">Cliente</th>
                  <th className="px-5 py-4">Documento</th>
                  <th className="px-5 py-4">Distrito</th>
                  <th className="px-5 py-4">Compras</th>
                  <th className="px-5 py-4">Estado</th>
                  <th className="px-5 py-4">Acción</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="px-5 py-4">
                      <p className="font-bold text-gray-900">{customer.name}</p>
                      <p className="text-xs text-gray-500">{customer.segment}</p>
                    </td>
                    <td className="px-5 py-4 text-gray-600">{customer.document}</td>
                    <td className="px-5 py-4 text-gray-600">{customer.district}</td>
                    <td className="px-5 py-4 font-bold text-green-700">
                      {customer.totalPurchases}
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={customer.status} />
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => setSelectedCustomer(customer)}
                        className="inline-flex items-center gap-1 font-bold text-blue-700 hover:text-blue-900"
                      >
                        <Eye size={16} />
                        Ver
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <aside className="rounded-2xl border bg-gray-50 p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Ficha del cliente</h3>
              <StatusBadge status={selectedCustomer.status} />
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <h4 className="text-lg font-bold text-gray-900">{selectedCustomer.name}</h4>
              <p className="mt-1 text-sm text-gray-500">{selectedCustomer.type}</p>

              <div className="mt-5 space-y-3 text-sm">
                <p className="flex items-center gap-2 text-gray-700">
                  <CreditCard size={17} className="text-green-700" />
                  {selectedCustomer.document}
                </p>
                <p className="flex items-center gap-2 text-gray-700">
                  <Phone size={17} className="text-green-700" />
                  {selectedCustomer.phone}
                </p>
                <p className="flex items-center gap-2 text-gray-700">
                  <Mail size={17} className="text-green-700" />
                  {selectedCustomer.email}
                </p>
                <p className="flex items-start gap-2 text-gray-700">
                  <MapPin size={17} className="mt-0.5 text-green-700" />
                  {selectedCustomer.address}
                </p>
                <p className="flex items-center gap-2 text-gray-700">
                  <CalendarDays size={17} className="text-green-700" />
                  Última compra: {selectedCustomer.lastPurchase}
                </p>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-green-50 p-3">
                  <p className="text-xs font-semibold text-green-700">Total comprado</p>
                  <p className="font-bold text-green-900">{selectedCustomer.totalPurchases}</p>
                </div>
                <div className="rounded-xl bg-blue-50 p-3">
                  <p className="text-xs font-semibold text-blue-700">Pedidos</p>
                  <p className="font-bold text-blue-900">{selectedCustomer.orders}</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="rounded-2xl bg-white p-6 shadow-md">
        <h2 className="text-xl font-bold text-gray-900">Historial de compras reciente</h2>

        <div className="mt-5 overflow-hidden rounded-xl border">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-5 py-4">Pedido</th>
                <th className="px-5 py-4">Fecha</th>
                <th className="px-5 py-4">Productos</th>
                <th className="px-5 py-4">Importe</th>
                <th className="px-5 py-4">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {purchaseHistory.map((item) => (
                <tr key={item.code} className="hover:bg-gray-50">
                  <td className="px-5 py-4 font-bold text-gray-900">{item.code}</td>
                  <td className="px-5 py-4 text-gray-600">{item.date}</td>
                  <td className="px-5 py-4 text-gray-600">{item.products}</td>
                  <td className="px-5 py-4 font-bold text-green-700">{item.amount}</td>
                  <td className="px-5 py-4">
                    <StatusBadge status={item.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}