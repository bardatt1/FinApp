const BASE = '/api/orders';

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

export const orderService = {
    async placeOrder(items) {
        // Transform cart items to order items format
        const orderItems = items.map(item => ({
            productId: item.product.id,
            quantity: item.quantity
        }));
        
        const res = await fetch(BASE, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ items: orderItems }),
        });
        return handleResponse(res);
    },

    async getMyOrders() {
        const res = await fetch(BASE, {
            headers: getAuthHeaders(),
        });
        return handleResponse(res);
    },

    async getOrderById(id) {
        const res = await fetch(`${BASE}/${id}`, {
            headers: getAuthHeaders(),
        });
        return handleResponse(res);
    },

    async cancelOrder(id) {
        const res = await fetch(`${BASE}/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders(),
        });
        return handleResponse(res);
    },
};

export default orderService;
