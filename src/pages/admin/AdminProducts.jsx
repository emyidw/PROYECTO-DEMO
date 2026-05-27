import { useMemo, useState } from 'react';
import {
  AlertTriangle,
  Archive,
  BadgeCheck,
  Boxes,
  CalendarDays,
  CheckCircle2,
  Edit,
  Eye,
  FileText,
  Filter,
  Image as ImageIcon,
  Package,
  PackageCheck,
  Plus,
  Search,
  ShieldCheck,
  Tag,
  Trash2,
  Upload,
} from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'Fosfato Monoamónico Granulado 50 Kg',
    sku: 'MAP-050',
    category: 'Fertilizantes',
    subcategory: 'Granulados',
    brand: 'AGRANET',
    provider: 'Agroinsumos del Sur S.A.C.',
    price: 185.5,
    cost: 142.8,
    stock: 12,
    minStock: 15,
    unit: 'Saco',
    lot: 'LT-MAP-0526',
    expiration: '15/05/2028',
    sanitary: 'RS-AGRO-45871',
    status: 'Stock bajo',
    image: '/images/producto1.png',
  },
  {
    id: 2,
    name: 'Fosfato Diamónico 25 Kg',
    sku: 'DAP-025',
    category: 'Fertilizantes',
    subcategory: 'Granulados',
    brand: 'NutriCampo',
    provider: 'Fertilizantes Andinos S.A.C.',
    price: 96.0,
    cost: 71.4,
    stock: 34,
    minStock: 10,
    unit: 'Saco',
    lot: 'LT-DAP-0526',
    expiration: '22/04/2028',
    sanitary: 'RS-AGRO-55821',
    status: 'Activo',
    image: '/images/producto2.png',
  },
  {
    id: 3,
    name: 'Sulfato de Amonio 50 Kg',
    sku: 'SULFATO-001',
    category: 'Fertilizantes',
    subcategory: 'Granulados',
    brand: 'CampoFértil',
    provider: 'Agroinsumos del Sur S.A.C.',
    price: 138.0,
    cost: 102.3,
    stock: 8,
    minStock: 10,
    unit: 'Saco',
    lot: 'LT-SUL-0526',
    expiration: '21/04/2028',
    sanitary: 'RS-AGRO-11874',
    status: 'Crítico',
    image: '/images/producto3.png',
  },
  {
    id: 4,
    name: 'Arriba 1 Lt',
    sku: 'ARR-001',
    category: 'Agroquímicos',
    subcategory: 'Insecticidas',
    brand: 'AgroChem',
    provider: 'Química Agrícola Tacna S.A.C.',
    price: 72.5,
    cost: 49.9,
    stock: 42,
    minStock: 12,
    unit: 'Botella',
    lot: 'LT-ARR-0526',
    expiration: '10/03/2028',
    sanitary: 'RS-SENASA-77821',
    status: 'Activo',
    image: '/images/producto4.png',
  },
  {
    id: 5,
    name: 'Avant Natur 1 Lt',
    sku: 'AVANT-001',
    category: 'Agroquímicos',
    subcategory: 'Bioestimulantes',
    brand: 'Avant',
    provider: 'Química Agrícola Tacna S.A.C.',
    price: 86.0,
    cost: 61.2,
    stock: 26,
    minStock: 8,
    unit: 'Botella',
    lot: 'LT-AVA-0526',
    expiration: '10/03/2028',
    sanitary: 'RS-SENASA-88345',
    status: 'Activo',
    image: '/images/producto5.png',
  },
  {
    id: 6,
    name: 'Basfoliar Calcio 1 Lt',
    sku: 'BASF-001',
    category: 'Fertilizantes',
    subcategory: 'Foliares',
    brand: 'Basfoliar',
    provider: 'Nutrición Vegetal Perú S.A.C.',
    price: 59.0,
    cost: 38.5,
    stock: 18,
    minStock: 10,
    unit: 'Botella',
    lot: 'LT-BAS-0526',
    expiration: '18/02/2028',
    sanitary: 'RS-AGRO-77854',
    status: 'Activo',
    image: '/images/producto6.png',
  },
  {
    id: 7,
    name: 'Cinta de Riego 16 mm x 1000 m',
    sku: 'RIEGO-016',
    category: 'Cinta de riego',
    subcategory: 'Riego por goteo',
    brand: 'AquaDrop',
    provider: 'Riegos Andinos E.I.R.L.',
    price: 420.0,
    cost: 318.5,
    stock: 5,
    minStock: 8,
    unit: 'Rollo',
    lot: 'LT-RIE-0526',
    expiration: 'No aplica',
    sanitary: 'No aplica',
    status: 'Crítico',
    image: '/images/producto7.png',
  },
];

