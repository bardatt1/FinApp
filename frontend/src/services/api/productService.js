const buildQuery = (params = {}) => {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') qs.append(k, v);
  });
  const s = qs.toString();
  return s ? `?${s}` : '';
};

const handleRes = async (res) => {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'API error');
  }
  return res.json();
};

export const productService = {
  getProducts: (params) => {
    return fetch(`/api/products${buildQuery(params)}`).then(handleRes);
  },
  getProductById: (id) => {
    return fetch(`/api/products/${id}`).then(handleRes);
  },
  createProduct: (payload) => {
    return fetch(`/api/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).then(handleRes);
  },
  updateProduct: (id, payload) => {
    return fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).then(handleRes);
  },
  deleteProduct: (id) => {
    return fetch(`/api/products/${id}`, {
      method: 'DELETE',
    }).then(handleRes);
  },
};

export default productService;