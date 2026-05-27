import { useState } from 'react';
import { UserPlus, Edit2, Trash2 } from 'lucide-react';

const mockUsers = [
  { id: 1, name: 'Admin Master', email: 'admin@agro.com', role: 'Administrador General', status: 'Activo', lastAccess: '27/05/2024 14:32' },
  { id: 2, name: 'Juan Pérez', email: 'ventas@agro.com', role: 'Ventas', status: 'Activo', lastAccess: '27/05/2024 10:15' },
  { id: 3, name: 'Carlos López', email: 'compras@agro.com', role: 'Compras', status: 'Activo', lastAccess: '26/05/2024 16:45' },
  { id: 4, name: 'María García', email: 'almacen@agro.com', role: 'Almacén', status: 'Activo', lastAccess: '27/05/2024 09:20' },
  { id: 5, name: 'Roberto Flores', email: 'contabilidad@agro.com', role: 'Contabilidad', status: 'Inactivo', lastAccess: '25/05/2024 18:00' },
];

const roles = ['Administrador General', 'Ventas', 'Compras', 'Almacén', 'Contabilidad', 'Reportes'];

export default function AdminUsers() {
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleDelete = (userId) => {
    alert('Funcionalidad simulada para presentación del prototipo.');
  };

  const handleNewUser = () => {
    setSelectedUser(null);
    setShowModal(true);
  };

  const handleSave = () => {
    alert('Funcionalidad simulada para presentación del prototipo.');
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestión de Usuarios</h1>
        <button
          onClick={handleNewUser}
          className="bg-agro-primary hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-semibold"
        >
          <UserPlus size={20} /> Nuevo Usuario
        </button>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">Nombre</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Rol</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Estado</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Último Acceso</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {mockUsers.map((user, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-semibold">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">
                  <span className="badge badge-info">{user.role}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`badge ${user.status === 'Activo' ? 'badge-success' : 'badge-secondary'}`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{user.lastAccess}</td>
                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-6">
              {selectedUser ? 'Editar Usuario' : 'Nuevo Usuario'}
            </h2>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold mb-1">Nombre</label>
                <input
                  type="text"
                  defaultValue={selectedUser?.name || ''}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-agro-primary"
                  placeholder="Nombre del usuario"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Email</label>
                <input
                  type="email"
                  defaultValue={selectedUser?.email || ''}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-agro-primary"
                  placeholder="Email"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Rol</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-agro-primary">
                  {roles.map((role, idx) => (
                    <option key={idx} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Estado</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-agro-primary">
                  <option>Activo</option>
                  <option>Inactivo</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleSave}
                className="flex-1 bg-agro-primary hover:bg-blue-600 text-white py-2 rounded-lg font-semibold"
              >
                Guardar
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-lg font-semibold"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
