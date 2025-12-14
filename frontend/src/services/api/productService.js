const BASE = '/api/products';

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

export const productService = {
    async getAll(q, category) {
        const params = new URLSearchParams();
        if (q) params.append('q', q);
        if (category) params.append('category', category);
        const url = params.toString() ? `${BASE}?${params}` : BASE;
        const res = await fetch(url, { headers: getAuthHeaders() });
        return handleResponse(res);
    },

    async getById(id) {
        const res = await fetch(`${BASE}/${id}`, { headers: getAuthHeaders() });
        return handleResponse(res);
    },

    async create(product) {
        try {
            // Check if imageUrl is a base64 data URL and warn if too large
            if (product.imageUrl && product.imageUrl.startsWith('data:image')) {
                const sizeInMB = (product.imageUrl.length * 3) / 4 / 1024 / 1024;
                if (sizeInMB > 2) {
                    console.warn(`Image size is ${sizeInMB.toFixed(2)}MB. Consider using a smaller image or external URL.`);
                }
            }
            
            const res = await fetch(BASE, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify(product),
            });
            return handleResponse(res);
        } catch (error) {
            console.error('Error creating product:', error);
            if (error.message.includes('ERR_CONNECTION_RESET') || error.message.includes('Failed to fetch')) {
                throw new Error('Unable to connect to server. Please try again later.');
            }
            throw error;
        }
    },

    async update(id, product) {
        const res = await fetch(`${BASE}/${id}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(product),
        });
        return handleResponse(res);
    },

    async remove(id) {
        const res = await fetch(`${BASE}/${id}`, { 
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        return handleResponse(res);
    },
};

export default productService;