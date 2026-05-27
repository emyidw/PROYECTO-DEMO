import { useNavigate } from 'react-router-dom';
import { Leaf, LogIn, ShoppingCart } from 'lucide-react';

export default function EntryPoint() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-agro-green via-agro-light to-green-600 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="mb-8">
          <Leaf size={80} className="text-white mx-auto" />
          <h1 className="text-5xl font-bold text-white mt-4">AgroDistribuciones del Valle</h1>
          <p className="text-white text-lg mt-2 opacity-90">ERP Agrícola y Tienda Virtual</p>
        </div>

        <p className="text-white text-xl mb-12 max-w-md">
          Sistema completo para la venta y gestión de productos agrícolas
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-2xl">
          {/* Tienda Virtual */}
          <button
            onClick={() => navigate('/store/landing')}
            className="group bg-white hover:bg-agro-pale shadow-xl hover:shadow-2xl transition-all p-8 rounded-2xl transform hover:scale-105"
          >
            <ShoppingCart size={48} className="text-agro-green mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-agro-green mb-2">Tienda Virtual</h2>
            <p className="text-gray-600">Accede como cliente para comprar productos agrícolas</p>
            <div className="mt-4 inline-block bg-agro-green text-white px-6 py-2 rounded-lg">
              Ingresar a Tienda
            </div>
          </button>

          {/* Panel Administrativo */}
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="group bg-white hover:bg-agro-pale shadow-xl hover:shadow-2xl transition-all p-8 rounded-2xl transform hover:scale-105"
          >
            <LogIn size={48} className="text-agro-green mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-agro-green mb-2">Panel Administrativo</h2>
            <p className="text-gray-600">Accede como administrador para gestionar la empresa</p>
            <div className="mt-4 inline-block bg-agro-green text-white px-6 py-2 rounded-lg">
              Ingresar a Admin
            </div>
          </button>
        </div>

        <p className="text-white mt-12 text-sm opacity-75">
          AgroDistribuciones del Valle S.A.C. | RUC: 20601234567
        </p>
      </div>
    </div>
  );
}
