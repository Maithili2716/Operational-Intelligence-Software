import { api } from "./client";

export async function getInspection() {
    return api("/inspection");
}