const categories = ['Todos', 'Fertilizantes', 'Agroquímicos', 'Cinta de riego'];

function formatCurrency(value) {
  return `S/ ${value.toFixed(2)}`;
}

function StatusBadge({ status }) {
  const styles = {
    Activo: 'bg-green-100 text-green-700 border-green-200',
    'Stock bajo': 'bg-yellow-100 text-yellow-700 border-yellow-200',
    Crítico: 'bg-red-100 text-red-700 border-red-200',
    Inactivo: 'bg-gray-100 text-gray-700 border-gray-200',
  };

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${
        styles[status] || styles.Activo
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

export default function AdminProducts() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedProduct, setSelectedProduct] = useState(products[0]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = `${product.name} ${product.sku} ${product.brand} ${product.provider}`
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === 'Todos' || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  const activeProducts = products.filter((product) => product.status === 'Activo').length;
  const criticalProducts = products.filter((product) => product.status === 'Crítico').length;
  const lowStockProducts = products.filter(
    (product) => product.status === 'Stock bajo' || product.status === 'Crítico'
  ).length;

  const totalInventoryValue = products.reduce(
    (total, product) => total + product.cost * product.stock,
    0
  );

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl bg-gradient-to-r from-green-900 via-green-800 to-lime-700 p-6 text-white shadow-lg md:flex-row md:items-center">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-white/15 p-3">
            <Package size={30} />
          </div>

          <div>
            <h1 className="text-3xl font-bold">Gestión de Productos</h1>
            <p className="mt-1 text-sm text-white/80">
              Administración visual de productos agrícolas, stock, precios,
              lotes y vencimientos.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-bold text-green-800 shadow transition hover:bg-green-50">
            <Plus size={18} />
            Nuevo producto
          </button>

          <button className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-bold text-white ring-1 ring-white/20 transition hover:bg-white/20">
            <Upload size={18} />
            Importar Excel
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Productos Registrados"
          value={products.length}
          subtitle="Catálogo administrativo"
          color="border-green-600"
          icon={<Boxes className="text-green-700" size={28} />}
        />

        <SummaryCard
          title="Productos Activos"
          value={activeProducts}
          subtitle="Disponibles para venta"
          color="border-blue-500"
          icon={<BadgeCheck className="text-blue-600" size={28} />}
        />

        <SummaryCard
          title="Stock por Revisar"
          value={lowStockProducts}
          subtitle={`${criticalProducts} productos críticos`}
          color="border-amber-500"
          icon={<AlertTriangle className="text-amber-600" size={28} />}
        />

        <SummaryCard
          title="Valor Inventario"
          value={formatCurrency(totalInventoryValue)}
          subtitle="Costo valorizado estimado"
          color="border-purple-500"
          icon={<Archive className="text-purple-600" size={28} />}
        />
      </div>

      {/* Filtros */}
      <section className="rounded-2xl bg-white p-5 shadow-md">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-2 rounded-xl border bg-gray-50 px-4 py-3 lg:w-96">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Buscar producto, SKU, marca o proveedor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
              <Filter size={18} />
              Categoría:
            </div>

            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                  selectedCategory === category
                    ? 'bg-green-700 text-white shadow'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-3">
        {/* Tabla/listado */}
        <section className="xl:col-span-2 rounded-2xl bg-white p-6 shadow-md">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Catálogo de Productos
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Vista administrativa con precios, stock, lote y estado.
              </p>
            </div>

            <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-700">
              {filteredProducts.length} encontrados
            </span>
          </div>

          <div className="overflow-hidden rounded-xl border">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-4">Producto</th>
                  <th className="px-4 py-4">Categoría</th>
                  <th className="px-4 py-4">Precio</th>
                  <th className="px-4 py-4">Stock</th>
                  <th className="px-4 py-4">Estado</th>
                  <th className="px-4 py-4">Acciones</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className={`cursor-pointer transition hover:bg-green-50 ${
                      selectedProduct.id === product.id ? 'bg-green-50' : ''
                    }`}
                    onClick={() => setSelectedProduct(product)}
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl border bg-gray-50">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-12 w-12 object-contain"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        </div>

                        <div>
                          <p className="font-bold text-gray-900">
                            {product.name}
                          </p>
                          <p className="mt-1 text-xs font-semibold text-gray-500">
                            SKU: {product.sku}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <p className="font-semibold text-gray-800">
                        {product.category}
                      </p>
                      <p className="text-xs text-gray-500">
                        {product.subcategory}
                      </p>
                    </td>

                    <td className="px-4 py-4">
                      <p className="font-bold text-green-700">
                        {formatCurrency(product.price)}
                      </p>
                      <p className="text-xs text-gray-500">
                        Costo: {formatCurrency(product.cost)}
                      </p>
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          product.stock <= product.minStock
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {product.stock} {product.unit}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <StatusBadge status={product.status} />
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <button className="rounded-lg bg-blue-50 p-2 text-blue-700 hover:bg-blue-100">
                          <Eye size={16} />
                        </button>
                        <button className="rounded-lg bg-amber-50 p-2 text-amber-700 hover:bg-amber-100">
                          <Edit size={16} />
                        </button>
                        <button className="rounded-lg bg-red-50 p-2 text-red-700 hover:bg-red-100">
                          <Trash2 size={16} />
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
              <ImageIcon className="text-green-700" size={22} />
              <h2 className="text-xl font-bold text-gray-900">
                Detalle del Producto
              </h2>
            </div>

            <div className="flex justify-center rounded-2xl border bg-gray-50 p-5">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="h-40 object-contain"
              />
            </div>

            <div className="mt-5">
              <h3 className="text-xl font-bold text-gray-900">
                {selectedProduct.name}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {selectedProduct.brand} · {selectedProduct.sku}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <p className="text-2xl font-bold text-green-700">
                  {formatCurrency(selectedProduct.price)}
                </p>
                <StatusBadge status={selectedProduct.status} />
              </div>
            </div>

            <div className="mt-5 grid gap-3">
              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs font-bold uppercase text-gray-500">
                  Proveedor
                </p>
                <p className="mt-1 font-semibold text-gray-900">
                  {selectedProduct.provider}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-green-50 p-4">
                  <p className="text-xs font-bold uppercase text-green-700">
                    Stock
                  </p>
                  <p className="mt-1 font-bold text-green-900">
                    {selectedProduct.stock} {selectedProduct.unit}
                  </p>
                </div>

                <div className="rounded-xl bg-amber-50 p-4">
                  <p className="text-xs font-bold uppercase text-amber-700">
                    Mínimo
                  </p>
                  <p className="mt-1 font-bold text-amber-900">
                    {selectedProduct.minStock}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-md">
            <div className="mb-4 flex items-center gap-2">
              <ShieldCheck className="text-blue-700" size={22} />
              <h2 className="text-xl font-bold text-gray-900">
                Control Técnico
              </h2>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3 rounded-xl border bg-gray-50 p-4">
                <Tag className="mt-1 text-green-700" size={18} />
                <div>
                  <p className="text-sm font-bold text-gray-900">
                    Lote registrado
                  </p>
                  <p className="text-sm text-gray-600">{selectedProduct.lot}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border bg-gray-50 p-4">
                <CalendarDays className="mt-1 text-amber-700" size={18} />
                <div>
                  <p className="text-sm font-bold text-gray-900">
                    Fecha de vencimiento
                  </p>
                  <p className="text-sm text-gray-600">
                    {selectedProduct.expiration}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border bg-gray-50 p-4">
                <FileText className="mt-1 text-blue-700" size={18} />
                <div>
                  <p className="text-sm font-bold text-gray-900">
                    Registro sanitario
                  </p>
                  <p className="text-sm text-gray-600">
                    {selectedProduct.sanitary}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </aside>
      </div>

      {/* Formulario simulado */}
      <section className="rounded-2xl bg-white p-6 shadow-md">
        <div className="mb-5 flex items-center gap-2">
          <PackageCheck className="text-green-700" size={24} />
          <h2 className="text-2xl font-bold text-gray-900">
            Formulario Simulado de Registro
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <label className="text-sm font-bold text-gray-700">
              Nombre del producto
            </label>
            <input
              className="mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none focus:border-green-600"
              placeholder="Ej. Fertilizante foliar 1 Lt"
            />
          </div>

          <div>
            <label className="text-sm font-bold text-gray-700">SKU</label>
            <input
              className="mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none focus:border-green-600"
              placeholder="SKU-001"
            />
          </div>

          <div>
            <label className="text-sm font-bold text-gray-700">Categoría</label>
            <select className="mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none focus:border-green-600">
              <option>Fertilizantes</option>
              <option>Agroquímicos</option>
              <option>Cinta de riego</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-bold text-gray-700">Precio</label>
            <input
              className="mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none focus:border-green-600"
              placeholder="S/ 0.00"
            />
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          <strong>Modo demostración:</strong> este formulario es visual. En una
          implementación real permitiría registrar productos, subir imágenes,
          controlar lotes, vencimientos, stock mínimo y fichas técnicas.
        </div>
      </section>
    </div>
  );
}