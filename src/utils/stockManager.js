// Gestión de stock local
let productStock = {};

export function initializeStock(products) {
  products.forEach(product => {
    if (!productStock[product.id]) {
      productStock[product.id] = product.stock;
    }
  });
  localStorage.setItem('productStock', JSON.stringify(productStock));
}

export function getStock(productId) {
  const saved = localStorage.getItem('productStock');
  if (saved) {
    const stock = JSON.parse(saved);
    return stock[productId] || 0;
  }
  return 0;
}

export function decreaseStock(productId, quantity) {
  const saved = localStorage.getItem('productStock');
  const stock = saved ? JSON.parse(saved) : {};
  
  if (stock[productId] && stock[productId] >= quantity) {
    stock[productId] -= quantity;
    localStorage.setItem('productStock', JSON.stringify(stock));
    return true;
  }
  return false;
}

export function resetStock() {
  localStorage.removeItem('productStock');
  productStock = {};
}

export function getAllStock() {
  const saved = localStorage.getItem('productStock');
  return saved ? JSON.parse(saved) : {};
}
