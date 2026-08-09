const VITE_API_URL = import.meta.env.VITE_API_URL ||
    "http://localhost:5000";

console.log("PRODUCTION API:", VITE_API_URL);
export async function api(path) {
    const response = await fetch(
        `${VITE_API_URL}${path}`
    );

    if (!response.ok) {
        throw new Error(
            "Request failed"
        );
    }
    

    return response.json();
}