import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useToast } from './components/common/Toast';

// Store Pages
import StoreLanding from './pages/store/StoreLanding';
import StoreCatalog from './pages/store/StoreCatalog';
import StoreProductDetail from './pages/store/StoreProductDetail';
import StoreCart from './pages/store/StoreCart';
import StoreCheckout from './pages/store/StoreCheckout';
import StoreReceipt from './pages/store/StoreReceipt';
import StoreTracking from './pages/store/StoreTracking';
import StoreLayout from './layouts/StoreLayout';

// Admin Pages
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminCategories from './pages/admin/AdminCategories';
import AdminPurchases from './pages/admin/AdminPurchases';
import AdminFreight from './pages/admin/AdminFreight';
import AdminOrders from './pages/admin/AdminOrders';
import AdminCustomers from './pages/admin/AdminCustomers';
import AdminSuppliers from './pages/admin/AdminSuppliers';
import AdminKardex from './pages/admin/AdminKardex';
import AdminExpenses from './pages/admin/AdminExpenses';
import AdminCashFlow from './pages/admin/AdminCashFlow';
import AdminReports from './pages/admin/AdminReports';
import AdminWarehouse from './pages/admin/AdminWarehouse';
import AdminSettings from './pages/admin/AdminSettings';
import AdminUsers from './pages/admin/AdminUsers';

// Authentication & Entry
import EntryPoint from './pages/EntryPoint';

import { Toast } from './components/common/Toast';

function App() {
  const { toasts, addToast } = useToast();

  return (
    <Router>
      <Routes>
        {/* Entry Point */}
        <Route path="/" element={<EntryPoint />} />
        
        {/* Store Routes */}
        <Route path="/store" element={<StoreLayout />}>
          <Route path="landing" element={<StoreLanding />} />
          <Route path="catalog" element={<StoreCatalog />} />
          <Route path="product/:id" element={<StoreProductDetail />} />
          <Route path="cart" element={<StoreCart />} />
          <Route path="checkout" element={<StoreCheckout />} />
          <Route path="receipt/:orderId" element={<StoreReceipt />} />
          <Route path="tracking" element={<StoreTracking />} />
          <Route index element={<Navigate to="landing" replace />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="purchases" element={<AdminPurchases />} />
          <Route path="freight" element={<AdminFreight />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="suppliers" element={<AdminSuppliers />} />
          <Route path="kardex" element={<AdminKardex />} />
          <Route path="expenses" element={<AdminExpenses />} />
          <Route path="cashflow" element={<AdminCashFlow />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="warehouse" element={<AdminWarehouse />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="users" element={<AdminUsers />} />
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>
      </Routes>

      {/* Toast Notifications */}
      <div className="fixed bottom-4 right-4 z-40 space-y-2">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => {}}
          />
        ))}
      </div>
    </Router>
  );
}

export default App;
