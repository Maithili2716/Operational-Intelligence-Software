import { api } from "./client";

export async function getRuntime() {
    return api("/runtime");
}