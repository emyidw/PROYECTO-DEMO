export const getCart = () => {
  const cart = localStorage.getItem('agro_cart');
  return cart ? JSON.parse(cart) : [];
};

export const setCart = (cart) => {
  localStorage.setItem('agro_cart', JSON.stringify(cart));
};

export const getOrders = () => {
  const orders = localStorage.getItem('agro_orders');
  return orders ? JSON.parse(orders) : [];
};

export const setOrders = (orders) => {
  localStorage.setItem('agro_orders', JSON.stringify(orders));
};

export const getOrderById = (orderId) => {
  const orders = getOrders();
  return orders.find(o => o.id === orderId);
};

export const addOrder = (order) => {
  const orders = getOrders();
  orders.push(order);
  setOrders(orders);
  return order;
};

export const updateOrderStatus = (orderId, status) => {
  const orders = getOrders();
  const order = orders.find(o => o.id === orderId);
  if (order) {
    order.status = status;
    setOrders(orders);
  }
  return order;
};

export const getProductStock = () => {
  const stock = localStorage.getItem('agro_stock');
  return stock ? JSON.parse(stock) : {};
};

export const setProductStock = (stock) => {
  localStorage.setItem('agro_stock', JSON.stringify(stock));
};

export const decrementStock = (productId, quantity) => {
  const stock = getProductStock();
  if (!stock[productId]) {
    stock[productId] = 0;
  }
  stock[productId] = Math.max(0, stock[productId] - quantity);
  setProductStock(stock);
};
