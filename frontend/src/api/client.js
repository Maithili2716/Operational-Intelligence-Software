//const VITE_API_URL = //import.meta.env.VITE_API_URL ||
    //"http://localhost:5000";

/*console.log("PRODUCTION API:", VITE_API_URL);
export async function api(path) {
    const response = await fetch(
        `${VITE_API_URL}${path}`
    );

    if (!response.ok) {
        return {
        success: false,
        error: await response.json()
    };
    }
    

    return response.json();
}*/

const VITE_API_URL =
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000";

console.log(
    "PRODUCTION API:",
    VITE_API_URL
);


export async function api(
    path,
    options = {}
) {

    const response =
        await fetch(
            `${VITE_API_URL}${path}`,
            {
                ...options,

                headers: {
                    "Content-Type":
                        "application/json",

                    ...(options.headers ?? {})
                }
            }
        );


    if (!response.ok) {

        return {
            success: false,

            error:
                await response.json()
        };

    }


    return response.json();

}