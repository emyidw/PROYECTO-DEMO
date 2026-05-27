import { Save, AlertCircle } from 'lucide-react';

export default function AdminSettings() {
  const handleSave = () => {
    alert('Funcionalidad simulada para presentación del prototipo.');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Configuración del Sistema</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Datos de Empresa */}
        <div className="card">
          <h3 className="font-bold text-lg mb-4">Datos de Empresa</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Nombre Comercial</label>
              <input
                type="text"
                defaultValue="AgroDistribuciones"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-agro-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Razón Social</label>
              <input
                type="text"
                defaultValue="AgroDistribuciones del Valle S.A.C."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-agro-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">RUC</label>
              <input
                type="text"
                defaultValue="20601234567"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-agro-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Dirección</label>
              <input
                type="text"
                defaultValue="Av. Agricultura 450, Tacna, Perú"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-agro-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Teléfono</label>
              <input
                type="text"
                defaultValue="987 654 321"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-agro-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Correo</label>
              <input
                type="email"
                defaultValue="info@agrodistribuciones.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-agro-primary"
              />
            </div>
          </div>
        </div>

        {/* Configuración General */}
        <div className="space-y-6">
          <div className="card">
            <h3 className="font-bold text-lg mb-4">Configuración Contable</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">IGV (%)</label>
                <input
                  type="number"
                  defaultValue="18"
                  step="0.01"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-agro-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Envío Base (S/)</label>
                <input
                  type="number"
                  defaultValue="50"
                  step="0.01"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-agro-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Moneda</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-agro-primary">
                  <option>S/ Soles Peruanos</option>
                  <option>USD Dólares</option>
                  <option>EUR Euros</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Método Inventario</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-agro-primary">
                  <option>Promedio Ponderado</option>
                  <option>FIFO</option>
                  <option>LIFO</option>
                </select>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="font-bold text-lg mb-4">Logo Empresa</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <p className="text-gray-600 mb-2">Arrastra logo aquí o haz clic</p>
              <button className="text-agro-primary hover:text-blue-600 font-semibold text-sm">
                Seleccionar archivo
              </button>
              <p className="text-gray-500 text-xs mt-2">PNG, JPG (máx 5MB)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Configuración Tienda Virtual */}
      <div className="card">
        <h3 className="font-bold text-lg mb-4">Configuración Tienda Virtual</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Tienda Activa</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
              <option>Sí</option>
              <option>No</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Pedidos Online</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
              <option>Habilitado</option>
              <option>Deshabilitado</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Stock Mínimo Alerta</label>
            <input
              type="number"
              defaultValue="10"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Días Vencimiento Alerta</label>
            <input
              type="number"
              defaultValue="30"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Notificación */}
      <div className="bg-blue-50 border-l-4 border-agro-primary p-4 rounded-lg flex gap-3">
        <AlertCircle className="text-agro-primary flex-shrink-0" size={20} />
        <div>
          <p className="font-semibold text-blue-900">Nota importante</p>
          <p className="text-sm text-blue-800">Los cambios en la configuración son simulados para presentación del prototipo.</p>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg font-semibold">
          Cancelar
        </button>
        <button
          onClick={handleSave}
          className="bg-agro-primary hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2"
        >
          <Save size={20} /> Guardar Cambios
        </button>
      </div>
    </div>
  );
}
