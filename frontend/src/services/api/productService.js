const BASE = '/api/products';

async function handleResponse(res) {
    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || res.statusText);
    }
    return res.status === 204 ? null : res.json();
}

export const productService = {
    async getAll() {
        const res = await fetch(BASE, { headers: { 'Content-Type': 'application/json' } });
        return handleResponse(res);
    },

    async getById(id) {
        const res = await fetch(`${BASE}/${id}`, { headers: { 'Content-Type': 'application/json' } });
        return handleResponse(res);
    },

    async create(product) {
        const res = await fetch(BASE, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product),
        });
        return handleResponse(res);
    },

    async update(id, product) {
        const res = await fetch(`${BASE}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product),
        });
        return handleResponse(res);
    },

    async remove(id) {
        const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' });
        return handleResponse(res);
    },
};

export default productService;