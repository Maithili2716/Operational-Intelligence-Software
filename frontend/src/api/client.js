const VITE_API_URL ="https://operational-intelligence-software.onrender.com";

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