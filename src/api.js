const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
export default BASE_URL;

export async function apiFetch(path, options = {}) {
    const token = localStorage.getItem('descroll_token');

    const res = await fetch(`${BASE_URL}${path}`, {
        ...options,
        headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
        }
    });

    return res;
}