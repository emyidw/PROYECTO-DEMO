import { formatCurrency } from '../../utils/formatCurrency';
import { Download } from 'lucide-react';

const reports = [
  {
    name: 'Reporte de Ventas',
    description: 'Análisis de ventas mensuales y diarias',
    icon: '📊',
    data: { totalSales: 32500, orders: 15, avgValue: 2166.67 }
  },
  {
    name: 'Reporte de Compras',
    description: 'Análisis de compras a proveedores',
    icon: '📦',
    data: { totalPurchases: 18750, suppliers: 4, avgValue: 4687.50 }
  },
  {
    name: 'Reporte de Stock',
    description: 'Estado de inventario actual',
    icon: '📈',
    data: { totalProducts: 20, lowStock: 2, outOfStock: 0 }
  },
  {
    name: 'Reporte de Gastos',
    description: 'Desglose de gastos operacionales',
    icon: '💰',
    data: { totalExpenses: 4700, categories: 5, avgValue: 940 }
  },
  {
    name: 'Productos Más Vendidos',
    description: 'Top 5 productos con mayor venta',
    icon: '⭐',
    data: { topProduct: 'Arriba 1 Lt', units: 52, value: 6500 }
  },
  {
    name: 'Utilidad del Período',
    description: 'Análisis de ganancias y pérdidas',
    icon: '💹',
    data: { revenue: 32500, costs: 23450, profit: 9050, margin: '27.8%' }
  },
];

export default function AdminReports() {
  const handleExport = (reportName) => {
    alert(`Descarga simulada para presentación del prototipo.\n\nReporte: ${reportName}`);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Reportes</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {reports.map((report, idx) => (
          <div key={idx} className="card hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="text-4xl">{report.icon}</div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">{report.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{report.description}</p>
                
                <div className="bg-gray-50 p-3 rounded mb-4">
                  {typeof report.data.totalSales !== 'undefined' && (
                    <>
                      <p className="text-sm"><strong>Ventas Totales:</strong> {formatCurrency(report.data.totalSales)}</p>
                      <p className="text-sm"><strong>Órdenes:</strong> {report.data.orders}</p>
                    </>
                  )}
                  {typeof report.data.totalPurchases !== 'undefined' && (
                    <>
                      <p className="text-sm"><strong>Compras Totales:</strong> {formatCurrency(report.data.totalPurchases)}</p>
                      <p className="text-sm"><strong>Proveedores:</strong> {report.data.suppliers}</p>
                    </>
                  )}
                  {typeof report.data.totalProducts !== 'undefined' && (
                    <>
                      <p className="text-sm"><strong>Productos:</strong> {report.data.totalProducts}</p>
                      <p className="text-sm"><strong>Stock Bajo:</strong> {report.data.lowStock}</p>
                    </>
                  )}
                  {typeof report.data.totalExpenses !== 'undefined' && (
                    <>
                      <p className="text-sm"><strong>Gastos:</strong> {formatCurrency(report.data.totalExpenses)}</p>
                      <p className="text-sm"><strong>Categorías:</strong> {report.data.categories}</p>
                    </>
                  )}
                  {typeof report.data.topProduct !== 'undefined' && (
                    <>
                      <p className="text-sm"><strong>Producto:</strong> {report.data.topProduct}</p>
                      <p className="text-sm"><strong>Valor:</strong> {formatCurrency(report.data.value)}</p>
                    </>
                  )}
                  {typeof report.data.revenue !== 'undefined' && (
                    <>
                      <p className="text-sm"><strong>Ingresos:</strong> {formatCurrency(report.data.revenue)}</p>
                      <p className="text-sm"><strong>Costos:</strong> {formatCurrency(report.data.costs)}</p>
                      <p className="text-sm"><strong>Ganancia:</strong> <span className="text-green-600 font-bold">{formatCurrency(report.data.profit)}</span></p>
                    </>
                  )}
                </div>

                <button
                  onClick={() => handleExport(report.name)}
                  className="w-full py-2 bg-agro-primary text-white rounded hover:bg-blue-600 transition flex items-center justify-center gap-2 text-sm"
                >
                  <Download size={16} /> Descargar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
