const BASE_URL = "http://localhost:5000";

export async function api(path) {
    const response = await fetch(
        `${BASE_URL}${path}`
    );

    if (!response.ok) {
        throw new Error(
            "Request failed"
        );
    }
    

    return response.json();
}