const BASE = '/api/cart';

function getAuthHeaders() {
    const token = localStorage.getItem('token');
    const headers = { 'Content-Type': 'application/json' };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
}

async function handleResponse(res) {
    if (!res.ok) {
        const text = await res.text();
        let errorMessage = text || res.statusText;
        try {
            const errorData = JSON.parse(text);
            if (errorData.message) {
                errorMessage = errorData.message;
            }
        } catch (e) {
            // Use text as is if not JSON
        }
        throw new Error(errorMessage);
    }
    const data = await res.json();
    // Handle ApiResponse wrapper
    if (data.result === 'SUCCESS' && data.data !== null) {
        return data.data;
    }
    return data.data || data;
}

export const cartService = {
    async getCart() {
        const res = await fetch(BASE, {
            headers: getAuthHeaders(),
        });
        return handleResponse(res);
    },

    async addItem(productId, quantity = 1) {
        const res = await fetch(`${BASE}/add`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ productId, quantity }),
        });
        return handleResponse(res);
    },

    async updateItem(productId, quantity) {
        const res = await fetch(`${BASE}/update`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify({ productId, quantity }),
        });
        return handleResponse(res);
    },

    async removeItem(productId) {
        const res = await fetch(`${BASE}/remove/${productId}`, {
            method: 'DELETE',
            headers: getAuthHeaders(),
        });
        return handleResponse(res);
    },
};

export default cartService;

