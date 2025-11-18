const BASE = '/api/auth';

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

export const authService = {
    async register(userData) {
        const res = await fetch(`${BASE}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                fullName: `${userData.firstName} ${userData.lastName}`,
                email: userData.email,
                password: userData.password
            }),
        });
        const response = await handleResponse(res);
        return response;
    },

    async login(email, password) {
        const res = await fetch(`${BASE}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        const response = await handleResponse(res);
        return response;
    },

    async getMe() {
        const res = await fetch(`${BASE}/me`, {
            headers: getAuthHeaders(),
        });
        return handleResponse(res);
    },

    async changePassword(passwordData) {
        const res = await fetch(`${BASE}/change-password`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(passwordData),
        });
        return handleResponse(res);
    },
};

export default authService;

