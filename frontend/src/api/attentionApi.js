import { api } from "./client";

export async function getAttention() {
    return api("/attention");
}